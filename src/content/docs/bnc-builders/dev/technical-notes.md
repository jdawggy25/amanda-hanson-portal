---
title: Technical Notes - BNC Builders Inc.
description: Internal technical documentation and implementation details
---

# Technical Notes - BNC Builders Inc.

## Technical Stack

| Component | Platform/Tool | Notes |
|-----------|---------------|-------|
| Website | Scorpion Platform | CMS lock-in, limited flexibility |
| Analytics | Google Analytics | Standard setup |
| SEO Tracking | Ahrefs | No rank tracker project |
| Local SEO | Google Business Profile | Active |

### Platform Limitations
- **Scorpion CMS** may restrict:
  - Direct .htaccess access for redirects
  - Custom schema markup injection
  - Page speed optimizations
  - Custom URL structures

**Recommendation:** Contact Scorpion support for redirect implementation capabilities.

## Current Site Architecture

```
bncbuildersinc.com/
├── / (Homepage) - 32 traffic, 2 keywords
├── /kitchen-remodeling/ - 13 traffic, 4 keywords
├── /bathroom-remodeling/ - 5 traffic, 2 keywords
├── /oceanside-remodeling/ - 12 traffic, 4 keywords
├── /kitchen-remodeling-poway/ - 7 traffic, 3 keywords
├── /bathroom-remodeling-encinitas/ - 7 traffic, 2 keywords
├── /encinitas-remodeling/ - 4 traffic, 1 keyword
├── /chula-vista-remodeling/ - 4 traffic, 1 keyword
├── /siding/ - (needs verification)
├── /deck-patio/ - (needs verification)
├── /landscaping/ - (needs verification)
└── /outdoor-living/ - (needs verification)
```

## Ahrefs Data Summary

### Domain Metrics
```yaml
Domain Rating: 29
Ahrefs Rank: 3,949,210
Organic Keywords: 24
Organic Traffic: 91/month
Traffic Value: $510.51/month
Referring Domains: 97 (live)
Live Backlinks: 361
All-Time Backlinks: 2,358
All-Time Referring Domains: 378
```

### Top Ranking Keywords
| Keyword | Position | Volume | Traffic | URL |
|---------|----------|--------|---------|-----|
| bnc builders | 2 | 80 | 29 | / |
| contractors oceanside ca | 8 | 100 | 7 | /oceanside-remodeling/ |
| remodeling escondido | 6 | 70 | 5 | / |
| escondido kitchen remodeling | 7 | 70 | 5 | /kitchen-remodeling/ |
| kitchen remodel poway | 10 | 150 | 5 | /kitchen-remodeling-poway/ |
| bathroom remodeling encinitas | 9 | 150 | 5 | /bathroom-remodeling-encinitas/ |

### Top Referring Domains
| Domain | DR | Links | First Seen |
|--------|-----|-------|------------|
| bbb.org | 93 | 24 | 2025-07 |
| homeadvisor.com | 91 | 4 | 2023-04 |
| yellowpages.com | 90 | 8 | 2025-06 |
| expertise.com | 88 | 4 | 2024-08 |
| superpages.com | 84 | 7 | 2025-08 |
| list.ly | 76 | 58 | 2021-05 |

## SEO Configuration

### Current Title Tags
| Page | Title | Length |
|------|-------|--------|
| Homepage | BNC Builders Inc. | 17 |
| Kitchen | Kitchen Remodeling - BNC Builders | 34 |
| Bathroom | Bathroom Remodeling - BNC Builders | 35 |

### Required Title Tags
| Page | Title | Length |
|------|-------|--------|
| Homepage | Kitchen & Bathroom Remodeling Escondido \| BNC Builders | 55 |
| Kitchen | Kitchen Remodel Escondido CA \| Expert Contractors \| BNC Builders | 65 |
| Bathroom | Bathroom Remodel Escondido \| Licensed Contractors \| BNC Builders | 66 |

### Meta Description Templates
```html
<!-- Homepage -->
<meta name="description" content="BNC Builders provides expert kitchen and bathroom remodeling in Escondido, Oceanside, Poway & North San Diego County. Licensed contractors. Free estimates. Call today!">

<!-- Kitchen Page -->
<meta name="description" content="Professional kitchen remodeling in Escondido, CA. Custom cabinets, countertops, flooring & complete renovations. Licensed & insured. Free consultation. (760) XXX-XXXX">

<!-- Bathroom Page -->
<meta name="description" content="Expert bathroom remodeling in Escondido & North San Diego County. Showers, tubs, vanities & complete renovations. Licensed contractors. Get your free quote today!">
```

## Schema Markup Templates

### LocalBusiness Schema (Homepage)
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "BNC Builders Inc.",
  "image": "https://bncbuildersinc.com/logo.png",
  "url": "https://bncbuildersinc.com",
  "telephone": "+1-760-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[STREET ADDRESS]",
    "addressLocality": "Escondido",
    "addressRegion": "CA",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.1192,
    "longitude": -117.0864
  },
  "areaServed": [
    {"@type": "City", "name": "Escondido"},
    {"@type": "City", "name": "Oceanside"},
    {"@type": "City", "name": "Poway"},
    {"@type": "City", "name": "Encinitas"},
    {"@type": "City", "name": "Carlsbad"},
    {"@type": "City", "name": "Chula Vista"}
  ],
  "priceRange": "$$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/bncbuilders",
    "https://www.instagram.com/bncbuilders"
  ]
}
</script>
```

### FAQ Schema (Kitchen Page)
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a kitchen remodel cost in Escondido?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kitchen remodel costs in Escondido typically range from $25,000 to $75,000 depending on scope. Minor updates start around $15,000, while complete renovations with custom cabinets and high-end finishes can exceed $100,000. Contact BNC Builders for a free estimate."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a kitchen remodel take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most kitchen remodels in Escondido take 6-12 weeks from start to finish. Simple updates may complete in 4-6 weeks, while extensive renovations involving layout changes can take 3-4 months. BNC Builders provides detailed timelines during consultation."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need permits for kitchen remodeling in Escondido?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most kitchen remodels in Escondido require permits, especially for electrical, plumbing, or structural changes. BNC Builders handles all permit applications and inspections as part of our full-service remodeling."
      }
    }
  ]
}
</script>
```

### Service Schema
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Kitchen Remodeling",
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "name": "BNC Builders Inc.",
    "url": "https://bncbuildersinc.com"
  },
  "areaServed": {
    "@type": "City",
    "name": "Escondido",
    "containedIn": {
      "@type": "State",
      "name": "California"
    }
  },
  "description": "Professional kitchen remodeling services in Escondido, CA including custom cabinets, countertops, flooring, and complete renovations.",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "USD"
    }
  }
}
</script>
```

## Redirect Rules

### Broken Backlink Redirects
```apache
# Apache .htaccess
# Broken backlinks from list.ly (DR 76)

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

```nginx
# Nginx config alternative
location = /reasons-to-invest-in-a-bathroom-remodeling-services-infographic/ { return 301 /bathroom-remodeling/; }
location = /kitchen-and-bathroom-remodeling-escondido/ { return 301 /bathroom-remodeling/; }
location = /home-remodeling-contractor/ { return 301 /; }
# ... etc
```

## Competitor Intelligence

### Remodel Works (remodelworks.com)
- **DR:** 39 | **Traffic:** 2,686/mo
- **Common Keywords:** 15
- **Gap Analysis:** Higher traffic despite similar DR
- **Insight:** Likely better content depth and internal linking

### Kaminsky Home Remodeling (kaminskiyhomeremodeling.com)
- **DR:** 36 | **Traffic:** 1,888/mo
- **Common Keywords:** 14
- **Gap Analysis:** Similar DR, BNC can compete directly
- **Insight:** Focus on local differentiation

### Lars Remodel (larsremodel.com)
- **DR:** 46 | **Traffic:** 1,829/mo
- **Common Keywords:** 5
- **Gap Analysis:** Higher DR, need backlink focus
- **Insight:** Target DR 40+ through quality link building

## Anchor Text Analysis

### Current Distribution
| Anchor Type | Count | % | Health |
|-------------|-------|---|--------|
| URL/Naked | 159 | 65% | Over-represented |
| Generic | 37 | 15% | OK |
| Branded | 20 | 8% | Under-represented |
| Keyword | 29 | 12% | Need more |

### Target Distribution
| Anchor Type | Target % | Strategy |
|-------------|----------|----------|
| Branded | 25% | Build more "BNC Builders" links |
| URL/Naked | 35% | Natural, no action needed |
| Generic | 20% | Maintain |
| Keyword | 20% | Focus outreach on these |

### Target Anchors for Outreach
- "kitchen remodel escondido"
- "bathroom remodeling san diego"
- "home remodeling contractors escondido"
- "kitchen and bathroom remodeling"
- "escondido remodeling company"

## Performance Metrics History

### Domain Rating (2025)
```
Month   |  DR  | Change
--------|------|--------
Jan     |   9  |   -
Feb     |   9  |   0
Mar     |   9  |   0
Apr     |  10  |  +1
May     |  10  |   0
Jun     |  11  |  +1
Jul     |  11  |   0
Aug     |  21  | +10 ← Major jump
Sep     |  20  |  -1
Oct     |  27  |  +7
Nov     |  29  |  +2
Dec     |  29  |   0
--------|------|--------
YTD     | +20  | +222%
```

### Organic Traffic (2025)
```
Month   | Traffic | Change
--------|---------|--------
Jun     |    47   |   -
Jul     |    52   |  +5
Aug     |    69   | +17
Sep     |    67   |  -2
Oct     |    80   | +13
Nov     |    80   |   0
Dec     |    91   | +11
--------|---------|--------
6mo     |   +44   | +85%
```

---

*Last Updated: 2025-12-15*
*Data Source: Ahrefs Site Explorer*
