---
title: Implementation Guide - Casita Azul
description: Technical SEO implementation details and tasks
---

# Implementation Guide - Casita Azul

## Current Performance Snapshot

| Metric | Value | Trend |
|--------|-------|-------|
| Domain Rating | 22 | +144% YTD (9→22) |
| Organic Traffic | 96/mo | Stable |
| Organic Keywords | 4 | Limited |
| Referring Domains | 38 | Growing |
| Traffic Value | $21.58/mo | - |

## Priority 1: On-Page SEO Fixes (Critical)

**Impact: HIGH** - 6 pages have non-optimized H1s and title tags. These are quick wins.

### H1 Tag Optimization
| Page | Current H1 | Optimized H1 |
|------|------------|--------------|
| Homepage | Welcome to Casita Azul! | Spanish Immersion Preschool & Daycare in Portland, Oregon |
| Our Story | Discover Our Journey! | About Casita Azul: Portland's Latina-Owned Spanish Immersion School |
| Programs | Discover Our Programs! | Spanish Immersion Programs for Infants, Toddlers & Preschoolers |
| Locations | Welcome to Our Casitas! | Spanish Immersion Preschool & Daycare Locations in Portland Metro |
| Admissions | Getting Started | Enroll in Spanish Immersion Preschool & Daycare at Casita Azul |
| Contact | Contact Us! | Contact Casita Azul Spanish Immersion School |

### Title Tag Optimization
| Page | Current | Optimized | Length |
|------|---------|-----------|--------|
| Homepage | Casita Azul | Spanish Immersion Preschool Portland \| Casita Azul | 48 |
| Programs | Programs - Casita Azul | Spanish Classes for Kids Portland \| Infant to Preschool \| Casita Azul | 65 |
| Locations | Locations - Casita Azul | Portland Spanish Preschool Locations \| Beaverton, Hillsboro \| Casita Azul | 70 |
| Admissions | Admissions - Casita Azul | Enroll in Spanish Immersion Preschool Portland \| Casita Azul | 55 |
| Our Story | Our Story - Casita Azul | About Us - Latina-Owned Spanish Preschool Portland \| Casita Azul | 60 |

### Meta Description Templates
```html
<!-- Homepage -->
<meta name="description" content="Casita Azul offers Spanish immersion preschool and daycare in Portland, OR. Infant through preschool programs. Latina-owned. Multiple locations. Enroll today!">

<!-- Programs -->
<meta name="description" content="Spanish immersion programs for infants, toddlers, and preschoolers at Casita Azul Portland. Full immersion curriculum. Native Spanish-speaking teachers.">

<!-- Locations -->
<meta name="description" content="Find a Casita Azul Spanish immersion preschool near you in Portland metro. Locations in [areas]. Schedule a tour today!">
```

## Priority 2: Schema Markup Implementation

### LocalBusiness Schema (All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "additionalType": "https://schema.org/Preschool",
  "name": "Casita Azul",
  "image": "https://casitaazulpdx.com/logo.png",
  "url": "https://casitaazulpdx.com",
  "telephone": "[PHONE]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Portland",
    "addressRegion": "OR",
    "addressCountry": "US"
  },
  "areaServed": ["Portland", "Beaverton", "Hillsboro", "Lake Oswego"],
  "description": "Spanish immersion preschool and daycare serving Portland metro families. Programs for infants through preschoolers.",
  "priceRange": "$$",
  "knowsLanguage": ["en", "es"]
}
```

### EducationalOrganization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Casita Azul",
  "url": "https://casitaazulpdx.com",
  "description": "Spanish immersion preschool offering bilingual education for children ages 0-5 in Portland, Oregon",
  "areaServed": {
    "@type": "City",
    "name": "Portland"
  }
}
```

### FAQ Schema (Programs Page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What age groups does Casita Azul serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casita Azul offers Spanish immersion programs for infants (0-12 months), toddlers (1-2 years), and preschoolers (3-5 years)."
      }
    },
    {
      "@type": "Question",
      "name": "Is Casita Azul a full Spanish immersion program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Casita Azul provides full Spanish immersion with native Spanish-speaking teachers. Children are immersed in Spanish throughout the day."
      }
    },
    {
      "@type": "Question",
      "name": "What locations does Casita Azul have in Portland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casita Azul has multiple locations serving the Portland metro area. Visit our Locations page for addresses and to schedule a tour."
      }
    }
  ]
}
```

## Priority 3: New Page Creation

### Required Service Pages

1. **Spanish Classes Portland** (`/spanish-classes-portland/`)
   - Target: "spanish classes portland", "spanish classes for kids portland"
   - Volume: 140/mo
   - Word count: 1,500+
   - Include: Age groups, curriculum, benefits, enrollment CTA

2. **Spanish Immersion Preschool Portland** (`/spanish-immersion-preschool-portland/`)
   - Target: "spanish immersion preschool portland", "spanish preschool portland"
   - Volume: 70/mo
   - Word count: 1,500+
   - Include: Philosophy, curriculum, testimonials

3. **Bilingual Preschool Portland** (`/bilingual-preschool-portland/`)
   - Target: "bilingual preschool portland", "bilingual daycare portland"
   - Volume: 20/mo
   - Word count: 1,200+
   - Include: Benefits of bilingual education

### Location Pages (One per campus)
Each location page should include:
- Unique address and contact info
- Google Maps embed
- Programs offered at that location
- Local testimonials
- Neighborhood-specific content
- Schema markup with specific location

## Priority 4: Google Business Profile Optimization

### Required Actions
- [ ] Claim/verify all location profiles
- [ ] Set primary category: "Spanish Immersion School"
- [ ] Add secondary categories: "Preschool", "Day Care Center", "Language School"
- [ ] Complete all info fields
- [ ] Upload 20+ photos per location
- [ ] Add all services offered
- [ ] Enable messaging
- [ ] Set up Q&A section
- [ ] Create weekly posts
- [ ] Implement review request process

### GBP Categories to Add
- Spanish Immersion School (Primary)
- Preschool
- Day Care Center
- Language School
- Child Care Agency

## Priority 5: Content Strategy

### Target Keywords by Priority

**Tier 1: Local Service (Immediate Focus)**
| Keyword | Volume | KD | Current | Action |
|---------|--------|-----|---------|--------|
| spanish preschool portland | 70 | Low | Not ranking | Create service page |
| spanish classes portland | 140 | Low | Not ranking | Create service page |
| spanish daycare portland | 30 | Low | Not ranking | Create service page |

**Tier 2: National Terms (Content Investment)**
| Keyword | Volume | KD | Action |
|---------|--------|-----|--------|
| spanish immersion preschool | 480 | 45 | Blog pillar content |
| bilingual preschool | 720 | 42 | Blog content |
| spanish classes for toddlers | 590 | 35 | Service page |

**Tier 3: Branded (Protect)**
| Keyword | Position | Volume | Status |
|---------|----------|--------|--------|
| casita azul | #1 | 250 | Maintain |
| la casita azul | #3 | 350 | Optimize to #1 |

### Blog Content Calendar
| Month | Topic | Target Keyword | Words |
|-------|-------|----------------|-------|
| Jan | Benefits of Spanish Immersion | spanish immersion benefits | 1,500 |
| Jan | Choosing a Bilingual Preschool | bilingual preschool portland | 1,200 |
| Feb | Spanish Learning Activities | spanish activities toddlers | 1,200 |
| Feb | Why Start Languages Early? | early language learning | 1,500 |
| Mar | Portland Spanish Programs Guide | spanish programs portland | 1,500 |
| Mar | Preparing for Spanish Immersion | prepare child spanish | 1,200 |

## Competitor Analysis

### Market Position
Based on Ahrefs data, Casita Azul has **limited direct competitors** in the Portland Spanish preschool space:

| Competitor | DR | Common KWs | Traffic | Notes |
|------------|-----|------------|---------|-------|
| winnie.com | 65 | 3 | 145,112 | Directory, not direct |
| careyes.net | 13 | 2 | 340 | Similar size |
| esperanzaspanishschool.com | 0.7 | 1 | 37 | Smaller |

**Opportunity:** With DR 22 and limited competition, Casita Azul can dominate the Portland Spanish preschool niche with proper optimization.

## Anchor Text Strategy

### Current Distribution
| Anchor | Ref Domains | Status |
|--------|-------------|--------|
| casitaazulpdx.com | 27 | Heavy URL-based |
| (empty/image) | 4 | Neutral |
| Casita Azul \| Spanish School | 3 | Good |
| Partner Casita Azul | 1 | Internal |

### Target Anchors for Link Building
Build links with these keyword-rich anchors:
- "spanish immersion preschool portland"
- "spanish classes for kids portland"
- "bilingual preschool portland"
- "spanish daycare portland"
- "Casita Azul Portland"

## Technical SEO Checklist

### Week 1: Quick Wins
- [ ] Update all 6 H1 tags per table above
- [ ] Update all title tags per table above
- [ ] Write meta descriptions for all pages
- [ ] Add LocalBusiness schema to homepage
- [ ] Add EducationalOrganization schema

### Week 2: GBP & Local
- [ ] Claim/verify all GBP locations
- [ ] Complete GBP info for all locations
- [ ] Upload photos to GBP
- [ ] Add location schema to each location page

### Week 3-4: Content
- [ ] Create /spanish-classes-portland/ page
- [ ] Create /spanish-immersion-preschool-portland/ page
- [ ] Add FAQ schema to Programs page
- [ ] Begin blog content calendar

### Month 2+
- [ ] Create location-specific landing pages
- [ ] Split Programs into age-specific pages
- [ ] Begin local link building outreach
- [ ] Implement review generation process

## Success Metrics

| Metric | Current | 30-Day | 90-Day | 6-Month |
|--------|---------|--------|--------|---------|
| Domain Rating | 22 | 24 | 28 | 32 |
| Organic Keywords | 4 | 15 | 35 | 60 |
| Organic Traffic | 96 | 150 | 250 | 400 |
| Top 10 Rankings | 3 | 8 | 15 | 25 |
| GBP Views | ? | +50% | +100% | +200% |

---

*Last Updated: 2025-12-15*
*Data Source: Ahrefs*
