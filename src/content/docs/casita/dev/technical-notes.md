---
title: Technical Notes - Casita Azul
description: Internal technical documentation and implementation details
---

# Technical Notes - Casita Azul

## Technical Stack

| Component | Platform/Tool | Notes |
|-----------|---------------|-------|
| Website | Custom CMS / WordPress | Verify platform |
| Domain | casitaazulpdx.com | Active |
| Analytics | Google Analytics | Verify setup |
| SEO Tracking | Ahrefs | No rank tracker project |
| Local SEO | Google Business Profile | Multiple locations |

## Current Site Architecture

```
casitaazulpdx.com/
├── / (Homepage) - 86 traffic, 3 keywords
├── /programs/ - 2 traffic, 2 keywords
│   └── /programs/calendar/ - 2 traffic, 2 keywords
├── /locations/ - 1 traffic, 1 keyword
├── /admissions/
│   └── /admissions/tuitions-and-fees/ - 2 traffic, 2 keywords
├── /our-story/
├── /contact-us/ - 1 traffic, 1 keyword
└── /camp-alegria/ - 1 traffic, 2 keywords
```

## Ahrefs Data Summary

### Domain Metrics
```yaml
Domain Rating: 22
Ahrefs Rank: 6,863,132
Organic Keywords: 4
Organic Traffic: 96/month
Traffic Value: $21.58/month
Referring Domains: 38 (live)
Live Backlinks: 100
All-Time Backlinks: 331
All-Time Referring Domains: 71
```

### Current Rankings
| Keyword | Position | Volume | Traffic | URL |
|---------|----------|--------|---------|-----|
| casita azul | 1 | 250 | 44 | / |
| la casita azul | 3 | 350 | 51 | / |
| spanish immersion preschool portland | 9 | 20 | 1 | / |
| alegria azul | 2 | 0 | 0 | / |

### Top Referring Domains
| Domain | DR | Links | Type |
|--------|-----|-------|------|
| oregonlive.com | 86 | 2 | News/PR |
| rank-your.site | 73 | 1 | Directory |
| seoflox.io | 72 | 2 | Directory |
| exlinko.org | 72 | 2 | Directory |
| sparltech.com | 67 | 2 | Directory |
| creativeposts.top | 52 | 2 | Directory |

**Note:** oregonlive.com (DR 86) is a valuable local news backlink - leverage for PR strategy.

## SEO Configuration

### Current On-Page Issues

| Page | Issue | Current | Recommended |
|------|-------|---------|-------------|
| Homepage | Non-optimized H1 | "Welcome to Casita Azul!" | "Spanish Immersion Preschool & Daycare in Portland, Oregon" |
| Homepage | Weak title | "Casita Azul" | "Spanish Immersion Preschool Portland \| Casita Azul" |
| Programs | Non-optimized H1 | "Discover Our Programs!" | "Spanish Immersion Programs for Infants, Toddlers & Preschoolers" |
| Locations | Non-optimized H1 | "Welcome to Our Casitas!" | "Spanish Immersion Preschool & Daycare Locations in Portland Metro" |

### Meta Description Templates

```html
<!-- Homepage (155 chars) -->
<meta name="description" content="Casita Azul offers Spanish immersion preschool and daycare in Portland, OR. Infant through preschool programs. Latina-owned. Multiple locations. Enroll today!">

<!-- Programs (158 chars) -->
<meta name="description" content="Spanish immersion programs for infants, toddlers, and preschoolers at Casita Azul Portland. Full immersion curriculum. Native Spanish-speaking teachers.">

<!-- Locations (145 chars) -->
<meta name="description" content="Find a Casita Azul Spanish immersion preschool near you in Portland metro. Multiple locations. Schedule a tour today!">

<!-- Admissions (152 chars) -->
<meta name="description" content="Enroll your child in Spanish immersion preschool at Casita Azul Portland. Programs for ages 0-5. Schedule a tour and start the enrollment process.">

<!-- Our Story (156 chars) -->
<meta name="description" content="Learn about Casita Azul, Portland's Latina-owned Spanish immersion preschool. Our mission, values, and commitment to bilingual early childhood education.">
```

## Schema Markup Templates

### ChildCare Schema (Homepage)
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "additionalType": "https://schema.org/Preschool",
  "name": "Casita Azul",
  "alternateName": "Casita Azul Spanish Immersion Preschool",
  "image": "https://casitaazulpdx.com/logo.png",
  "url": "https://casitaazulpdx.com",
  "telephone": "+1-503-XXX-XXXX",
  "email": "info@casitaazulpdx.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Portland",
    "addressRegion": "OR",
    "postalCode": "97XXX",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Portland"},
    {"@type": "City", "name": "Beaverton"},
    {"@type": "City", "name": "Hillsboro"},
    {"@type": "City", "name": "Lake Oswego"}
  ],
  "description": "Spanish immersion preschool and daycare serving Portland metro families. Full immersion programs for infants through preschoolers with native Spanish-speaking teachers.",
  "priceRange": "$$",
  "knowsLanguage": ["en", "es"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Infant Program",
          "description": "Spanish immersion for ages 0-12 months"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Toddler Program",
          "description": "Spanish immersion for ages 1-2 years"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Preschool Program",
          "description": "Spanish immersion for ages 3-5 years"
        }
      }
    ]
  }
}
</script>
```

### EducationalOrganization Schema
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Casita Azul",
  "url": "https://casitaazulpdx.com",
  "logo": "https://casitaazulpdx.com/logo.png",
  "description": "Spanish immersion preschool offering bilingual early childhood education for children ages 0-5 in Portland, Oregon.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Portland",
    "addressRegion": "OR",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "City",
    "name": "Portland"
  },
  "sameAs": [
    "https://www.facebook.com/casitaazulpdx",
    "https://www.instagram.com/casitaazulpdx"
  ]
}
</script>
```

### FAQ Schema (Programs Page)
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What age groups does Casita Azul serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casita Azul offers Spanish immersion programs for infants (0-12 months), toddlers (1-2 years), and preschoolers (3-5 years). Each program is designed with age-appropriate curriculum and activities."
      }
    },
    {
      "@type": "Question",
      "name": "Is Casita Azul a full Spanish immersion program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Casita Azul provides full Spanish immersion with native Spanish-speaking teachers. Children are immersed in Spanish throughout the entire day, which research shows is the most effective method for early language acquisition."
      }
    },
    {
      "@type": "Question",
      "name": "Do children need to know Spanish before enrolling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No prior Spanish knowledge is required. Our immersion program is designed for all children, including those with no previous exposure to Spanish. Children naturally acquire the language through daily immersion."
      }
    },
    {
      "@type": "Question",
      "name": "What locations does Casita Azul have in Portland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casita Azul has multiple locations serving the Portland metro area. Visit our Locations page for specific addresses, programs offered at each site, and to schedule a tour."
      }
    },
    {
      "@type": "Question",
      "name": "What is the tuition for Casita Azul programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tuition varies by program and schedule. Please visit our Admissions page or contact us directly for current tuition rates and enrollment information."
      }
    }
  ]
}
</script>
```

## Competitor Intelligence

### Direct Competitors (Portland Market)

| Competitor | DR | Traffic | Status |
|------------|-----|---------|--------|
| careyes.net | 13 | 340 | Similar size |
| esperanzaspanishschool.com | 0.7 | 37 | Smaller |

**Key Insight:** Very limited direct competition in the Portland Spanish preschool niche. Casita Azul (DR 22) has a significant authority advantage.

### Indirect Competitors (Directories)

| Site | DR | Type |
|------|-----|------|
| winnie.com | 65 | Childcare directory |
| yelp.com | 94 | Reviews |
| facebook.com | 100 | Social |

**Strategy:** Ensure strong presence on directory sites while building direct organic traffic.

## Anchor Text Analysis

### Current Distribution
| Anchor | Ref Domains | % | Health |
|--------|-------------|---|--------|
| casitaazulpdx.com | 27 | 71% | Over-optimized |
| (empty/image) | 4 | 11% | Neutral |
| Casita Azul \| Spanish School | 3 | 8% | Good |
| Partner Casita Azul | 1 | 3% | Branded |
| Other | 3 | 8% | Mixed |

### Target Distribution
| Anchor Type | Target % | Strategy |
|-------------|----------|----------|
| Branded | 30% | "Casita Azul", "Casita Azul Portland" |
| URL/Naked | 30% | Natural |
| Keyword-rich | 25% | "spanish preschool portland", etc. |
| Generic | 15% | "click here", "website", etc. |

### Target Anchors for Outreach
- "spanish immersion preschool portland"
- "spanish classes for kids portland"
- "bilingual preschool portland"
- "spanish daycare portland"
- "Portland spanish immersion school"

## Performance Metrics History

### Domain Rating (2025)
```
Month   |  DR  | Change
--------|------|--------
Jan     |   9  |   -
Feb     |   9  |   0
Mar     |   9  |   0
Apr     |   8  |  -1
May     |   8  |   0
Jun     |   8  |   0
Jul     |   8  |   0
Aug     |   9  |  +1
Sep     |   8  |  -1
Oct     |  19  | +11 ← Major jump
Nov     |  22  |  +3
Dec     |  22  |   0
--------|------|--------
YTD     | +13  | +144%
```

### Organic Traffic (2025)
```
Month   | Traffic | Change
--------|---------|--------
Jun     |    93   |   -
Jul     |    84   |  -9
Aug     |    84   |   0
Sep     |    67   | -17 (seasonal)
Oct     |    63   |  -4 (seasonal)
Nov     |    83   | +20
Dec     |    96   | +13
--------|---------|--------
6mo     |    +3   |  +3%
```

**Analysis:** Traffic showed seasonal dip in Sep-Oct (common for preschools as enrollment decisions are made earlier in year), but recovered. DR growth is the key positive indicator.

## Link Building Opportunities

### High-Value Targets
1. **Portland parenting publications**
   - Portland Family Magazine
   - PDX Parent
   - Metro Parent Portland

2. **Local news (PR)**
   - Oregonian/oregonlive.com (already have 1 link!)
   - Portland Tribune
   - Willamette Week

3. **Community organizations**
   - Portland Hispanic Chamber of Commerce
   - Oregon Latino Association
   - Local elementary schools

4. **Directories**
   - Portland Chamber of Commerce
   - Care.com
   - Winnie.com profile optimization

## Technical Recommendations

### Immediate Actions
1. Fix all H1 tags (6 pages)
2. Optimize title tags (5 pages)
3. Add meta descriptions (all pages)
4. Implement LocalBusiness schema
5. Verify/claim all GBP listings

### Short-term (30 days)
1. Create /spanish-classes-portland/ page
2. Add FAQ schema to Programs
3. Complete GBP optimization
4. Begin local link outreach

### Medium-term (90 days)
1. Create all location pages
2. Create age-specific program pages
3. Launch blog content
4. Implement review generation

---

*Last Updated: 2025-12-15*
*Data Source: Ahrefs Site Explorer*
