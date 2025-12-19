// Ahrefs API Response Types

export interface DomainRatingResponse {
  domain_rating: number;
  ahrefs_rank: number | null;
}

export interface SiteMetricsResponse {
  org_keywords: number;
  paid_keywords: number;
  org_keywords_1_3: number;
  org_traffic: number;
  org_cost: number | null; // USD cents
  paid_traffic: number;
  paid_cost: number | null; // USD cents
  paid_pages: number;
}

export interface OrganicKeyword {
  keyword: string;
  best_position: number | null;
  best_position_url: string | null;
  volume: number | null;
  keyword_difficulty: number | null;
  sum_traffic: number | null;
  cpc: number | null; // USD cents
  is_branded: boolean;
  is_local: boolean;
  is_commercial: boolean;
  is_informational: boolean;
  is_transactional: boolean;
}

export interface BacklinksStatsResponse {
  live: number;
  all_time: number;
  live_refdomains: number;
  all_time_refdomains: number;
}

export interface ReferringDomain {
  domain: string;
  domain_rating: number;
  links_to_target: number;
  first_seen: string;
  dofollow_links: number;
  traffic_domain: number;
}

export interface MetricsHistoryEntry {
  date: string;
  org_traffic: number;
  org_cost: number;
  paid_traffic: number;
  paid_cost: number;
}

export interface DomainRatingHistoryEntry {
  date: string;
  domain_rating: number;
  ahrefs_rank: number | null;
}

export interface OrganicCompetitor {
  domain: string;
  domain_rating: number;
  org_keywords: number;
  org_traffic: number;
  common_keywords: number;
}

export interface BrokenBacklink {
  url_from: string;
  url_to: string;
  anchor: string;
  domain_rating: number;
  first_seen: string;
  http_code: number;
}

export interface TopPage {
  url: string;
  sum_traffic: number;
  keywords: number;
  top_keyword: string | null;
  best_position: number | null;
}

export interface AnchorTextData {
  anchor: string;
  refdomains: number;
  dofollow_links: number;
  domain_rating: number;
}

// Lighthouse types
export interface LighthouseResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  device: 'mobile' | 'desktop';
  coreWebVitals?: {
    lcp: { value: number; unit: string };
    fid: { value: number; unit: string };
    cls: { value: number; unit: string };
    fcp: { value: number; unit: string };
    ttfb: { value: number; unit: string };
  };
}

// Collection result types
export interface CollectedMetrics {
  domainRating: DomainRatingResponse;
  siteMetrics: SiteMetricsResponse;
  keywords: OrganicKeyword[];
  backlinksStats: BacklinksStatsResponse;
  referringDomains: ReferringDomain[];
  metricsHistory: MetricsHistoryEntry[];
  drHistory: DomainRatingHistoryEntry[];
  competitors: OrganicCompetitor[];
  brokenBacklinks: BrokenBacklink[];
  topPages: TopPage[];
  anchorText: AnchorTextData[];
  lighthouse: LighthouseResult | null;
}

// Client metrics JSON structure (target format)
export interface ClientMetrics {
  client: {
    name: string;
    reportDate: string;
    website: string;
    ahrefsProjectId: number | null;
  };
  overview: {
    domainRating: number;
    ahrefsRank: number | null;
    organicKeywords: number;
    organicTraffic: number;
    trackedKeywords: number | null;
    status: string;
    performanceScore: number;
    seoScore: number;
  };
  keywords: {
    total: number;
    tracked: number | null;
    topPositions: number;
    top3Rankings: number;
    avgPosition: number | null;
    ranking: KeywordRanking[];
    targetKeywords: TargetKeyword[];
  };
  traffic: {
    monthly: number;
    organicValue: number;
    trend: number[];
    trendLabels: string[];
    growthRate: string;
    sources: {
      organic: number;
      direct: number | null;
      referral: number | null;
      social: number | null;
    };
    topPages: TopPageEntry[];
    targets: {
      month1: string;
      month3: string;
      month6: string;
    };
  };
  domainRatingHistory: {
    trend: number[];
    trendLabels: string[];
    growth: string;
    note: string;
  };
  anchorText: {
    distribution: AnchorDistribution[];
    analysis: string;
  };
  brokenBacklinks: {
    count: number;
    opportunities: BrokenBacklinkOpportunity[];
    note: string;
  };
  backlinks: {
    total: number;
    allTime: number;
    domainRating: number;
    referringDomains: number;
    allTimeReferringDomains: number;
    topReferringDomains: TopReferringDomain[];
    targets: {
      month1: string;
      month3: string;
      month6: string;
      drTarget: string;
    };
    targetDirectories: TargetDirectory[];
  };
  paidSearch: {
    keywords: number;
    traffic: number;
    cost: number;
  };
  technicalSeo: {
    issues: {
      total: number;
      critical: number;
      warnings: number;
      notices: number;
    };
    checklist: TechnicalChecklist[];
    platformNote: string;
  };
  coreWebVitals: {
    lcp: WebVitalMetric;
    fid: WebVitalMetric;
    cls: WebVitalMetric;
    fcp: WebVitalMetric;
    ttfb: WebVitalMetric;
  };
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    device: string;
    lastAudit: string;
  };
  competitors: {
    organic: CompetitorEntry[];
    analysis: string;
    advantages: string[];
  };
  strategy: {
    phase: string;
    priorities: string[];
    contentPlan: {
      newPages: ContentPage[];
      blogPosts: number;
      targetWordCount: string;
    };
    successMetrics: {
      month1: SuccessMetric;
      month3: SuccessMetric;
      month6: SuccessMetric;
    };
  };
  dataSource: {
    provider: string;
    lastUpdated: string;
    projectId: number | null;
  };
}

// Supporting types for ClientMetrics
export interface KeywordRanking {
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
  traffic: number;
  priority: string;
}

export interface TargetKeyword {
  keyword: string;
  volume: number;
  difficulty: number;
  priority: string;
}

export interface TopPageEntry {
  url: string;
  traffic: number;
  keywords: number;
  topKeyword: string;
  position: number;
}

export interface AnchorDistribution {
  anchor: string;
  refdomains: number;
  dofollowLinks: number;
  topDR: number;
}

export interface BrokenBacklinkOpportunity {
  sourceUrl: string;
  sourceDR: number;
  targetUrl: string;
  anchor: string;
}

export interface TopReferringDomain {
  domain: string;
  dr: number;
  links: number;
  firstSeen: string;
}

export interface TargetDirectory {
  name: string;
  tier: string;
  priority: string;
  type: string;
}

export interface TechnicalChecklist {
  task: string;
  status: string;
  priority: string;
}

export interface WebVitalMetric {
  value: number | null;
  unit: string;
  status: 'pass' | 'fail' | 'unknown';
  threshold: number;
}

export interface CompetitorEntry {
  domain: string;
  dr: number;
  keywords: number;
  commonKeywords: number;
  traffic: number;
  share: number;
  type: string;
}

export interface ContentPage {
  topic: string;
  targetKeywords: string[];
  wordCount: number;
  status: string;
}

export interface SuccessMetric {
  goal: string;
  drTarget: number;
  trafficTarget: number;
  referringDomainsTarget: number;
}

// Client configuration type
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
    trackedKeywords?: number;
    paidKeywords: number;
    paidTraffic: number;
  };
}
