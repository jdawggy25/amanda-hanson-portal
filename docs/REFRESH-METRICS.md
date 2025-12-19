# Refreshing SEO Metrics

This guide explains how to refresh the SEO metrics for all clients.

## Quick Start

### Step 1: Collect Metrics via Claude Code

Ask Claude to collect fresh metrics:

```
Collect fresh SEO metrics for all clients using MCP tools
```

Claude will use these MCP tools:
- `mcp__ahrefs__batch-analysis-batch-analysis` - Domain rating, traffic, keywords
- `mcp__ahrefs__site-explorer-organic-keywords` - Detailed keyword rankings
- `mcp__ahrefs__site-explorer-refdomains` - Backlink data
- `mcp__lighthouse__run_audit` - Performance and SEO scores

Data is saved to `src/data/{client-id}-metrics.json`

### Step 2: Validate Metrics

```bash
npx tsx scripts/seo-automation/index.ts validate
```

### Step 3: Generate Reports

```bash
npx tsx scripts/seo-automation/generate-reports.ts 2025-12
```

Replace `2025-12` with the current month (YYYY-MM format).

### Step 4: (Optional) Sync Config

Update `clients.config.json` with latest metrics snapshots:

```bash
npx tsx scripts/seo-automation/index.ts sync
```

## What Gets Collected

### From Ahrefs MCP

| Metric | Description |
|--------|-------------|
| Domain Rating | 0-100 score of backlink strength |
| Ahrefs Rank | Global ranking position |
| Organic Keywords | Number of ranking keywords |
| Organic Traffic | Estimated monthly visitors |
| Traffic Value | USD value of organic traffic |
| Backlinks | Total number of backlinks |
| Referring Domains | Unique domains linking to site |
| Top Pages | Best performing pages |
| Top Keywords | Highest traffic keywords |

### From Lighthouse MCP

| Metric | Description |
|--------|-------------|
| Performance Score | Page speed and loading metrics |
| SEO Score | Search engine optimization |
| Accessibility Score | WCAG compliance |
| Best Practices Score | Web development standards |
| Core Web Vitals | LCP, FCP, CLS, TBT |

## File Locations

| File | Purpose |
|------|---------|
| `src/data/{client}-metrics.json` | Client metrics data |
| `src/content/docs/{client}/reports/` | Generated monthly reports |
| `clients.config.json` | Client configuration with metrics snapshots |

## CLI Commands

```bash
# Validate all metrics files
npx tsx scripts/seo-automation/index.ts validate

# Sync metrics to clients.config.json
npx tsx scripts/seo-automation/index.ts sync

# Generate reports for a month
npx tsx scripts/seo-automation/generate-reports.ts 2025-12

# Generate for specific client
npx tsx scripts/seo-automation/generate-reports.ts 2025-12 v3

# Dry run (preview without saving)
npx tsx scripts/seo-automation/generate-reports.ts 2025-12 --dry-run
```

## Troubleshooting

### "Missing metrics file"

Run metrics collection via Claude Code first.

### Metrics are stale (>35 days)

Ask Claude to refresh:
```
Refresh SEO metrics for all clients using MCP tools
```

### Reports showing "[object Object]"

This indicates the metrics JSON structure doesn't match the template.
Core Web Vitals should be simple numbers, not objects:

```json
"coreWebVitals": {
  "device": "mobile",
  "lcp": 3.5,
  "fcp": 2.4,
  "cls": 0,
  "tbt": 30
}
```

### MCP tools not working

Ensure Ahrefs and Lighthouse MCP servers are configured in Claude Code settings.

## Recommended Schedule

- **Monthly**: Collect metrics and generate reports on the 1st
- **After website changes**: Refresh for specific client after major updates
- **Before client meetings**: Ensure fresh data before presenting

## Legacy Notes

Direct API collection via `npm run seo:collect` is deprecated.
All data collection now happens through Claude Code with MCP tools.
