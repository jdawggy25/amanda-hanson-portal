/**
 * Health Score Calculator
 *
 * Calculates a composite health score from SEO metrics and Jira tasks.
 *
 * Weights:
 * - SEO: 55%
 * - Tasks: 45%
 */

import type { ClientMetrics } from '../metrics';
import type { TransformedTask, SprintMetrics } from '../jira/types';
import type {
  HealthScoreBreakdown,
  HealthScoreDetails,
  HealthAlert,
  ClientTaskData,
} from './types';

// Weight constants
const WEIGHTS = {
  seo: 0.55,
  tasks: 0.45,
};

// SEO sub-weights (must sum to 1.0)
const SEO_WEIGHTS = {
  lighthousePerf: 0.25,
  lighthouseSeo: 0.20,
  domainRating: 0.20,
  trafficTrend: 0.20,
  keywordsCount: 0.15,
};

// Task sub-weights (must sum to 1.0)
const TASK_WEIGHTS = {
  overdue: 0.35,
  stuck: 0.25,
  sprintCompletion: 0.25,
  avgAge: 0.15,
};

// Thresholds
const THRESHOLDS = {
  healthy: 75,
  needsAttention: 50,
};

/**
 * Calculate SEO score component (0-100)
 */
function calculateSeoScore(metrics: ClientMetrics | null): {
  score: number;
  factors: HealthScoreDetails['factors']['seo'];
} {
  if (!metrics) {
    return {
      score: 0,
      factors: {
        lighthousePerf: null,
        lighthouseSeo: null,
        domainRating: null,
        trafficTrend: null,
        keywordsCount: null,
      },
    };
  }

  const lighthousePerf = metrics.overview.performanceScore || 0;
  const lighthouseSeo = metrics.overview.seoScore || 0;
  const domainRating = metrics.overview.domainRating || 0;
  const keywordsCount = metrics.overview.organicKeywords || 0;

  // Calculate traffic trend from history
  let trafficTrend: 'up' | 'down' | 'stable' | null = null;
  let trafficTrendScore = 70; // Default to neutral

  const trend = metrics.traffic.trend;
  if (trend && trend.length >= 2) {
    const recent = trend[trend.length - 1] || 0;
    const previous = trend[trend.length - 2] || 0;

    if (previous > 0) {
      const change = ((recent - previous) / previous) * 100;
      if (change >= 10) {
        trafficTrend = 'up';
        trafficTrendScore = 100;
      } else if (change <= -10) {
        trafficTrend = 'down';
        trafficTrendScore = Math.max(0, 50 + change); // -10% = 40, -20% = 30, etc.
      } else {
        trafficTrend = 'stable';
        trafficTrendScore = 70;
      }
    }
  }

  // Keywords score: >100 = 100, >50 = 80, >20 = 60, else linear
  let keywordsScore = 0;
  if (keywordsCount >= 100) {
    keywordsScore = 100;
  } else if (keywordsCount >= 50) {
    keywordsScore = 80;
  } else if (keywordsCount >= 20) {
    keywordsScore = 60;
  } else {
    keywordsScore = (keywordsCount / 20) * 60;
  }

  // Domain rating score (cap at 100)
  const drScore = Math.min(domainRating, 100);

  // Calculate weighted SEO score
  const score =
    lighthousePerf * SEO_WEIGHTS.lighthousePerf +
    lighthouseSeo * SEO_WEIGHTS.lighthouseSeo +
    drScore * SEO_WEIGHTS.domainRating +
    trafficTrendScore * SEO_WEIGHTS.trafficTrend +
    keywordsScore * SEO_WEIGHTS.keywordsCount;

  return {
    score: Math.round(score),
    factors: {
      lighthousePerf,
      lighthouseSeo,
      domainRating,
      trafficTrend,
      keywordsCount,
    },
  };
}

/**
 * Calculate task score component (0-100)
 */
function calculateTaskScore(taskData: ClientTaskData): {
  score: number;
  factors: HealthScoreDetails['factors']['tasks'];
} {
  const { all, metrics, overdueCount, stuckInProgressCount, avgDaysInProgress } = taskData;

  // If no tasks, return neutral score
  if (all.length === 0) {
    return {
      score: 70, // Neutral - no tasks to evaluate
      factors: {
        overdueCount: 0,
        stuckCount: 0,
        sprintCompletion: null,
        avgAgeInProgress: null,
      },
    };
  }

  // Overdue score: 0 overdue = 100, each overdue = -15 (min 0)
  const overdueScore = Math.max(0, 100 - overdueCount * 15);

  // Stuck score: 0 stuck = 100, each stuck = -20 (min 0)
  const stuckScore = Math.max(0, 100 - stuckInProgressCount * 20);

  // Sprint completion: directly use completion percentage
  const sprintCompletionScore = metrics.completionPercentage;

  // Task age score: <3 days = 100, >14 days = 0, linear between
  let ageScore = 100;
  if (avgDaysInProgress !== null) {
    if (avgDaysInProgress >= 14) {
      ageScore = 0;
    } else if (avgDaysInProgress > 3) {
      ageScore = 100 - ((avgDaysInProgress - 3) / 11) * 100;
    }
  }

  // Calculate weighted task score
  const score =
    overdueScore * TASK_WEIGHTS.overdue +
    stuckScore * TASK_WEIGHTS.stuck +
    sprintCompletionScore * TASK_WEIGHTS.sprintCompletion +
    ageScore * TASK_WEIGHTS.avgAge;

  return {
    score: Math.round(score),
    factors: {
      overdueCount,
      stuckCount: stuckInProgressCount,
      sprintCompletion: metrics.completionPercentage,
      avgAgeInProgress: avgDaysInProgress,
    },
  };
}

/**
 * Generate alerts based on scores and factors
 */
function generateAlerts(
  seoFactors: HealthScoreDetails['factors']['seo'],
  taskFactors: HealthScoreDetails['factors']['tasks'],
  clientId: string
): HealthAlert[] {
  const alerts: HealthAlert[] = [];

  // SEO alerts
  if (seoFactors.lighthousePerf !== null && seoFactors.lighthousePerf < 50) {
    alerts.push({
      severity: 'critical',
      category: 'seo',
      message: `Lighthouse performance score is ${seoFactors.lighthousePerf}% (critical)`,
    });
  } else if (seoFactors.lighthousePerf !== null && seoFactors.lighthousePerf < 75) {
    alerts.push({
      severity: 'warning',
      category: 'seo',
      message: `Lighthouse performance score is ${seoFactors.lighthousePerf}% (needs improvement)`,
    });
  }

  if (seoFactors.trafficTrend === 'down') {
    alerts.push({
      severity: 'warning',
      category: 'seo',
      message: 'Traffic is declining',
    });
  }

  if (seoFactors.keywordsCount !== null && seoFactors.keywordsCount === 0) {
    alerts.push({
      severity: 'warning',
      category: 'seo',
      message: 'No organic keywords ranking yet',
    });
  }

  if (seoFactors.domainRating !== null && seoFactors.domainRating < 10) {
    alerts.push({
      severity: 'info',
      category: 'seo',
      message: `Domain rating is low (${seoFactors.domainRating}) - building authority`,
    });
  }

  // Task alerts
  if (taskFactors.overdueCount > 0) {
    alerts.push({
      severity: taskFactors.overdueCount >= 3 ? 'critical' : 'warning',
      category: 'tasks',
      message: `${taskFactors.overdueCount} overdue task${taskFactors.overdueCount > 1 ? 's' : ''}`,
      actionUrl: `/admin/clients/${clientId}#tasks`,
    });
  }

  if (taskFactors.stuckCount > 0) {
    alerts.push({
      severity: taskFactors.stuckCount >= 3 ? 'critical' : 'warning',
      category: 'tasks',
      message: `${taskFactors.stuckCount} task${taskFactors.stuckCount > 1 ? 's' : ''} stuck in progress`,
      actionUrl: `/admin/clients/${clientId}#tasks`,
    });
  }

  if (taskFactors.avgAgeInProgress !== null && taskFactors.avgAgeInProgress > 7) {
    alerts.push({
      severity: 'info',
      category: 'tasks',
      message: `Average task age in progress: ${Math.round(taskFactors.avgAgeInProgress)} days`,
    });
  }

  return alerts;
}

/**
 * Get health status from composite score
 */
function getHealthStatus(composite: number): 'healthy' | 'needs-attention' | 'critical' {
  if (composite >= THRESHOLDS.healthy) return 'healthy';
  if (composite >= THRESHOLDS.needsAttention) return 'needs-attention';
  return 'critical';
}

/**
 * Calculate complete health score for a client
 */
export function calculateHealthScore(
  clientId: string,
  metrics: ClientMetrics | null,
  taskData: ClientTaskData
): HealthScoreDetails {
  // Calculate individual scores
  const seoResult = calculateSeoScore(metrics);
  const taskResult = calculateTaskScore(taskData);

  // Calculate composite score (SEO + Tasks only)
  const composite = Math.round(
    seoResult.score * WEIGHTS.seo +
    taskResult.score * WEIGHTS.tasks
  );

  // Generate alerts
  const alerts = generateAlerts(
    seoResult.factors,
    taskResult.factors,
    clientId
  );

  return {
    breakdown: {
      seo: seoResult.score,
      tasks: taskResult.score,
      composite,
      status: getHealthStatus(composite),
    },
    factors: {
      seo: seoResult.factors,
      tasks: taskResult.factors,
    },
    alerts,
  };
}

/**
 * Calculate task data summary from tasks array
 */
export function calculateTaskData(tasks: TransformedTask[], sprintMetrics: SprintMetrics): ClientTaskData {
  const now = new Date();
  const DAYS_OVERDUE_THRESHOLD = 7; // Tasks in progress for more than 7 days are considered overdue
  const STUCK_THRESHOLD_DAYS = 14; // Tasks in progress for more than 14 days are considered stuck

  let overdueCount = 0;
  let stuckInProgressCount = 0;
  let totalDaysInProgress = 0;
  let inProgressCount = 0;

  for (const task of tasks) {
    if (task.status === 'in-progress') {
      const daysInProgress = Math.floor(
        (now.getTime() - task.updated.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysInProgress > DAYS_OVERDUE_THRESHOLD) {
        overdueCount++;
      }

      if (daysInProgress > STUCK_THRESHOLD_DAYS) {
        stuckInProgressCount++;
      }

      totalDaysInProgress += daysInProgress;
      inProgressCount++;
    }
  }

  const avgDaysInProgress = inProgressCount > 0
    ? totalDaysInProgress / inProgressCount
    : null;

  return {
    all: tasks,
    metrics: sprintMetrics,
    overdueCount,
    stuckInProgressCount,
    avgDaysInProgress,
  };
}
