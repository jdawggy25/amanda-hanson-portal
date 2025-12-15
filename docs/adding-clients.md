# 👥 Adding Clients

Complete guide to adding new clients to your SEO platform.

## Overview

There are two ways to add clients:
1. **Automated Script** - Fast, consistent, recommended
2. **Manual Drag & Drop** - Full control, educational

Both methods create the same result.

## Method 1: Automated Script ⚡

### Basic Usage

```bash
npm run add-client <client-id> "<client-name>" [password] [website]
```

### Examples

```bash
# Full example
npm run add-client acme-corp "Acme Corporation" acme acme.com

# Minimal (password and website default to client-id)
npm run add-client techstart "TechStart Inc"

# After adding, always sync
npm run sync-clients
```

### What It Does

The script automatically:
1. ✅ Creates `src/content/docs/<client-id>/docs/` with template files
2. ✅ Creates `src/content/docs/<client-id>/dev/` with template files
3. ✅ Creates `src/data/<client-id>-metrics.json` from template
4. ✅ Adds client to `clients.config.json`

### After Running

```bash
# Sync configuration to routing files
npm run sync-clients

# Start dev server
npm run dev

# Visit your new client
# http://localhost:4321/<client-id>
```

## Method 2: Manual Drag & Drop 📁

### Step 1: Copy Template Files

**Copy content folders:**
```
FROM: client-template/docs/
TO:   src/content/docs/your-client-id/docs/

FROM: client-template/dev/
TO:   src/content/docs/your-client-id/dev/
```

**Copy metrics file:**
```
FROM: client-template/client-metrics.json
TO:   src/data/your-client-id-metrics.json
```

### Step 2: Update Configuration

Edit `clients.config.json` and add your client:

```json
{
  "clients": [
    {
      "id": "your-client-id",
      "name": "Your Client Name",
      "password": "your-password",
      "website": "yourclient.com",
      "enabled": true
    }
  ]
}
```

### Step 3: Sync Configuration

```bash
npm run sync-clients
```

This updates all routing files automatically.

### Step 4: Customize

1. **Edit metrics**: `src/data/your-client-id-metrics.json`
2. **Add content**: `src/content/docs/your-client-id/docs/`
3. **Add dev docs**: `src/content/docs/your-client-id/dev/`

## Client Configuration Options

### Required Fields

```json
{
  "id": "client-slug",        // URL slug (lowercase, hyphens)
  "name": "Client Name",      // Display name
  "password": "access-code",  // Password for access
  "website": "client.com",    // Client website
  "enabled": true             // Show/hide client
}
```

### Field Details

**id** (required)
- Used in URLs: `yoursite.com/<id>`
- Lowercase, hyphens only
- Examples: `acme-corp`, `techstart`, `blue-ocean`

**name** (required)
- Display name shown in UI
- Can include spaces, capitals
- Examples: `Acme Corporation`, `TechStart Inc`

**password** (required)
- Access code for client portal
- Simple, memorable
- Examples: `acme`, `techstart`, `blue-ocean`

**website** (required)
- Client's website URL
- Shown in reports
- Examples: `acme.com`, `techstart.io`

**enabled** (required)
- `true` = Client visible on site
- `false` = Client hidden (but files remain)

## File Structure Created

```
src/
├── content/docs/
│   └── your-client-id/
│       ├── docs/                    ← Client-facing docs
│       │   ├── getting-started.md
│       │   └── seo-strategy.md
│       └── dev/                     ← Developer docs
│           └── technical-setup.md
│
└── data/
    └── your-client-id-metrics.json  ← Metrics data
```

## Multiple Clients Example

```bash
# Add multiple clients
npm run add-client acme "Acme Corp" acme acme.com
npm run add-client techstart "TechStart" techstart techstart.io
npm run add-client blueocean "Blue Ocean" blueocean blueocean.com

# Single sync updates all
npm run sync-clients
```

Result in `clients.config.json`:

```json
{
  "clients": [
    {
      "id": "acme",
      "name": "Acme Corp",
      "password": "acme",
      "website": "acme.com",
      "enabled": true
    },
    {
      "id": "techstart",
      "name": "TechStart",
      "password": "techstart",
      "website": "techstart.io",
      "enabled": true
    },
    {
      "id": "blueocean",
      "name": "Blue Ocean",
      "password": "blueocean",
      "website": "blueocean.com",
      "enabled": true
    }
  ]
}
```

## Best Practices

### Naming Conventions

✅ **Good client IDs:**
- `acme-corp`
- `techstart`
- `blue-ocean-ventures`

❌ **Avoid:**
- `Acme Corp` (spaces)
- `acme_corp` (underscores)
- `client1` (not descriptive)

### Password Strategy

✅ **Good passwords:**
- Company name: `acme`
- Simple phrase: `blueocean`
- Easy to remember: `techstart`

❌ **Avoid:**
- Complex: `Acm3!C0rp#2025`
- Generic: `password123`
- Hard to share: `xK9$mP2@qL`

### Organization

Keep clients organized:
```bash
# Use consistent naming
acme-corp, techstart-inc, blue-ocean-llc

# Group by type if needed
ecommerce-client-1
ecommerce-client-2
saas-client-1
saas-client-2
```

## Verification Checklist

After adding a client, verify:

- [ ] Client appears in `clients.config.json`
- [ ] Content folder exists: `src/content/docs/<id>/`
- [ ] Metrics file exists: `src/data/<id>-metrics.json`
- [ ] Ran `npm run sync-clients`
- [ ] Dev server running: `npm run dev`
- [ ] Can access: `http://localhost:4321/<id>`
- [ ] Password works on login page
- [ ] Homepage loads with metrics
- [ ] Template pages appear in navigation

## Troubleshooting

**Script fails with "already exists"**
```bash
# Client already exists, choose different ID or remove existing:
rm -rf src/content/docs/existing-client
rm src/data/existing-client-metrics.json
# Remove from clients.config.json
# Then try again
```

**Client not appearing after sync**
```bash
# Check enabled status
cat clients.config.json | grep -A 5 "your-client"

# Make sure enabled: true
# Restart dev server
npm run dev
```

**Password not working**
```bash
# Verify password in config
cat clients.config.json

# Re-sync
npm run sync-clients

# Hard refresh browser
Ctrl + Shift + R
```

## Next Steps

- **[Managing Clients](./managing-clients.md)** - Edit, disable, organize clients
- **[Adding Content](./adding-content.md)** - Add documentation to your client
- **[Updating Metrics](./updating-metrics.md)** - Update client metrics

---

**Ready to add your first client?** Run the automated script and you'll be done in 30 seconds! 🚀

