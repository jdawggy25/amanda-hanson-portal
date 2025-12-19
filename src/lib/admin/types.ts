/**
 * Admin Command Center Types
 *
 * Types for health scoring and aggregated client data.
 */

import type { TransformedTask, SprintMetrics } from '../jira/types';
import type { ClientMetrics } from '../metrics';
import type { NarrativeRecord } from '../storage/supabase';

// Client configuration from clients.config.json
export interface ClientConfig {
  id: string;
  name: string;
  password: string;
  website: string;
  enabled: boolean;
  jiraProjectKey: string;
  seoMetrics?: {
    lastUpdated: string;
    domainRating: number;
    ahrefsRank: number;
    organicKeywords: number;
    organicTraffic: number;
    organicTrafficValue: string;
    liveBacklinks: number;
    referringDomains: number;
  };
}

// Health score breakdown for a client
export interface HealthScoreBreakdown {
  seo: number;          // 0-100, weight: 40%
  tasks: number;        // 0-100, weight: 35%
  narrative: number;    // 0-100, weight: 25%
  composite: number;    // weighted average
  status: 'healthy' | 'needs-attention' | 'critical';
}

// Health score details with contributing factors
export interface HealthScoreDetails {
  breakdown: HealthScoreBreakdown;
  factors: {
    seo: {
      lighthousePerf: number | null;
      lighthouseSeo: number | null;
      domainRating: number | null;
      trafficTrend: 'up' | 'down' | 'stable' | null;
      keywordsCount: number | null;
    };
    tasks: {
      overdueCount: number;
      stuckCount: number;
      sprintCompletion: number | null;
      avgAgeInProgress: number | null;
    };
    narrative: {
      status: 'none' | 'draft' | 'ready' | 'published';
    };
  };
  alerts: HealthAlert[];
}

// Alert for a specific issue
export interface HealthAlert {
  severity: 'critical' | 'warning' | 'info';
  category: 'seo' | 'tasks' | 'narrative';
  message: string;
  actionUrl?: string;
}

// Task data with summary metrics
export interface ClientTaskData {
  all: TransformedTask[];
  metrics: SprintMetrics;
  overdueCount: number;
  stuckInProgressCount: number;
  avgDaysInProgress: number | null;
}

// Narrative data with status
export interface ClientNarrativeData {
  status: 'none' | 'draft' | 'ready' | 'published';
  record: NarrativeRecord | null;
}

// Fully aggregated data for a single client
export interface ClientAggregatedData {
  client: ClientConfig;
  metrics: ClientMetrics | null;
  tasks: ClientTaskData;
  narrative: ClientNarrativeData;
  healthScore: HealthScoreDetails;
}

// Summary data for dashboard (lighter weight)
export interface ClientSummary {
  clientId: string;
  clientName: string;
  website: string;
  healthScore: HealthScoreBreakdown;
  quickMetrics: {
    domainRating: number | null;
    organicTraffic: number | null;
    openTasks: number;
    overdueCount: number;
  };
  narrativeStatus: 'none' | 'draft' | 'ready' | 'published';
  alerts: HealthAlert[];
}

// Dashboard data for the command center
export interface CommandCenterData {
  clients: ClientSummary[];
  totals: {
    healthy: number;
    needsAttention: number;
    critical: number;
    totalClients: number;
  };
  criticalAlerts: Array<HealthAlert & { clientId: string; clientName: string }>;
  lastUpdated: string;
}
