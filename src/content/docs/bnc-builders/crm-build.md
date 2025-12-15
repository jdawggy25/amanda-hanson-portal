---
title: "Custom CRM Build"
description: "Purpose-built CRM for contractor lead management and sales tracking"
---

# Custom CRM Build

## Why a Custom CRM?

You're currently using BuilderTrend (or similar) for project management. That's great for managing jobs, but it wasn't built for:

- **Marketing attribution** - Where did this lead come from?
- **Lead nurturing** - Automated follow-up sequences
- **Sales pipeline** - Track leads from inquiry to close
- **ROI tracking** - Which marketing channels drive revenue?

## Two Options

### Option A: Full Replacement

Build a complete CRM that handles everything from lead capture to project completion.

**Pros:**
- One system for everything
- No monthly SaaS fees
- Fully customized to your workflow

**Cons:**
- Larger scope, longer timeline
- Replaces what already works (project management)

### Option B: Marketing CRM + Integration (Recommended)

Build a lead management and marketing automation system that integrates with BuilderTrend.

**Pros:**
- Keep what works (project management)
- Faster to build
- Purpose-built for marketing/sales
- Clean handoff: Lead closes → Goes to BuilderTrend

**Cons:**
- Two systems to manage
- Integration maintenance

**Our Recommendation:** Option B - Start with marketing CRM, expand later if needed.

## CRM Core Features

### Lead Management

**Lead Capture:**
```
Website Form → CRM (auto-created lead)
Phone Call (CallRail) → CRM (auto-created lead)
Manual Entry → CRM
```

**Lead Record Contains:**
- Contact info (name, email, phone, address)
- Lead source (Google Ads, Meta, Organic, Referral)
- UTM parameters (campaign, medium, keyword)
- Service interest
- Project timeline
- Notes and communication history

**Lead Scoring:**
Automatically score leads based on:
| Factor | Points |
|--------|--------|
| Form submission | +10 |
| Phone call (30+ sec) | +15 |
| ADU interest | +20 (high ticket) |
| Timeline: ASAP | +15 |
| Timeline: 6+ months | +5 |
| Multiple page views | +5 |
| Opened email | +3 |

### Pipeline Management

**Stages:**
```
New Lead
    ↓
Contacted (1st touch made)
    ↓
Appointment Set (consultation scheduled)
    ↓
Estimate Sent (proposal delivered)
    ↓
Negotiating (follow-up phase)
    ↓
Won → Handoff to BuilderTrend
Lost → Lost reason captured
```

**Pipeline View:**
Visual Kanban board showing all leads by stage, with:
- Lead name and service
- Days in stage
- Lead value (estimated project size)
- Next action due

### Automation

**Instant Notifications:**
When a new lead comes in:
- Email to sales team
- SMS to sales team
- Slack notification (optional)

**Auto-Response:**
Immediate email to lead:
```
Subject: Thanks for contacting BNC Builders!

Hi [First Name],

Thank you for reaching out about your [service] project.

A member of our team will contact you within [X hours] to
discuss your project and schedule a free consultation.

In the meantime, check out some of our recent work:
[Portfolio Link]

Best,
The BNC Builders Team
```

**Follow-Up Sequences:**
If no response after 24 hours:
- Day 1: Email reminder
- Day 3: SMS follow-up
- Day 7: Email with portfolio
- Day 14: "Still interested?" email

**Re-Engagement:**
For leads that went cold:
- 30-day check-in
- 90-day seasonal outreach
- Newsletter (monthly)

### Reporting & Analytics

**Dashboard Shows:**
- Leads this month (vs. last month)
- Leads by source
- Pipeline value
- Close rate
- Average days to close
- Revenue by source

**Reports Available:**
| Report | Purpose |
|--------|---------|
| Lead Source ROI | Which channels drive revenue |
| Sales Performance | Close rates, cycle time |
| Service Analysis | Which services convert best |
| Location Analysis | Which areas are most profitable |

### Offline Conversion Tracking

**The Key Feature:** Connect marketing data to actual revenue.

```
Google Ad Click (GCLID captured)
        ↓
Website Visit (tracked)
        ↓
Form Submission (GCLID stored with lead)
        ↓
Lead Created in CRM
        ↓
Appointment Set
        ↓
Estimate Sent
        ↓
Deal Won ($50,000 project)
        ↓
Conversion sent back to Google Ads
        ↓
Google knows: "This keyword drove a $50k deal"
        ↓
Google optimizes for more deals like this
```

**Result:** Google Ads (and Meta) optimize for revenue, not just leads.

## Technical Architecture

### Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | Next.js 14 | Fast, modern, React-based |
| Backend | Next.js API Routes | Serverless, scalable |
| Database | Supabase (PostgreSQL) | Reliable, real-time capable |
| Auth | Supabase Auth | Secure, easy user management |
| Email | Resend | Modern, developer-friendly |
| SMS | Twilio | Industry standard |
| Hosting | Vercel | Fast deploys, great DX |

### Database Schema (Simplified)

```
leads
├── id
├── first_name
├── last_name
├── email
├── phone
├── address
├── service_interest
├── lead_source
├── utm_source
├── utm_medium
├── utm_campaign
├── utm_content
├── gclid (Google Click ID)
├── fbclid (Facebook Click ID)
├── lead_score
├── pipeline_stage
├── assigned_to
├── estimated_value
├── created_at
├── updated_at

activities
├── id
├── lead_id
├── type (email, call, note, stage_change)
├── content
├── created_by
├── created_at

automations
├── id
├── name
├── trigger
├── actions
├── active

estimates
├── id
├── lead_id
├── amount
├── status
├── sent_at
├── viewed_at
├── signed_at
```

### Integrations

| Integration | Direction | Purpose |
|-------------|-----------|---------|
| Website Forms | Inbound | Lead capture |
| CallRail | Inbound | Phone lead creation |
| GA4 | Outbound | Event tracking |
| Google Ads | Outbound | Offline conversions |
| Meta Ads | Outbound | Offline conversions |
| BuilderTrend | Outbound | Won deal handoff |
| Email (Gmail) | Both | Communication logging |
| Calendar | Both | Appointment scheduling |

## User Interface

### Lead List View
```
┌─────────────────────────────────────────────────────────────┐
│ Leads                                        [+ New Lead]   │
├─────────────────────────────────────────────────────────────┤
│ Filter: All | New | Contacted | Appt Set | Estimate | Won   │
├─────────────────────────────────────────────────────────────┤
│ ☐ John Smith      Kitchen      Google Ads    2h ago    85   │
│ ☐ Sarah Johnson   ADU          Organic       1d ago    92   │
│ ☐ Mike Williams   Bathroom     Meta          2d ago    78   │
│ ☐ Lisa Brown      Deck         Referral      3d ago    65   │
└─────────────────────────────────────────────────────────────┘
```

### Lead Detail View
```
┌─────────────────────────────────────────────────────────────┐
│ ← Back    John Smith                    Score: 85    ⭐     │
├─────────────────────────────────────────────────────────────┤
│ Contact Info          │ Lead Details                        │
│ ─────────────         │ ────────────                        │
│ 📱 (619) 555-1234     │ Service: Kitchen Remodeling        │
│ ✉️ john@email.com     │ Source: Google Ads                  │
│ 📍 Escondido, CA      │ Campaign: kitchen_remodel_sd        │
│                       │ Timeline: 1-3 months                │
│ [Call] [Email] [SMS]  │ Est. Value: $45,000                │
├─────────────────────────────────────────────────────────────┤
│ Pipeline: [New] → [Contacted] → [Appt Set] → [Est] → [Won] │
├─────────────────────────────────────────────────────────────┤
│ Activity Timeline                                           │
│ ─────────────────                                           │
│ Today 2:30pm - Form submitted (Kitchen page)               │
│ Today 2:31pm - Auto-response email sent                    │
│ Today 2:32pm - Assigned to Sales Team                      │
│ [+ Add Note]  [+ Log Call]  [+ Send Email]                 │
└─────────────────────────────────────────────────────────────┘
```

### Pipeline Board View
```
┌───────────┬───────────┬───────────┬───────────┬───────────┐
│   NEW     │ CONTACTED │  APPT SET │  ESTIMATE │    WON    │
│   (5)     │    (3)    │    (2)    │    (4)    │   (12)    │
├───────────┼───────────┼───────────┼───────────┼───────────┤
│ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │
│ │J Smith│ │ │M Jones│ │ │L Davis│ │ │R White│ │ │T Green│ │
│ │Kitchen│ │ │  ADU  │ │ │Bath   │ │ │Kitchen│ │ │Kitchen│ │
│ │$45,000│ │ │$150k  │ │ │$28,000│ │ │$52,000│ │ │$48,000│ │
│ │ 2h    │ │ │ 1d    │ │ │ 3d    │ │ │ 5d    │ │ │$48,000│ │
│ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │
│    ...    │    ...    │    ...    │    ...    │    ...    │
└───────────┴───────────┴───────────┴───────────┴───────────┘
```

## Development Timeline

### Sprint 1 (Weeks 7-8): Core CRM
- Database setup
- Lead management (CRUD)
- Pipeline stages
- Basic UI

### Sprint 2 (Weeks 9-10): Integrations
- Website form integration
- CallRail integration
- Email/SMS sending
- Automation engine

### Sprint 3 (Weeks 11-12): Polish & Launch
- Reporting dashboard
- Google/Meta conversion sync
- User training
- Launch

## Deliverables

At the end of the CRM build, you'll have:

1. **Lead Management System** - Capture, track, and manage all leads
2. **Pipeline Dashboard** - Visual sales pipeline
3. **Automation Engine** - Auto-responses, follow-up sequences
4. **Reporting** - Lead source ROI, close rates, revenue tracking
5. **Integrations** - Website, CallRail, Google Ads, Meta
6. **User Training** - Documentation and walkthrough
7. **Source Code** - You own it completely

## Ongoing Support

**Included in monthly retainer:**
- Bug fixes
- Minor enhancements
- Integration maintenance
- User support

**Major feature additions:** Quoted separately

## Future Possibilities

Once the core CRM is running, we can add:
- Customer portal (project updates)
- Estimate/proposal builder
- Review request automation
- Referral tracking
- Advanced reporting
- Mobile app

**Start simple, expand based on needs.**
