/**
 * Transform Ahrefs API responses to match existing metrics JSON structure
 */

import type {
  CollectedMetrics,
  ClientMetrics,
  ClientConfig,
  KeywordRanking,
  TopPageEntry,
  AnchorDistribution,
  BrokenBacklinkOpportunity,
  TopReferringDomain,
  CompetitorEntry,
  WebVitalMetric,
} from './types';

/**
 * Format month name from date
 */
function getMonthName(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short' });
}

/**
 * Format full month name
 */
function getFullMonthName(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Calculate growth rate percentage
 */
function calcGrowthRate(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? '+∞%' : '0%';
  const rate = ((current - previous) / previous) * 100;
  const sign = rate >= 0 ? '+' : '';
  return `${sign}${Math.round(rate)}%`;
}

/**
 * Determine status based on metrics
 */
function determineStatus(metrics: CollectedMetrics): string {
  const traffic = metrics.siteMetrics.org_traffic;
  const dr = metrics.domainRating.domain_rating;

  if (traffic === 0) return 'Pre-ranking phase';
  if (traffic < 50) return 'Early Growth';
  if (traffic < 200) return 'Building Momentum';
  if (traffic < 500) return 'Established';
  if (dr < 30) return 'Growing Authority';
  if (dr < 50) return 'Strong Authority';
  return 'Market Leader';
}

/**
 * Assign priority based on keyword characteristics
 */
function assignKeywordPriority(keyword: {
  keyword: string;
  volume: number | null;
  is_branded: boolean;
  is_local: boolean;
}): string {
  if (keyword.is_branded) return 'Branded';
  if (keyword.is_local) return 'Local - HIGH';

  const volume = keyword.volume || 0;
  if (volume >= 1000) return 'HIGH';
  if (volume >= 500) return 'MEDIUM';
  if (volume >= 100) return 'LOW';
  return 'Long-tail';
}

/**
 * Convert cents to dollars
 */
function centsToDollars(cents: number | null): number {
  if (cents === null) return 0;
  return cents / 100;
}

/**
 * Create web vital metric object
 */
function createWebVitalMetric(
  value: number | null,
  unit: string,
  threshold: number,
  higherIsBetter = false
): WebVitalMetric {
  let status: 'pass' | 'fail' | 'unknown' = 'unknown';
  if (value !== null) {
    if (higherIsBetter) {
      status = value >= threshold ? 'pass' : 'fail';
    } else {
      status = value <= threshold ? 'pass' : 'fail';
    }
  }
  return { value, unit, status, threshold };
}

/**
 * Transform collected metrics to client metrics JSON format
 */
export function transformToClientMetrics(
  client: ClientConfig,
  metrics: CollectedMetrics,
  reportDate: string
): ClientMetrics {
  const today = new Date().toISOString().split('T')[0];

  // Extract trends from history
  const trafficTrend = metrics.metricsHistory.map(h => h.org_traffic);
  const trafficLabels = metrics.metricsHistory.map(h => getMonthName(h.date));
  const drTrend = metrics.drHistory.map(h => Math.round(h.domain_rating));
  const drLabels = metrics.drHistory.map(h => getMonthName(h.date));

  // Calculate growth rates
  const trafficGrowth = trafficTrend.length >= 2
    ? calcGrowthRate(trafficTrend[trafficTrend.length - 1], trafficTrend[0])
    : 'N/A';
  const drGrowth = drTrend.length >= 2
    ? calcGrowthRate(drTrend[drTrend.length - 1], drTrend[0])
    : 'N/A';

  // Transform keywords
  const keywordRankings: KeywordRanking[] = metrics.keywords
    .filter(k => k.best_position !== null && k.best_position <= 100)
    .slice(0, 15)
    .map(k => ({
      keyword: k.keyword,
      position: k.best_position!,
      volume: k.volume || 0,
      difficulty: k.keyword_difficulty || 0,
      traffic: k.sum_traffic || 0,
      priority: assignKeywordPriority(k),
    }));

  // Count top positions
  const top3 = keywordRankings.filter(k => k.position <= 3).length;
  const top10 = keywordRankings.filter(k => k.position <= 10).length;

  // Transform top pages
  const topPages: TopPageEntry[] = metrics.topPages.map(p => ({
    url: p.url.replace(`https://${client.website}`, '').replace(`http://${client.website}`, '') || '/',
    traffic: p.sum_traffic,
    keywords: p.keywords,
    topKeyword: p.top_keyword || '',
    position: p.best_position || 0,
  }));

  // Transform anchor text
  const anchorDistribution: AnchorDistribution[] = metrics.anchorText.map(a => ({
    anchor: a.anchor || '(empty/image)',
    refdomains: a.refdomains,
    dofollowLinks: a.dofollow_links,
    topDR: Math.round(a.domain_rating),
  }));

  // Transform broken backlinks
  const brokenOpportunities: BrokenBacklinkOpportunity[] = metrics.brokenBacklinks.map(b => ({
    sourceUrl: b.url_from,
    sourceDR: Math.round(b.domain_rating),
    targetUrl: b.url_to.replace(`https://${client.website}`, '').replace(`http://${client.website}`, ''),
    anchor: b.anchor,
  }));

  // Transform referring domains
  const topReferringDomains: TopReferringDomain[] = metrics.referringDomains.map(r => ({
    domain: r.domain,
    dr: Math.round(r.domain_rating),
    links: r.links_to_target,
    firstSeen: r.first_seen.split('T')[0].substring(0, 7), // YYYY-MM
  }));

  // Transform competitors
  const organicCompetitors: CompetitorEntry[] = metrics.competitors.map(c => ({
    domain: c.domain,
    dr: Math.round(c.domain_rating),
    keywords: c.org_keywords,
    commonKeywords: c.common_keywords,
    traffic: c.org_traffic,
    share: c.org_traffic > 0 && metrics.siteMetrics.org_traffic > 0
      ? Math.round((metrics.siteMetrics.org_traffic / c.org_traffic) * 100) / 10
      : 0,
    type: c.domain_rating > 80 ? 'Directory' : c.common_keywords > 10 ? 'Primary' : 'Secondary',
  }));

  // Lighthouse / Core Web Vitals
  const lighthouse = metrics.lighthouse;
  const coreWebVitals = lighthouse?.coreWebVitals ? {
    lcp: createWebVitalMetric(lighthouse.coreWebVitals.lcp.value, 's', 2.5),
    fid: createWebVitalMetric(lighthouse.coreWebVitals.fid.value, 'ms', 100),
    cls: createWebVitalMetric(lighthouse.coreWebVitals.cls.value, '', 0.1),
    fcp: createWebVitalMetric(lighthouse.coreWebVitals.fcp.value, 's', 1.8),
    ttfb: createWebVitalMetric(lighthouse.coreWebVitals.ttfb.value, 's', 0.8),
  } : {
    lcp: createWebVitalMetric(null, 's', 2.5),
    fid: createWebVitalMetric(null, 'ms', 100),
    cls: createWebVitalMetric(null, '', 0.1),
    fcp: createWebVitalMetric(null, 's', 1.8),
    ttfb: createWebVitalMetric(null, 's', 0.8),
  };

  return {
    client: {
      name: client.name,
      reportDate: getFullMonthName(reportDate),
      website: client.website,
      ahrefsProjectId: null,
    },
    overview: {
      domainRating: Math.round(metrics.domainRating.domain_rating),
      ahrefsRank: metrics.domainRating.ahrefs_rank,
      organicKeywords: metrics.siteMetrics.org_keywords,
      organicTraffic: metrics.siteMetrics.org_traffic,
      trackedKeywords: null,
      status: determineStatus(metrics),
      performanceScore: lighthouse?.performance || 0,
      seoScore: lighthouse?.seo || 0,
    },
    keywords: {
      total: metrics.siteMetrics.org_keywords,
      tracked: null,
      topPositions: top10,
      top3Rankings: top3,
      avgPosition: null,
      ranking: keywordRankings,
      targetKeywords: [], // Preserved from previous or manually added
    },
    traffic: {
      monthly: metrics.siteMetrics.org_traffic,
      organicValue: centsToDollars(metrics.siteMetrics.org_cost),
      trend: trafficTrend,
      trendLabels: trafficLabels,
      growthRate: trafficGrowth,
      sources: {
        organic: metrics.siteMetrics.org_traffic,
        direct: null,
        referral: null,
        social: null,
      },
      topPages,
      targets: {
        month1: `${Math.round(metrics.siteMetrics.org_traffic * 1.5)} monthly visits`,
        month3: `${Math.round(metrics.siteMetrics.org_traffic * 3)} monthly visits`,
        month6: `${Math.round(metrics.siteMetrics.org_traffic * 5)} monthly visits`,
      },
    },
    domainRatingHistory: {
      trend: drTrend,
      trendLabels: drLabels,
      growth: drGrowth,
      note: '',
    },
    anchorText: {
      distribution: anchorDistribution,
      analysis: '',
    },
    brokenBacklinks: {
      count: metrics.brokenBacklinks.length,
      opportunities: brokenOpportunities,
      note: brokenOpportunities.length > 0
        ? `${brokenOpportunities.length} broken backlinks found - opportunity to reclaim`
        : 'No broken backlinks found',
    },
    backlinks: {
      total: metrics.backlinksStats.live,
      allTime: metrics.backlinksStats.all_time,
      domainRating: Math.round(metrics.domainRating.domain_rating),
      referringDomains: metrics.backlinksStats.live_refdomains,
      allTimeReferringDomains: metrics.backlinksStats.all_time_refdomains,
      topReferringDomains,
      targets: {
        month1: `${Math.round(metrics.backlinksStats.live_refdomains * 1.1)} referring domains`,
        month3: `${Math.round(metrics.backlinksStats.live_refdomains * 1.3)} referring domains`,
        month6: `${Math.round(metrics.backlinksStats.live_refdomains * 1.6)} referring domains`,
        drTarget: `${Math.round(metrics.domainRating.domain_rating * 1.5)}+ by month 6`,
      },
      targetDirectories: [], // Preserved from previous
    },
    paidSearch: {
      keywords: metrics.siteMetrics.paid_keywords,
      traffic: metrics.siteMetrics.paid_traffic,
      cost: centsToDollars(metrics.siteMetrics.paid_cost),
    },
    technicalSeo: {
      issues: {
        total: 0,
        critical: 0,
        warnings: 0,
        notices: 0,
      },
      checklist: [], // Preserved from previous
      platformNote: '',
    },
    coreWebVitals,
    lighthouse: {
      performance: lighthouse?.performance || 0,
      accessibility: lighthouse?.accessibility || 0,
      bestPractices: lighthouse?.bestPractices || 0,
      seo: lighthouse?.seo || 0,
      device: lighthouse?.device || 'mobile',
      lastAudit: today,
    },
    competitors: {
      organic: organicCompetitors,
      analysis: '',
      advantages: [], // Preserved from previous
    },
    strategy: {
      phase: determineStatus(metrics),
      priorities: [], // Preserved from previous
      contentPlan: {
        newPages: [],
        blogPosts: 0,
        targetWordCount: '',
      },
      successMetrics: {
        month1: {
          goal: '',
          drTarget: Math.round(metrics.domainRating.domain_rating * 1.1),
          trafficTarget: Math.round(metrics.siteMetrics.org_traffic * 1.5),
          referringDomainsTarget: Math.round(metrics.backlinksStats.live_refdomains * 1.1),
        },
        month3: {
          goal: '',
          drTarget: Math.round(metrics.domainRating.domain_rating * 1.3),
          trafficTarget: Math.round(metrics.siteMetrics.org_traffic * 3),
          referringDomainsTarget: Math.round(metrics.backlinksStats.live_refdomains * 1.3),
        },
        month6: {
          goal: '',
          drTarget: Math.round(metrics.domainRating.domain_rating * 1.5),
          trafficTarget: Math.round(metrics.siteMetrics.org_traffic * 5),
          referringDomainsTarget: Math.round(metrics.backlinksStats.live_refdomains * 1.6),
        },
      },
    },
    dataSource: {
      provider: 'Ahrefs',
      lastUpdated: today,
      projectId: null,
    },
  };
}

/**
 * Merge new metrics with existing data, preserving manual entries
 */
export function mergeWithExisting(
  newMetrics: ClientMetrics,
  existing: ClientMetrics | null
): ClientMetrics {
  if (!existing) return newMetrics;

  return {
    ...newMetrics,
    // Preserve manual entries
    keywords: {
      ...newMetrics.keywords,
      targetKeywords: existing.keywords.targetKeywords,
    },
    domainRatingHistory: {
      ...newMetrics.domainRatingHistory,
      note: existing.domainRatingHistory.note || newMetrics.domainRatingHistory.note,
    },
    anchorText: {
      ...newMetrics.anchorText,
      analysis: existing.anchorText.analysis || newMetrics.anchorText.analysis,
    },
    brokenBacklinks: {
      ...newMetrics.brokenBacklinks,
      note: existing.brokenBacklinks.note || newMetrics.brokenBacklinks.note,
    },
    backlinks: {
      ...newMetrics.backlinks,
      targetDirectories: existing.backlinks.targetDirectories,
    },
    technicalSeo: {
      ...existing.technicalSeo, // Preserve entire section
    },
    competitors: {
      ...newMetrics.competitors,
      analysis: existing.competitors.analysis || newMetrics.competitors.analysis,
      advantages: existing.competitors.advantages,
    },
    strategy: {
      ...newMetrics.strategy,
      priorities: existing.strategy.priorities,
      contentPlan: existing.strategy.contentPlan,
      successMetrics: {
        month1: {
          ...newMetrics.strategy.successMetrics.month1,
          goal: existing.strategy.successMetrics.month1.goal,
        },
        month3: {
          ...newMetrics.strategy.successMetrics.month3,
          goal: existing.strategy.successMetrics.month3.goal,
        },
        month6: {
          ...newMetrics.strategy.successMetrics.month6,
          goal: existing.strategy.successMetrics.month6.goal,
        },
      },
    },
  };
}

/**
 * Transform metrics to config snapshot format
 */
export function transformToConfigSnapshot(metrics: ClientMetrics): ClientConfig['seoMetrics'] {
  return {
    lastUpdated: metrics.dataSource.lastUpdated,
    domainRating: metrics.overview.domainRating,
    ahrefsRank: metrics.overview.ahrefsRank || 0,
    organicKeywords: metrics.overview.organicKeywords,
    organicTraffic: metrics.overview.organicTraffic,
    organicTrafficValue: `$${metrics.traffic.organicValue.toFixed(2)}`,
    liveBacklinks: metrics.backlinks.total,
    referringDomains: metrics.backlinks.referringDomains,
    trackedKeywords: metrics.keywords.tracked || undefined,
    paidKeywords: metrics.paidSearch.keywords,
    paidTraffic: metrics.paidSearch.traffic,
  };
}
