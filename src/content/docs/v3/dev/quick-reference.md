---
title: "Developer Quick Reference"
description: "Quick reference card for V3 SEO initiative developers"
---

# Developer Quick Reference

## 🎯 Your Sprint 1-2 Checklist

### Week 1-2 (Sprint 1)
- [ ] **STORY-1.1:** Add canonical tags to all pages
- [ ] **STORY-1.2:** Create/optimize XML sitemap
- [ ] **STORY-1.3:** Configure robots.txt
- [ ] **STORY-1.4:** Implement Organization schema

### Week 3-4 (Sprint 2)
- [ ] **STORY-1.6:** Audit Core Web Vitals
- [ ] **STORY-1.7:** Setup GA4 and Search Console
- [ ] **STORY-1.8:** Implement breadcrumb navigation
- [ ] **Content Support:** Add Article/FAQ schema to new content

---

## 📋 Code Snippets

### Canonical Tag
```html
<link rel="canonical" href="https://v3biomed.com/page-url" />
```

### Organization Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "V3 Biomedical",
  "url": "https://v3biomed.com",
  "logo": "https://v3biomed.com/logo.png"
}
</script>
```

### Article Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Page Title",
  "author": {"@type": "Organization", "name": "V3 Biomedical"},
  "publisher": {
    "@type": "Organization",
    "name": "V3 Biomedical",
    "logo": {"@type": "ImageObject", "url": "https://v3biomed.com/logo.png"}
  },
  "datePublished": "2025-12-15"
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
    "name": "Question text?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Answer text"
    }
  }]
}
</script>
```

### Breadcrumb Schema
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
    "name": "Products"
  }]
}
</script>
```

### Google Analytics 4
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Conversion Tracking
```javascript
// Demo request
gtag('event', 'generate_lead', {
  'event_category': 'Demo',
  'event_label': 'Demo Request Form'
});

// Form submit
gtag('event', 'form_submit', {
  'event_category': 'Contact',
  'event_label': 'Contact Form'
});

// Download
gtag('event', 'file_download', {
  'event_category': 'Resources',
  'event_label': 'PDF Name'
});
```

---

## 🎯 Core Web Vitals Targets

| Metric | Target | Tool |
|--------|--------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| **FID** (First Input Delay) | < 100ms | PageSpeed Insights |
| **CLS** (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |

### Quick Fixes
- Optimize images → WebP format, lazy loading
- Minimize JavaScript → Remove unused code
- Use CDN → Faster asset delivery
- Enable caching → Browser and server-side
- Reduce server response time → Optimize backend

---

## 🔍 Validation Tools

| Tool | URL | Purpose |
|------|-----|---------|
| Rich Results Test | https://search.google.com/test/rich-results | Validate schema |
| PageSpeed Insights | https://pagespeed.web.dev/ | Performance audit |
| Schema Validator | https://validator.schema.org/ | Schema validation |
| XML Sitemap Validator | https://www.xml-sitemaps.com/validate-xml-sitemap.html | Sitemap check |
| Robots.txt Tester | Google Search Console | Robots.txt test |

---

## 📊 XML Sitemap Priority Values

| Page Type | Priority |
|-----------|----------|
| Homepage | 1.0 |
| Products/Features | 0.9 |
| Pillar Pages | 0.8 |
| Blog Posts | 0.6 |
| Other Pages | 0.5 |

---

## ✅ Pre-Launch Checklist

### Every Page Must Have:
- [ ] Canonical tag
- [ ] Meta title (< 60 chars)
- [ ] Meta description (< 160 chars)
- [ ] Organization schema
- [ ] Breadcrumb navigation
- [ ] Mobile responsive
- [ ] Images optimized

### Content Pages Must Have:
- [ ] Article schema
- [ ] FAQ schema (if applicable)
- [ ] Internal links
- [ ] Proper heading hierarchy (H1, H2, H3)

### Performance:
- [ ] PageSpeed score > 90 (mobile)
- [ ] Core Web Vitals pass
- [ ] No console errors
- [ ] Cross-browser tested

---

## 🚨 Common Issues & Fixes

### Issue: Schema validation errors
**Fix:** Check JSON syntax, ensure all required fields present

### Issue: Canonical tag conflicts
**Fix:** Ensure only one canonical per page, use absolute URLs

### Issue: Poor Core Web Vitals
**Fix:** Optimize images, minimize JS, enable caching

### Issue: Pages not indexing
**Fix:** Check robots.txt, verify sitemap, check Search Console

### Issue: Analytics not tracking
**Fix:** Verify GA4 ID, check for ad blockers, test in incognito

---

## 📞 Quick Contacts

- **SEO Lead:** [Name] - Schema/technical questions
- **Content Lead:** [Name] - Content schema questions
- **Dev Lead:** [Name] - Technical implementation
- **Slack:** #v3-seo-initiative

---

## 🔗 Essential Links

- **[Developer Guide](./developer-guide.md)** - Full implementation guide
- **[Epic 01](./epic-01-technical-seo-foundation.md)** - Your primary epic
- **[Sprint Plan](./sprint-plan.md)** - Timeline and milestones
- **[Project Overview](./project-overview.md)** - Program overview

---

## 📅 Sprint Timeline

| Sprint | Weeks | Your Focus |
|--------|-------|------------|
| 1 | 1-2 | Canonical, sitemap, robots, schema |
| 2 | 3-4 | Analytics, Core Web Vitals, breadcrumbs |
| 3-4 | 5-8 | Content schema support |
| 5-6 | 9-12 | Conversion tracking, optimization |

---

**Print this page for quick reference!** 📄

