/**
 * Data Aggregator for Admin Command Center
 *
 * Combines data from multiple sources:
 * - SEO metrics (Ahrefs + Lighthouse via lib/metrics)
 * - Jira tasks
 */

import type {
  ClientConfig,
  ClientAggregatedData,
  ClientSummary,
  CommandCenterData,
  HealthAlert,
} from './types';
import { calculateHealthScore, calculateTaskData } from './health-score';
import { getClientTasks } from '../jira/client';
import { calculateSprintMetrics } from '../jira/metrics';
import { fetchClientMetrics, type ClientMetrics } from '../metrics';
import clientsConfigJson from '../../../clients.config.json';

// Type assertion for the config
const clientsConfig = clientsConfigJson as { clients: ClientConfig[] };

/**
 * Get enabled clients from config
 */
export function getEnabledClients(): ClientConfig[] {
  return clientsConfig.clients.filter((c) => c.enabled);
}

/**
 * Get a single client by ID
 */
export function getClientById(clientId: string): ClientConfig | undefined {
  return clientsConfig.clients.find((c) => c.id === clientId);
}

/**
 * Get current month in YYYY-MM format
 */
export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

/**
 * Fetch metrics for a client (with caching)
 */
async function fetchMetricsForClient(client: ClientConfig): Promise<ClientMetrics | null> {
  try {
    return await fetchClientMetrics(client.name, client.website);
  } catch (error) {
    console.error(`Failed to fetch metrics for ${client.id}:`, error);
    return null;
  }
}

/**
 * Fetch tasks for a client from Jira
 */
async function fetchTasksForClient(client: ClientConfig) {
  try {
    const tasks = await getClientTasks(client.id, client.jiraProjectKey);
    const sprintMetrics = calculateSprintMetrics(tasks);
    return calculateTaskData(tasks, sprintMetrics);
  } catch (error) {
    console.error(`Failed to fetch tasks for ${client.id}:`, error);
    return calculateTaskData([], {
      totalTasks: 0,
      totalPoints: 0,
      todoTasks: 0,
      todoPoints: 0,
      inProgressTasks: 0,
      inProgressPoints: 0,
      doneTasks: 0,
      donePoints: 0,
      completionPercentage: 0,
      pointsCompletionPercentage: 0,
    });
  }
}

/**
 * Aggregate all data for a single client
 */
export async function aggregateClientData(
  clientId: string,
  _month?: string
): Promise<ClientAggregatedData | null> {
  const client = getClientById(clientId);
  if (!client) {
    console.error(`Client not found: ${clientId}`);
    return null;
  }

  // Fetch all data in parallel
  const [metrics, taskData] = await Promise.all([
    fetchMetricsForClient(client),
    fetchTasksForClient(client),
  ]);

  // Calculate health score
  const healthScore = calculateHealthScore(clientId, metrics, taskData);

  return {
    client,
    metrics,
    tasks: taskData,
    healthScore,
  };
}

/**
 * Aggregate summary data for all enabled clients
 */
export async function aggregateAllClients(_month?: string): Promise<CommandCenterData> {
  const clients = getEnabledClients();

  // Aggregate data for each client in parallel
  const clientPromises = clients.map(async (client): Promise<ClientSummary> => {
    try {
      // Fetch tasks
      const taskData = await fetchTasksForClient(client);

      // Try to get metrics - use cached snapshot from config if API fails
      let metrics: ClientMetrics | null = null;
      try {
        metrics = await fetchMetricsForClient(client);
      } catch (e) {
        console.log(`Using cached metrics for ${client.id}`);
      }

      // Calculate health score
      const healthScore = calculateHealthScore(client.id, metrics, taskData);

      return {
        clientId: client.id,
        clientName: client.name,
        website: client.website,
        healthScore: healthScore.breakdown,
        quickMetrics: {
          domainRating: metrics?.overview.domainRating ?? client.seoMetrics?.domainRating ?? null,
          organicTraffic: metrics?.overview.organicTraffic ?? client.seoMetrics?.organicTraffic ?? null,
          openTasks: taskData.metrics.todoTasks + taskData.metrics.inProgressTasks,
          overdueCount: taskData.overdueCount,
        },
        alerts: healthScore.alerts,
      };
    } catch (error) {
      console.error(`Failed to aggregate data for ${client.id}:`, error);

      // Return a minimal summary on error
      return {
        clientId: client.id,
        clientName: client.name,
        website: client.website,
        healthScore: {
          seo: 0,
          tasks: 0,
          composite: 0,
          status: 'critical',
        },
        quickMetrics: {
          domainRating: client.seoMetrics?.domainRating ?? null,
          organicTraffic: client.seoMetrics?.organicTraffic ?? null,
          openTasks: 0,
          overdueCount: 0,
        },
        alerts: [
          {
            severity: 'critical',
            category: 'seo',
            message: 'Failed to load client data',
          },
        ],
      };
    }
  });

  const clientSummaries = await Promise.all(clientPromises);

  // Sort by health score (worst first)
  clientSummaries.sort((a, b) => a.healthScore.composite - b.healthScore.composite);

  // Calculate totals
  const totals = {
    healthy: clientSummaries.filter((c) => c.healthScore.status === 'healthy').length,
    needsAttention: clientSummaries.filter((c) => c.healthScore.status === 'needs-attention').length,
    critical: clientSummaries.filter((c) => c.healthScore.status === 'critical').length,
    totalClients: clientSummaries.length,
  };

  // Collect critical alerts across all clients
  const criticalAlerts: Array<HealthAlert & { clientId: string; clientName: string }> = [];
  for (const summary of clientSummaries) {
    for (const alert of summary.alerts) {
      if (alert.severity === 'critical') {
        criticalAlerts.push({
          ...alert,
          clientId: summary.clientId,
          clientName: summary.clientName,
        });
      }
    }
  }

  return {
    clients: clientSummaries,
    totals,
    criticalAlerts,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get just the health scores for all clients (lighter weight)
 */
export async function getHealthScores(month?: string): Promise<
  Array<{
    clientId: string;
    clientName: string;
    healthScore: ClientSummary['healthScore'];
    status: ClientSummary['healthScore']['status'];
  }>
> {
  const data = await aggregateAllClients(month);
  return data.clients.map((c) => ({
    clientId: c.clientId,
    clientName: c.clientName,
    healthScore: c.healthScore,
    status: c.healthScore.status,
  }));
}
