import type { JiraProjectMapping } from './types';

export const JIRA_PROJECT_MAPPINGS: Record<string, JiraProjectMapping> = {
  'v3': {
    clientSlug: 'v3',
    projectKey: 'V3',
    projectId: '10104',
    projectName: 'V3 Biomed',
    boardId: '105'
  },
  'casita': {
    clientSlug: 'casita',
    projectKey: 'CASITA',
    projectId: '10035',
    projectName: 'Casita Azul',
    boardId: '' // TODO: Add board ID from Jira
  },
  'hansen-chiropractic': {
    clientSlug: 'hansen-chiropractic',
    projectKey: 'HC',
    projectId: '10103',
    projectName: 'Hansen Chiropractic',
    boardId: '' // TODO: Add board ID from Jira
  },
  'king-roof': {
    clientSlug: 'king-roof',
    projectKey: 'KRC',
    projectId: '10034',
    projectName: 'King Roof Co',
    boardId: '' // TODO: Add board ID from Jira
  },
  'spanish-horizons': {
    clientSlug: 'spanish-horizons',
    projectKey: 'SH',
    projectId: '10301',
    projectName: 'Spanish Horizons',
    boardId: '' // TODO: Add board ID from Jira
  },
  'cocinarte': {
    clientSlug: 'cocinarte',
    projectKey: 'COC',
    projectId: '10300',
    projectName: 'Cocinarte',
    boardId: '' // TODO: Add board ID from Jira
  },
  '4-corners': {
    clientSlug: '4-corners',
    projectKey: 'WZ4',
    projectId: '10069',
    projectName: '4-CORNERS',
    boardId: '' // TODO: Add board ID from Jira
  },
  // TODO: Create these projects in Jira manually
  'salt-creek-dental': {
    clientSlug: 'salt-creek-dental',
    projectKey: 'SCD',
    projectId: '', // Create project at: https://comcreatedevelopment.atlassian.net/jira/projects
    projectName: 'Salt Creek Dental',
    boardId: ''
  },
  'bnc-builders': {
    clientSlug: 'bnc-builders',
    projectKey: 'BNC',
    projectId: '', // Create project at: https://comcreatedevelopment.atlassian.net/jira/projects
    projectName: 'BNC Builders',
    boardId: ''
  }
};

export function getJiraCloudId(): string {
  return import.meta.env.JIRA_CLOUD_ID || '';
}

export function getJiraInstanceUrl(): string {
  return import.meta.env.JIRA_INSTANCE_URL || 'https://comcreatedevelopment.atlassian.net';
}

export function getProjectMapping(clientSlug: string): JiraProjectMapping | null {
  return JIRA_PROJECT_MAPPINGS[clientSlug] || null;
}
