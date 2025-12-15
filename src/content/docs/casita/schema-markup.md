---
title: "Schema Markup Implementation Guide"
description: "Complete guide to implementing LocalBusiness, ChildCare, and Preschool schema markup for enhanced search visibility and rich snippets."
---

# Schema Markup Implementation Guide

Schema markup (structured data) helps Google understand your business better and can result in rich snippets in search results.

---

## Homepage: LocalBusiness Schema

Add this JSON-LD script to the homepage `<head>` section:

```json
{
  "@context": "https://schema.org",
  "@type": ["ChildCare", "Preschool"],
  "name": "Casita Azul Spanish Immersion Preschool",
  "description": "100% Spanish immersion daycare and preschool for children ages 0-5 in Portland, Oregon. 4 locations serving Rockcreek, Beaverton, Forest Heights, and Bethany.",
  "url": "https://www.casitaazulpdx.com",
  "telephone": "(503) 916-9758",
  "foundingDate": "2015",
  "areaServed": {
    "@type": "City",
    "name": "Portland, Oregon"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "17815 NW Tillamook Dr",
    "addressLocality": "Portland",
    "addressRegion": "OR",
    "postalCode": "97229",
    "addressCountry": "US"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "22"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Spanish Immersion Programs",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Infant Spanish Immersion (0-12 months)"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Toddler Spanish Immersion (1-3 years)"}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Preschool Spanish Immersion (3-5 years)"}}
    ]
  }
}
```

---

## Individual Location Pages: LocalBusiness Schema

Create a separate schema for each location page. Example for Hillsboro:

```json
{
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "name": "Casita Azul Hillsboro - Spanish Immersion Preschool",
  "description": "Spanish immersion preschool and daycare serving children 1.5 months to 6 years in Hillsboro, Oregon.",
  "url": "https://www.casitaazulpdx.com/locations/hillsboro-spanish-preschool/",
  "telephone": "(503) 916-9758",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "770 NE Rogahn Street",
    "addressLocality": "Hillsboro",
    "addressRegion": "OR",
    "postalCode": "97124",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.5428,
    "longitude": -122.9365
  },
  "openingHours": "Mo-Fr 07:00-18:00",
  "priceRange": "$$",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Casita Azul Spanish Immersion Schools"
  }
}
```

### Update for Each Location
Copy and modify for:
- Tanasbourne (8427 NE Cornell Road, Suite 500, Hillsboro, OR 97124)
- Bethany locations
- Beaverton location
- Forest Heights location
- Rock Creek location

**Important:** Look up the exact latitude/longitude for each address using Google Maps.

---

## Admissions Page: FAQ Schema

Add this to the Admissions/Getting Started page:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to speak Spanish at home for my child to attend Casita Azul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No! Most of our families are English-speaking at home. Children learn Spanish through full immersion at school, and our teachers support the transition for new students."
      }
    },
    {
      "@type": "Question",
      "name": "What ages do you accept for Spanish immersion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept infants as young as 1 month (at select locations) through age 6. Programs are divided into infant (0-12 months), toddler (1-3 years), and preschool (3-5 years)."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a waitlist for Casita Azul?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Some of our locations do have waitlists, especially for infant programs. We recommend contacting us early to check availability at your preferred location."
      }
    },
    {
      "@type": "Question",
      "name": "What if my child has never been exposed to Spanish?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "That's completely normal! Our immersion approach is designed for children with no prior Spanish exposure. Within months, children begin understanding and speaking Spanish naturally."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer part-time Spanish immersion programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schedule options vary by location. Contact us to learn about full-time and part-time availability at your preferred campus."
      }
    }
  ]
}
```

---

## Contact Page: ContactPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Casita Azul Spanish Immersion School",
  "description": "Contact Casita Azul to schedule a tour or learn about Spanish immersion preschool enrollment in Portland, Oregon.",
  "url": "https://www.casitaazulpdx.com/contact/",
  "mainEntity": {
    "@type": "EducationalOrganization",
    "name": "Casita Azul Spanish Immersion School",
    "telephone": "+1-503-916-9758",
    "email": "info@casitaazulpdx.org",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "17815 NW Tillamook Dr",
      "addressLocality": "Portland",
      "addressRegion": "OR",
      "postalCode": "97229",
      "addressCountry": "US"
    }
  }
}
```

---

## About Page: Organization + Person Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Casita Azul Spanish Immersion Schools",
  "url": "https://www.casitaazulpdx.com",
  "logo": "https://www.casitaazulpdx.com/logo.png",
  "foundingDate": "2018",
  "founder": {
    "@type": "Person",
    "name": "Laura Paz Whitmore",
    "jobTitle": "Founder & Owner",
    "description": "Psychology graduate with 12+ years experience at Multnomah County Health Department. Honduran immigrant passionate about bilingual education."
  },
  "description": "Latina-owned Spanish immersion preschool and daycare serving families across Portland, Hillsboro, Beaverton, and Bethany since 2018.",
  "areaServed": [
    {"@type": "City", "name": "Portland"},
    {"@type": "City", "name": "Hillsboro"},
    {"@type": "City", "name": "Beaverton"},
    {"@type": "City", "name": "Bethany"}
  ]
}
```

---

## How to Add Schema to Your Website

### Option 1: Add to HTML Head
Add the JSON-LD inside a `<script>` tag in the page's `<head>`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  ... (schema content here)
}
</script>
```

### Option 2: WordPress Plugin
If using WordPress, install a plugin like:
- Yoast SEO (includes schema features)
- Schema Pro
- Rank Math

### Option 3: Google Tag Manager
You can also inject schema via Google Tag Manager.

---

## Testing Your Schema

After implementing, test each page at:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

## Schema Checklist

- [ ] Add LocalBusiness schema to homepage
- [ ] Add LocalBusiness schema to each location page (with unique address/geo)
- [ ] Add FAQPage schema to Admissions page
- [ ] Add ContactPage schema to Contact page
- [ ] Add Organization schema to About page
- [ ] Test all pages with Google Rich Results Test
- [ ] Fix any validation errors
