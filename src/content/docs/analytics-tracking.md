---
title: "Analytics & Tracking Setup Guide"
description: "Google Analytics 4, Search Console, conversion tracking, and SEO monitoring setup for measuring performance and ROI."
---

# Analytics & Tracking Setup Guide

Complete guide to implementing analytics, conversion tracking, and SEO monitoring for Casita Azul.

---

## Google Analytics 4 (GA4) Setup

### Step 1: Create GA4 Property

1. Go to analytics.google.com
2. Click Admin (gear icon)
3. Click "Create Property"
4. Property name: "Casita Azul Website"
5. Select time zone: Pacific Time (US & Canada)
6. Select currency: US Dollar

### Step 2: Install GA4 Tracking Code

Add this to the `<head>` of every page:

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

### Step 3: Enhanced Measurement

Enable these in GA4 Admin > Data Streams > Enhanced Measurement:
- [x] Page views
- [x] Scrolls
- [x] Outbound clicks
- [x] Site search
- [x] Video engagement
- [x] File downloads
- [x] Form interactions

---

## Conversion Tracking Setup

### Primary Conversions to Track

| Conversion | Type | Value | Priority |
|------------|------|-------|----------|
| Tour Request Form | Lead | $100 | High |
| Contact Form Submit | Lead | $50 | High |
| Phone Click | Lead | $25 | Medium |
| Email Click | Lead | $15 | Medium |
| Location Page View | Engagement | $5 | Low |
| Blog 2+ Page Visit | Engagement | $2 | Low |

### GA4 Event Setup

```html
<!-- Tour Request Form Submission -->
<script>
document.getElementById('tour-form').addEventListener('submit', function() {
  gtag('event', 'generate_lead', {
    'event_category': 'Form',
    'event_label': 'Tour Request',
    'value': 100,
    'currency': 'USD'
  });
});
</script>

<!-- Phone Click Tracking -->
<a href="tel:5035550123" onclick="gtag('event', 'click', {
  'event_category': 'Contact',
  'event_label': 'Phone Click',
  'value': 25
});">Call Us</a>

<!-- Email Click Tracking -->
<a href="mailto:info@casitaazul.com" onclick="gtag('event', 'click', {
  'event_category': 'Contact',
  'event_label': 'Email Click',
  'value': 15
});">Email Us</a>
```

### Setting Up Conversions in GA4

1. Go to Admin > Events
2. Find your event (e.g., "generate_lead")
3. Toggle "Mark as conversion"

---

## Google Tag Manager Setup (Recommended)

### Why Use GTM?
- No code changes needed for new tracking
- Version control for tracking
- Easy to add/remove tags
- Debug mode for testing

### GTM Container Code

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Add to <body> immediately after opening tag -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

### Essential GTM Tags to Create

| Tag Name | Trigger | Tag Type |
|----------|---------|----------|
| GA4 - Page View | All Pages | GA4 Configuration |
| GA4 - Form Submit | Form Submission | GA4 Event |
| GA4 - Phone Click | Click - tel: links | GA4 Event |
| GA4 - Email Click | Click - mailto: links | GA4 Event |
| GA4 - Scroll 50% | Scroll Depth 50% | GA4 Event |
| GA4 - Scroll 90% | Scroll Depth 90% | GA4 Event |
| Facebook Pixel | All Pages | Custom HTML |

---

## Google Search Console Setup

### Step 1: Verify Ownership

1. Go to search.google.com/search-console
2. Add property: `https://casitaazul.com`
3. Verify via:
   - HTML file upload (recommended)
   - HTML tag in `<head>`
   - DNS record
   - Google Analytics (if already installed)

### Step 2: Submit Sitemap

1. Go to Sitemaps in left menu
2. Enter: `sitemap.xml`
3. Click Submit

### Step 3: Configure Settings

- [ ] Set preferred domain (www vs non-www)
- [ ] Add all URL variations as properties
- [ ] Enable email notifications for issues
- [ ] Link to Google Analytics

### Key Reports to Monitor

| Report | What to Look For | Frequency |
|--------|------------------|-----------|
| Performance | Clicks, impressions, CTR, position | Weekly |
| Coverage | Indexing errors, excluded pages | Weekly |
| Core Web Vitals | LCP, INP, CLS issues | Monthly |
| Mobile Usability | Mobile-specific issues | Monthly |
| Links | New/lost backlinks | Monthly |

---

## Bing Webmaster Tools

### Setup

1. Go to bing.com/webmasters
2. Import from Google Search Console (easiest)
3. Or verify manually with meta tag

```html
<meta name="msvalidate.01" content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
```

---

## SEO Tracking Dashboard

### Key Metrics to Track Weekly

| Metric | Source | Target |
|--------|--------|--------|
| Organic Sessions | GA4 | +10% MoM |
| Organic Conversions | GA4 | +15% MoM |
| Avg. Position | GSC | Improve by 2 |
| Impressions | GSC | +20% MoM |
| CTR | GSC | >3% |
| Indexed Pages | GSC | All important pages |
| Core Web Vitals | GSC | All "Good" |

### Keyword Ranking Tracker

Track these priority keywords:

| Keyword | Current Rank | Target | Page |
|---------|--------------|--------|------|
| spanish immersion preschool portland | ? | Top 3 | Homepage |
| spanish daycare portland | ? | Top 5 | Homepage |
| bilingual preschool portland | ? | Top 5 | Homepage |
| spanish preschool hillsboro | ? | Top 3 | Location page |
| spanish daycare beaverton | ? | Top 3 | Location page |
| infant spanish immersion | ? | Top 10 | Programs |

---

## Call Tracking Setup

### Option 1: Google Call Tracking

If using Google Ads, enable call tracking in your campaigns.

### Option 2: CallRail or Similar

For detailed call analytics:

1. Sign up for CallRail (or similar)
2. Create tracking numbers for each location
3. Replace phone numbers on website with tracking numbers
4. Set up call recording (with disclosure)
5. Integrate with GA4

```html
<!-- CallRail Integration -->
<script>
  var _paq = _paq || [];
  _paq.push(['trackEvent', 'Call', 'Phone Click', 'Location Name']);
</script>
```

---

## Form Tracking Details

### Track Every Form Field

```javascript
// Track form field interactions
document.querySelectorAll('form input, form select, form textarea').forEach(function(field) {
  field.addEventListener('focus', function() {
    gtag('event', 'form_field_focus', {
      'form_name': this.closest('form').id || 'unknown',
      'field_name': this.name
    });
  });
});

// Track form abandonment
window.addEventListener('beforeunload', function() {
  var forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    var fields = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
    var filledFields = Array.from(fields).filter(function(f) { return f.value; });

    if (filledFields.length > 0) {
      gtag('event', 'form_abandonment', {
        'form_name': form.id || 'unknown',
        'fields_filled': filledFields.length
      });
    }
  });
});
```

---

## UTM Parameter Strategy

### Standard Campaign Parameters

| Parameter | Use |
|-----------|-----|
| utm_source | Traffic source (google, facebook, newsletter) |
| utm_medium | Marketing medium (cpc, email, social) |
| utm_campaign | Campaign name (spring_enrollment_2024) |
| utm_content | Ad/content variation (blue_button, image_a) |
| utm_term | Paid keyword (spanish+preschool+portland) |

### Example URLs

```
# Google Ads
https://casitaazul.com/?utm_source=google&utm_medium=cpc&utm_campaign=spanish_preschool&utm_term=spanish+immersion+portland

# Facebook Ad
https://casitaazul.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=spring_enrollment&utm_content=video_ad

# Email Newsletter
https://casitaazul.com/blog/spanish-songs/?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_tips_dec2024

# Google Business Profile
https://casitaazul.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_hillsboro
```

---

## Custom Dashboards

### Google Looker Studio (Data Studio)

Create a unified dashboard with:
1. GA4 data (traffic, conversions)
2. GSC data (rankings, impressions)
3. Call tracking data
4. Form submission data

### Recommended Dashboard Sections

1. **Overview**
   - Total sessions (last 30 days)
   - Organic sessions
   - Conversions
   - Conversion rate

2. **Organic Performance**
   - Top landing pages
   - Top keywords
   - Position changes

3. **Conversions**
   - Tour requests by source
   - Contact form submissions
   - Phone calls by location

4. **Location Performance**
   - Sessions by location page
   - Conversions by location
   - Local pack clicks

---

## Privacy & Compliance

### Cookie Consent Banner

Required for GDPR/CCPA compliance:

```html
<!-- Cookie Consent (using CookieConsent library) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" />
<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"></script>
<script>
window.cookieconsent.initialise({
  "palette": {
    "popup": { "background": "#2c3e50" },
    "button": { "background": "#3498db" }
  },
  "content": {
    "message": "We use cookies to improve your experience and analyze site traffic.",
    "dismiss": "Accept",
    "link": "Privacy Policy",
    "href": "/privacy-policy/"
  },
  onInitialise: function (status) {
    if (status === 'allow') {
      // Initialize tracking
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  },
  onStatusChange: function(status) {
    if (status === 'allow') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }
});
</script>
```

### GA4 Consent Mode

```html
<script>
// Set default consent to denied
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});
</script>
```

---

## Analytics Implementation Checklist

### Initial Setup
- [ ] Create GA4 property
- [ ] Install GA4 tracking code on all pages
- [ ] Enable enhanced measurement
- [ ] Set up Google Tag Manager (recommended)
- [ ] Verify site in Google Search Console
- [ ] Submit XML sitemap
- [ ] Set up Bing Webmaster Tools

### Conversion Tracking
- [ ] Configure tour request form tracking
- [ ] Configure contact form tracking
- [ ] Set up phone click tracking
- [ ] Set up email click tracking
- [ ] Mark key events as conversions in GA4
- [ ] Test all conversion tracking

### Ongoing Monitoring
- [ ] Create Looker Studio dashboard
- [ ] Set up weekly email reports
- [ ] Configure alerts for traffic drops
- [ ] Set up rank tracking for priority keywords
- [ ] Schedule monthly SEO review meetings

### Compliance
- [ ] Implement cookie consent banner
- [ ] Configure GA4 consent mode
- [ ] Create/update privacy policy
- [ ] Ensure data retention settings are appropriate

---

## Troubleshooting

### GA4 Not Tracking

1. Check tracking code is on all pages
2. Use GA Debugger Chrome extension
3. Check for JavaScript errors in console
4. Verify no ad blockers interfering
5. Check real-time reports in GA4

### GSC Not Showing Data

1. Verify site ownership is confirmed
2. Check property is correct (www vs non-www, http vs https)
3. Wait 48-72 hours for initial data
4. Ensure pages are indexed (URL Inspection tool)

### Form Tracking Not Working

1. Check event is firing (use GTM Preview mode)
2. Verify form ID matches tracking code
3. Check for AJAX form submissions
4. Test with GA4 DebugView

---

*Last Updated: December 2024*
