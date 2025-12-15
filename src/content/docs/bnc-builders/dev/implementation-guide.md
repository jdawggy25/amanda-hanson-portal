---
title: Implementation Guide - BNC Builders Inc.
description: Technical SEO implementation details and tasks
---

# Implementation Guide - BNC Builders Inc.

## Current Performance Snapshot

| Metric | Value | Trend |
|--------|-------|-------|
| Domain Rating | 29 | +222% YTD (9→29) |
| Organic Traffic | 91/mo | +85% (Jun→Dec) |
| Organic Keywords | 24 | 14 in top 10 |
| Referring Domains | 97 | Growing |
| Traffic Value | $510.51/mo | - |

## Priority 1: Broken Backlink Reclamation

**Impact: HIGH** - 10 broken backlinks from list.ly (DR 76) pointing to deleted blog posts.

### Action Required
These URLs are returning 404 but have live backlinks. Either redirect to relevant pages or recreate the content.

| Broken URL | Anchor Text | Action |
|------------|-------------|--------|
| `/reasons-to-invest-in-a-bathroom-remodeling-services-infographic/` | Reasons To Invest In A Bathroom Remodeling | Redirect → `/bathroom-remodeling/` |
| `/know-the-gas-fire-pit-installation-cost/` | Gas Fire Pit Installation Cost | Redirect → `/outdoor-living/` or recreate |
| `/kitchen-and-bathroom-remodeling-escondido/` | bathroom remodeling service provider Escondido | Redirect → `/bathroom-remodeling/` |
| `/home-remodeling-contractor/` | home remodeling contractor | Redirect → `/` or service page |
| `/how-much-does-an-outdoor-patio-cover-cost/` | Outdoor Patio Cover Cost | Redirect → `/deck-patio/` |
| `/tips-for-interior-home-remodeling/` | Tips For Interior Home Remodeling | Redirect → `/` |
| `/how-to-prepare-your-home-for-siding-remodeling/` | Siding Remodeling Prep | Redirect → `/siding/` |
| `/reasons-to-install-patio-cover/` | Reasons To Install Patio Cover | Redirect → `/deck-patio/` |
| `/ultimate-guide-on-winter-home-maintenance/` | Winter Home Maintenance | Redirect → `/` or recreate as blog |
| `/what-is-included-in-hardscaping-services/` | Hardscaping Services | Redirect → `/landscaping/` |

### Implementation
```apache
# .htaccess redirects
Redirect 301 /reasons-to-invest-in-a-bathroom-remodeling-services-infographic/ /bathroom-remodeling/
Redirect 301 /kitchen-and-bathroom-remodeling-escondido/ /bathroom-remodeling/
Redirect 301 /home-remodeling-contractor/ /
Redirect 301 /tips-for-interior-home-remodeling/ /
Redirect 301 /how-to-prepare-your-home-for-siding-remodeling/ /siding/
Redirect 301 /reasons-to-install-patio-cover/ /deck-patio/
Redirect 301 /how-much-does-an-outdoor-patio-cover-cost/ /deck-patio/
Redirect 301 /ultimate-guide-on-winter-home-maintenance/ /
Redirect 301 /what-is-included-in-hardscaping-services/ /landscaping/
Redirect 301 /know-the-gas-fire-pit-installation-cost/ /outdoor-living/
```

## Priority 2: Keyword Optimization (Push to Top 5)

### Kitchen Remodeling Keywords
| Keyword | Current | Target | Page | Action |
|---------|---------|--------|------|--------|
| escondido kitchen remodeling | #7 | #3 | `/kitchen-remodeling/` | Expand content, add FAQ schema |
| kitchen remodel poway | #10 | #5 | `/kitchen-remodeling-poway/` | Add testimonials, expand |
| kitchen remodeling chula vista | #10 | #5 | `/chula-vista-remodeling/` | Create dedicated page |
| kitchen remodel escondido ca | #8 | #3 | `/kitchen-remodeling/` | Optimize title tag |
| kitchen remodel oceanside | #9 | #5 | **NEW PAGE NEEDED** | Create `/kitchen-remodeling-oceanside/` |

### Bathroom Remodeling Keywords
| Keyword | Current | Target | Page | Action |
|---------|---------|--------|------|--------|
| bathroom remodeling encinitas | #9 | #5 | `/bathroom-remodeling-encinitas/` | Expand content |
| bathroom remodel escondido | #10 | #5 | `/bathroom-remodeling/` | Add before/after gallery |
| bathroom remodel encinitas | #11 | #5 | `/encinitas-remodeling/` | Merge or optimize |

## Priority 3: New Page Creation

### Required New Pages

1. **Kitchen Remodel Oceanside** (`/kitchen-remodeling-oceanside/`)
   - Target: "kitchen remodel oceanside", "kitchen remodeling oceanside ca"
   - Volume: 90/mo
   - Word count: 1,500+
   - Include: Local testimonials, project gallery, service details

2. **Contractors Escondido** (`/contractors-escondido/`)
   - Target: "contractors escondido", "general contractor escondido"
   - Volume: 200/mo
   - Word count: 1,500+
   - Include: Services overview, licensing info, areas served

3. **Home Remodeling Escondido** (`/home-remodeling-escondido/`)
   - Target: "home remodeling escondido", "home renovation escondido"
   - Volume: 90/mo
   - Word count: 1,500+
   - Include: Full service list, process explanation

## Priority 4: Schema Markup Implementation

### LocalBusiness Schema (All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "BNC Builders Inc.",
  "image": "https://bncbuildersinc.com/logo.png",
  "url": "https://bncbuildersinc.com",
  "telephone": "[PHONE]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[ADDRESS]",
    "addressLocality": "Escondido",
    "addressRegion": "CA",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[LAT]",
    "longitude": "[LONG]"
  },
  "areaServed": ["Escondido", "Oceanside", "Poway", "Encinitas", "Carlsbad", "Chula Vista"],
  "priceRange": "$$$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "reviewCount": "[COUNT]"
  }
}
```

### FAQ Schema (Service Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a kitchen remodel cost in Escondido?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[ANSWER]"
      }
    }
  ]
}
```

### Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Kitchen Remodeling",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "BNC Builders Inc."
  },
  "areaServed": {
    "@type": "City",
    "name": "Escondido"
  }
}
```

## Priority 5: Title Tag Optimization

| Page | Current Title | Optimized Title |
|------|---------------|-----------------|
| Homepage | BNC Builders Inc. | Kitchen & Bathroom Remodeling Escondido | BNC Builders |
| Kitchen Remodeling | Kitchen Remodeling - BNC Builders | Kitchen Remodel Escondido CA | Expert Contractors | BNC Builders |
| Bathroom Remodeling | Bathroom Remodeling - BNC Builders | Bathroom Remodel Escondido | Licensed Contractors | BNC Builders |
| Oceanside | Oceanside Remodeling - BNC Builders | Contractors Oceanside CA | Kitchen & Bath Remodeling | BNC Builders |
| Poway | Kitchen Remodeling Poway - BNC Builders | Kitchen Remodel Poway CA | Free Estimates | BNC Builders |

## Priority 6: Anchor Text Strategy

### Current Distribution
| Anchor Type | % | Status |
|-------------|---|--------|
| URL/Domain anchors | 65% | Over-optimized |
| Branded ("BNC Builders") | 8% | Good |
| Generic ("Website", "Visit") | 15% | Neutral |
| Keyword-rich | 12% | Need more |

### Target Anchors for Link Building
Build links with these anchors to improve relevancy signals:

- "kitchen remodel escondido"
- "bathroom remodeling contractors san diego"
- "home remodeling escondido ca"
- "kitchen and bathroom remodeling"
- "remodeling contractors north county"

## Competitor Gap Analysis

### vs. Remodel Works (DR 39, 2,686 traffic)
- **Gap:** 15 common keywords, they rank higher
- **Opportunity:** Match their content depth on service pages
- **Action:** Study their top pages, create better content

### vs. Kaminsky Home Remodeling (DR 36, 1,888 traffic)
- **Gap:** 14 common keywords
- **Opportunity:** BNC has similar DR, can compete
- **Action:** Focus on local citations to differentiate

### vs. Lars Remodel (DR 46, 1,829 traffic)
- **Gap:** Higher DR, 5 common keywords
- **Opportunity:** Build more high-quality backlinks
- **Action:** Target DR 40+ by Q2 2026

## Technical SEO Checklist

### Immediate Actions
- [ ] Implement 301 redirects for broken backlink URLs
- [ ] Add FAQ schema to kitchen-remodeling page
- [ ] Add FAQ schema to bathroom-remodeling page
- [ ] Add LocalBusiness schema to all pages
- [ ] Optimize title tags per table above

### Week 2 Actions
- [ ] Create /kitchen-remodeling-oceanside/ page
- [ ] Expand /kitchen-remodeling-poway/ content (+500 words)
- [ ] Add before/after gallery to bathroom page
- [ ] Submit updated sitemap

### Week 3-4 Actions
- [ ] Create /contractors-escondido/ page
- [ ] Add Service schema to all service pages
- [ ] Implement internal linking strategy
- [ ] Begin outreach for keyword-rich backlinks

## Success Metrics

| Metric | Current | 30-Day Target | 90-Day Target |
|--------|---------|---------------|---------------|
| Top 5 Rankings | 1 | 3 | 8 |
| Top 10 Rankings | 14 | 20 | 35 |
| Organic Traffic | 91 | 150 | 350 |
| Domain Rating | 29 | 32 | 38 |

---

*Last Updated: 2025-12-15*
*Data Source: Ahrefs*
