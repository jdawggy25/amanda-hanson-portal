// Unified metrics fetcher - combines Ahrefs and Lighthouse data with Supabase caching

import { getCached, setCached, getCacheAge, formatCacheAge, clearCache } from '../cache';
import {
  fetchAllAhrefsMetrics,
  formatTrafficValue,
  type AhrefsMetrics,
  type AhrefsKeyword,
  type TrafficHistoryEntry,
  type ReferringDomain,
  type OrganicCompetitor,
  type TopPage,
  type BrokenBacklink,
  type AnchorText,
} from './ahrefs';
import { fetchFullLighthouseMetrics, type LighthouseMetrics } from './lighthouse';

// 30 days in milliseconds
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export interface ClientMetrics {
  client: {
    name: string;
    reportDate: string;
    website: string;
  };
  overview: {
    domainRating: number;
    ahrefsRank: number | null;
    organicKeywords: number;
    organicTraffic: number;
    trafficValue: number; // in USD dollars
    performanceScore: number;
    seoScore: number;
    accessibilityScore: number;
    bestPracticesScore: number;
    status: string;
  };
  keywords: {
    total: number;
    ranking: AhrefsKeyword[];
    change: number | null;
    changePercent: string;
  };
  traffic: {
    monthly: number;
    organicValue: number; // in USD dollars
    trend: number[]; // 12-month array for charts
    history: TrafficHistoryEntry[];
    change: number | null;
    changePercent: string;
  };
  backlinks: {
    total: number;
    domains: number;
    dofollow: number;
    nofollow: number;
    topReferring: ReferringDomain[];
    change: number | null;
    changePercent: string;
  };
  competitors: OrganicCompetitor[];
  topPages: TopPage[];
  brokenBacklinks: BrokenBacklink[];
  anchorTexts: AnchorText[];
  coreWebVitals: {
    lcp: { value: number; unit: string; status: string; threshold: number };
    fid: { value: number; unit: string; status: string; threshold: number };
    cls: { value: number; unit: string; status: string; threshold: number };
    fcp: { value: number; unit: string; status: string; threshold: number };
    ttfb: { value: number; unit: string; status: string; threshold: number };
  };
  lighthouse: {
    mobile: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    } | null;
    desktop: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
    } | null;
    lastAudit: string;
  };
  dataSource: {
    provider: string;
    lastUpdated: string;
    cacheAge: string | null;
  };
}

function getReportDate(): string {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getDateString(): string {
  return new Date().toISOString().split('T')[0];
}

function determineStatus(lighthouse: LighthouseMetrics | null, ahrefs: AhrefsMetrics | null): string {
  if (!lighthouse && !ahrefs) {
    return 'Data unavailable';
  }

  const perf = lighthouse?.scores.performance || 0;

  if (perf < 50) {
    return 'Page speed critical - needs immediate improvement';
  }
  if (perf < 75) {
    return 'Page speed needs improvement';
  }
  if (!ahrefs || ahrefs.organicTraffic === 0) {
    return 'Building organic presence';
  }
  if (ahrefs.organicTraffic < 100) {
    return 'Growing organic traffic';
  }
  return 'Healthy SEO performance';
}

function mapCoreWebVitalStatus(status: 'good' | 'needs-improvement' | 'poor'): string {
  switch (status) {
    case 'good':
      return 'pass';
    case 'poor':
      return 'fail';
    default:
      return 'warning';
  }
}

function calculateChange(trend: number[]): { change: number | null; changePercent: string } {
  if (trend.length < 2) {
    return { change: null, changePercent: 'N/A' };
  }
  const current = trend[trend.length - 1] || 0;
  const previous = trend[trend.length - 2] || 0;

  if (previous === 0) {
    return { change: current, changePercent: current > 0 ? '+100%' : '0%' };
  }

  const change = current - previous;
  const percentChange = ((change / previous) * 100).toFixed(1);
  const prefix = change >= 0 ? '+' : '';

  return {
    change,
    changePercent: `${prefix}${percentChange}%`,
  };
}

export async function fetchClientMetrics(
  clientName: string,
  website: string,
  forceRefresh = false
): Promise<ClientMetrics> {
  const cacheKey = `metrics-${website.replace(/[^a-z0-9]/gi, '-')}`;

  // Check cache unless force refresh
  if (!forceRefresh) {
    const cached = await getCached<ClientMetrics>(cacheKey);
    if (cached) {
      const age = await getCacheAge(cacheKey);
      cached.dataSource.cacheAge = age ? formatCacheAge(age) : null;
      return cached;
    }
  }

  // Fetch fresh data from APIs in parallel
  console.log(`Fetching fresh metrics for ${website}...`);

  let ahrefsData = null;
  let lighthouseData = { mobile: null, desktop: null };

  try {
    [ahrefsData, lighthouseData] = await Promise.all([
      fetchAllAhrefsMetrics(website).catch((err) => {
        console.error('Ahrefs fetch failed:', err.message || err);
        return null;
      }),
      fetchFullLighthouseMetrics(website).catch((err) => {
        console.error('Lighthouse fetch failed:', err.message || err);
        return { mobile: null, desktop: null };
      }),
    ]);
  } catch (err) {
    console.error('API fetch error:', err);
  }

  // Log what data we got
  const ahrefsStatus = ahrefsData ? 'OK' : 'FAILED';
  const lighthouseStatus = lighthouseData.mobile || lighthouseData.desktop ? 'OK' : 'FAILED';
  console.log(`API Status - Ahrefs: ${ahrefsStatus}, Lighthouse: ${lighthouseStatus}`);

  // Use mobile Lighthouse data as primary, fall back to desktop
  const lighthouse = lighthouseData.mobile || lighthouseData.desktop;

  // Calculate traffic changes
  const trafficTrend = ahrefsData?.trafficTrend || [];
  const trafficChange = calculateChange(trafficTrend);

  // Build the metrics object
  const metrics: ClientMetrics = {
    client: {
      name: clientName,
      reportDate: getReportDate(),
      website,
    },
    overview: {
      domainRating: ahrefsData?.domainRating || 0,
      ahrefsRank: ahrefsData?.ahrefsRank || null,
      organicKeywords: ahrefsData?.organicKeywords || 0,
      organicTraffic: ahrefsData?.organicTraffic || 0,
      trafficValue: ahrefsData ? ahrefsData.organicTrafficValue / 100 : 0,
      performanceScore: lighthouse?.scores.performance || 0,
      seoScore: lighthouse?.scores.seo || 0,
      accessibilityScore: lighthouse?.scores.accessibility || 0,
      bestPracticesScore: lighthouse?.scores.bestPractices || 0,
      status: determineStatus(lighthouse, ahrefsData),
    },
    keywords: {
      total: ahrefsData?.organicKeywords || 0,
      ranking: ahrefsData?.keywords || [],
      change: null,
      changePercent: 'N/A',
    },
    traffic: {
      monthly: ahrefsData?.organicTraffic || 0,
      organicValue: ahrefsData ? ahrefsData.organicTrafficValue / 100 : 0,
      trend: trafficTrend,
      history: ahrefsData?.trafficHistory || [],
      ...trafficChange,
    },
    backlinks: {
      total: ahrefsData?.backlinks.total || 0,
      domains: ahrefsData?.referringDomains || 0,
      dofollow: ahrefsData?.backlinks.dofollow || 0,
      nofollow: ahrefsData?.backlinks.nofollow || 0,
      topReferring: ahrefsData?.topReferringDomains || [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: ahrefsData?.competitors || [],
    topPages: ahrefsData?.topPages || [],
    brokenBacklinks: ahrefsData?.brokenBacklinks || [],
    anchorTexts: ahrefsData?.anchorTexts || [],
    coreWebVitals: {
      lcp: lighthouse?.coreWebVitals.lcp
        ? {
            value: lighthouse.coreWebVitals.lcp.value,
            unit: lighthouse.coreWebVitals.lcp.unit,
            status: mapCoreWebVitalStatus(lighthouse.coreWebVitals.lcp.status),
            threshold: 2.5,
          }
        : { value: 0, unit: 's', status: 'unknown', threshold: 2.5 },
      fid: lighthouse?.coreWebVitals.fid
        ? {
            value: lighthouse.coreWebVitals.fid.value,
            unit: lighthouse.coreWebVitals.fid.unit,
            status: mapCoreWebVitalStatus(lighthouse.coreWebVitals.fid.status),
            threshold: 100,
          }
        : { value: 0, unit: 'ms', status: 'unknown', threshold: 100 },
      cls: lighthouse?.coreWebVitals.cls
        ? {
            value: lighthouse.coreWebVitals.cls.value,
            unit: lighthouse.coreWebVitals.cls.unit,
            status: mapCoreWebVitalStatus(lighthouse.coreWebVitals.cls.status),
            threshold: 0.1,
          }
        : { value: 0, unit: '', status: 'unknown', threshold: 0.1 },
      fcp: lighthouse?.coreWebVitals.fcp
        ? {
            value: lighthouse.coreWebVitals.fcp.value,
            unit: lighthouse.coreWebVitals.fcp.unit,
            status: mapCoreWebVitalStatus(lighthouse.coreWebVitals.fcp.status),
            threshold: 1.8,
          }
        : { value: 0, unit: 's', status: 'unknown', threshold: 1.8 },
      ttfb: lighthouse?.coreWebVitals.ttfb
        ? {
            value: lighthouse.coreWebVitals.ttfb.value,
            unit: lighthouse.coreWebVitals.ttfb.unit,
            status: mapCoreWebVitalStatus(lighthouse.coreWebVitals.ttfb.status),
            threshold: 800,
          }
        : { value: 0, unit: 'ms', status: 'unknown', threshold: 800 },
    },
    lighthouse: {
      mobile: lighthouseData.mobile
        ? {
            performance: lighthouseData.mobile.scores.performance,
            accessibility: lighthouseData.mobile.scores.accessibility,
            bestPractices: lighthouseData.mobile.scores.bestPractices,
            seo: lighthouseData.mobile.scores.seo,
          }
        : null,
      desktop: lighthouseData.desktop
        ? {
            performance: lighthouseData.desktop.scores.performance,
            accessibility: lighthouseData.desktop.scores.accessibility,
            bestPractices: lighthouseData.desktop.scores.bestPractices,
            seo: lighthouseData.desktop.scores.seo,
          }
        : null,
      lastAudit: getDateString(),
    },
    dataSource: {
      provider: 'Ahrefs + PageSpeed Insights',
      lastUpdated: getDateString(),
      cacheAge: null,
    },
  };

  // Cache the results
  await setCached(cacheKey, metrics, CACHE_TTL_MS);

  return metrics;
}

export async function clearClientMetricsCache(website: string): Promise<void> {
  const cacheKey = `metrics-${website.replace(/[^a-z0-9]/gi, '-')}`;
  await clearCache(cacheKey);
}

// Re-export types and utilities
export type { AhrefsMetrics, AhrefsKeyword, TrafficHistoryEntry, ReferringDomain, OrganicCompetitor, TopPage, BrokenBacklink, AnchorText } from './ahrefs';
export type { LighthouseMetrics, LighthouseScores, CoreWebVitals } from './lighthouse';
export { formatTrafficValue } from './ahrefs';
export { formatCacheAge } from '../cache';
