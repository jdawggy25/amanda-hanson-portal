/**
 * POST /admin/api/generate-reports
 *
 * Generates markdown reports from SEO metrics.
 * Commits the generated files to GitHub.
 */

import type { APIRoute } from 'astro';
import Handlebars from 'handlebars';
import clientsConfig from '../../../../clients.config.json';
import { commitFiles } from '../../../lib/storage/github';

// Import metrics data dynamically
async function loadMetrics(clientId: string): Promise<Record<string, unknown> | null> {
  try {
    // Dynamic import for metrics JSON
    const metricsModule = await import(`../../../data/${clientId}-metrics.json`);
    return metricsModule.default || metricsModule;
  } catch {
    return null;
  }
}

// Handlebars template (inline for serverless compatibility)
const TEMPLATE = `---
title: Performance Report - {{client.name}}
description: Monthly SEO metrics, rankings, and traffic analysis for {{monthDisplay}}
---

# Performance Report - {{monthDisplay}}

## Domain Authority Metrics

| Metric | Value |
|--------|-------|
| **Domain Rating (DR)** | {{overview.domainRating}} |
| **Ahrefs Rank** | {{formatNumber overview.ahrefsRank}} |
| **Live Backlinks** | {{formatNumber backlinks.liveBacklinks}} |
| **Referring Domains** | {{formatNumber backlinks.referringDomains}} |

## Organic Search Performance

| Metric | Value |
|--------|-------|
| **Organic Keywords ({{country}})** | {{formatNumber overview.organicKeywords}} |
| **Organic Traffic ({{country}})** | {{formatNumber overview.organicTraffic}}/month |
| **Traffic Value ({{country}})** | {{formatCurrency overview.organicTrafficValue}}/month |
{{#if keywords.positionDistribution}}
| **Top 10 Rankings** | {{keywords.positionDistribution.top10}} |
| **Top 3 Rankings** | {{keywords.positionDistribution.top3}} |
{{/if}}

{{#if paidSearch}}
## Paid Search Performance

| Metric | Value |
|--------|-------|
| **Paid Keywords** | {{paidSearch.paidKeywords}} |
| **Paid Traffic** | {{paidSearch.paidTraffic}}/month |
| **Paid Cost** | {{formatCurrency paidSearch.paidCost}}/month |
{{/if}}

{{#if keywords.topKeywords}}
## Current Keyword Rankings

### Top Performing Keywords

| Keyword | Position | Volume | Traffic | KD |
|---------|----------|--------|---------|-----|
{{#each keywords.topKeywords}}
| {{keyword}} | {{position}} | {{volume}} | {{traffic}} | {{keywordDifficulty}} |
{{/each}}
{{/if}}

{{#if traffic.topPages}}
## Top Performing Pages

| Page | Traffic | Keywords | Top Keyword | Position |
|------|---------|----------|-------------|----------|
{{#each traffic.topPages}}
| {{title}} | {{traffic}} | {{keywords}} | {{topKeyword}} | {{position}} |
{{/each}}
{{/if}}

{{#if backlinks.topReferrers}}
## Backlink Profile

### Top Referring Domains (by Domain Rating)

| Domain | Domain Rating | Links | First Seen |
|--------|---------------|-------|------------|
{{#each backlinks.topReferrers}}
| {{domain}} | {{domainRating}} | {{links}} | {{firstSeen}} |
{{/each}}

### Backlink Summary

- **Total Live Backlinks:** {{formatNumber backlinks.liveBacklinks}}
- **Total Referring Domains:** {{formatNumber backlinks.referringDomains}}
{{/if}}

{{#if lighthouse}}
## Technical SEO Health

### Lighthouse Scores

| Category | Score |
|----------|-------|
| Performance | {{lighthouse.performance}} |
| SEO | {{lighthouse.seo}} |
| Accessibility | {{lighthouse.accessibility}} |
| Best Practices | {{lighthouse.bestPractices}} |

*Audit Date: {{lighthouse.auditDate}} | Device: {{lighthouse.device}}*
{{/if}}

---

*Report Period: {{monthDisplay}}*
*Data Source: Ahrefs*
*Generated: {{generatedDate}}*
`;

// Register Handlebars helpers
function registerHelpers() {
  Handlebars.registerHelper('formatNumber', (value: number | string | null | undefined) => {
    if (value === null || value === undefined || value === 'N/A') return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return num.toLocaleString('en-US');
  });

  Handlebars.registerHelper('formatCurrency', (value: number | string | null | undefined) => {
    if (value === null || value === undefined || value === 'N/A') return 'N/A';
    if (typeof value === 'string' && value.startsWith('$')) return value;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  });

  Handlebars.registerHelper('inc', (value: number) => value + 1);
}

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function formatMonthDisplay(month: string): string {
  const [year, monthNum] = month.split('-');
  const date = new Date(parseInt(year), parseInt(monthNum) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  // Check authentication using Supabase Auth
  const { checkAuth } = await import('../../../lib/auth/supabase-auth');
  const auth = await checkAuth(cookies);

  if (!auth.authenticated || !auth.authorized) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { clientId } = body;
    const month = getCurrentMonth();

    // Register Handlebars helpers
    registerHelpers();
    const template = Handlebars.compile(TEMPLATE);

    // Get clients to process
    const clients = clientsConfig.clients.filter(c =>
      c.enabled && (!clientId || c.id === clientId)
    );

    const files: Array<{ path: string; content: string; message: string }> = [];
    const errors: string[] = [];

    for (const client of clients) {
      try {
        // Load metrics
        const metrics = await loadMetrics(client.id);
        if (!metrics) {
          errors.push(`${client.id}: Metrics not found`);
          continue;
        }

        // Build context
        const context = {
          ...metrics,
          month,
          monthDisplay: formatMonthDisplay(month),
          country: 'US',
          generatedDate: new Date().toISOString().split('T')[0],
        };

        // Generate markdown
        const content = template(context);

        // Add to files list
        files.push({
          path: `src/content/docs/${client.id}/reports/${month}-report.md`,
          content,
          message: `Update ${month} report for ${client.name}`,
        });
      } catch (error) {
        errors.push(`${client.id}: ${(error as Error).message}`);
      }
    }

    if (files.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No reports generated',
        errors,
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Commit to GitHub
    const commitResult = await commitFiles(
      files,
      `Generate ${month} SEO reports for ${files.length} client(s)`
    );

    if (!commitResult.success) {
      return new Response(JSON.stringify({
        success: false,
        error: commitResult.error || 'Failed to commit to GitHub',
        reportsGenerated: files.length,
        errors,
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      reportsGenerated: files.length,
      commitSha: commitResult.sha,
      commitUrl: commitResult.url,
      errors: errors.length > 0 ? errors : undefined,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Generate reports error:', error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
