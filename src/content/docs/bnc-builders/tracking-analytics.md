---
title: "Tracking & Analytics"
description: "Enterprise-grade tracking setup for complete marketing attribution"
---

# Tracking & Analytics Setup

## The Problem We're Solving

**"Where do my leads come from?"**

Most contractors can't answer this question accurately. Without proper tracking, you're:
- Wasting money on ads that don't convert
- Missing high-performing channels
- Making decisions based on gut feel, not data

## Our Approach: Full-Funnel Attribution

We track everything from first website visit to closed deal:

```
First Touch → Website Visit → Lead → Sale → Revenue
     ↓              ↓           ↓       ↓        ↓
   Source       Behavior    Conversion  CRM    Attribution
```

## Google Tag Manager Architecture

We'll build a professional GTM container that tracks all user interactions:

```
GTM Container (BNC Builders)
│
├── Configuration
│   ├── GA4 Configuration
│   └── Consent Mode Setup
│
├── Lead Generation
│   ├── Form Submissions
│   ├── Phone Clicks
│   ├── Email Clicks
│   └── Chat Interactions
│
├── Engagement Tracking
│   ├── Scroll Depth (25/50/75/100%)
│   ├── Video Plays
│   ├── Video Completions
│   ├── File Downloads
│   ├── Outbound Clicks
│   └── CTA Clicks
│
├── Advertising
│   ├── Google Ads Conversions
│   ├── Google Ads Remarketing
│   ├── Meta Pixel Events
│   └── Meta Conversions API
│
└── Analytics
    ├── Microsoft Clarity (Heatmaps)
    └── Custom Dimensions
```

## GA4 Event Structure

### Conversion Events

These are the money events - we'll import them to Google Ads for optimization:

**Form Submission:**
```javascript
gtag('event', 'generate_lead', {
  event_category: 'lead',
  form_name: 'contact_main',
  form_location: 'homepage_hero',
  service_interest: 'kitchen_remodeling',
  lead_value: 50
});
```

**Phone Call Click:**
```javascript
gtag('event', 'phone_click', {
  event_category: 'lead',
  phone_location: 'header',
  page_path: '/kitchen-remodeling/'
});
```

**Quote Request:**
```javascript
gtag('event', 'generate_lead', {
  event_category: 'lead',
  form_name: 'quote_request',
  service_type: 'adu',
  project_timeline: '3-6_months',
  lead_value: 100
});
```

### Engagement Events

**Service Page Views:**
```javascript
gtag('event', 'view_service', {
  service_name: 'kitchen_remodeling',
  service_category: 'home_remodeling'
});
```

**Portfolio Interactions:**
```javascript
gtag('event', 'view_portfolio', {
  portfolio_category: 'kitchens',
  project_viewed: 'modern_escondido_kitchen'
});
```

**Scroll Depth:**
```javascript
gtag('event', 'scroll', {
  percent_scrolled: 75,
  page_type: 'service_page'
});
```

## Conversion Value Assignment

We assign dollar values to each conversion for ROI tracking:

| Conversion Type | Value | Rationale |
|-----------------|-------|-----------|
| Contact Form | $50 | Average lead value |
| Quote Request | $100 | Higher intent |
| Phone Call (30+ sec) | $75 | Qualified conversation |
| Email Click | $25 | Lower intent |
| Chat Start | $50 | Active engagement |

These values feed into Google Ads smart bidding for optimization.

## Call Tracking (CallRail)

### Why Call Tracking Matters

For contractors, **phone calls are often your best leads**. Without call tracking:
- You don't know which ads drove the call
- You can't optimize for call conversions
- You're missing half your attribution data

### Setup

**Main Tracking Number:**
- New local number: (760) XXX-XXXX
- Forwards to your real number
- Records call duration and outcome

**Dynamic Number Insertion (DNI):**
- Website displays different numbers by source
- Google Ads visitor sees one number
- Organic visitor sees another
- Allows keyword-level tracking

**Source Pools:**
| Source | Tracking |
|--------|----------|
| Google Ads | Keyword-level |
| Meta Ads | Campaign-level |
| Organic Search | Source-level |
| Direct | Baseline |
| Referral | Source-level |

### Integrations

```
CallRail
    ├── → GA4 (phone_call events)
    ├── → Google Ads (offline conversions)
    ├── → CRM (auto-create leads)
    └── → Slack (real-time alerts)
```

**Call Recording:** Optional, with proper disclosure. Useful for training and quality assurance.

## Meta Pixel + Conversions API

### Why Server-Side Tracking?

iOS 14+ privacy changes killed browser cookie tracking. Most Meta Pixel data is now blocked. **Server-side tracking (CAPI) is required** for accurate attribution.

### Pixel Events

**Lead Event:**
```javascript
fbq('track', 'Lead', {
  content_name: 'contact_form',
  content_category: 'kitchen_remodeling',
  value: 50.00,
  currency: 'USD'
});
```

**View Content:**
```javascript
fbq('track', 'ViewContent', {
  content_type: 'service',
  content_name: 'bathroom_remodeling'
});
```

**Schedule:**
```javascript
fbq('track', 'Schedule');
```

### Conversions API Implementation

**Method:** Server-side via GTM Server Container

**Benefits:**
- Bypasses ad blockers
- Not affected by iOS privacy changes
- Higher match rates
- More accurate attribution

**Event Match Quality Target:** 6.0+ (out of 10)

## Microsoft Clarity (Heatmaps)

**Free tool** that shows exactly how visitors use your site:

**Features:**
- Heatmaps (where people click)
- Scroll maps (how far they read)
- Session recordings (watch real visits)
- Rage click detection (frustration signals)
- Dead click detection (broken elements)

**Use Cases:**
- See where people drop off on forms
- Identify confusing navigation
- Find mobile usability issues
- Optimize conversion flows

## GA4 Dashboard Setup

### Key Reports We'll Build

**1. Lead Source Report**
| Source | Leads | Cost | CPL |
|--------|-------|------|-----|
| Google Ads | 45 | $2,500 | $55.56 |
| Meta Ads | 28 | $1,800 | $64.29 |
| Organic | 32 | $0 | $0 |
| Direct | 15 | $0 | $0 |
| Referral | 8 | $0 | $0 |

**2. Service Interest Report**
| Service | Form Fills | Phone Calls | Total |
|---------|------------|-------------|-------|
| Kitchen | 25 | 18 | 43 |
| Bathroom | 20 | 15 | 35 |
| ADU | 12 | 8 | 20 |
| Deck | 8 | 5 | 13 |

**3. Location Performance**
| City | Traffic | Leads | Conversion Rate |
|------|---------|-------|-----------------|
| Escondido | 450 | 25 | 5.5% |
| Carlsbad | 280 | 18 | 6.4% |
| Oceanside | 220 | 12 | 5.5% |

**4. Funnel Visualization**
```
Homepage → Service Page → Contact Page → Form Submit
  1,000        450            120           45
         55%          27%           37.5%
```

## Offline Conversion Tracking

### The Holy Grail: Closed-Loop Attribution

Track from click to closed deal:

```
Google Ad Click
      ↓
  Website Visit (GA4)
      ↓
  Form Submission (GA4 + CRM)
      ↓
  Lead Created (CRM)
      ↓
  Appointment Set (CRM)
      ↓
  Estimate Sent (CRM)
      ↓
  Deal Won (CRM → Google Ads)
```

**Result:** Google Ads knows which keywords and ads drive actual revenue, not just leads.

### Implementation

1. Pass Google Click ID (GCLID) with form submissions
2. Store GCLID in CRM with lead record
3. When deal closes, send conversion back to Google Ads
4. Google optimizes for revenue, not just clicks

## Privacy & Compliance

### GDPR/CCPA Compliance

**Consent Mode v2:**
- Cookie consent banner
- Respects user privacy choices
- Maintains some tracking via modeling

**Data Retention:**
- GA4: 14 months (max)
- CallRail: Per your policy
- CRM: Per your policy

### What We Track

- Website interactions (anonymous until consent)
- Form submissions (with consent)
- Phone calls (with disclosure)
- Advertising data (hashed/anonymized)

### What We Don't Track

- Personal information without consent
- Financial information
- Health information

## Deliverables

At the end of this phase, you'll have:

1. **GTM Container** - Professional tag management
2. **GA4 Setup** - Conversion tracking, custom events
3. **CallRail Integration** - Phone call attribution
4. **Meta Pixel + CAPI** - Accurate Facebook tracking
5. **Clarity Heatmaps** - User behavior insights
6. **Custom Dashboards** - Real-time reporting
7. **Documentation** - How everything works

## Monthly Reporting

Every month, you'll receive:

- Lead volume by source
- Cost per lead by channel
- Top performing pages
- Conversion rate trends
- Recommendations for optimization

**You'll always know:** Where your leads come from and what they cost.
