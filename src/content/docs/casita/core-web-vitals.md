---
title: "Core Web Vitals & Performance Guide"
description: "Optimize LCP, INP, and CLS metrics to meet Google's Core Web Vitals requirements and improve user experience."
---

# Core Web Vitals & Performance Guide

Optimize site speed and user experience to meet Google's Core Web Vitals requirements.

---

## What Are Core Web Vitals?

Core Web Vitals are Google's metrics for measuring user experience. They directly impact rankings.

| Metric | What It Measures | Good | Needs Improvement | Poor |
|--------|------------------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | Loading speed | ≤2.5s | 2.5-4s | >4s |
| **INP** (Interaction to Next Paint) | Responsiveness | ≤200ms | 200-500ms | >500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | ≤0.1 | 0.1-0.25 | >0.25 |

---

## Testing Your Core Web Vitals

### Tools to Use

1. **Google PageSpeed Insights**: pagespeed.web.dev
2. **Google Search Console**: Core Web Vitals report
3. **Chrome DevTools**: Lighthouse audit
4. **Web Vitals Extension**: Chrome extension for real-time monitoring

### Test These Pages First
1. Homepage (most important)
2. Locations page
3. Programs page
4. Individual location pages
5. Blog posts

---

## LCP Optimization (Loading Speed)

### Target: Under 2.5 seconds

### Common LCP Issues & Fixes

#### 1. Hero Image Optimization

```html
<!-- BAD: Unoptimized hero image -->
<img src="hero-image.jpg" alt="Preschool">

<!-- GOOD: Optimized hero with preload and sizing -->
<link rel="preload" as="image" href="hero-image.webp" type="image/webp">

<picture>
  <source srcset="hero-image.webp" type="image/webp">
  <source srcset="hero-image.jpg" type="image/jpeg">
  <img
    src="hero-image.jpg"
    alt="Spanish immersion preschool classroom at Casita Azul"
    width="1200"
    height="600"
    loading="eager"
    fetchpriority="high"
    decoding="async"
  >
</picture>
```

#### 2. Image Optimization Checklist
- [ ] Convert images to WebP format (30-50% smaller)
- [ ] Resize images to actual display size
- [ ] Compress images (TinyPNG, Squoosh)
- [ ] Use responsive images with srcset
- [ ] Lazy load below-fold images
- [ ] Add explicit width/height to prevent layout shift

#### 3. Font Optimization

```html
<!-- Preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" media="print" onload="this.media='all'">

<!-- Fallback for no-JS -->
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap">
</noscript>
```

#### 4. Critical CSS

```html
<!-- Inline critical CSS for above-fold content -->
<style>
  /* Critical styles for LCP element and above-fold */
  .hero { background: #f0f0f0; min-height: 400px; }
  .hero h1 { font-size: 2.5rem; color: #333; }
  nav { display: flex; justify-content: space-between; }
  /* ... other critical styles */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

#### 5. Server Response Time
- [ ] Use a CDN (Cloudflare, Fastly)
- [ ] Enable GZIP/Brotli compression
- [ ] Implement server-side caching
- [ ] Use HTTP/2 or HTTP/3
- [ ] Consider static site generation

---

## INP Optimization (Interactivity)

### Target: Under 200ms

### Common INP Issues & Fixes

#### 1. JavaScript Optimization

```html
<!-- BAD: Render-blocking JavaScript -->
<script src="heavy-script.js"></script>

<!-- GOOD: Deferred JavaScript -->
<script src="heavy-script.js" defer></script>

<!-- GOOD: Async for independent scripts -->
<script src="analytics.js" async></script>
```

#### 2. Break Up Long Tasks

```javascript
// BAD: One long task blocking main thread
function processAll(items) {
  items.forEach(item => heavyProcess(item));
}

// GOOD: Break into chunks with scheduler
async function processAll(items) {
  for (const item of items) {
    heavyProcess(item);
    // Yield to main thread
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
```

#### 3. Event Handler Optimization

```javascript
// BAD: Slow click handler
button.addEventListener('click', () => {
  // Heavy computation
  for (let i = 0; i < 1000000; i++) { /* ... */ }
  updateUI();
});

// GOOD: Defer heavy work
button.addEventListener('click', () => {
  // Immediate visual feedback
  button.classList.add('clicked');

  // Defer heavy work
  requestAnimationFrame(() => {
    // Heavy computation in next frame
    setTimeout(() => {
      doHeavyWork();
      updateUI();
    }, 0);
  });
});
```

#### 4. Third-Party Script Management

```html
<!-- Load third-party scripts after page load -->
<script>
  window.addEventListener('load', function() {
    // Load analytics after page is interactive
    setTimeout(function() {
      var script = document.createElement('script');
      script.src = 'https://analytics.example.com/script.js';
      document.body.appendChild(script);
    }, 3000);
  });
</script>
```

---

## CLS Optimization (Visual Stability)

### Target: Under 0.1

### Common CLS Issues & Fixes

#### 1. Always Set Image Dimensions

```html
<!-- BAD: No dimensions -->
<img src="classroom.jpg" alt="Classroom">

<!-- GOOD: Explicit dimensions -->
<img src="classroom.jpg" alt="Classroom" width="800" height="600">

<!-- GOOD: Aspect ratio CSS -->
<style>
  .img-container {
    aspect-ratio: 4/3;
    width: 100%;
  }
  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
```

#### 2. Reserve Space for Ads/Embeds

```css
/* Reserve space for Google Maps embed */
.map-container {
  min-height: 400px;
  background: #f0f0f0;
}

/* Reserve space for video embeds */
.video-container {
  aspect-ratio: 16/9;
  background: #000;
}
```

#### 3. Font Display Swap

```css
@font-face {
  font-family: 'CustomFont';
  src: url('custom-font.woff2') format('woff2');
  font-display: swap; /* Prevents layout shift from font loading */
}
```

#### 4. Avoid Inserting Content Above Existing Content

```javascript
// BAD: Inserting banner at top
document.body.insertBefore(banner, document.body.firstChild);

// GOOD: Reserve space in HTML
<div id="banner-slot" style="min-height: 60px;"></div>
```

#### 5. Skeleton Loaders

```html
<!-- Show skeleton while content loads -->
<div class="card skeleton">
  <div class="skeleton-image"></div>
  <div class="skeleton-text"></div>
  <div class="skeleton-text short"></div>
</div>

<style>
  .skeleton-image {
    height: 200px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    animation: shimmer 1.5s infinite;
  }
</style>
```

---

## Page Speed Optimization Checklist

### Images
- [ ] Convert all images to WebP with JPEG fallback
- [ ] Resize images to maximum display size
- [ ] Compress images (target: under 100KB for most)
- [ ] Implement lazy loading for below-fold images
- [ ] Add width and height attributes to all images
- [ ] Use responsive images with srcset for different screen sizes
- [ ] Preload hero/LCP image

### CSS
- [ ] Inline critical CSS for above-fold content
- [ ] Defer non-critical CSS loading
- [ ] Minify all CSS files
- [ ] Remove unused CSS (PurgeCSS)
- [ ] Use efficient selectors (avoid deep nesting)

### JavaScript
- [ ] Defer all non-critical JavaScript
- [ ] Async load third-party scripts
- [ ] Minify and compress JavaScript
- [ ] Remove unused JavaScript
- [ ] Lazy load JavaScript for features below fold
- [ ] Split code into chunks

### Fonts
- [ ] Preconnect to font origins
- [ ] Preload critical fonts
- [ ] Use font-display: swap
- [ ] Subset fonts to used characters
- [ ] Self-host fonts if possible

### Server
- [ ] Enable GZIP or Brotli compression
- [ ] Implement browser caching headers
- [ ] Use a CDN for static assets
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Optimize server response time (TTFB < 200ms)

### HTML
- [ ] Minify HTML
- [ ] Remove unnecessary comments
- [ ] Remove unused code
- [ ] Use semantic HTML5 elements

---

## Recommended Performance Budget

| Resource | Budget |
|----------|--------|
| HTML | < 50KB |
| CSS (total) | < 100KB |
| JavaScript (total) | < 300KB |
| Images (per page) | < 500KB |
| Fonts | < 100KB |
| **Total Page Weight** | **< 1MB** |

---

## .htaccess Performance Configuration (Apache)

```apache
# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On

  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"

  # CSS and JavaScript
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # Fonts
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType font/woff "access plus 1 year"

  # HTML
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Security headers that also help performance
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set Connection keep-alive
</IfModule>
```

---

## Nginx Performance Configuration

```nginx
# Enable gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
gzip_min_length 1000;
gzip_comp_level 6;

# Browser caching
location ~* \.(jpg|jpeg|png|webp|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(css|js)$ {
    expires 1M;
    add_header Cache-Control "public";
}

location ~* \.(woff|woff2|ttf|otf)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Enable HTTP/2
listen 443 ssl http2;
```

---

## WordPress-Specific Optimizations

If using WordPress:

### Recommended Plugins
1. **WP Rocket** (paid) - Best all-in-one caching
2. **LiteSpeed Cache** (free) - Great for LiteSpeed servers
3. **Autoptimize** (free) - CSS/JS optimization
4. **ShortPixel** (freemium) - Image optimization
5. **Perfmatters** (paid) - Script management

### WordPress Optimization Checklist
- [ ] Install and configure caching plugin
- [ ] Enable lazy loading for images
- [ ] Defer JavaScript loading
- [ ] Optimize database regularly
- [ ] Limit post revisions
- [ ] Disable unused plugins
- [ ] Use lightweight theme
- [ ] Implement object caching (Redis/Memcached)

---

## Monitoring Performance

### Set Up Regular Monitoring

1. **Google Search Console** - Core Web Vitals report (check weekly)
2. **PageSpeed Insights** - Run after any changes
3. **Chrome UX Report** - Real user metrics
4. **Lighthouse CI** - Automated testing in deployment

### Performance Regression Prevention

```yaml
# Example GitHub Action for Lighthouse CI
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v8
        with:
          urls: |
            https://casitaazul.com/
            https://casitaazul.com/programs/
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
```

---

## Performance Priority Order

Tackle in this order for maximum impact:

1. **LCP** - Usually biggest ranking impact
2. **CLS** - Affects user experience significantly
3. **INP** - Important for interactivity
4. **TTFB** - Server response time
5. **Total page weight** - Overall optimization

---

*Last Updated: December 2025*
