// Ahrefs API v3 client for fetching SEO metrics

const AHREFS_API_BASE = 'https://api.ahrefs.com/v3';

// Types for API responses
export interface AhrefsKeyword {
  keyword: string;
  position: number;
  volume: number;
  traffic: number;
  difficulty: number | null;
  url: string;
}

export interface TrafficHistoryEntry {
  date: string;
  traffic: number;
  value: number; // in USD cents
}

export interface ReferringDomain {
  domain: string;
  domainRating: number;
  links: number;
  traffic: number;
  firstSeen: string;
}

export interface OrganicCompetitor {
  domain: string;
  commonKeywords: number;
  traffic: number;
  domainRating: number;
}

export interface TopPage {
  url: string;
  traffic: number;
  keywords: number;
  topKeyword: string;
  position: number | null;
}

export interface BrokenBacklink {
  urlFrom: string;
  urlTo: string;
  anchor: string;
  domainRating: number;
  firstSeen: string;
}

export interface AnchorText {
  anchor: string;
  referringDomains: number;
  dofollowLinks: number;
}

export interface AhrefsMetrics {
  domainRating: number;
  ahrefsRank: number | null;
  organicKeywords: number;
  organicTraffic: number;
  organicTrafficValue: number; // in USD cents
  referringDomains: number;
  backlinks: {
    total: number;
    dofollow: number;
    nofollow: number;
  };
  keywords: AhrefsKeyword[];
  trafficHistory: TrafficHistoryEntry[];
  trafficTrend: number[]; // 12-month array for charts
  topReferringDomains: ReferringDomain[];
  competitors: OrganicCompetitor[];
  topPages: TopPage[];
  brokenBacklinks: BrokenBacklink[];
  anchorTexts: AnchorText[];
}

function getApiToken(): string {
  const token = import.meta.env.AHREFS_API_TOKEN || process.env.AHREFS_API_TOKEN;
  if (!token) {
    throw new Error('AHREFS_API_TOKEN environment variable is required');
  }
  return token;
}

async function ahrefsFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${AHREFS_API_BASE}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getApiToken()}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ahrefs API error: ${response.status} ${response.statusText} - ${text}`);
  }

  return response.json();
}

function getDateString(daysAgo: number = 3): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

function getDateMonthsAgo(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date.toISOString().split('T')[0];
}

/**
 * Fetch domain rating and Ahrefs rank
 */
export async function fetchDomainRating(
  domain: string
): Promise<{ domainRating: number; ahrefsRank: number | null }> {
  try {
    const data = await ahrefsFetch<{ domain_rating: number; ahrefs_rank: number | null }>(
      '/site-explorer/domain-rating',
      {
        target: domain,
        date: getDateString(),
        output: 'json',
      }
    );

    return {
      domainRating: Math.round(data.domain_rating),
      ahrefsRank: data.ahrefs_rank,
    };
  } catch (error) {
    console.error('Failed to fetch domain rating:', error);
    return { domainRating: 0, ahrefsRank: null };
  }
}

/**
 * Fetch site metrics (keywords, traffic, value)
 */
export async function fetchSiteMetrics(
  domain: string,
  country: string = 'us'
): Promise<{
  organicKeywords: number;
  organicTraffic: number;
  organicTrafficValue: number;
}> {
  try {
    const data = await ahrefsFetch<{
      org_keywords: number;
      org_traffic: number;
      org_cost: number | null;
    }>('/site-explorer/metrics', {
      target: domain,
      date: getDateString(),
      country,
      mode: 'subdomains',
      output: 'json',
    });

    return {
      organicKeywords: data.org_keywords,
      organicTraffic: data.org_traffic,
      organicTrafficValue: data.org_cost || 0,
    };
  } catch (error) {
    console.error('Failed to fetch site metrics:', error);
    return { organicKeywords: 0, organicTraffic: 0, organicTrafficValue: 0 };
  }
}

/**
 * Fetch backlinks statistics
 */
export async function fetchBacklinksStats(domain: string): Promise<{
  total: number;
  dofollow: number;
  nofollow: number;
  referringDomains: number;
}> {
  try {
    const data = await ahrefsFetch<{
      live: number;
      live_refdomains: number;
      all_time: number;
      dofollow: number;
    }>('/site-explorer/backlinks-stats', {
      target: domain,
      date: getDateString(),
      mode: 'subdomains',
      output: 'json',
    });

    return {
      total: data.live || 0,
      dofollow: data.dofollow || 0,
      nofollow: (data.live || 0) - (data.dofollow || 0),
      referringDomains: data.live_refdomains || 0,
    };
  } catch (error) {
    console.error('Failed to fetch backlinks stats:', error);
    return { total: 0, dofollow: 0, nofollow: 0, referringDomains: 0 };
  }
}

/**
 * Fetch top ranking keywords
 */
export async function fetchTopKeywords(
  domain: string,
  country: string = 'us',
  limit: number = 20
): Promise<AhrefsKeyword[]> {
  try {
    const data = await ahrefsFetch<{
      keywords: Array<{
        keyword: string;
        best_position: number;
        volume: number;
        sum_traffic: number;
        keyword_difficulty: number | null;
        best_position_url: string;
      }>;
    }>('/site-explorer/organic-keywords', {
      target: domain,
      date: getDateString(),
      country,
      mode: 'subdomains',
      limit: limit.toString(),
      select: 'keyword,best_position,volume,sum_traffic,keyword_difficulty,best_position_url',
      order_by: 'sum_traffic:desc',
      output: 'json',
    });

    return (data.keywords || []).map((kw) => ({
      keyword: kw.keyword,
      position: kw.best_position,
      volume: kw.volume || 0,
      traffic: kw.sum_traffic || 0,
      difficulty: kw.keyword_difficulty,
      url: kw.best_position_url || '',
    }));
  } catch (error) {
    console.error('Failed to fetch top keywords:', error);
    return [];
  }
}

/**
 * Fetch 12-month traffic history
 */
export async function fetchMetricsHistory(
  domain: string,
  country: string = 'us'
): Promise<{ history: TrafficHistoryEntry[]; trend: number[] }> {
  try {
    const data = await ahrefsFetch<{
      metrics: Array<{
        date: string;
        org_traffic: number;
        org_cost: number | null;
      }>;
    }>('/site-explorer/metrics-history', {
      target: domain,
      date_from: getDateMonthsAgo(12),
      country,
      history_grouping: 'monthly',
      select: 'date,org_traffic,org_cost',
      mode: 'subdomains',
      output: 'json',
    });

    const history = (data.metrics || []).map((entry) => ({
      date: entry.date,
      traffic: entry.org_traffic || 0,
      value: entry.org_cost || 0,
    }));

    // Extract just traffic numbers for trend chart (last 12 months)
    const trend = history.slice(-12).map((h) => h.traffic);

    return { history, trend };
  } catch (error) {
    console.error('Failed to fetch metrics history:', error);
    return { history: [], trend: [] };
  }
}

/**
 * Fetch top referring domains
 */
export async function fetchReferringDomains(
  domain: string,
  limit: number = 15
): Promise<ReferringDomain[]> {
  try {
    const data = await ahrefsFetch<{
      refdomains: Array<{
        domain: string;
        domain_rating: number;
        links_to_target: number;
        traffic_domain: number;
        first_seen: string;
      }>;
    }>('/site-explorer/refdomains', {
      target: domain,
      select: 'domain,domain_rating,links_to_target,traffic_domain,first_seen',
      limit: limit.toString(),
      order_by: 'domain_rating:desc',
      mode: 'subdomains',
      history: 'live',
      output: 'json',
    });

    return (data.refdomains || []).map((rd) => ({
      domain: rd.domain,
      domainRating: Math.round(rd.domain_rating || 0),
      links: rd.links_to_target || 0,
      traffic: rd.traffic_domain || 0,
      firstSeen: rd.first_seen || '',
    }));
  } catch (error) {
    console.error('Failed to fetch referring domains:', error);
    return [];
  }
}

/**
 * Fetch organic competitors
 */
export async function fetchOrganicCompetitors(
  domain: string,
  country: string = 'us',
  limit: number = 10
): Promise<OrganicCompetitor[]> {
  try {
    const data = await ahrefsFetch<{
      competitors: Array<{
        competitor_domain: string;
        keywords_common: number;
        traffic: number;
        domain_rating: number;
      }>;
    }>('/site-explorer/organic-competitors', {
      target: domain,
      date: getDateString(),
      country,
      select: 'competitor_domain,keywords_common,traffic,domain_rating',
      limit: limit.toString(),
      order_by: 'keywords_common:desc',
      mode: 'subdomains',
      output: 'json',
    });

    return (data.competitors || []).map((comp) => ({
      domain: comp.competitor_domain,
      commonKeywords: comp.keywords_common || 0,
      traffic: comp.traffic || 0,
      domainRating: Math.round(comp.domain_rating || 0),
    }));
  } catch (error) {
    console.error('Failed to fetch organic competitors:', error);
    return [];
  }
}

/**
 * Fetch top pages by traffic
 */
export async function fetchTopPages(
  domain: string,
  country: string = 'us',
  limit: number = 10
): Promise<TopPage[]> {
  try {
    const data = await ahrefsFetch<{
      pages: Array<{
        url: string;
        sum_traffic: number;
        keywords: number;
        top_keyword: string;
        top_keyword_best_position: number | null;
      }>;
    }>('/site-explorer/top-pages', {
      target: domain,
      date: getDateString(),
      country,
      select: 'url,sum_traffic,keywords,top_keyword,top_keyword_best_position',
      limit: limit.toString(),
      order_by: 'sum_traffic:desc',
      mode: 'subdomains',
      output: 'json',
    });

    return (data.pages || []).map((page) => ({
      url: page.url,
      traffic: page.sum_traffic || 0,
      keywords: page.keywords || 0,
      topKeyword: page.top_keyword || '',
      position: page.top_keyword_best_position,
    }));
  } catch (error) {
    console.error('Failed to fetch top pages:', error);
    return [];
  }
}

/**
 * Fetch broken backlinks
 */
export async function fetchBrokenBacklinks(domain: string, limit: number = 10): Promise<BrokenBacklink[]> {
  try {
    const data = await ahrefsFetch<{
      backlinks: Array<{
        url_from: string;
        url_to: string;
        anchor: string;
        domain_rating_source: number;
        first_seen: string;
      }>;
    }>('/site-explorer/broken-backlinks', {
      target: domain,
      select: 'url_from,url_to,anchor,domain_rating_source,first_seen',
      limit: limit.toString(),
      order_by: 'domain_rating_source:desc',
      mode: 'subdomains',
      output: 'json',
    });

    return (data.backlinks || []).map((bl) => ({
      urlFrom: bl.url_from,
      urlTo: bl.url_to,
      anchor: bl.anchor || '',
      domainRating: Math.round(bl.domain_rating_source || 0),
      firstSeen: bl.first_seen || '',
    }));
  } catch (error) {
    console.error('Failed to fetch broken backlinks:', error);
    return [];
  }
}

/**
 * Fetch anchor text distribution
 */
export async function fetchAnchorTexts(domain: string, limit: number = 15): Promise<AnchorText[]> {
  try {
    const data = await ahrefsFetch<{
      anchors: Array<{
        anchor: string;
        refdomains: number;
        dofollow_links: number;
      }>;
    }>('/site-explorer/anchors', {
      target: domain,
      select: 'anchor,refdomains,dofollow_links',
      limit: limit.toString(),
      order_by: 'refdomains:desc',
      mode: 'subdomains',
      output: 'json',
    });

    return (data.anchors || []).map((a) => ({
      anchor: a.anchor || '(empty)',
      referringDomains: a.refdomains || 0,
      dofollowLinks: a.dofollow_links || 0,
    }));
  } catch (error) {
    console.error('Failed to fetch anchor texts:', error);
    return [];
  }
}

/**
 * Fetch all Ahrefs metrics in parallel
 */
export async function fetchAllAhrefsMetrics(
  domain: string,
  country: string = 'us'
): Promise<AhrefsMetrics> {
  // Fetch all metrics in parallel for speed
  const [
    domainRatingData,
    siteMetricsData,
    backlinksData,
    keywordsData,
    historyData,
    referringDomainsData,
    competitorsData,
    topPagesData,
    brokenBacklinksData,
    anchorTextsData,
  ] = await Promise.all([
    fetchDomainRating(domain),
    fetchSiteMetrics(domain, country),
    fetchBacklinksStats(domain),
    fetchTopKeywords(domain, country),
    fetchMetricsHistory(domain, country),
    fetchReferringDomains(domain),
    fetchOrganicCompetitors(domain, country),
    fetchTopPages(domain, country),
    fetchBrokenBacklinks(domain),
    fetchAnchorTexts(domain),
  ]);

  return {
    domainRating: domainRatingData.domainRating,
    ahrefsRank: domainRatingData.ahrefsRank,
    organicKeywords: siteMetricsData.organicKeywords,
    organicTraffic: siteMetricsData.organicTraffic,
    organicTrafficValue: siteMetricsData.organicTrafficValue,
    referringDomains: backlinksData.referringDomains,
    backlinks: {
      total: backlinksData.total,
      dofollow: backlinksData.dofollow,
      nofollow: backlinksData.nofollow,
    },
    keywords: keywordsData,
    trafficHistory: historyData.history,
    trafficTrend: historyData.trend,
    topReferringDomains: referringDomainsData,
    competitors: competitorsData,
    topPages: topPagesData,
    brokenBacklinks: brokenBacklinksData,
    anchorTexts: anchorTextsData,
  };
}

/**
 * Format traffic value from cents to display string
 */
export function formatTrafficValue(cents: number): string {
  if (cents === 0) return 'N/A';
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
