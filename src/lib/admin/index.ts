/**
 * Admin Command Center Library
 *
 * Exports all admin-related types, utilities, and data aggregation functions.
 */

// Types
export type {
  ClientConfig,
  HealthScoreBreakdown,
  HealthScoreDetails,
  HealthAlert,
  ClientTaskData,
  ClientNarrativeData,
  ClientAggregatedData,
  ClientSummary,
  CommandCenterData,
} from './types';

// Health score calculation
export { calculateHealthScore, calculateTaskData } from './health-score';

// Data aggregation
export {
  getEnabledClients,
  getClientById,
  getCurrentMonth,
  aggregateClientData,
  aggregateAllClients,
  getHealthScores,
} from './data-aggregator';
