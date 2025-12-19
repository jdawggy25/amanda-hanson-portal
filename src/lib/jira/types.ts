// Atlassian Document Format (ADF) for rich text
export interface AdfNode {
  type: string;
  text?: string;
  content?: AdfNode[];
  attrs?: Record<string, unknown>;
}

export interface AdfDocument {
  type: string;
  version?: number;
  content: AdfNode[];
}

// Jira Comment structure
export interface JiraComment {
  id: string;
  self: string;
  author: {
    accountId: string;
    displayName: string;
    avatarUrls: Record<string, string>;
  };
  body: AdfDocument | null;
  created: string;
  updated: string;
}

export interface JiraCommentsPage {
  comments: JiraComment[];
  maxResults: number;
  total: number;
  startAt: number;
}

// Sprint structure from customfield_10020
export interface JiraSprint {
  id: number;
  name: string;
  state: 'active' | 'closed' | 'future';
  startDate?: string;
  endDate?: string;
  goal?: string;
}

// Component structure
export interface JiraComponent {
  id: string;
  name: string;
  description?: string;
}

// Epic/Parent structure
export interface JiraParent {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    status: {
      name: string;
      statusCategory: {
        key: string;
        colorName: string;
      };
    };
    issuetype: {
      name: string;
      iconUrl: string;
    };
  };
}

export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: {
    summary: string;
    description: AdfDocument | null;
    status: {
      name: string;
      statusCategory: {
        key: string;
        colorName: string;
      };
    };
    assignee: {
      accountId: string;
      displayName: string;
      avatarUrls: Record<string, string>;
    } | null;
    priority: {
      name: string;
      iconUrl: string;
    };
    created: string;
    updated: string;
    issuetype: {
      name: string;
      iconUrl: string;
      hierarchyLevel?: number;
    };
    // Enhanced fields
    labels: string[];
    components: JiraComponent[];
    comment?: JiraCommentsPage;
    parent?: JiraParent;
    // Custom fields - story points (try both common field IDs)
    customfield_10016?: number | null; // Story point estimate (next-gen)
    customfield_10036?: number | null; // Story Points (classic)
    // Sprint
    customfield_10020?: JiraSprint[] | null;
    // Epic fields (for classic projects)
    customfield_10014?: string | null; // Epic Link (issue key)
    customfield_10011?: string | null; // Epic Name
    customfield_10013?: string | null; // Epic Color
  };
}

export interface JiraSearchResponse {
  issues: JiraIssue[];
  total: number;
  maxResults: number;
  startAt: number;
}

// Transformed comment for UI
export interface TransformedComment {
  id: string;
  author: string;
  authorAvatar: string | null;
  body: string;
  created: Date;
  updated: Date;
}

// Epic info for grouping
export interface EpicInfo {
  key: string;
  summary: string;
  color: string | null;
  status: 'todo' | 'in-progress' | 'done';
  statusLabel: string;
}

// Sprint info
export interface SprintInfo {
  id: number;
  name: string;
  state: 'active' | 'closed' | 'future';
  startDate: Date | null;
  endDate: Date | null;
  goal: string | null;
}

export interface TransformedTask {
  key: string;
  summary: string;
  description: string | null;
  status: 'todo' | 'in-progress' | 'done';
  statusLabel: string;
  assignee: string | null;
  assigneeAvatar: string | null;
  priority: string;
  issueType: string;
  jiraUrl: string;
  created: Date;
  updated: Date;
  // Enhanced fields
  storyPoints: number | null;
  labels: string[];
  components: string[];
  commentCount: number;
  comments: TransformedComment[];
  epic: EpicInfo | null;
  sprint: SprintInfo | null;
}

// Sprint metrics for dashboard
export interface SprintMetrics {
  totalTasks: number;
  totalPoints: number;
  todoTasks: number;
  todoPoints: number;
  inProgressTasks: number;
  inProgressPoints: number;
  doneTasks: number;
  donePoints: number;
  completionPercentage: number;
  pointsCompletionPercentage: number;
}

// Epic with aggregated metrics
export interface EpicWithTasks {
  epic: EpicInfo | null;
  tasks: TransformedTask[];
  metrics: {
    totalTasks: number;
    totalPoints: number;
    doneTasks: number;
    donePoints: number;
    completionPercentage: number;
  };
}

// Activity item for feed
export interface ActivityItem {
  id: string;
  type: 'comment' | 'status_change' | 'created';
  taskKey: string;
  taskSummary: string;
  actor: string;
  actorAvatar: string | null;
  content: string;
  timestamp: Date;
}

export interface JiraProjectMapping {
  clientSlug: string;
  projectKey: string;
  projectId: string;
  projectName: string;
  boardId?: string;
}
