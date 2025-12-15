---
title: "Website Migration Plan"
description: "Carbon-copy migration strategy to preserve SEO while building a modern platform"
---

# Website Migration Plan

## Migration Philosophy

**Goal:** Create an exact replica of your current site to preserve SEO rankings, then improve from there.

Google treats major site changes carefully. To protect your rankings:
1. Keep the same URL structure
2. Keep the same content (initially)
3. Keep the same metadata
4. Improve technical performance

## Phase 1: Pre-Migration Audit (Week 1)

### Full Site Archive

Before touching anything, we capture everything:

**Crawl Data Export:**
- All 200+ URLs
- Title tags
- Meta descriptions
- H1, H2, H3 headers
- Canonical tags
- Internal links
- Image alt text
- Word counts per page

**Backup Files:**
- sitemap.xml
- robots.txt
- All images (full resolution)
- Schema markup code
- Any custom scripts

**Tools Used:**
- Screaming Frog (site crawler)
- HTTrack (full site download)
- Wayback Machine (archive submission)

### Account Verification

Confirm access to:
- [ ] Domain registrar (DNS control)
- [ ] Google Analytics (GA4)
- [ ] Google Search Console
- [ ] Google Business Profile
- [ ] Existing social accounts

### Baseline Documentation

- Screenshot current Google rankings for top 50 keywords
- Export 6 months of GA4 data
- Export Search Console performance data
- Document Core Web Vitals scores
- Note GBP ranking positions

## Phase 2: Technology Stack

### Recommended Architecture

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | Astro | Blazing fast, SEO-optimized |
| CMS | Sanity | Headless, easy for your team to edit |
| Hosting | Vercel | Edge CDN, automatic deploys |
| Forms | Custom webhooks | Direct to CRM |
| Images | Vercel Image Optimization | Auto WebP, lazy loading |

### Why Not WordPress?

| Factor | WordPress | Astro |
|--------|-----------|-------|
| Speed | Slow (plugins, database) | Lightning fast (static) |
| Security | Constant updates, vulnerabilities | Zero attack surface |
| Maintenance | Plugin updates, backups | None required |
| Performance Score | 40-70 typical | 95-100 achievable |
| Hosting Cost | $50-200/month | Free-$20/month |

### Core Web Vitals Targets

| Metric | Target | Scorpion (Estimated) |
|--------|--------|---------------------|
| LCP (Largest Contentful Paint) | < 2.5s | 3-4s |
| FID/INP (Interaction) | < 100ms | Unknown |
| CLS (Layout Shift) | < 0.1 | 0.1-0.2 |

## Phase 3: URL Structure Preservation

**This is critical.** Every URL must match exactly or have a 301 redirect.

### URL Mapping

```
CURRENT URL                                    → NEW URL
────────────────────────────────────────────────────────────────
/                                              → / (exact)
/about-us/                                     → /about-us/
/about-us/careers/                             → /about-us/careers/
/home-remodeling/                              → /home-remodeling/
/home-remodeling/kitchen-remodeling/           → /home-remodeling/kitchen-remodeling/
/home-remodeling/bathroom-remodeling/          → /home-remodeling/bathroom-remodeling/
/home-remodeling/garage-remodeling/            → /home-remodeling/garage-remodeling/
/home-remodeling/new-room-additions/           → /home-remodeling/new-room-additions/
/exterior-remodeling/                          → /exterior-remodeling/
/exterior-remodeling/adus/                     → /exterior-remodeling/adus/
/exterior-remodeling/deck-repair/              → /exterior-remodeling/deck-repair/
/exterior-remodeling/hardscaping/              → /exterior-remodeling/hardscaping/
/exterior-remodeling/outdoor-kitchens/         → /exterior-remodeling/outdoor-kitchens/
/areas-we-serve/                               → /areas-we-serve/
/remodeling-and-renovation-carlsbad-ca/        → /remodeling-and-renovation-carlsbad-ca/
/kitchen-remodeling-carlsbad-ca/               → /kitchen-remodeling-carlsbad-ca/
/bathroom-remodeling-carlsbad-ca/              → /bathroom-remodeling-carlsbad-ca/
/blog/                                         → /blog/
/blog/2022/april/[slug]/                       → /blog/2022/april/[slug]/
/portfolio/                                    → /portfolio/
/reviews/                                      → /reviews/
/contact-us/                                   → /contact-us/
```

### 301 Redirect Strategy

If any URL must change:
```
Old URL → 301 Redirect → New URL
```

We'll create a comprehensive redirect map and implement server-side redirects.

## Phase 4: On-Page SEO Replication

### For Every Page, We Match:

**Metadata:**
- Title tag (exact match)
- Meta description (exact match)
- Canonical URL
- Open Graph tags
- Twitter Card tags

**Content:**
- H1 tag (exact match)
- Header hierarchy (H2, H3, H4)
- Body content (word-for-word)
- Internal links
- Image alt text

**Technical:**
- Schema markup (enhanced)
- Breadcrumb structure
- Mobile responsiveness

## Phase 5: Technical SEO Enhancements

### What We're Adding (That Scorpion Missed)

#### Enhanced Schema Markup

**LocalBusiness Schema (Homepage):**
```json
{
  "@type": "HomeAndConstructionBusiness",
  "name": "BNC Builders Inc.",
  "telephone": "(760) 993-3204",
  "address": {...},
  "areaServed": ["Escondido", "Carlsbad", ...],
  "aggregateRating": {...},
  "openingHours": "Mo-Sa 08:00-17:00"
}
```

**Service Schema (Per Service Page):**
```json
{
  "@type": "Service",
  "serviceType": "Kitchen Remodeling",
  "provider": {"@id": "#business"},
  "areaServed": "San Diego County"
}
```

**FAQ Schema (All Service Pages):**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does kitchen remodeling cost in San Diego?",
      "acceptedAnswer": {...}
    }
  ]
}
```

**Additional Schema Types:**
- BreadcrumbList (navigation)
- VideoObject (testimonials)
- Review (customer reviews)
- HowTo (process pages)

#### Performance Optimizations

**Image Handling:**
- Convert all images to WebP
- Implement lazy loading
- Add blur placeholders
- Set explicit dimensions (prevents CLS)

**Font Loading:**
```css
font-display: swap; /* Prevents invisible text */
```

**Critical CSS:**
- Inline above-fold styles
- Defer non-critical CSS

**JavaScript:**
- Zero JS on initial page load (static site)
- Defer any interactive elements

### Crawlability Improvements

**XML Sitemap:**
- Auto-generated on build
- Includes all pages with lastmod dates
- Submitted to Search Console

**Robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://www.bncbuildersinc.com/sitemap.xml
```

**Internal Linking:**
- Contextual links between related services
- "Related Services" sections
- Breadcrumb navigation
- Footer link structure

## Phase 6: Launch Checklist

### Pre-Launch (24 Hours Before)

- [ ] Final crawl comparison (old vs new)
- [ ] All 301 redirects tested
- [ ] Schema markup validated
- [ ] Core Web Vitals passing
- [ ] Forms tested and working
- [ ] Tracking verified (GA4, GTM)
- [ ] Mobile responsive checked
- [ ] Cross-browser tested

### Launch Day

- [ ] DNS switch (point domain to new hosting)
- [ ] SSL certificate verified
- [ ] Submit new sitemap to Search Console
- [ ] Request indexing for key pages
- [ ] Monitor for crawl errors
- [ ] Test all conversion points

### Post-Launch (Week 1)

- [ ] Daily Search Console monitoring
- [ ] Watch for ranking fluctuations
- [ ] Fix any 404 errors immediately
- [ ] Verify all tracking is firing
- [ ] Address any user-reported issues

## Expected Timeline

| Day | Activity |
|-----|----------|
| 1-2 | Full site audit and archive |
| 3-5 | Account verification and baseline |
| 6-10 | Website build (pages, content) |
| 11-12 | Tracking implementation |
| 13-14 | QA and testing |
| 15 | Launch |
| 16-21 | Post-launch monitoring |

## Risk Mitigation

### What Could Go Wrong

| Risk | Mitigation |
|------|------------|
| Ranking drop | Exact URL/content match minimizes risk |
| Broken links | Comprehensive redirect map |
| Lost tracking | Pre-launch verification |
| DNS issues | Staged rollout option |

### Our Guarantee

If you experience significant ranking drops due to migration issues (not Google algorithm changes), we'll work to resolve them at no additional cost.

## Deliverables

At the end of Phase 2, you'll have:

1. **A website you own** - Full code access, no platform lock-in
2. **Faster performance** - 95+ Lighthouse scores
3. **Better SEO foundation** - Enhanced schema, optimized structure
4. **Easy content editing** - Headless CMS for your team
5. **Modern infrastructure** - Ready to scale with your business
