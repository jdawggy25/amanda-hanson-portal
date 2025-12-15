# 🎉 Getting Started

Welcome! This guide will get you from zero to deployed in under 10 minutes.

## What You're Building

A multi-client SEO report platform where:
- Each client has their own password-protected portal
- Each client has custom metrics and charts
- You can add clients and content with drag & drop
- Everything deploys automatically to production

## Prerequisites

- Node.js 18+ installed
- Git installed
- A GitHub account
- 10 minutes of your time

## Step-by-Step Setup

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Start Development Server (30 seconds)

```bash
npm run dev
```

Visit **http://localhost:4321**

You'll see:
- Password-protected landing page
- 3 example clients (v3, casita, bnc-builders)
- Try password: `v3` to see the V3 client portal

### 3. Add Your First Client (1 minute)

```bash
# Add a client
npm run add-client acme-corp "Acme Corporation" acme acme.com

# Sync configuration
npm run sync-clients
```

Visit **http://localhost:4321/acme-corp** (password: `acme`)

**You just added a client!** 🎉

### 4. Customize Content (2 minutes)

**Add a new page:**

Create `src/content/docs/acme-corp/docs/my-report.md`:

```markdown
---
title: "My First Report"
description: "Q4 2025 SEO Analysis"
---

# My First Report

## Key Findings

- Traffic increased 25%
- Keywords ranking improved
- Conversion rate up 15%

## Recommendations

1. Continue content strategy
2. Expand link building
3. Optimize for mobile
```

Refresh browser - it appears automatically!

**Update metrics:**

Edit `src/data/acme-corp-metrics.json`:

```json
{
  "client": {
    "name": "Acme Corporation",
    "reportDate": "December 2025",
    "website": "acme.com"
  },
  "keywords": {
    "total": 300,
    "change": 50,
    "changePercent": "+20%"
  }
}
```

Refresh - metrics update instantly!

### 5. Deploy to Production (5 minutes)

**Push to GitHub:**

```bash
git add .
git commit -m "Add Acme Corp client"
git push origin main
```

**Deploy to Vercel:**

1. Visit [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your repository
4. Click "Deploy"

**Done!** Your site is live in ~2 minutes.

## What You Just Learned

✅ How to start the dev server
✅ How to add clients (automated)
✅ How to add content (drag & drop)
✅ How to update metrics
✅ How to deploy to production

## Next Steps

### Learn More

- **[Adding Clients](./adding-clients.md)** - Master client management
- **[Adding Content](./adding-content.md)** - Advanced content organization
- **[Managing Clients](./managing-clients.md)** - Edit, disable, organize
- **[Deployment](./deployment.md)** - Advanced deployment options

### Common Tasks

**Add another client:**
```bash
npm run add-client techstart "TechStart Inc" techstart techstart.io
npm run sync-clients
```

**Add content to existing client:**
```bash
# Just drag markdown files to:
src/content/docs/client-id/docs/
```

**Update client metrics:**
```bash
# Edit:
src/data/client-id-metrics.json
```

**Deploy updates:**
```bash
git add .
git commit -m "Update content"
git push
```

## Understanding the System

### File Structure

```
your-project/
├── clients.config.json          # All clients defined here
├── client-template/             # Template for new clients
├── src/
│   ├── content/docs/           # Client content (drag & drop here)
│   └── data/                   # Client metrics
└── docs/                       # Documentation (you are here)
```

### How It Works

1. **clients.config.json** - Single source of truth for all clients
2. **npm run sync-clients** - Updates routing files automatically
3. **Drag & drop** - Add content by dragging markdown files
4. **Auto-deploy** - Push to GitHub, Vercel deploys automatically

### Key Commands

```bash
npm run dev              # Start dev server
npm run add-client       # Add new client
npm run sync-clients     # Sync configuration
npm run build            # Build for production
```

## Tips for Success

### 1. Always Sync After Config Changes

```bash
# After editing clients.config.json
npm run sync-clients
```

### 2. Use Descriptive Names

```bash
# Good
npm run add-client acme-corp "Acme Corporation" acme acme.com

# Avoid
npm run add-client client1 "Client" pass site.com
```

### 3. Test Before Deploying

```bash
npm run dev      # Test locally
npm run build    # Test build
npm run preview  # Test production build
git push         # Deploy
```

### 4. Keep Content Organized

```
docs/  → Client-facing documentation
dev/   → Technical/developer documentation
```

## Troubleshooting

**Client not showing?**
```bash
npm run sync-clients
npm run dev
```

**Password not working?**
```bash
# Check clients.config.json
npm run sync-clients
```

**Content not appearing?**
- Check file extension is `.md`
- Verify file is in correct directory
- Restart dev server

**More help:** [Troubleshooting Guide](./troubleshooting.md)

## You're Ready!

You now know how to:
- ✅ Add clients
- ✅ Add content
- ✅ Update metrics
- ✅ Deploy to production

**Start building!** Add your clients and content, then deploy. 🚀

---

**Questions?** Check the [full documentation](./README.md) or email [sales@comcreate.org](mailto:sales@comcreate.org)

