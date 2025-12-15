# 🎯 System Overview

Visual overview of how everything works together.

## The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                  clients.config.json                         │
│              (Single Source of Truth)                        │
│                                                              │
│  All clients defined here → Everything else auto-updates    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ npm run sync-clients
                              ↓
        ┌─────────────────────────────────────────┐
        │     Auto-Updates These Files:           │
        ├─────────────────────────────────────────┤
        │  • src/pages/[client]/index.astro       │
        │  • src/pages/[client]/[...slug].astro   │
        │  • src/pages/index.astro                │
        └─────────────────────────────────────────┘
```

## System Components

### 1. Configuration Layer

**clients.config.json** - Central configuration
```json
{
  "clients": [
    { "id": "acme", "name": "Acme Corp", "password": "acme", ... }
  ]
}
```

### 2. Template Layer

**client-template/** - Templates for new clients
```
client-template/
├── docs/           # Client documentation templates
├── dev/            # Developer documentation templates
└── metrics.json    # Metrics template
```

### 3. Content Layer

**src/content/docs/** - Client content
```
src/content/docs/
├── acme/
│   ├── docs/      # Client-facing docs
│   └── dev/       # Developer docs
└── techstart/
```

### 4. Data Layer

**src/data/** - Client metrics
```
src/data/
├── acme-metrics.json
└── techstart-metrics.json
```

### 5. Automation Layer

**scripts/** - Automation scripts
```
scripts/
├── add-client.js    # Add new client
└── sync-clients.js  # Sync configuration
```

### 6. Documentation Layer

**docs/** - Complete documentation
```
docs/
├── README.md
├── quick-start.md
├── adding-clients.md
└── ...
```

## Data Flow

### Adding a Client

```
1. Run Command
   npm run add-client acme "Acme Corp" acme acme.com
   │
   ↓
2. Script Creates
   ├── src/content/docs/acme/docs/
   ├── src/content/docs/acme/dev/
   ├── src/data/acme-metrics.json
   └── Updates clients.config.json
   │
   ↓
3. Sync Configuration
   npm run sync-clients
   │
   ↓
4. Updates Routing
   ├── src/pages/[client]/index.astro
   ├── src/pages/[client]/[...slug].astro
   └── src/pages/index.astro
   │
   ↓
5. Client is Live!
   http://localhost:4321/acme
```

### Adding Content

```
1. Create/Drag File
   your-report.md
   │
   ↓
2. Drop in Directory
   src/content/docs/acme/docs/your-report.md
   │
   ↓
3. Auto-Detected
   Astro content collections
   │
   ↓
4. Appears in Navigation
   Automatically rendered
```

### Updating Metrics

```
1. Edit File
   src/data/acme-metrics.json
   │
   ↓
2. Save Changes
   │
   ↓
3. Refresh Browser
   │
   ↓
4. Charts Update
   Automatically re-rendered
```

## File Organization

```
astro-docs-template/
│
├── Configuration
│   ├── clients.config.json      # Client configuration
│   ├── package.json             # npm scripts
│   └── astro.config.mjs         # Astro config
│
├── Templates
│   └── client-template/         # Templates for new clients
│       ├── docs/
│       ├── dev/
│       └── client-metrics.json
│
├── Automation
│   └── scripts/
│       ├── add-client.js        # Add client script
│       └── sync-clients.js      # Sync script
│
├── Documentation
│   └── docs/                    # Complete documentation
│       ├── README.md
│       ├── quick-start.md
│       └── ...
│
├── Source Code
│   └── src/
│       ├── content/docs/        # Client content
│       ├── data/                # Client metrics
│       ├── pages/               # Routing
│       ├── components/          # UI components
│       └── layouts/             # Page layouts
│
└── Legacy Guides
    ├── QUICK-START.md
    ├── CLIENT-MANAGEMENT.md
    └── DRAG-AND-DROP-GUIDE.md
```

## Key Workflows

### Workflow 1: Add Client

```bash
npm run add-client acme "Acme Corp" acme acme.com
npm run sync-clients
npm run dev
```

### Workflow 2: Add Content

```bash
# Just drag files to:
src/content/docs/client-id/docs/
```

### Workflow 3: Update Metrics

```bash
# Edit:
src/data/client-id-metrics.json
```

### Workflow 4: Deploy

```bash
git add .
git commit -m "Update"
git push
# Auto-deploys
```

## Command Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Client Management
npm run add-client       # Add new client
npm run sync-clients     # Sync configuration
```

## Architecture Principles

### 1. Single Source of Truth
- `clients.config.json` controls everything
- Edit one file → Everything updates

### 2. Convention Over Configuration
- Follow naming conventions
- Files auto-detected
- No manual routing

### 3. Automation First
- Scripts handle complexity
- Drag & drop for simplicity
- Auto-sync everything

### 4. Template-Based
- Consistent structure
- Copy templates
- Customize as needed

### 5. Documentation-Driven
- Complete guides
- Visual workflows
- Troubleshooting help

## Benefits

✅ **Fast** - Add clients in 30 seconds
✅ **Easy** - Drag & drop content
✅ **Consistent** - Templates ensure quality
✅ **Automated** - Scripts handle complexity
✅ **Scalable** - Unlimited clients
✅ **Maintainable** - One config file

## Next Steps

- **[Quick Start](./quick-start.md)** - Get started
- **[Adding Clients](./adding-clients.md)** - Add clients
- **[Adding Content](./adding-content.md)** - Add content
- **[Deployment](./deployment.md)** - Deploy

---

**Now you understand the system!** Everything is designed for easy management. 🎯

