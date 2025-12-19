import type {
  JiraIssue,
  JiraSearchResponse,
  TransformedTask,
  TransformedComment,
  EpicInfo,
  SprintInfo,
  AdfDocument
} from './types';
import { getJiraCloudId, getJiraInstanceUrl } from './config';
import { getCached, setCached } from './cache';

function getApiBase(): string {
  const cloudId = getJiraCloudId();
  return `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3`;
}

function getAuthHeader(): string {
  const email = import.meta.env.JIRA_EMAIL;
  const token = import.meta.env.JIRA_API_TOKEN;
  if (!email || !token) {
    throw new Error('JIRA_EMAIL and JIRA_API_TOKEN environment variables are required');
  }
  return `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}`;
}

export interface FetchOptions {
  maxResults?: number;
  status?: string[];
  orderBy?: string;
}

export async function fetchProjectIssues(
  projectKey: string,
  options: FetchOptions = {}
): Promise<JiraIssue[]> {
  const { maxResults = 50, status, orderBy = 'status ASC, priority DESC, created DESC' } = options;

  // Build JQL query
  let jql = `project = ${projectKey}`;
  if (status?.length) {
    jql += ` AND status IN (${status.map(s => `"${s}"`).join(', ')})`;
  }
  jql += ` ORDER BY ${orderBy}`;

  // Request all fields needed for enhanced dashboard
  const fields = [
    'summary',
    'description',
    'status',
    'assignee',
    'priority',
    'created',
    'updated',
    'issuetype',
    'labels',
    'components',
    'comment',
    'parent',
    'customfield_10016', // Story point estimate (next-gen)
    'customfield_10036', // Story Points (classic)
    'customfield_10020', // Sprint
    'customfield_10014', // Epic Link
    'customfield_10011', // Epic Name
    'customfield_10013', // Epic Color
  ].join(',');

  const url = `${getApiBase()}/search/jql?jql=${encodeURIComponent(jql)}&maxResults=${maxResults}&fields=${fields}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Jira API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data: JiraSearchResponse = await response.json();
    return data.issues;
  } catch (error) {
    console.error('Failed to fetch Jira issues:', error);
    return [];
  }
}

export function getJiraIssueUrl(issueKey: string): string {
  return `${getJiraInstanceUrl()}/browse/${issueKey}`;
}

export function mapJiraStatus(categoryKey: string): 'todo' | 'in-progress' | 'done' {
  switch (categoryKey) {
    case 'done':
      return 'done';
    case 'indeterminate':
      return 'in-progress';
    default:
      return 'todo';
  }
}

// Parse Atlassian Document Format (ADF) to plain text
function parseAdfToText(adf: AdfDocument | null): string | null {
  if (!adf || !adf.content) return null;

  const extractText = (node: { type: string; text?: string; content?: unknown[] }): string => {
    if (node.type === 'text') {
      return node.text || '';
    }
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractText).join('');
    }
    return '';
  };

  const lines = adf.content.map((block) => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      return extractText(block);
    }
    if (block.type === 'bulletList' || block.type === 'orderedList') {
      return block.content?.map((item) => '• ' + extractText(item as { type: string; content?: unknown[] })).join('\n') || '';
    }
    if (block.type === 'codeBlock') {
      return extractText(block);
    }
    return extractText(block);
  });

  return lines.filter(Boolean).join('\n\n') || null;
}

// Transform Jira comments to our format
function transformComments(issue: JiraIssue): TransformedComment[] {
  const commentsPage = issue.fields.comment;
  if (!commentsPage?.comments?.length) return [];

  return commentsPage.comments.map(comment => ({
    id: comment.id,
    author: comment.author.displayName,
    authorAvatar: comment.author.avatarUrls?.['24x24'] || null,
    body: parseAdfToText(comment.body) || '',
    created: new Date(comment.created),
    updated: new Date(comment.updated),
  }));
}

// Get story points (check both field IDs)
function getStoryPoints(issue: JiraIssue): number | null {
  return issue.fields.customfield_10016 ?? issue.fields.customfield_10036 ?? null;
}

// Transform sprint info
function transformSprint(issue: JiraIssue): SprintInfo | null {
  const sprints = issue.fields.customfield_10020;
  if (!sprints?.length) return null;

  // Get the active sprint, or the most recent one
  const activeSprint = sprints.find(s => s.state === 'active') || sprints[sprints.length - 1];
  if (!activeSprint) return null;

  return {
    id: activeSprint.id,
    name: activeSprint.name,
    state: activeSprint.state,
    startDate: activeSprint.startDate ? new Date(activeSprint.startDate) : null,
    endDate: activeSprint.endDate ? new Date(activeSprint.endDate) : null,
    goal: activeSprint.goal || null,
  };
}

// Transform epic info from parent or epic link
function transformEpic(issue: JiraIssue): EpicInfo | null {
  // Check if parent is an epic (next-gen projects)
  const parent = issue.fields.parent;
  if (parent && parent.fields.issuetype.name === 'Epic') {
    return {
      key: parent.key,
      summary: parent.fields.summary,
      color: null, // Next-gen doesn't have epic color in parent
      status: mapJiraStatus(parent.fields.status.statusCategory.key),
      statusLabel: parent.fields.status.name,
    };
  }

  // Check for epic link (classic projects)
  const epicKey = issue.fields.customfield_10014;
  if (epicKey) {
    return {
      key: epicKey,
      summary: issue.fields.customfield_10011 || epicKey, // Epic name or fall back to key
      color: issue.fields.customfield_10013 || null,
      status: 'todo', // We don't have epic status from this field
      statusLabel: 'Unknown',
    };
  }

  return null;
}

export function transformIssue(issue: JiraIssue): TransformedTask {
  const comments = transformComments(issue);

  return {
    key: issue.key,
    summary: issue.fields.summary,
    description: parseAdfToText(issue.fields.description),
    status: mapJiraStatus(issue.fields.status.statusCategory.key),
    statusLabel: issue.fields.status.name,
    assignee: issue.fields.assignee?.displayName || null,
    assigneeAvatar: issue.fields.assignee?.avatarUrls?.['24x24'] || null,
    priority: issue.fields.priority.name,
    issueType: issue.fields.issuetype.name,
    jiraUrl: getJiraIssueUrl(issue.key),
    created: new Date(issue.fields.created),
    updated: new Date(issue.fields.updated),
    // Enhanced fields
    storyPoints: getStoryPoints(issue),
    labels: issue.fields.labels || [],
    components: issue.fields.components?.map(c => c.name) || [],
    commentCount: issue.fields.comment?.total || 0,
    comments,
    epic: transformEpic(issue),
    sprint: transformSprint(issue),
  };
}

export async function getClientTasks(clientSlug: string, projectKey: string): Promise<TransformedTask[]> {
  const cacheKey = `jira-tasks-${clientSlug}`;
  const cached = getCached<TransformedTask[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const issues = await fetchProjectIssues(projectKey);
  const tasks = issues.map(transformIssue);

  setCached(cacheKey, tasks);
  return tasks;
}
