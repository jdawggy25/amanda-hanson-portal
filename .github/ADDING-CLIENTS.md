# Adding Clients - Visual Guide

## 🎯 The Simplest Way

```bash
npm run add-client <id> "<name>" <password> <website>
npm run sync-clients
npm run dev
```

**That's it!** ✨

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    clients.config.json                       │
│                  (Single Source of Truth)                    │
│                                                              │
│  {                                                           │
│    "clients": [                                              │
│      { "id": "acme", "name": "Acme", "password": "acme" }   │
│    ]                                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ npm run sync-clients
                              ↓
        ┌─────────────────────────────────────────┐
        │     Automatically Updates These:        │
        ├─────────────────────────────────────────┤
        │  • src/pages/[client]/index.astro       │
        │  • src/pages/[client]/[...slug].astro   │
        │  • src/pages/index.astro                │
        └─────────────────────────────────────────┘
```

---

## 🔄 Two Workflows

### Workflow A: Automated (Recommended)

```
┌──────────────┐
│ Run Command  │  npm run add-client acme "Acme Corp" acme acme.com
└──────┬───────┘
       │
       ↓
┌──────────────────────┐
│ Script Creates:      │
│ • Content folders    │
│ • Metrics file       │
│ • Config entry       │
└──────┬───────────────┘
       │
       ↓
┌──────────────┐
│ Sync Config  │  npm run sync-clients
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Start Server │  npm run dev
└──────┬───────┘
       │
       ↓
    ✅ DONE!
```

### Workflow B: Drag & Drop

```
┌─────────────────────┐
│ Drag Template Files │
│                     │
│ client-template/    │
│   ├── docs/    ────────→  src/content/docs/acme/docs/
│   ├── dev/     ────────→  src/content/docs/acme/dev/
│   └── metrics ────────→  src/data/acme-metrics.json
└─────────────────────┘
       │
       ↓
┌─────────────────────┐
│ Edit Config File    │  Add client to clients.config.json
└──────┬──────────────┘
       │
       ↓
┌──────────────┐
│ Sync Config  │  npm run sync-clients
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Start Server │  npm run dev
└──────┬───────┘
       │
       ↓
    ✅ DONE!
```

---

## 📁 File Organization

```
project/
│
├── 📋 clients.config.json          ← Edit this to add/remove clients
│
├── 📁 client-template/             ← Copy these files for new clients
│   ├── 📁 docs/
│   │   ├── getting-started.md
│   │   └── seo-strategy.md
│   ├── 📁 dev/
│   │   └── technical-setup.md
│   └── 📄 client-metrics.json
│
├── 📁 src/
│   ├── 📁 content/docs/
│   │   ├── 📁 acme/                ← Client content
│   │   │   ├── 📁 docs/           ← Drag & drop docs here
│   │   │   └── 📁 dev/            ← Drag & drop dev docs here
│   │   └── 📁 techcorp/
│   │
│   └── 📁 data/
│       ├── 📄 acme-metrics.json    ← Client metrics
│       └── 📄 techcorp-metrics.json
│
└── 📁 scripts/
    ├── add-client.js               ← Automated setup
    └── sync-clients.js             ← Sync config to routing
```

---

## 🎨 Content Management

### Adding Pages (Drag & Drop)

```
Your markdown files
       │
       │  Just drag here!
       ↓
📁 src/content/docs/client-id/
   ├── 📁 docs/              ← Client-facing documentation
   │   ├── page-1.md         ← Automatically appears in nav
   │   ├── page-2.md         ← Automatically appears in nav
   │   └── page-3.md         ← Automatically appears in nav
   │
   └── 📁 dev/               ← Developer documentation
       └── setup.md          ← Automatically appears in nav
```

### File Naming for Order

```
✅ Good (automatic ordering):
   01-getting-started.md
   02-seo-strategy.md
   03-technical-audit.md

✅ Good (readable URLs):
   getting-started.md
   seo-strategy.md
   technical-audit.md

❌ Avoid:
   doc1.md
   report.md
   untitled.md
```

---

## 🔧 Common Operations

### Add Client
```bash
npm run add-client <id> "<name>" <password> <website>
npm run sync-clients
```

### Disable Client
```json
// clients.config.json
{ "id": "old-client", "enabled": false }
```
```bash
npm run sync-clients
```

### Change Password
```json
// clients.config.json
{ "id": "client", "password": "new-password" }
```
```bash
npm run sync-clients
```

### Add Content
```bash
# Just drag files to:
src/content/docs/client-id/docs/your-file.md
```

### Update Metrics
```bash
# Edit:
src/data/client-id-metrics.json
```

---

## ✅ Checklist: Adding a New Client

- [ ] Run `npm run add-client <id> "<name>" <password> <website>`
- [ ] Run `npm run sync-clients`
- [ ] Customize content in `src/content/docs/<id>/`
- [ ] Update metrics in `src/data/<id>-metrics.json`
- [ ] Test with `npm run dev`
- [ ] Visit `http://localhost:4321/<id>`
- [ ] Verify password works
- [ ] Check all pages load correctly
- [ ] Commit and deploy

---

## 📚 Learn More

- **[QUICK-START.md](../QUICK-START.md)** - Complete setup guide
- **[DRAG-AND-DROP-GUIDE.md](../DRAG-AND-DROP-GUIDE.md)** - Detailed drag & drop instructions
- **[CLIENT-MANAGEMENT.md](../CLIENT-MANAGEMENT.md)** - Full management guide
- **[client-template/README.md](../client-template/README.md)** - Template documentation

---

## 💡 Pro Tips

1. **Keep templates updated** - Add common pages to `client-template/`
2. **Use descriptive IDs** - `acme-corp` not `client1`
3. **Test before deploying** - Always run `npm run dev` first
4. **Sync after config changes** - Run `npm run sync-clients`
5. **Organize by category** - Use `docs/` and `dev/` folders

---

**Questions?** Check the documentation files above! 📖

