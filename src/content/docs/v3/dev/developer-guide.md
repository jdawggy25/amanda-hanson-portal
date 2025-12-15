---
title: "Developer Guide - V3 SEO Initiative"
description: "Complete developer guide for implementing the V3 Biomedical SEO/GEO initiative"
---

# Developer Guide - V3 SEO Initiative

## Overview

This guide consolidates all technical requirements for developers working on the V3 Biomedical SEO/GEO initiative. The 12-week program involves technical SEO implementation, schema markup, analytics setup, and conversion tracking.

## Quick Reference

### Your Responsibilities


As a developer on this project, you'll be responsible for:

1. **Technical SEO Foundation** (Sprint 1-2)
   - Canonical tags
   - XML sitemap
   - Robots.txt
   - Schema markup
   - Core Web Vitals

2. **Analytics & Tracking** (Sprint 2)
   - Google Analytics 4 setup
   - Search Console configuration
   - Conversion tracking

3. **Schema Implementation** (Ongoing)
   - Organization schema
   - Article schema
   - FAQ schema
   - Video schema
   - Breadcrumb schema

4. **Performance Optimization** (Sprint 2)
   - Core Web Vitals audit
   - Performance improvements

5. **Conversion Optimization** (Sprint 5-6)
   - Advanced conversion tracking
   - Internal linking optimization

---

## Sprint 1-2: Technical SEO Foundation

### Story 1.1: Implement Canonical Tags (5 points)

**Objective:** Add self-referencing canonical tags to every page

**Implementation:**
```html
<link rel="canonical" href="https://v3biomed.com/[page-url]" />
```

**Requirements:**
- Every page must have a canonical tag
- Use HTTPS and preferred domain format
- Use absolute URLs (not relative)
- No conflicting canonical signals

**Verification:**
- Run Screaming Frog crawl
- Check all pages have canonical tags
- Verify no duplicate canonicals

---

### Story 1.2: Optimize XML Sitemap (3 points)

**Objective:** Create/update valid XML sitemap with proper priorities

**Implementation:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://v3biomed.com/</loc>
    <lastmod>2025-12-15</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://v3biomed.com/products/</loc>
    <lastmod>2025-12-15</lastmod>
    <priority>0.9</priority>
  </url>
  <!-- More URLs -->
</urlset>
```

**Priority Values:**
- Homepage: 1.0
- Products/Features: 0.9
- Pillar Pages: 0.8
- Blog Posts: 0.6
- Other Pages: 0.5

**Tasks:**
1. Generate/update sitemap.xml
2. Validate format at xml-sitemaps.com
3. Submit to Google Search Console
4. Submit to Bing Webmaster Tools
5. Add to robots.txt: `Sitemap: https://v3biomed.com/sitemap.xml`

---

### Story 1.3: Configure Robots.txt (2 points)

**Objective:** Optimize robots.txt for proper crawling

**Implementation:**
```
User-agent: *
Allow: /

# Block admin and private areas
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Sitemap location
Sitemap: https://v3biomed.com/sitemap.xml
```

**Verification:**
- Test at google.com/webmasters/tools/robots-testing-tool
- Ensure no important pages are blocked

---

### Story 1.4: Implement Organization Schema (5 points)

**Objective:** Add Organization schema to every page

**Implementation:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "V3 Biomedical",
  "url": "https://v3biomed.com",
  "logo": "https://v3biomed.com/logo.png",
  "description": "Advanced wound care documentation and compliance software",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Address]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "[Phone]",
    "contactType": "Sales",
    "email": "[Email]"
  },
  "sameAs": [
    "https://www.linkedin.com/company/v3-biomedical",
    "https://twitter.com/v3biomed"
  ]
}
</script>
```

**Placement:** Add to `<head>` section of all pages

**Verification:**
- Test at schema.org/validator
- Test at search.google.com/test/rich-results

---

### Story 1.6: Audit Core Web Vitals (5 points)

**Objective:** Ensure site meets Core Web Vitals targets

**Targets:**
- **LCP (Largest Contentful Paint):** < 2.5 seconds
- **FID (First Input Delay):** < 100 milliseconds
- **CLS (Cumulative Layout Shift):** < 0.1

**Tools:**
- PageSpeed Insights
- Chrome DevTools Lighthouse
- Search Console Core Web Vitals report

**Common Fixes:**
- Optimize images (WebP format, lazy loading)
- Minimize JavaScript
- Use CDN for static assets
- Implement caching
- Reduce server response time

---

### Story 1.7: Setup Analytics & Search Console (5 points)

**Google Analytics 4:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Google Search Console:**
1. Verify ownership (HTML file or meta tag)
2. Submit sitemap
3. Monitor indexing status
4. Check for errors

---

### Story 1.8: Implement Breadcrumb Navigation (3 points)

**HTML:**
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products/">Products</a></li>
    <li aria-current="page">Documentation</li>
  </ol>
</nav>
```

**Schema:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://v3biomed.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Products",
    "item": "https://v3biomed.com/products/"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "Documentation"
  }]
}
</script>
```

---

## Schema Markup Reference

### Article Schema (for blog posts and pillar pages)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to Wound Experts",
  "description": "Comprehensive guide to becoming a wound care expert",
  "image": "https://v3biomed.com/images/wound-expert.jpg",
  "author": {
    "@type": "Organization",
    "name": "V3 Biomedical"
  },
  "publisher": {
    "@type": "Organization",
    "name": "V3 Biomedical",
    "logo": {
      "@type": "ImageObject",
      "url": "https://v3biomed.com/logo.png"
    }
  },
  "datePublished": "2025-12-15",
  "dateModified": "2025-12-15"
}
</script>
```

### FAQ Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is a wound care expert?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A wound care expert is a healthcare professional..."
    }
  },{
    "@type": "Question",
    "name": "How do I become a wound care expert?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "To become a wound care expert, you typically need..."
    }
  }]
}
</script>
```

### Video Schema (Story 6.8)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "V3 Platform Overview",
  "description": "Complete overview of the V3 wound care platform",
  "thumbnailUrl": "https://v3biomed.com/videos/thumbnails/overview.jpg",
  "uploadDate": "2025-12-15",
  "duration": "PT5M30S",
  "contentUrl": "https://www.youtube.com/watch?v=XXXXXXXXX",
  "embedUrl": "https://www.youtube.com/embed/XXXXXXXXX"
}
</script>
```

---

## Sprint 5-6: Conversion Tracking

### Story 5.10: Advanced Conversion Tracking (5 points)

**Events to Track:**

1. **Demo Requests:**
```javascript
gtag('event', 'generate_lead', {
  'event_category': 'Demo',
  'event_label': 'Demo Request Form'
});
```

2. **Form Submissions:**
```javascript
gtag('event', 'form_submit', {
  'event_category': 'Contact',
  'event_label': 'Contact Form'
});
```

3. **Resource Downloads:**
```javascript
gtag('event', 'file_download', {
  'event_category': 'Resources',
  'event_label': 'Trends Report PDF'
});
```

4. **Scroll Depth:**
```javascript
// Track 25%, 50%, 75%, 100% scroll
gtag('event', 'scroll', {
  'event_category': 'Engagement',
  'event_label': '75% Scroll'
});
```

---

## Testing & Validation Checklist

### Before Launch
- [ ] All canonical tags implemented
- [ ] XML sitemap valid and submitted
- [ ] Robots.txt configured
- [ ] Organization schema on all pages
- [ ] Core Web Vitals meet targets
- [ ] Analytics tracking verified
- [ ] Search Console configured
- [ ] Breadcrumbs implemented

### Content Launch Checklist
- [ ] Article schema added
- [ ] FAQ schema added (if applicable)
- [ ] Meta title optimized (< 60 chars)
- [ ] Meta description optimized (< 160 chars)
- [ ] Internal links added
- [ ] Images optimized
- [ ] Mobile responsive
- [ ] Page speed acceptable

### Schema Validation
- Test all schema at: https://search.google.com/test/rich-results
- Verify no errors or warnings

---

## Related Documentation

- [Project Overview](./project-overview.md) - Full program overview
- [Sprint Plan](./sprint-plan.md) - Detailed sprint breakdown
- [Epic 01: Technical SEO](./epic-01-technical-seo-foundation.md) - All technical stories
- [Epic 06: Video](./epic-06-video-multimedia.md) - Video schema requirements

---

**Questions?** Contact the SEO team lead or refer to the epic documentation for detailed requirements.

