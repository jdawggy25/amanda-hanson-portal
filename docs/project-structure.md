# 🏗️ Project Structure

Understanding the codebase organization.

## Directory Overview

```
astro-docs-template/
├── client-template/          # Template files for new clients
├── docs/                     # Project documentation (this folder)
├── scripts/                  # Automation scripts
├── src/                      # Source code
├── public/                   # Static assets
├── clients.config.json       # Client configuration
└── package.json              # Dependencies and scripts
```

## Detailed Structure

### Root Level

```
astro-docs-template/
│
├── clients.config.json       # Central client configuration
├── package.json              # npm dependencies and scripts
├── astro.config.mjs          # Astro configuration
├── tsconfig.json             # TypeScript configuration
│
├── README.md                 # Project overview
├── QUICK-START.md            # Quick start guide
├── CLIENT-MANAGEMENT.md      # Client management guide
├── DRAG-AND-DROP-GUIDE.md    # Drag & drop guide
│
├── client-template/          # Template for new clients
│   ├── docs/                 # Client doc templates
│   ├── dev/                  # Dev doc templates
│   └── client-metrics.json   # Metrics template
│
├── docs/                     # Project documentation
│   ├── README.md
│   ├── quick-start.md
│   ├── adding-clients.md
│   └── ...
│
└── scripts/                  # Automation scripts
    ├── add-client.js         # Add new client
    └── sync-clients.js       # Sync configuration
```

### Source Directory (`src/`)

```
src/
├── components/               # Reusable UI components
│   ├── Charts.astro          # ApexCharts integration
│   ├── DocCard.astro         # Documentation card
│   ├── Footer.astro          # Site footer
│   └── Header.astro          # Site header
│
├── content/                  # Content collections
│   ├── config.ts             # Content schema definition
│   └── docs/                 # Client documentation
│       ├── client-1/
│       │   ├── docs/         # Client-facing docs
│       │   └── dev/          # Developer docs
│       └── client-2/
│
├── data/                     # Client metrics data
│   ├── client-1-metrics.json
│   └── client-2-metrics.json
│
├── layouts/                  # Page layouts
│   ├── BaseLayout.astro      # Base HTML structure
│   └── DocLayout.astro       # Documentation page layout
│
├── pages/                    # Route definitions
│   ├── index.astro           # Password/landing page
│   └── [client]/             # Dynamic client routes
│       ├── index.astro       # Client homepage
│       └── [...slug].astro   # Client documentation pages
│
└── styles/                   # Global styles
    └── global.css            # CSS variables and global styles
```

## Key Files Explained

### Configuration Files

**clients.config.json**
- Central client configuration
- Single source of truth
- Controls which clients appear on site

**astro.config.mjs**
- Astro framework configuration
- Build settings
- Integration configuration

**tsconfig.json**
- TypeScript configuration
- Type checking settings
- Path aliases

### Content Files

**src/content/config.ts**
- Defines content schema
- Validates frontmatter
- Type safety for content

**src/content/docs/[client]/**
- Client-specific documentation
- Organized by client ID
- Separated into `docs/` and `dev/`

**src/data/[client]-metrics.json**
- Client performance metrics
- Powers dashboard charts
- Updated regularly

### Page Files

**src/pages/index.astro**
- Landing/password page
- Client authentication
- Redirects to client portals

**src/pages/[client]/index.astro**
- Client homepage
- Shows metrics and charts
- Lists documentation

**src/pages/[client]/[...slug].astro**
- Individual documentation pages
- Renders markdown content
- Dynamic routing

### Component Files

**src/components/Charts.astro**
- ApexCharts integration
- Renders all chart types
- Uses client metrics data

**src/components/DocCard.astro**
- Documentation card component
- Shows on client homepage
- Links to documentation pages

**src/components/Header.astro**
- Site navigation
- Client branding
- Responsive menu

**src/components/Footer.astro**
- Site footer
- Contact information
- Copyright notice

### Layout Files

**src/layouts/BaseLayout.astro**
- Base HTML structure
- Meta tags
- Global styles and scripts

**src/layouts/DocLayout.astro**
- Documentation page layout
- Table of contents
- Navigation sidebar

### Script Files

**scripts/add-client.js**
- Automated client setup
- Copies template files
- Updates configuration

**scripts/sync-clients.js**
- Syncs config to routing files
- Updates password mapping
- Ensures consistency

## Data Flow

### Client Addition Flow

```
1. Run add-client script
   ↓
2. Creates content directories
   ↓
3. Creates metrics file
   ↓
4. Updates clients.config.json
   ↓
5. Run sync-clients
   ↓
6. Updates routing files
   ↓
7. Client is live!
```

### Content Rendering Flow

```
1. User visits /client-id/page-name
   ↓
2. [...slug].astro matches route
   ↓
3. Loads markdown from content/docs/
   ↓
4. Renders with DocLayout
   ↓
5. Page displayed to user
```

### Metrics Display Flow

```
1. User visits /client-id
   ↓
2. index.astro loads
   ↓
3. Imports client-id-metrics.json
   ↓
4. Passes data to Charts component
   ↓
5. Charts rendered with ApexCharts
```

## File Naming Conventions

### Client IDs
- Lowercase
- Hyphens for spaces
- Descriptive
- Examples: `acme-corp`, `techstart`, `blue-ocean`

### Content Files
- Lowercase
- Hyphens for spaces
- `.md` extension
- Examples: `getting-started.md`, `seo-strategy.md`

### Metrics Files
- Format: `{client-id}-metrics.json`
- Examples: `acme-corp-metrics.json`

### Component Files
- PascalCase
- `.astro` extension
- Examples: `DocCard.astro`, `Charts.astro`

## Important Paths

### Content Paths
```
src/content/docs/{client-id}/docs/     # Client docs
src/content/docs/{client-id}/dev/      # Dev docs
```

### Data Paths
```
src/data/{client-id}-metrics.json      # Client metrics
```

### Template Paths
```
client-template/docs/                  # Doc templates
client-template/dev/                   # Dev templates
client-template/client-metrics.json    # Metrics template
```

### Configuration Paths
```
clients.config.json                    # Client config
astro.config.mjs                       # Astro config
```

## Build Output

```
dist/                                  # Production build
├── index.html                         # Landing page
├── client-1/
│   ├── index.html                     # Client homepage
│   ├── page-1/index.html              # Doc pages
│   └── page-2/index.html
└── _astro/                            # Assets
    ├── *.css                          # Styles
    └── *.js                           # Scripts
```

## Development vs Production

### Development (`npm run dev`)
- Hot module reloading
- Source maps
- Detailed errors
- Fast refresh

### Production (`npm run build`)
- Optimized assets
- Minified code
- Static HTML generation
- Ready for deployment

## Next Steps

- **[Adding Clients](./adding-clients.md)** - Add new clients
- **[Adding Content](./adding-content.md)** - Add documentation
- **[Components](./components.md)** - Customize components

---

**Now you understand the structure!** Everything is organized for easy management. 📁

