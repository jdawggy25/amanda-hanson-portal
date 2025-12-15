---
title: "Epic 01: Technical SEO Foundation"
description: "Establish the technical foundation required for all SEO/GEO efforts. Without these fundamentals, content and link building efforts will have..."
category: "developer"
---

# Epic 01: Technical SEO Foundation

## Epic Overview

| Field | Value |
|-------|-------|
| **Epic ID** | EPIC-01 |
| **Title** | Technical SEO Foundation |
| **Priority** | P0 - Critical |
| **Sprint** | Sprint 1 (Week 1-2) |
| **Owner** | Technical/Dev Team |
| **Estimated Effort** | 40 story points |

## Business Value

Establish the technical foundation required for all SEO/GEO efforts. Without these fundamentals, content and link building efforts will have diminished impact.

## Acceptance Criteria

- [ ] All pages have self-referencing canonical tags
- [ ] XML sitemap is valid and submitted to search engines
- [ ] Robots.txt is optimized and verified
- [ ] Organization schema is implemented site-wide
- [ ] Core Web Vitals meet targets (LCP < 2.5s, CLS < 0.1)
- [ ] Google Business Profile is verified and optimized
- [ ] GA4 and Search Console are properly configured

---

## Stories

### Story 1.1: Implement Canonical Tags

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.1 |
| **Priority** | P0 |
| **Points** | 5 |
| **Status** | Not Started |

**As a** search engine crawler
**I want** self-referencing canonical tags on every page
**So that** duplicate content issues are prevented and link equity is consolidated

**Acceptance Criteria:**
- [ ] Every page has `<link rel="canonical" href="[absolute URL]" />`
- [ ] Canonical URLs use HTTPS and preferred domain format
- [ ] No pages have conflicting canonical signals
- [ ] Verified in Screaming Frog crawl

**Tasks:**
1. Audit current canonical tag implementation
2. Create canonical tag template/component
3. Implement on all page templates
4. Test and verify across site
5. Document implementation

---

### Story 1.2: Optimize XML Sitemap

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.2 |
| **Priority** | P0 |
| **Points** | 3 |
| **Status** | Not Started |

**As a** search engine
**I want** a valid, prioritized XML sitemap
**So that** I can efficiently crawl and index all important pages

**Acceptance Criteria:**
- [ ] Sitemap.xml exists at root and is valid
- [ ] All canonical, indexable URLs included
- [ ] Priority values set (Homepage: 1.0, Products: 0.9, Blog: 0.6)
- [ ] Last modified dates accurate
- [ ] Submitted to Google Search Console
- [ ] Submitted to Bing Webmaster Tools

**Tasks:**
1. Generate/update XML sitemap
2. Validate sitemap format
3. Set priority values per page type
4. Submit to search engines
5. Verify indexing in GSC

---

### Story 1.3: Configure Robots.txt

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.3 |
| **Priority** | P0 |
| **Points** | 2 |
| **Status** | Not Started |

**As a** search engine crawler
**I want** clear crawl directives
**So that** I focus on important content and avoid duplicate/admin pages

**Acceptance Criteria:**
- [ ] Robots.txt allows crawling of public pages
- [ ] Admin, staging, API routes blocked
- [ ] UTM parameters blocked to prevent duplicate content
- [ ] Sitemap location referenced
- [ ] Tested in Google Search Console

**Tasks:**
1. Review current robots.txt
2. Update with proper directives
3. Test in GSC robots tester
4. Deploy and verify

---

### Story 1.4: Implement Organization Schema

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.4 |
| **Priority** | P1 |
| **Points** | 5 |
| **Status** | Not Started |

**As a** search engine / AI model
**I want** structured organization data
**So that** I understand V3 Biomedical's identity and can feature it accurately

**Acceptance Criteria:**
- [ ] MedicalOrganization schema on all pages
- [ ] Includes name, URL, logo, description
- [ ] Includes contact information
- [ ] Includes social media links
- [ ] Validates in Google Rich Results Test
- [ ] No errors in Search Console

**Tasks:**
1. Create JSON-LD organization schema
2. Add to site header/footer template
3. Test in Rich Results Test
4. Deploy and monitor

---

### Story 1.5: Setup Google Business Profile

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.5 |
| **Priority** | P1 |
| **Points** | 8 |
| **Status** | Not Started |

**As a** local searcher
**I want** to find V3 Biomedical's verified business information
**So that** I can trust and contact the company

**Acceptance Criteria:**
- [ ] GBP created and verified
- [ ] All business information complete (address, phone, hours, website)
- [ ] Business category set to "Software Company"
- [ ] Photos uploaded (office, team, product screenshots)
- [ ] Products and services listed
- [ ] Q&A seeded with 5+ common questions
- [ ] Access granted to seth@comcreate.org and brody@comcreate.org

**Tasks:**
1. Create GBP at business.google.com
2. Complete verification process
3. Fill all profile fields
4. Upload photos and assets
5. Add products/services
6. Create initial Q&A content
7. Grant team access

---

### Story 1.6: Optimize Core Web Vitals

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.6 |
| **Priority** | P1 |
| **Points** | 8 |
| **Status** | Not Started |

**As a** website visitor
**I want** fast page load times
**So that** I have a good user experience and don't bounce

**Acceptance Criteria:**
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] PageSpeed score 90+ mobile, 95+ desktop
- [ ] Verified in PageSpeed Insights

**Tasks:**
1. Run baseline PageSpeed audit
2. Optimize images (WebP, compression, lazy loading)
3. Minify CSS/JS
4. Enable compression (GZIP/Brotli)
5. Implement browser caching
6. Remove render-blocking resources
7. Re-test and verify improvements

---

### Story 1.7: Configure Analytics & Tracking

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.7 |
| **Priority** | P1 |
| **Points** | 5 |
| **Status** | Not Started |

**As a** marketing team member
**I want** proper analytics tracking
**So that** I can measure SEO performance and conversions

**Acceptance Criteria:**
- [ ] GA4 property configured
- [ ] Tracking code on all pages
- [ ] Key events defined (form submissions, demo requests, downloads)
- [ ] AI referral tracking filter configured
- [ ] Search Console linked to GA4
- [ ] Conversion goals set up

**Tasks:**
1. Verify GA4 property setup
2. Configure event tracking
3. Set up conversion goals
4. Create AI referral regex filter
5. Link Search Console
6. Create performance dashboard

---

### Story 1.8: Technical SEO Audit & Documentation

| Field | Value |
|-------|-------|
| **Story ID** | STORY-1.8 |
| **Priority** | P2 |
| **Points** | 4 |
| **Status** | Not Started |

**As a** SEO manager
**I want** a documented technical baseline
**So that** I can track improvements and maintain standards

**Acceptance Criteria:**
- [ ] Full Screaming Frog crawl completed
- [ ] All issues documented
- [ ] Baseline metrics recorded
- [ ] Technical SEO checklist created for ongoing use

**Tasks:**
1. Run full site crawl
2. Document findings
3. Prioritize issues
4. Record baseline metrics
5. Create maintenance checklist

---

## Dependencies

- Access to website codebase
- Google Business Profile verification may require physical presence
- GA4 access credentials

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| GBP verification delays | Medium | Start early, prepare video if needed |
| CWV fixes require dev resources | High | Prioritize quick wins first |
| Schema implementation complexity | Medium | Use JSON-LD, test thoroughly |

## Definition of Done

- All stories completed and verified
- No critical SEO errors in Search Console
- PageSpeed score meets targets
- GBP verified and optimized
- Documentation updated
