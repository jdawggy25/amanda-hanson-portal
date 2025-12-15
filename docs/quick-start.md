# 🚀 Quick Start Guide

Get your SEO report platform running in under 2 minutes.

## Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url> seo-platform
cd seo-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:4321** to see your platform!

## Your First Client

### Method 1: Automated (Recommended)

```bash
# Add a new client
npm run add-client acme-corp "Acme Corporation" acme acme.com

# Sync configuration
npm run sync-clients

# Refresh your browser
```

Visit **http://localhost:4321/acme-corp** (password: `acme`)

### Method 2: Manual

1. Copy `client-template/` contents to `src/content/docs/acme-corp/`
2. Copy `client-template/client-metrics.json` to `src/data/acme-corp-metrics.json`
3. Edit `clients.config.json`:
   ```json
   {
     "clients": [
       {
         "id": "acme-corp",
         "name": "Acme Corporation",
         "password": "acme",
         "website": "acme.com",
         "enabled": true
       }
     ]
   }
   ```
4. Run `npm run sync-clients`

## Add Your First Content

Create a new markdown file:

```bash
# Create file
touch src/content/docs/acme-corp/docs/my-first-report.md
```

Add content:

```markdown
---
title: "My First SEO Report"
description: "Introduction to SEO strategy"
---

# My First SEO Report

This is my first report!

## Key Findings

- Finding 1
- Finding 2
- Finding 3
```

Refresh your browser - it appears automatically!

## Update Metrics

Edit `src/data/acme-corp-metrics.json`:

```json
{
  "client": {
    "name": "Acme Corporation",
    "reportDate": "December 2025",
    "website": "acme.com"
  },
  "keywords": {
    "total": 250,
    "change": 40,
    "changePercent": "+19%"
  }
}
```

Save and refresh - metrics update instantly!

## Deploy to Production

### Deploy to Vercel

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial setup"
   git push
   ```

2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

Done! Your platform is live.

## Next Steps

- **[Adding Clients](./adding-clients.md)** - Learn more about client management
- **[Adding Content](./adding-content.md)** - Master content organization
- **[Metrics Configuration](./metrics-configuration.md)** - Customize your metrics
- **[Deployment Guide](./deployment.md)** - Advanced deployment options

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Client Management
npm run add-client       # Add new client
npm run sync-clients     # Sync configuration
```

## Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 4321
npx kill-port 4321
npm run dev
```

**Changes not showing?**
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**Client not appearing?**
```bash
# Make sure you synced
npm run sync-clients

# Restart dev server
# Press Ctrl+C, then:
npm run dev
```

## Getting Help

- **[Troubleshooting Guide](./troubleshooting.md)** - Common issues and solutions
- **[FAQ](./faq.md)** - Frequently asked questions
- **Email**: [sales@comcreate.org](mailto:sales@comcreate.org)

---

**You're all set!** 🎉 Start adding clients and content.

