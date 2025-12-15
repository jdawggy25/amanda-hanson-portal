# 📋 Client Template

This directory contains template files for creating new clients.

## What's Inside

```
client-template/
├── docs/                      ← Client-facing documentation
│   ├── getting-started.md     ← Introduction page
│   └── seo-strategy.md        ← SEO strategy template
│
├── dev/                       ← Developer documentation
│   └── technical-setup.md     ← Technical implementation
│
└── client-metrics.json        ← Metrics data template
```

## How to Use

### Option 1: Automated (Recommended)

```bash
npm run add-client your-client-id "Your Client Name" password website.com
npm run sync-clients
```

### Option 2: Manual Drag & Drop

1. **Copy this entire folder** to `src/content/docs/your-client-id/`
2. **Copy `client-metrics.json`** to `src/data/your-client-id-metrics.json`
3. **Update `clients.config.json`** with your client info
4. **Run:** `npm run sync-clients`

## Customizing Templates

Feel free to:
- Add more template pages to `docs/` or `dev/`
- Modify the metrics structure in `client-metrics.json`
- Create industry-specific templates (e.g., `client-template-ecommerce/`)

## Template Files Explained

### docs/getting-started.md
The first page clients see. Customize with:
- Welcome message
- Overview of services
- Next steps

### docs/seo-strategy.md
SEO strategy and recommendations. Customize with:
- Keyword research
- Content strategy
- Technical recommendations

### dev/technical-setup.md
Technical implementation details. Customize with:
- Analytics setup
- Development tasks
- Integration notes

### client-metrics.json
Data that powers the client dashboard. Update:
- Client name and website
- Performance scores
- Keyword rankings
- Traffic data
- Conversion metrics

## Adding More Templates

Create additional template files and they'll automatically be copied when adding new clients:

```bash
# Add a new template page
client-template/docs/competitor-analysis.md

# Next time you add a client, it will include this file!
npm run add-client new-client "New Client"
```

## See Also

- [QUICK-START.md](../QUICK-START.md) - Complete guide for adding clients
- [clients.config.json](../clients.config.json) - Client configuration

