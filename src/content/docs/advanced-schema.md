---
title: "Advanced Schema & Structured Data Guide"
description: "Comprehensive schema markup implementation including ChildCare, EducationalOrganization, FAQPage, and Review schemas for rich results."
---

# Advanced Schema & Structured Data Guide

Comprehensive schema markup implementation for Casita Azul to maximize rich results and AI visibility.

---

## Schema Strategy Overview

For a childcare/education business like Casita Azul, we need multiple interconnected schema types:

| Schema Type | Purpose | Priority |
|-------------|---------|----------|
| ChildCare | Primary business type | Critical |
| EducationalOrganization | Educational credibility | Critical |
| LocalBusiness | Local SEO signals | High |
| Organization | Brand identity | High |
| FAQPage | Featured snippets | High |
| BreadcrumbList | Navigation rich results | Medium |
| Article/BlogPosting | Blog content | Medium |
| Review/AggregateRating | Star ratings | High |
| Event | Open houses, events | Medium |
| Person | Founder/staff bios | Low |

---

## Primary Schema: ChildCare Organization

This is the most specific and important schema for Casita Azul:

```json
{
  "@context": "https://schema.org",
  "@type": ["ChildCare", "EducationalOrganization", "LocalBusiness"],
  "@id": "https://casitaazul.com/#organization",
  "name": "Casita Azul Spanish Immersion Preschool",
  "alternateName": ["Casita Azul", "Casita Azul Daycare"],
  "description": "Latina-owned Spanish immersion preschool and daycare serving Portland, Oregon metro area. 100% Spanish immersion programs for infants, toddlers, and preschoolers at 11+ locations in Hillsboro, Beaverton, Bethany, and surrounding areas.",
  "url": "https://casitaazul.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://casitaazul.com/images/logo.png",
    "width": 300,
    "height": 100
  },
  "image": [
    "https://casitaazul.com/images/classroom-1x1.jpg",
    "https://casitaazul.com/images/classroom-4x3.jpg",
    "https://casitaazul.com/images/classroom-16x9.jpg"
  ],
  "telephone": "+1-503-555-0123",
  "email": "info@casitaazul.com",
  "foundingDate": "2015",
  "founder": {
    "@type": "Person",
    "name": "Laura",
    "description": "Honduran immigrant and founder, inspired by grandmother's teaching methods",
    "nationality": {
      "@type": "Country",
      "name": "Honduras"
    }
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 50,
    "maxValue": 100
  },
  "slogan": "100% Spanish Immersion from Day One",
  "knowsLanguage": ["es", "en"],
  "areaServed": [
    {
      "@type": "City",
      "name": "Portland",
      "containedInPlace": {
        "@type": "State",
        "name": "Oregon"
      }
    },
    {
      "@type": "City",
      "name": "Hillsboro",
      "containedInPlace": {
        "@type": "State",
        "name": "Oregon"
      }
    },
    {
      "@type": "City",
      "name": "Beaverton",
      "containedInPlace": {
        "@type": "State",
        "name": "Oregon"
      }
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Check", "Bank Transfer"],
  "currenciesAccepted": "USD",
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "Oregon Child Care License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Oregon Early Learning Division"
      }
    }
  ],
  "sameAs": [
    "https://www.facebook.com/casitaazul",
    "https://www.instagram.com/casitaazul",
    "https://www.linkedin.com/company/casitaazul",
    "https://www.yelp.com/biz/casita-azul-hillsboro"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

---

## Multi-Location Schema Strategy

For each of the 11+ locations, create individual LocalBusiness schema linked to the parent organization:

### Location Template

```json
{
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "@id": "https://casitaazul.com/locations/hillsboro/#location",
  "name": "Casita Azul - Hillsboro",
  "description": "Spanish immersion preschool and daycare in Hillsboro, Oregon. 100% Spanish instruction for infants, toddlers, and preschoolers.",
  "url": "https://casitaazul.com/locations/hillsboro/",
  "telephone": "+1-503-555-0124",
  "parentOrganization": {
    "@id": "https://casitaazul.com/#organization"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Hillsboro",
    "addressRegion": "OR",
    "postalCode": "97124",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.5228,
    "longitude": -122.9898
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "18:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Programs at Hillsboro Location",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Infant Spanish Immersion",
          "description": "Full Spanish immersion care for babies 0-12 months"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Toddler Spanish Immersion",
          "description": "Spanish immersion program for children 1-3 years"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Preschool Spanish Immersion",
          "description": "Kindergarten prep in Spanish for ages 3-5"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "23",
    "bestRating": "5"
  }
}
```

---

## Educational Programs Schema

Define each program with EducationalOccupationalProgram:

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "@id": "https://casitaazul.com/programs/infant/#program",
  "name": "Infant Spanish Immersion Program",
  "description": "100% Spanish immersion program for babies 6 weeks to 12 months. Native Spanish-speaking caregivers provide developmentally appropriate Spanish exposure through songs, books, and nurturing care.",
  "provider": {
    "@id": "https://casitaazul.com/#organization"
  },
  "programType": "Early Childhood Education",
  "educationalLevel": "Infant Care",
  "occupationalCategory": "Early Childhood Education",
  "offers": {
    "@type": "Offer",
    "category": "Full-time childcare",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "1800",
      "priceCurrency": "USD",
      "unitText": "MONTH"
    }
  },
  "programPrerequisites": {
    "@type": "Text",
    "text": "Children must be 6 weeks to 12 months old. No Spanish knowledge required."
  },
  "timeToComplete": "P12M",
  "teaches": [
    "Spanish language immersion",
    "Social-emotional development",
    "Cognitive development",
    "Motor skill development"
  ]
}
```

---

## FAQ Schema for Featured Snippets

Create comprehensive FAQ schema for each major page:

### Homepage FAQ

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Spanish immersion preschool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spanish immersion preschool is an educational approach where 100% of instruction, activities, and communication happens in Spanish. Unlike 'Spanish exposure' programs that offer 30 minutes of Spanish per day, true immersion environments like Casita Azul use Spanish exclusively throughout the entire day, leading to fluency and native-like pronunciation."
      }
    },
    {
      "@type": "Question",
      "name": "Do parents need to speak Spanish for their child to attend Casita Azul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No! Many families choose Casita Azul specifically because they don't speak Spanish at home but want their children to become bilingual. Our immersion approach ensures children learn Spanish at school, while English development continues naturally at home and in the community."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best age to start Spanish immersion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The ideal age to start Spanish immersion is as early as possible—even from birth. Infants have the greatest neuroplasticity for language acquisition. Casita Azul accepts babies as young as 6 weeks old in our infant Spanish immersion program. Research shows children who start before age 3 achieve the highest fluency levels."
      }
    },
    {
      "@type": "Question",
      "name": "Will my child fall behind in English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Research consistently shows that bilingual children often outperform monolingual peers academically. English development continues naturally through home life, community interactions, and media. When children enter English-speaking kindergarten, they quickly catch up and often exceed expectations while maintaining their Spanish skills."
      }
    },
    {
      "@type": "Question",
      "name": "How many locations does Casita Azul have?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Casita Azul has 11+ locations across the Portland, Oregon metro area, including Hillsboro, Beaverton, Bethany, Tanasbourne, Rock Creek, Forest Heights, and Cedar Mill. Each location offers the same 100% Spanish immersion curriculum with native Spanish-speaking teachers."
      }
    },
    {
      "@type": "Question",
      "name": "Is Casita Azul the same as a bilingual program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Casita Azul is a true IMMERSION program (100% Spanish), not a bilingual program (which typically splits time between languages). Full immersion leads to higher fluency levels and more natural pronunciation compared to bilingual or 'Spanish enrichment' programs."
      }
    }
  ]
}
```

---

## Breadcrumb Schema

Implement on all pages for navigation rich results:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://casitaazul.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Locations",
      "item": "https://casitaazul.com/locations/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Hillsboro",
      "item": "https://casitaazul.com/locations/hillsboro/"
    }
  ]
}
```

---

## Blog Post Schema

For content marketing articles:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "10 Spanish Songs to Sing with Your Toddler",
  "description": "Fun, easy Spanish songs parents can sing with toddlers at home to reinforce language learning.",
  "image": "https://casitaazul.com/blog/spanish-songs/featured-image.jpg",
  "author": {
    "@type": "Person",
    "name": "Laura",
    "description": "Founder of Casita Azul and early childhood Spanish education expert"
  },
  "publisher": {
    "@id": "https://casitaazul.com/#organization"
  },
  "datePublished": "2024-12-01",
  "dateModified": "2024-12-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://casitaazul.com/blog/spanish-songs-toddler/"
  },
  "articleSection": "Parenting Tips",
  "keywords": ["Spanish songs", "toddler learning", "bilingual parenting"],
  "wordCount": "1500",
  "inLanguage": "en-US"
}
```

---

## Event Schema (Open Houses, Tours)

For promotional events:

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Casita Azul Open House - Hillsboro Location",
  "description": "Tour our Hillsboro Spanish immersion preschool, meet our teachers, and learn about our programs. Free and open to all families.",
  "startDate": "2025-01-15T10:00:00-08:00",
  "endDate": "2025-01-15T12:00:00-08:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Casita Azul - Hillsboro",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Hillsboro",
      "addressRegion": "OR",
      "postalCode": "97124",
      "addressCountry": "US"
    }
  },
  "organizer": {
    "@id": "https://casitaazul.com/#organization"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://casitaazul.com/events/open-house-hillsboro/"
  },
  "image": "https://casitaazul.com/images/open-house.jpg",
  "performer": {
    "@type": "Organization",
    "name": "Casita Azul"
  }
}
```

---

## Review Schema

For displaying star ratings:

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@id": "https://casitaazul.com/#organization"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah M."
  },
  "datePublished": "2024-11-15",
  "reviewBody": "We've been at Casita Azul for 2 years and my daughter is now fluent in Spanish! The teachers are amazing and truly care about the children. Best decision we made for her education."
}
```

---

## WebSite Schema with Search

Enable sitelinks search box:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Casita Azul Spanish Immersion Preschool",
  "url": "https://casitaazul.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://casitaazul.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

## Schema Implementation Checklist

### Homepage
- [ ] Organization/ChildCare schema
- [ ] WebSite schema with search
- [ ] FAQ schema (5-10 questions)
- [ ] Aggregate rating
- [ ] Breadcrumb (just home)

### About Page
- [ ] Organization schema (extended)
- [ ] Person schema for founder
- [ ] FAQ schema (3-5 questions)
- [ ] Breadcrumb

### Programs Page
- [ ] EducationalOccupationalProgram for each program
- [ ] FAQ schema (program questions)
- [ ] Breadcrumb

### Locations Main Page
- [ ] Organization with all locations
- [ ] Local business collection
- [ ] FAQ schema
- [ ] Breadcrumb

### Individual Location Pages
- [ ] ChildCare LocalBusiness for that location
- [ ] Opening hours
- [ ] Geo coordinates
- [ ] Reviews/ratings
- [ ] Breadcrumb

### Blog Posts
- [ ] BlogPosting schema
- [ ] Author information
- [ ] Breadcrumb

### Contact Page
- [ ] ContactPoint schema
- [ ] FAQ schema
- [ ] Breadcrumb

---

## Schema Validation Tools

| Tool | URL | Use |
|------|-----|-----|
| Google Rich Results Test | search.google.com/test/rich-results | Primary validation |
| Schema.org Validator | validator.schema.org | Syntax check |
| JSON-LD Playground | json-ld.org/playground | Debug JSON-LD |
| Merkle Schema Generator | technicalseo.com/tools/schema-markup-generator | Generate schema |

---

## Common Schema Mistakes to Avoid

1. **Wrong schema type** - Use ChildCare, not just LocalBusiness
2. **Missing @id references** - Link schemas together properly
3. **Invalid JSON** - Always validate before publishing
4. **Fake reviews** - Never fabricate review data
5. **Wrong rating scale** - Use 1-5 scale consistently
6. **Missing required properties** - Check schema.org specs
7. **Duplicate schemas** - One schema per entity
8. **Outdated information** - Keep addresses/hours current

---

## Schema Monitoring

### Google Search Console
- Check "Enhancements" section for schema errors
- Monitor rich result impressions/clicks
- Fix any reported issues promptly

### Regular Audits
- [ ] Weekly: Check GSC for new errors
- [ ] Monthly: Validate all page schemas
- [ ] Quarterly: Update schemas with new info
- [ ] Annually: Review for new schema types

---

*Last Updated: December 2024*
