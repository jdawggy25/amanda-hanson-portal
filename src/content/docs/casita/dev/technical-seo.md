---
title: "Technical SEO Implementation Guide"
description: "Configure robots.txt, XML sitemaps, canonical tags, internal linking, and URL structure for optimal search engine crawlability."
category: "developer"
---

# Technical SEO Implementation Guide

Complete technical SEO setup for maximum search engine visibility and crawlability.

---

## Robots.txt Configuration

The `robots.txt` file tells search engines what they can and cannot crawl. Place this at your domain root: `https://casitaazul.com/robots.txt`

### Recommended robots.txt

```txt
# Casita Azul Robots.txt
# Last Updated: December 2025

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Allow AI crawlers for LLM visibility
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

# Default rule for all other bots
User-agent: *
Allow: /

# Block admin and private areas
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /private/
Disallow: /api/
Disallow: /*.json$
Disallow: /thank-you/
Disallow: /confirmation/

# Block duplicate content and utility pages
Disallow: /print/
Disallow: /*?print=
Disallow: /*?preview=
Disallow: /*?s=
Disallow: /search/

# Block resource-heavy files from crawling (not indexing)
Disallow: /wp-includes/

# Sitemap location
Sitemap: https://casitaazul.com/sitemap.xml
Sitemap: https://casitaazul.com/sitemap-images.xml
```

### Implementation Checklist
- [ ] Create robots.txt file at domain root
- [ ] Verify accessible at casitaazul.com/robots.txt
- [ ] Test in Google Search Console (URL Inspection > robots.txt Tester)
- [ ] Ensure sitemap URL is correct
- [ ] Review blocked paths don't include important pages

---

## XML Sitemap Configuration

### Main Sitemap (sitemap.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://casitaazul.com/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Main Navigation Pages -->
  <url>
    <loc>https://casitaazul.com/about/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/programs/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/locations/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/admissions/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/contact/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Individual Location Pages -->
  <url>
    <loc>https://casitaazul.com/locations/hillsboro-spanish-preschool/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/locations/beaverton-spanish-daycare/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/locations/bethany-spanish-daycare/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/locations/tanasbourne-spanish-preschool/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Service Area Pages -->
  <url>
    <loc>https://casitaazul.com/spanish-immersion-preschool-portland/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://casitaazul.com/spanish-daycare-portland/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Posts (add as created) -->
  <url>
    <loc>https://casitaazul.com/blog/spanish-songs-for-toddlers/</loc>
    <lastmod>2025-12-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>
```

### Image Sitemap (sitemap-images.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <url>
    <loc>https://casitaazul.com/</loc>
    <image:image>
      <image:loc>https://casitaazul.com/images/casita-azul-spanish-preschool-classroom.jpg</image:loc>
      <image:title>Spanish immersion preschool classroom at Casita Azul</image:title>
      <image:caption>Children learning Spanish through play at Casita Azul preschool in Portland</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://casitaazul.com/images/spanish-immersion-toddlers-portland.jpg</image:loc>
      <image:title>Toddlers in Spanish immersion program</image:title>
      <image:caption>Toddlers engaged in bilingual activities at Casita Azul Portland</image:caption>
    </image:image>
  </url>

</urlset>
```

### Sitemap Index (for larger sites)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://casitaazul.com/sitemap-pages.xml</loc>
    <lastmod>2025-12-01</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://casitaazul.com/sitemap-locations.xml</loc>
    <lastmod>2025-12-01</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://casitaazul.com/sitemap-blog.xml</loc>
    <lastmod>2025-12-01</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://casitaazul.com/sitemap-images.xml</loc>
    <lastmod>2025-12-01</lastmod>
  </sitemap>
</sitemapindex>
```

### Sitemap Checklist
- [ ] Generate XML sitemap with all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up automatic sitemap regeneration when content changes
- [ ] Include lastmod dates that actually reflect updates
- [ ] Keep sitemap under 50,000 URLs and 50MB

---

## Canonical Tags

Prevent duplicate content issues with proper canonical tags.

### Implementation

Add to `<head>` of every page:

```html
<!-- Self-referencing canonical (on homepage) -->
<link rel="canonical" href="https://casitaazul.com/" />

<!-- On about page -->
<link rel="canonical" href="https://casitaazul.com/about/" />

<!-- On location pages -->
<link rel="canonical" href="https://casitaazul.com/locations/hillsboro-spanish-preschool/" />
```

### Rules
1. Every page must have exactly ONE canonical tag
2. Canonical should point to the preferred URL version
3. Use absolute URLs (not relative)
4. Ensure www vs non-www consistency
5. Use HTTPS version always

### Canonical Checklist
- [ ] Add canonical tag to every page
- [ ] Verify all canonicals use HTTPS
- [ ] Choose www or non-www and be consistent
- [ ] Check canonicals don't point to redirected URLs
- [ ] Verify with Google Search Console URL Inspection

---

## URL Structure Best Practices

### Current URL Audit & Recommendations

| Page | Current URL | Recommended URL |
|------|-------------|-----------------|
| Homepage | casitaazul.com | casitaazul.com (keep) |
| About | /our-story or /about | /about/ (standardize) |
| Programs | /programs | /programs/ (add trailing slash) |
| Locations | /locations | /locations/ |
| Hillsboro | NEW | /locations/hillsboro-spanish-preschool/ |
| Beaverton | NEW | /locations/beaverton-spanish-daycare/ |
| Blog Post | NEW | /blog/spanish-songs-for-toddlers/ |

### URL Rules
1. Use lowercase only
2. Use hyphens, not underscores
3. Keep URLs short but descriptive
4. Include primary keyword when natural
5. Use trailing slashes consistently
6. Avoid parameters when possible (?id=123)

---

## Redirect Strategy

### 301 Redirect Map

If changing any existing URLs, implement 301 redirects:

```apache
# .htaccess redirects (Apache)
Redirect 301 /old-page/ https://casitaazul.com/new-page/
Redirect 301 /our-story/ https://casitaazul.com/about/

# Redirect non-www to www (or vice versa)
RewriteEngine On
RewriteCond %{HTTP_HOST} ^casitaazul.com [NC]
RewriteRule ^(.*)$ https://www.casitaazul.com/$1 [L,R=301]

# Redirect HTTP to HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

```nginx
# Nginx redirects
server {
    # Redirect non-www to www
    server_name casitaazul.com;
    return 301 https://www.casitaazul.com$request_uri;
}

# Individual redirects
location = /old-page/ {
    return 301 https://www.casitaazul.com/new-page/;
}
```

### Redirect Checklist
- [ ] Document all URL changes before making them
- [ ] Implement 301 redirects for any changed URLs
- [ ] Test redirects work correctly
- [ ] Update internal links to point to new URLs
- [ ] Update external links where possible (Google Business, directories)
- [ ] Monitor 404 errors in Search Console after changes

---

## Crawl Budget Optimization

### Priority Pages to Crawl
1. Homepage
2. Location pages
3. Program pages
4. Blog posts
5. Contact/Admissions

### Block from Crawling (but not indexing)
- Thank you pages
- Print versions
- Search results pages
- Filtered/sorted URLs
- Session-based URLs

### Implementation
```html
<!-- For pages to index but not follow links -->
<meta name="robots" content="index, nofollow">

<!-- For pages to not index at all -->
<meta name="robots" content="noindex, nofollow">

<!-- For important pages (default, but explicit) -->
<meta name="robots" content="index, follow">
```

---

## Internal Linking Architecture

### Hub & Spoke Model

```
                    [Homepage]
                        |
    ┌───────────────────┼───────────────────┐
    |                   |                   |
[Programs]         [Locations]           [About]
    |                   |                   |
┌───┴───┐       ┌───────┼───────┐          |
|   |   |       |       |       |          |
Inf Tod Pre   Hill   Beav   Beth        [Story]
```

### Internal Link Rules
1. Homepage links to all main sections
2. Each main section links back to homepage
3. Related pages link to each other (Programs → Admissions)
4. Location pages link to relevant program pages
5. Blog posts link to service pages
6. Use descriptive anchor text with keywords

### Internal Link Audit Template

| From Page | To Page | Anchor Text | Status |
|-----------|---------|-------------|--------|
| Homepage | Programs | Spanish Immersion Programs | Add |
| Homepage | Locations | Find a Location | Add |
| Programs | Infant Page | Infant Spanish Immersion | Add |
| Blog Post | Programs | our Spanish immersion preschool | Add |

---

## Pagination (for Blog)

When blog grows, implement proper pagination:

```html
<!-- On page 1 -->
<link rel="next" href="https://casitaazul.com/blog/page/2/">

<!-- On page 2 -->
<link rel="prev" href="https://casitaazul.com/blog/">
<link rel="next" href="https://casitaazul.com/blog/page/3/">

<!-- On last page -->
<link rel="prev" href="https://casitaazul.com/blog/page/4/">
```

---

## Hreflang (If Adding Spanish Version)

If creating Spanish language pages:

```html
<!-- On English page -->
<link rel="alternate" hreflang="en" href="https://casitaazul.com/about/">
<link rel="alternate" hreflang="es" href="https://casitaazul.com/es/about/">
<link rel="alternate" hreflang="x-default" href="https://casitaazul.com/about/">

<!-- On Spanish page -->
<link rel="alternate" hreflang="en" href="https://casitaazul.com/about/">
<link rel="alternate" hreflang="es" href="https://casitaazul.com/es/about/">
<link rel="alternate" hreflang="x-default" href="https://casitaazul.com/about/">
```

---

## Technical SEO Checklist

### Crawling & Indexing
- [ ] robots.txt created and tested
- [ ] XML sitemap created and submitted
- [ ] All pages have proper canonical tags
- [ ] No accidental noindex tags on important pages
- [ ] Google Search Console set up and verified
- [ ] Bing Webmaster Tools set up

### URL & Redirects
- [ ] URL structure is clean and keyword-optimized
- [ ] 301 redirects in place for any changed URLs
- [ ] HTTP to HTTPS redirect working
- [ ] www/non-www redirect working
- [ ] No redirect chains (A→B→C)

### Site Architecture
- [ ] Internal linking structure implemented
- [ ] All important pages within 3 clicks of homepage
- [ ] Breadcrumbs implemented
- [ ] Pagination set up correctly for blog

### Mobile & Speed
- [ ] Mobile-friendly (passes Google test)
- [ ] Page speed under 3 seconds
- [ ] Core Web Vitals passing (see Performance Guide)

---

## Tools for Technical SEO

| Tool | Purpose | URL |
|------|---------|-----|
| Google Search Console | Monitor indexing, errors | search.google.com/search-console |
| Bing Webmaster Tools | Bing-specific insights | bing.com/webmasters |
| Screaming Frog | Crawl site for issues | screamingfrog.co.uk |
| Google PageSpeed | Performance testing | pagespeed.web.dev |
| Rich Results Test | Schema validation | search.google.com/test/rich-results |
| Mobile-Friendly Test | Mobile usability | search.google.com/test/mobile-friendly |

---

*Last Updated: December 2025*
