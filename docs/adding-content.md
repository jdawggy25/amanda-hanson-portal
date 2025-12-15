# 📝 Adding Content

Learn how to add and organize documentation for your clients.

## Quick Start

### Add a Page (Drag & Drop)

1. Create a markdown file anywhere
2. Drag it to `src/content/docs/<client-id>/docs/`
3. Refresh browser - it appears automatically!

### Add a Page (Command Line)

```bash
# Create file
touch src/content/docs/acme-corp/docs/my-report.md

# Edit with your editor
code src/content/docs/acme-corp/docs/my-report.md
```

## File Structure

```
src/content/docs/<client-id>/
├── docs/              ← Client-facing documentation
│   ├── getting-started.md
│   ├── seo-strategy.md
│   └── technical-audit.md
│
└── dev/               ← Developer documentation
    ├── analytics-setup.md
    └── crm-integration.md
```

### Two Categories

**docs/** - Client-facing content
- SEO reports
- Strategy documents
- Performance analysis
- Recommendations
- Monthly reports

**dev/** - Technical content
- Implementation guides
- Analytics setup
- CRM integration
- API documentation
- Technical specifications

## Markdown File Format

### Basic Template

```markdown
---
title: "Page Title"
description: "Brief description of the page"
---

# Page Title

Your content here...

## Section 1

Content for section 1.

## Section 2

Content for section 2.
```

### Frontmatter Fields

```yaml
---
title: "SEO Strategy Report"           # Required - page heading
description: "Q4 2025 SEO strategy"    # Optional - shows in cards
---
```

**title** (required)
- Appears as page heading
- Shows in navigation
- Used in browser tab

**description** (optional)
- Shows in homepage cards
- Helps users understand content
- Good for SEO

## Content Organization

### File Naming

**For automatic ordering:**
```
01-executive-summary.md
02-seo-strategy.md
03-keyword-research.md
04-technical-audit.md
05-recommendations.md
```

**For readable URLs:**
```
executive-summary.md     → /client/executive-summary
seo-strategy.md          → /client/seo-strategy
keyword-research.md      → /client/keyword-research
```

**Best practice:** Use prefixes for ordering
```
✅ 01-getting-started.md
✅ 02-seo-strategy.md
✅ 03-technical-audit.md

❌ page1.md
❌ doc.md
❌ untitled.md
```

### Directory Structure Example

```
src/content/docs/acme-corp/
│
├── docs/                           ← Client-facing
│   ├── 01-executive-summary.md
│   ├── 02-current-state.md
│   ├── 03-seo-strategy.md
│   ├── 04-keyword-research.md
│   ├── 05-technical-audit.md
│   ├── 06-content-strategy.md
│   ├── 07-link-building.md
│   └── 08-recommendations.md
│
└── dev/                            ← Technical
    ├── 01-analytics-setup.md
    ├── 02-tracking-implementation.md
    ├── 03-crm-integration.md
    └── 04-api-documentation.md
```

## Markdown Features

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

### Lists

```markdown
Unordered list:
- Item 1
- Item 2
  - Nested item
  - Another nested item

Ordered list:
1. First item
2. Second item
3. Third item
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](./other-page)
```

### Images

```markdown
![Alt text](https://example.com/image.jpg)
![Local image](/images/chart.png)
```

### Code Blocks

````markdown
```javascript
function example() {
  console.log("Hello world");
}
```

```python
def example():
    print("Hello world")
```
````

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
```

## Example Pages

### Example 1: SEO Strategy Report

```markdown
---
title: "SEO Strategy Report"
description: "Comprehensive SEO strategy for Q4 2025"
---

# SEO Strategy Report

## Executive Summary

Our analysis reveals significant opportunities for growth in organic search.

## Current State

### Traffic Analysis
- Monthly visitors: 25,000
- Organic traffic: 65%
- Top performing pages: Homepage, Services, Blog

### Keyword Rankings
- Total keywords: 247
- Top 10 positions: 52
- Average position: 8.3

## Recommendations

1. **Technical SEO**
   - Improve page speed
   - Fix broken links
   - Implement schema markup

2. **Content Strategy**
   - Create pillar content
   - Update old blog posts
   - Add FAQ sections

3. **Link Building**
   - Guest posting
   - Digital PR
   - Resource page outreach
```

### Example 2: Technical Audit

```markdown
---
title: "Technical SEO Audit"
description: "Complete technical analysis and recommendations"
---

# Technical SEO Audit

## Performance Metrics

### Core Web Vitals
- **LCP**: 1.8s ✅ (Good)
- **FID**: 45ms ✅ (Good)
- **CLS**: 0.08 ✅ (Good)

### Lighthouse Scores
- Performance: 92/100
- SEO: 84/100
- Accessibility: 89/100
- Best Practices: 96/100

## Issues Found

### Critical Issues
1. Missing meta descriptions (15 pages)
2. Duplicate title tags (8 pages)
3. Broken internal links (12 links)

### Warnings
1. Images without alt text (23 images)
2. Large image file sizes (5 images)
3. Missing H1 tags (3 pages)

## Action Items

| Priority | Issue | Solution | Effort |
|----------|-------|----------|--------|
| High | Missing meta descriptions | Write unique descriptions | 2 hours |
| High | Duplicate titles | Update title tags | 1 hour |
| Medium | Broken links | Fix or remove links | 1 hour |
| Low | Image optimization | Compress images | 30 min |
```

## Bulk Content Addition

### Add Multiple Files

```bash
# Create multiple files at once
touch src/content/docs/acme-corp/docs/{report-1,report-2,report-3}.md

# Or drag multiple files from your file manager
```

### Copy from Another Client

```bash
# Copy content structure from existing client
cp -r src/content/docs/existing-client/docs/* \
      src/content/docs/new-client/docs/

# Then customize the content
```

## Moving Content

### Between Categories

```bash
# Move from docs to dev
mv src/content/docs/client/docs/technical-page.md \
   src/content/docs/client/dev/

# Move from dev to docs
mv src/content/docs/client/dev/client-facing-page.md \
   src/content/docs/client/docs/
```

### Reorganizing

Just drag and drop files in your file manager!

## Best Practices

### Content Guidelines

✅ **Do:**
- Use descriptive titles
- Add descriptions to frontmatter
- Use proper heading hierarchy (H1 → H2 → H3)
- Include images and charts
- Break up long content with headings
- Use lists for readability

❌ **Avoid:**
- Generic titles like "Report" or "Document"
- Missing frontmatter
- Skipping heading levels (H1 → H3)
- Walls of text without breaks
- Broken links

### File Organization

✅ **Do:**
- Use numbered prefixes for ordering
- Use descriptive filenames
- Keep related content together
- Separate client and dev docs

❌ **Avoid:**
- Random file names
- Everything in one folder
- Mixing client and technical content

## Troubleshooting

**Page not appearing?**
- Check file extension is `.md`
- Verify file is in correct directory
- Check frontmatter is valid YAML
- Restart dev server

**Wrong order in navigation?**
- Add number prefixes: `01-`, `02-`, etc.
- Files sort alphabetically

**Formatting looks wrong?**
- Check markdown syntax
- Verify code blocks use triple backticks
- Make sure lists have blank lines before/after

## Next Steps

- **[Content Organization](./content-organization.md)** - Advanced organization strategies
- **[Markdown Guide](./markdown-guide.md)** - Complete markdown reference
- **[Managing Clients](./managing-clients.md)** - Client management

---

**Start adding content!** Just drag and drop markdown files and they appear automatically. 🎉

