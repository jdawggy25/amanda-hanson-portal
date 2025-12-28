---
title: Technical Requirements
description: Complete technical specifications, architecture, and performance requirements
---

# Technical Requirements

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Public Site)                      │
│                         Astro + React                            │
│                     Cloudflare Pages (Edge)                      │
└─────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
┌─────────────────────────┐   ┌─────────────────────────┐
│        SANITY CMS       │   │     CLOUDFLARE IMAGES   │
│   (Content Management)  │   │   (Image Optimization)  │
└─────────────────────────┘   └─────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INTEGRATIONS                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  KAJABI  │ │   KIT    │ │  STRIPE  │ │  GA4 +   │           │
│  │ (Courses)│ │ (Email)  │ │ (Payments)│ │ Clarity  │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Core Technologies

| Component | Technology | Version | Cost |
|-----------|------------|---------|------|
| **Frontend Framework** | Astro | 4.x | Free |
| **Interactive Components** | React | 18.x | Free |
| **Styling** | Tailwind CSS | 3.x | Free |
| **TypeScript** | TypeScript | 5.x | Free |
| **CMS** | Sanity | Latest | $0-99/mo |
| **Hosting** | Cloudflare Pages | - | Free |
| **Images** | Cloudflare Images | - | $5/mo |
| **CDN** | Cloudflare | - | Included |

### Third-Party Integrations

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| Kajabi | Course delivery | API |
| Kit (ConvertKit) | Email marketing | API + Embed forms |
| Stripe | Payments | Checkout Sessions |
| Calendly | Booking | Embed/API |
| GA4 | Analytics | Client-side + Server |
| Microsoft Clarity | Session recording | Client-side |
| Meta Pixel | Ad tracking | Client-side + CAPI |

## Performance Requirements

### Core Web Vitals Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| **LCP (Largest Contentful Paint)** | <1.5s | 2.5s |
| **INP (Interaction to Next Paint)** | <150ms | 200ms |
| **CLS (Cumulative Layout Shift)** | <0.05 | 0.1 |
| **FCP (First Contentful Paint)** | <1.0s | 1.8s |
| **TTFB (Time to First Byte)** | <200ms | 500ms |

### Lighthouse Scores

| Category | Target | Minimum |
|----------|--------|---------|
| Performance | 95+ | 90 |
| Accessibility | 100 | 95 |
| Best Practices | 100 | 90 |
| SEO | 100 | 95 |

### Bundle Size Budgets

| Asset Type | Budget |
|------------|--------|
| Total JavaScript | <50KB gzipped |
| Total CSS | <30KB gzipped |
| Hero Image | <100KB |
| Other Images | <50KB each |
| Web Fonts | <100KB total |

## Astro Configuration

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://amandahanson.com',
  output: 'hybrid',
  adapter: cloudflare({
    mode: 'directory',
  }),
  integrations: [
    sitemap(),
    react(),
    tailwind(),
  ],
  image: {
    formats: ['avif', 'webp'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
```

## Site Structure

```
amandahanson.com/
├── / (Homepage)
├── /about/
├── /coaching/
│   ├── /queens-reign/
│   ├── /crowned/
│   └── /the-muses/
├── /events/
│   ├── /magnetic-phoenix/
│   └── /magnetic-day/
├── /book/
├── /podcast/
├── /blog/
│   ├── /category/[category]/
│   └── /[slug]/
├── /resources/
│   └── /[lead-magnet]/
├── /contact/
├── /apply/
├── /api/
│   ├── /subscribe/
│   ├── /analytics/
│   └── /kajabi/
├── /sitemap.xml
├── /robots.txt
└── /llms.txt
```

## Image Optimization

### Astro Image Component

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Amanda Hanson"
  loading="eager"
  decoding="async"
  quality={90}
  format="avif"
  fallbackFormat="webp"
  widths={[320, 640, 768, 1024, 1280, 1536, 1920]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### Image Requirements

| Image Type | Max Width | Format | Quality |
|------------|-----------|--------|---------|
| Hero | 1920px | AVIF/WebP | 90 |
| Featured | 1280px | AVIF/WebP | 85 |
| Thumbnail | 640px | AVIF/WebP | 80 |
| Profile | 400px | AVIF/WebP | 90 |
| Icons | 64px | SVG | N/A |

## Font Optimization

### Font Strategy

1. **Subset fonts** to Latin characters only (50-70% size reduction)
2. **Preload critical fonts** in document head
3. **Use font-display: swap** for non-blocking rendering
4. **Calculate fallback metrics** to minimize CLS

### Font Configuration

```css
@font-face {
  font-family: 'Stardom';
  src: url('/fonts/Stardom-Variable-subset.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
  unicode-range: U+0020-007F, U+00A0-00FF;
  size-adjust: 105%;
  ascent-override: 90%;
  descent-override: 22%;
}
```

## Third-Party Script Loading

### Deferred Loading Strategy

```typescript
// All third-party scripts load after user interaction or 3 seconds
function loadThirdPartyScripts() {
  // Google Analytics
  const gaScript = document.createElement('script');
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  gaScript.async = true;
  document.head.appendChild(gaScript);

  // Facebook Pixel
  // ... loaded similarly

  // Chat widget
  // ... loaded on scroll only
}

// Trigger on first interaction or 3 seconds
['click', 'scroll', 'keydown', 'touchstart'].forEach(event => {
  window.addEventListener(event, loadThirdPartyScripts, { once: true });
});
setTimeout(loadThirdPartyScripts, 3000);
```

## Caching Strategy

### Cache Headers by Content Type

| Content Type | Cache Strategy | Duration |
|--------------|----------------|----------|
| Static Assets | Immutable | 1 year |
| HTML Pages | Stale-while-revalidate | 1 hour |
| API Responses | Private/no-cache | 0 |
| Images | Immutable | 1 year |
| Fonts | Immutable | 1 year |
| JSON Data | Stale-while-revalidate | 5 min |

### Cloudflare Cache Rules

```javascript
// Cache-Control headers
response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

// For HTML with stale-while-revalidate
response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
```

## SEO Technical Requirements

### Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Amanda Hanson",
  "jobTitle": "Life Coach",
  "description": "The Midlife Muse - Empowering women 40+ to reinvent themselves",
  "url": "https://amandahanson.com",
  "image": "https://amandahanson.com/images/amanda-hanson.jpg",
  "sameAs": [
    "https://instagram.com/midlife.muse",
    "https://linkedin.com/in/amandahanson"
  ],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "PhD"
  }
}
```

### robots.txt

```
User-agent: *
Allow: /

Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Anthropic-AI
Allow: /

Sitemap: https://amandahanson.com/sitemap.xml
```

### llms.txt

```
# Amanda Hanson - The Midlife Muse
# https://amandahanson.com

## About
Amanda Hanson, PhD, is a life coach specializing in midlife transformation
for women 40+. Known as "The Midlife Muse."

## Services
- Queen's Reign: 6-month mastermind program
- CROWNED: Premium mastermind experience
- The Muses: Community membership
- Magnetic Phoenix: 2-day transformational event

## Expertise
- Life coaching for women 40+
- Career reinvention at midlife
- Empty nest transitions
- Confidence building
```

## API Endpoints

### Required API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/subscribe` | POST | Email list signup |
| `/api/analytics` | POST | Custom event tracking |
| `/api/kajabi/courses` | GET | Fetch course data |
| `/api/kajabi/access` | GET | Check user access |
| `/api/contact` | POST | Contact form submission |

### Example API Route

```typescript
// src/pages/api/subscribe.ts
export const prerender = false;

export async function POST({ request }) {
  const data = await request.json();

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    return new Response(JSON.stringify({ error: 'Invalid email' }), {
      status: 400,
    });
  }

  // Subscribe to Kit (ConvertKit)
  const response = await fetch('https://api.convertkit.com/v3/forms/FORM_ID/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: import.meta.env.CONVERTKIT_API_KEY,
      email: data.email,
      tags: data.tags || [],
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Subscription failed' }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
```

## Environment Variables

```env
# Sanity
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_TOKEN=

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_IMAGES_TOKEN=

# Kit (ConvertKit)
CONVERTKIT_API_KEY=
CONVERTKIT_API_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Kajabi
KAJABI_API_KEY=
KAJABI_SITE_ID=

# Analytics
GA_MEASUREMENT_ID=
META_PIXEL_ID=

# General
SITE_URL=https://amandahanson.com
```

## Security Requirements

### Headers

```typescript
// Security headers
response.headers.set('X-Frame-Options', 'DENY');
response.headers.set('X-Content-Type-Options', 'nosniff');
response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
response.headers.set('Content-Security-Policy',
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net; " +
  "style-src 'self' 'unsafe-inline'; " +
  "img-src 'self' data: https:; " +
  "font-src 'self'; " +
  "connect-src 'self' https://www.google-analytics.com https://api.convertkit.com;"
);
```

## Monitoring & Alerting

### Web Vitals Tracking

```typescript
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    page: window.location.pathname,
  });

  navigator.sendBeacon('/api/analytics', body);
}

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

### Performance Budgets

```json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        { "metric": "interactive", "budget": 3000 },
        { "metric": "first-contentful-paint", "budget": 1500 }
      ],
      "resourceSizes": [
        { "resourceType": "script", "budget": 50 },
        { "resourceType": "total", "budget": 300 }
      ]
    }
  ]
}
```

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment

```yaml
# Cloudflare Pages deployment
# Automatic on push to main branch
# Preview deployments on pull requests
```

### Testing

```bash
# Run Lighthouse CI
npm run lighthouse

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

---

*Last Updated: December 2025*
