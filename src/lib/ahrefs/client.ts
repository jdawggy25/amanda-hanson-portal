/**
 * Ahrefs API Client (DEPRECATED)
 *
 * Direct API calls are no longer used. SEO metrics are now collected
 * via MCP (Model Context Protocol) tools through Claude Code:
 *
 * - mcp__ahrefs__* tools for Ahrefs data
 * - mcp__lighthouse__* tools for performance audits
 *
 * Workflow:
 * 1. Ask Claude to collect metrics using MCP tools
 * 2. Claude saves data to src/data/{client}-metrics.json
 * 3. Run: npx tsx scripts/seo-automation/generate-reports.ts 2025-12
 *
 * The helper functions below are kept for compatibility but will throw
 * errors if called directly.
 */

/**
 * Format date for Ahrefs API (YYYY-MM-DD)
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get date from N months ago
 */
export function getDateMonthsAgo(months: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return formatDate(date);
}

// All direct API functions are deprecated
const DEPRECATION_MSG = `
Direct Ahrefs API calls are deprecated.
Use Claude Code with MCP tools instead:
  - mcp__ahrefs__batch-analysis-batch-analysis
  - mcp__ahrefs__site-explorer-organic-keywords
  - mcp__ahrefs__site-explorer-refdomains
  - mcp__lighthouse__run_audit

Data is collected interactively and saved to src/data/*.json
`;

function deprecatedApiCall(name: string): never {
  throw new Error(`${name}() is deprecated. ${DEPRECATION_MSG}`);
}

export function fetchDomainRating(): never {
  return deprecatedApiCall('fetchDomainRating');
}

export function fetchSiteMetrics(): never {
  return deprecatedApiCall('fetchSiteMetrics');
}

export function fetchOrganicKeywords(): never {
  return deprecatedApiCall('fetchOrganicKeywords');
}

export function fetchBacklinksStats(): never {
  return deprecatedApiCall('fetchBacklinksStats');
}

export function fetchReferringDomains(): never {
  return deprecatedApiCall('fetchReferringDomains');
}

export function fetchMetricsHistory(): never {
  return deprecatedApiCall('fetchMetricsHistory');
}

export function fetchDomainRatingHistory(): never {
  return deprecatedApiCall('fetchDomainRatingHistory');
}

export function fetchOrganicCompetitors(): never {
  return deprecatedApiCall('fetchOrganicCompetitors');
}

export function fetchBrokenBacklinks(): never {
  return deprecatedApiCall('fetchBrokenBacklinks');
}

export function fetchTopPages(): never {
  return deprecatedApiCall('fetchTopPages');
}

export function fetchAnchorText(): never {
  return deprecatedApiCall('fetchAnchorText');
}
