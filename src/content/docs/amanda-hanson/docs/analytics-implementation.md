---
title: Analytics Implementation - Amanda Hanson
description: Comprehensive tracking setup, event configuration, and reporting dashboards
---

# Analytics Implementation Guide

## Analytics Stack Overview

| Tool | Purpose | Priority |
|------|---------|----------|
| Google Analytics 4 | Core analytics, traffic, conversions | Essential |
| Microsoft Clarity | Session recording, heatmaps, UX insights | Essential |
| Meta Pixel + CAPI | Facebook/Instagram ad attribution | Essential |
| Google Ads Tag | YouTube ad tracking | Essential |
| Pinterest Tag | Pinterest ad tracking | High |
| TikTok Pixel | TikTok ad tracking | Medium |
| Custom Events API | Server-side tracking | High |

## Google Analytics 4 Setup

### Property Configuration

```javascript
// GA4 Configuration
gtag('config', 'G-XXXXXXXXXX', {
  send_page_view: true,
  cookie_flags: 'SameSite=None;Secure',
  custom_map: {
    dimension1: 'user_type',
    dimension2: 'content_category',
    dimension3: 'funnel_stage',
  },
});
```

### Event Tracking Schema

#### Page View Events (Automatic)

| Event | Parameters | Trigger |
|-------|------------|---------|
| page_view | page_location, page_title, page_referrer | Every page load |

#### Engagement Events

| Event | Parameters | Trigger |
|-------|------------|---------|
| scroll | percent_scrolled | 25%, 50%, 75%, 90% |
| video_start | video_title, video_provider | Video play |
| video_progress | video_percent, video_title | 25%, 50%, 75% |
| video_complete | video_title, video_duration | Video ends |
| file_download | file_name, file_extension | PDF/resource download |
| outbound_click | link_url, link_domain | External link click |

#### Conversion Events

| Event | Parameters | Trigger |
|-------|------------|---------|
| generate_lead | lead_source, lead_magnet | Email signup |
| quiz_start | quiz_name | Quiz initiated |
| quiz_complete | quiz_name, quiz_result | Quiz finished |
| challenge_register | challenge_name | Challenge signup |
| webinar_register | webinar_name, webinar_date | Webinar signup |
| application_start | program_name | Application begun |
| application_submit | program_name, value | Application completed |
| call_booked | call_type, calendar_source | Discovery call scheduled |
| purchase | transaction_id, value, currency | Payment completed |

### Event Implementation

```javascript
// Lead generation event
function trackLeadGeneration(source, leadMagnet) {
  gtag('event', 'generate_lead', {
    lead_source: source,
    lead_magnet: leadMagnet,
    page_location: window.location.href,
  });
}

// Quiz events
function trackQuizStart(quizName) {
  gtag('event', 'quiz_start', {
    quiz_name: quizName,
  });
}

function trackQuizComplete(quizName, result) {
  gtag('event', 'quiz_complete', {
    quiz_name: quizName,
    quiz_result: result,
  });
}

// Application events
function trackApplicationStart(programName) {
  gtag('event', 'application_start', {
    program_name: programName,
  });
}

function trackApplicationSubmit(programName, value) {
  gtag('event', 'application_submit', {
    program_name: programName,
    value: value,
    currency: 'USD',
  });
}

// Purchase event
function trackPurchase(transactionId, value, items) {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'USD',
    items: items,
  });
}
```

### User Properties

| Property | Values | Purpose |
|----------|--------|---------|
| user_type | prospect, lead, customer, vip | Segment reporting |
| persona_type | achiever, nurturer, seeker, rebel | Quiz-based segmentation |
| acquisition_source | organic, paid, social, referral | Attribution |
| funnel_stage | awareness, consideration, decision | Funnel analysis |
| email_subscribed | true, false | List membership |

### Custom Dimensions

```javascript
// Set user properties
gtag('set', 'user_properties', {
  user_type: 'lead',
  persona_type: 'achiever',
  acquisition_source: 'facebook_ad',
});
```

## Microsoft Clarity Setup

### Installation

```html
<script type="text/javascript">
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', 'CLARITY_PROJECT_ID');
</script>
```

### Custom Tags

```javascript
// Tag users for filtering
clarity('set', 'user_type', 'lead');
clarity('set', 'page_category', 'sales_page');
clarity('set', 'funnel_stage', 'consideration');

// Tag specific interactions
clarity('set', 'video_watched', 'true');
clarity('set', 'form_started', 'true');
```

### Key Clarity Reports

| Report | Purpose | Review Frequency |
|--------|---------|------------------|
| Session Recordings | UX issues, form abandonment | Daily |
| Heatmaps | Click patterns, scroll depth | Weekly |
| Rage Clicks | Frustration points | Weekly |
| Dead Clicks | Misleading elements | Weekly |
| Scroll Heatmaps | Content engagement | Weekly |
| Form Analytics | Field-level drop-off | Weekly |

## Meta Pixel + Conversions API

### Pixel Installation

```html
<!-- Meta Pixel Base Code -->
<script>
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### Standard Events

| Event | Trigger | Parameters |
|-------|---------|------------|
| PageView | Every page | Automatic |
| ViewContent | Key pages | content_name, content_type |
| Lead | Email signup | lead_source |
| CompleteRegistration | Challenge/webinar signup | status, value |
| InitiateCheckout | Application start | value, currency |
| Purchase | Payment complete | value, currency, content_ids |

### Event Implementation

```javascript
// View content (sales page)
fbq('track', 'ViewContent', {
  content_name: "Queen's Reign Sales Page",
  content_type: 'product',
  value: 8888,
  currency: 'USD',
});

// Lead capture
fbq('track', 'Lead', {
  content_name: 'Quiz Lead',
  lead_source: 'reinvention_quiz',
});

// Registration
fbq('track', 'CompleteRegistration', {
  content_name: '5-Day Challenge',
  status: 'registered',
  value: 0,
  currency: 'USD',
});

// Application start
fbq('track', 'InitiateCheckout', {
  content_name: "Queen's Reign Application",
  value: 8888,
  currency: 'USD',
});

// Purchase
fbq('track', 'Purchase', {
  value: 8888,
  currency: 'USD',
  content_ids: ['queens-reign'],
  content_type: 'product',
});
```

### Conversions API (Server-Side)

```typescript
// Server-side event tracking
async function trackServerEvent(eventName: string, userData: object, customData: object) {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [
          {
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: {
              em: hashEmail(userData.email),
              fn: hashValue(userData.firstName),
              ln: hashValue(userData.lastName),
              client_ip_address: userData.ip,
              client_user_agent: userData.userAgent,
              fbc: userData.fbc,
              fbp: userData.fbp,
            },
            custom_data: customData,
          },
        ],
        access_token: META_ACCESS_TOKEN,
      }),
    }
  );
  return response.json();
}
```

## Pinterest Tag Setup

### Installation

```html
<!-- Pinterest Tag Base Code -->
<script>
  !(function (e) {
    if (!window.pintrk) {
      window.pintrk = function () {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
      };
      var n = window.pintrk;
      (n.queue = []), (n.version = '3.0');
      var t = document.createElement('script');
      (t.async = !0), (t.src = e);
      var r = document.getElementsByTagName('script')[0];
      r.parentNode.insertBefore(t, r);
    }
  })('https://s.pinimg.com/ct/core.js');
  pintrk('load', 'PINTEREST_TAG_ID');
  pintrk('page');
</script>
```

### Event Tracking

```javascript
// Lead capture
pintrk('track', 'lead', {
  lead_type: 'newsletter',
});

// Signup
pintrk('track', 'signup', {
  value: 0,
  currency: 'USD',
});

// Checkout
pintrk('track', 'checkout', {
  value: 8888,
  currency: 'USD',
  line_items: [
    {
      product_name: "Queen's Reign",
      product_id: 'queens-reign',
      product_price: 8888,
      product_quantity: 1,
    },
  ],
});
```

## Deferred Script Loading

### Performance-Optimized Loading

```typescript
// Load third-party scripts after user interaction or timeout
const loadAnalytics = (() => {
  let loaded = false;

  return function () {
    if (loaded) return;
    loaded = true;

    // GA4
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
    gaScript.async = true;
    document.head.appendChild(gaScript);

    gaScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    };

    // Clarity (load after GA)
    setTimeout(() => {
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', 'CLARITY_ID');
    }, 1000);

    // Meta Pixel (load after Clarity)
    setTimeout(() => {
      // Meta Pixel code here
    }, 2000);
  };
})();

// Trigger on interaction or 3-second timeout
['click', 'scroll', 'keydown', 'touchstart'].forEach((event) => {
  window.addEventListener(event, loadAnalytics, { once: true, passive: true });
});
setTimeout(loadAnalytics, 3000);
```

## Core Web Vitals Tracking

### Web Vitals Implementation

```typescript
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    page: window.location.pathname,
  });

  // Use sendBeacon for reliability
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/vitals', body);
  } else {
    fetch('/api/analytics/vitals', {
      method: 'POST',
      body,
      keepalive: true,
    });
  }

  // Also send to GA4
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

// Initialize tracking
onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

### Performance Budgets

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | <2.5s | 2.5-4.0s | >4.0s |
| INP | <200ms | 200-500ms | >500ms |
| CLS | <0.1 | 0.1-0.25 | >0.25 |
| FCP | <1.8s | 1.8-3.0s | >3.0s |
| TTFB | <0.8s | 0.8-1.8s | >1.8s |

## Reporting Dashboards

### GA4 Custom Reports

**Dashboard 1: Traffic Overview**
| Metric | Dimension |
|--------|-----------|
| Users | Source/Medium |
| Sessions | Landing Page |
| Engagement Rate | Device Category |
| Avg. Engagement Time | Country |

**Dashboard 2: Conversion Funnel**
| Stage | Event |
|-------|-------|
| Visitors | page_view |
| Leads | generate_lead |
| Registrations | challenge_register |
| Applications | application_submit |
| Calls Booked | call_booked |
| Purchases | purchase |

**Dashboard 3: Content Performance**
| Metric | Dimension |
|--------|-----------|
| Pageviews | Page Title |
| Avg. Time on Page | Content Category |
| Scroll Depth | Blog Post |
| Video Completion | Video Title |

### Weekly KPI Report Template

| Metric | This Week | Last Week | Change | Target |
|--------|-----------|-----------|--------|--------|
| Website Visitors | | | | 2,500 |
| New Email Subscribers | | | | 250 |
| Challenge Registrations | | | | 50 |
| Applications | | | | 15 |
| Calls Booked | | | | 10 |
| Sales | | | | 5 |
| Revenue | | | | $25,000 |
| CPL | | | | <$30 |
| CPA | | | | <$200 |
| ROAS | | | | 5x |

### Monthly Review Checklist

- [ ] Traffic trends and sources
- [ ] Conversion rate by funnel stage
- [ ] Top performing content
- [ ] Ad performance by platform
- [ ] Email metrics review
- [ ] Core Web Vitals check
- [ ] User behavior insights (Clarity)
- [ ] Goal progress tracking

## Data Privacy Compliance

### Cookie Consent Implementation

```javascript
// Cookie consent check before loading tracking
function initAnalytics() {
  const consent = getCookieConsent();

  if (consent.analytics) {
    loadGA4();
    loadClarity();
  }

  if (consent.marketing) {
    loadMetaPixel();
    loadPinterestTag();
  }
}

// Consent management
function setCookieConsent(preferences) {
  localStorage.setItem('cookie_consent', JSON.stringify(preferences));

  // Update tracking based on new preferences
  if (preferences.analytics) {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }

  if (preferences.marketing) {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  }
}
```

### Privacy-First Defaults

```javascript
// Default consent mode (denied until user consents)
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500,
});
```

---

*Last Updated: December 2025*
