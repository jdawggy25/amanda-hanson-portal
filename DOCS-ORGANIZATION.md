# Documentation Organization Guide

## Directory Structure

Each client has two separate directories for organizing documentation:

```
src/content/docs/
├── client-name/
│   ├── docs/          # Client-facing reports and recommendations
│   └── dev/           # Developer implementation guides
```

### Example Structure

```
src/content/docs/
├── casita/
│   ├── docs/
│   │   ├── executive-summary.md
│   │   ├── getting-started.md
│   │   ├── homepage.md
│   │   ├── about-page.md
│   │   ├── content-calendar.md
│   │   └── link-building.md
│   └── dev/
│       ├── schema-markup.md
│       ├── analytics-tracking.md
│       ├── core-web-vitals.md
│       ├── deployment-hosting.md
│       └── technical-seo.md
├── v3/
│   ├── docs/
│   └── dev/
└── bnc-builders/
    ├── docs/
    └── dev/
```

## What Goes Where?

### Client Reports (`docs/`)
**Purpose:** Strategy, recommendations, and business-focused content

**Examples:**
- Executive summaries
- SEO strategy documents
- Content recommendations (homepage, about page, etc.)
- Content calendars
- Keyword strategies
- Link building strategies
- Implementation checklists (high-level)

**Audience:** Business owners, marketing managers, content creators

### Developer Docs (`dev/`)
**Purpose:** Technical implementation guides and code

**Examples:**
- Schema markup code
- Analytics tracking setup
- Core Web Vitals optimization
- Deployment and hosting guides
- Technical SEO implementation
- Multilingual SEO setup
- CRM integrations

**Audience:** Developers, technical implementers

## How It Works

### On the Client Homepage

When a client visits their homepage (e.g., `/casita`), they see:

1. **Client Reports Tab (Default)** - Shows all docs from `client/docs/`
2. **Developer Docs Tab** - Shows all docs from `client/dev/`

Users can easily switch between tabs to see the relevant documentation.

### URL Structure

- Client reports: `/client-name/docs/page-name`
- Developer docs: `/client-name/dev/page-name`

## Adding New Documentation

### For Client Reports

1. Create a new `.md` file in `src/content/docs/client-name/docs/`
2. Add frontmatter with title and description
3. Write your content
4. It will automatically appear in the "Client Reports" tab

### For Developer Docs

1. Create a new `.md` file in `src/content/docs/client-name/dev/`
2. Add frontmatter with title and description
3. Write your content
4. It will automatically appear in the "Developer Docs" tab

### Example Markdown File

```markdown
---
title: "Your Page Title"
description: "Brief description of the page content"
---

# Your Page Title

Your content here...
```

## Moving Documents Between Categories

Simply drag and drop the `.md` file between the `docs/` and `dev/` directories. The routing will automatically update.

## Benefits of This Structure

✅ **Clear separation** - Easy to see what's for clients vs developers
✅ **Simple organization** - Just drag and drop files where they belong
✅ **No configuration needed** - No frontmatter categories to manage
✅ **Intuitive navigation** - Tabs make it easy for users to find what they need
✅ **Scalable** - Easy to add new clients and documents

## Adding a New Client

1. Create the client directory structure:
   ```
   src/content/docs/new-client/
   ├── docs/
   └── dev/
   ```

2. Add the client to the CLIENTS array in:
   - `src/pages/[client]/index.astro`
   - `src/pages/[client]/[...slug].astro`

3. Create a metrics file: `src/data/new-client-metrics.json`

4. Add your documentation files to the appropriate directories

That's it! The tabs and routing will work automatically.

