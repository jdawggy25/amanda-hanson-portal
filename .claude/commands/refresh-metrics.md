# Refresh SEO Metrics

Fetch fresh SEO metrics for all clients using Ahrefs and Lighthouse MCP tools, then store them in Supabase cache.

## Instructions

For each client in `clients.config.json`, fetch the following data via MCP tools:

### Ahrefs Data (for each client website):
1. `mcp__ahrefs__site-explorer-domain-rating` - Domain rating and Ahrefs rank
2. `mcp__ahrefs__site-explorer-metrics` - Organic keywords, traffic, traffic value (country: us)
3. `mcp__ahrefs__site-explorer-backlinks-stats` - Backlinks count and referring domains
4. `mcp__ahrefs__site-explorer-top-pages` - Top pages by traffic (limit: 10)
5. `mcp__ahrefs__site-explorer-organic-keywords` - Top ranking keywords (limit: 20)
6. `mcp__ahrefs__site-explorer-refdomains` - Top referring domains (limit: 10)

### Lighthouse Data (for each client website):
1. `mcp__lighthouse__run_audit` - Full Lighthouse audit (device: mobile)

### Clients to refresh:
- v3biomedical.com (V3 Biomedical)
- casitaazulpdx.com (Casita Azul)
- bncbuildersinc.com (BNC Builders Inc.)
- hansenchiropracticaz.com (Hansen Chiropractic)
- kingroofco.com (King Roof)
- dentistingraham.com (Salt Creek Dental)
- 4cornersconcretecoatings.com (4 Corners Concrete Coatings)
- cocinartepdx.com (Cocinarte)
- spanishhorizonsacademy.com (Spanish Horizons Academy)

### After fetching all data:
1. Compile the data into the `ClientMetrics` format (see `src/lib/metrics/index.ts` for interface)
2. Update `scripts/seed-metrics-cache.ts` with the new data
3. Run `npx tsx scripts/seed-metrics-cache.ts` to store in Supabase

### Data format notes:
- Traffic values from Ahrefs are in USD cents - divide by 100 for dollars
- Lighthouse scores are 0-1 - multiply by 100 for percentage
- Use date format YYYY-MM-DD for Ahrefs API calls (use today's date)

Fetch data for multiple clients in parallel when possible to speed up the process.
