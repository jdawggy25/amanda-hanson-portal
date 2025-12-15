# Comcreate Multi-Client SEO Report Platform

A beautiful, professional multi-client SEO report platform powered by Astro. Host SEO reports for multiple clients on a single domain with isolated content and metrics for each client.

## Features

- **Password-Protected Access** - Secure landing page with client-specific access codes
- **Multi-Client Architecture** - Host unlimited clients on one domain
- **Client Isolation** - Each client has their own homepage and documentation
- **Dynamic Routing** - Clean URLs like `comcreate.org/client-name`
- **Client-Specific Metrics** - Unique SEO metrics and charts for each client
- **Modern Dark Theme** - Professional Comcreate branding
- **Fully Responsive** - Perfect on all devices
- **Lightning-Fast** - Static site generation with Astro
- **Interactive Charts** - ApexCharts for data visualization
- **Easy Content Management** - Just add markdown files
- **One-Click Deployment** - Deploy to Vercel instantly

## Platform Structure

### URL Patterns

- `comcreate.org/` → Password-protected landing page
- `comcreate.org/v3` → V3 client homepage (access code: `v3`)
- `comcreate.org/v3/technical-audit` → V3 technical audit report
- `comcreate.org/casita` → Casita client homepage (access code: `casita`)
- `comcreate.org/casita/local-seo` → Casita local SEO report

### Directory Organization

```
src/
├── content/docs/
│   ├── v3/              # V3 client reports
│   └── casita/          # Casita client reports
├── data/
│   ├── v3-metrics.json      # V3 metrics
│   └── casita-metrics.json  # Casita metrics
└── pages/
    ├── index.astro          # Client directory
    └── [client]/
        ├── index.astro      # Client homepage
        └── [...slug].astro  # Client docs
```

## Quick Start

### 1. Clone the Repository

```bash
git clone [repository-url] seo-report-platform
cd seo-report-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:4321` to see the platform.

## 📚 Documentation

**→ [Complete Documentation in `docs/` folder](./docs/README.md) ←**

### Quick Links

- **[Quick Start Guide](./docs/quick-start.md)** - Get started in 2 minutes ⭐
- **[Adding Clients](./docs/adding-clients.md)** - Add new clients (automated & manual)
- **[Adding Content](./docs/adding-content.md)** - Add and organize documentation
- **[Managing Clients](./docs/managing-clients.md)** - Edit, disable, organize clients
- **[Deployment](./docs/deployment.md)** - Deploy to production
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## Adding a New Client

### ⚡ Super Easy - Automated Method (30 seconds)

```bash
# Add a new client with one command
npm run add-client acme-corp "Acme Corporation" acme acme.com

# Sync configuration
npm run sync-clients

# Start dev server
npm run dev
```

**Done!** Visit `http://localhost:4321/acme-corp` (password: `acme`)

**→ [Full guide: Adding Clients](./docs/adding-clients.md)**

### 📁 Alternative - Drag & Drop Method

1. **Drag template folders** to `src/content/docs/your-client-id/`
2. **Drag metrics file** to `src/data/your-client-id-metrics.json`
3. **Edit** `clients.config.json` to add your client
4. **Run** `npm run sync-clients`

**→ [Full guide: Drag & Drop](./DRAG-AND-DROP-GUIDE.md)**

### Example Content File

**File:** `src/content/docs/new-client/getting-started.md`

```markdown
---
title: "Getting Started"
description: "Introduction to New Client SEO report"
---

# Welcome to New Client SEO Report

Your content here...
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Push to GitHub and deploy to Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

The platform will be available at your custom domain (e.g., `comcreate.org`).

## Managing Content

### Adding Pages to a Client

Create markdown files in the client's content directory:

```bash
# src/content/docs/v3/keyword-strategy.md
---
title: "Keyword Strategy"
description: "Keyword analysis and recommendations"
---

# Keyword Strategy

Your content here...
```

The page will automatically be available at `/v3/keyword-strategy`.

### Updating Client Metrics

Edit the client's metrics JSON file:

```bash
# src/data/v3-metrics.json
{
  "keywords": {
    "total": 250,
    "change": 40,
    "changePercent": "+19%"
  },
  ...
}
```

Metrics appear on the client's homepage with interactive charts.

### Frontmatter Fields

```yaml
---
title: "Page Title"           # Required - appears as page heading
description: "Description"    # Optional - shows in client homepage card
---
```

## Example Clients

The platform includes two example clients:

### V3 Client
- **URL**: `/v3`
- **Content**: Enterprise software SEO reports
- **Pages**: Getting Started, Technical Audit
- **Metrics**: 247 keywords, 48.7K monthly traffic

### Casita Client
- **URL**: `/casita`
- **Content**: Vacation rental SEO reports
- **Pages**: Getting Started, Local SEO
- **Metrics**: 189 keywords, 32.4K monthly traffic

## Customization

### Update Branding

**Logos**: Replace files in `public/`:
- `logo.png` - Header logo
- `wide-logo.png` - Footer logo
- `favicon.ico` - Browser icon

**Colors**: Edit `src/styles/global.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Primary blue */
  --color-primary-soft: #60a5fa; /* Lighter blue */
  --color-bg: #0a0d14;           /* Dark background */
}
```

### Update Contact Information

Edit `src/components/Footer.astro`:

```astro
<a href="tel:+16199550105">(619) 955-0105</a>
<a href="mailto:sales@comcreate.org">sales@comcreate.org</a>
```

## Tech Stack

- **[Astro 5](https://astro.build)** - Static site generator
- **[ApexCharts](https://apexcharts.com)** - Interactive charts
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[Vercel](https://vercel.com)** - Hosting platform

## Platform Benefits

### For Agencies
- **Password Protection** - Secure access with client-specific codes
- **Single Deployment** - Host all client reports on one domain
- **Consistent Branding** - Unified Comcreate branding across all clients
- **Easy Maintenance** - Update platform features once, applies to all clients
- **Cost Effective** - One hosting account for unlimited clients

### For Clients
- **Secure Access** - Private access codes for their reports
- **Professional Reports** - Beautiful, interactive SEO dashboards
- **Easy Access** - Simple password like their company name
- **Real-Time Updates** - Reports update instantly when you push changes
- **Mobile Friendly** - Perfect experience on all devices

## Workflow

1. **Add Client** - Create content folder, metrics file, and access code
2. **Write Reports** - Add markdown files with SEO analysis
3. **Update Metrics** - Edit JSON file with latest data
4. **Deploy** - Push to GitHub, auto-deploys to Vercel
5. **Share** - Send client their access code and URL

## Support

**Comcreate - San Diego, CA**
- Email: [sales@comcreate.org](mailto:sales@comcreate.org)
- Phone: [(619) 955-0105](tel:+16199550105)
- Website: [comcreate.org](https://comcreate.org)

## License

© 2025 Comcreate. All rights reserved.
