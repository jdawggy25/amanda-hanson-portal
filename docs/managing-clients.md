# 🔧 Managing Clients

Learn how to edit, disable, and organize your clients.

## Overview

All client management happens through `clients.config.json` - a single source of truth for all clients.

## Client Configuration File

### Location
```
clients.config.json
```

### Structure
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

## Common Tasks

### Edit Client Information

1. Open `clients.config.json`
2. Find your client
3. Edit the fields
4. Save the file
5. Run `npm run sync-clients`

**Example: Change client name**
```json
{
  "id": "acme-corp",
  "name": "Acme Corporation LLC",  ← Updated
  "password": "acme",
  "website": "acme.com",
  "enabled": true
}
```

### Change Client Password

```json
{
  "id": "acme-corp",
  "name": "Acme Corporation",
  "password": "new-password",  ← Updated
  "website": "acme.com",
  "enabled": true
}
```

Then sync:
```bash
npm run sync-clients
```

### Update Client Website

```json
{
  "id": "acme-corp",
  "name": "Acme Corporation",
  "password": "acme",
  "website": "newdomain.com",  ← Updated
  "enabled": true
}
```

### Disable a Client (Hide from Site)

Set `enabled` to `false`:

```json
{
  "id": "old-client",
  "name": "Old Client",
  "password": "old",
  "website": "old.com",
  "enabled": false  ← Disabled
}
```

Then sync:
```bash
npm run sync-clients
```

**What happens:**
- ✅ Client files remain intact
- ✅ Content is preserved
- ❌ Client doesn't appear on site
- ❌ Password won't work
- ❌ URLs return 404

**To re-enable:** Set `enabled: true` and sync again.

### Remove a Client Completely

1. **Remove from config:**
   ```json
   // Delete the entire client object from clients.config.json
   ```

2. **Delete files:**
   ```bash
   # Remove content
   rm -rf src/content/docs/client-id
   
   # Remove metrics
   rm src/data/client-id-metrics.json
   ```

3. **Sync:**
   ```bash
   npm run sync-clients
   ```

### Reorder Clients

Clients appear in the order they're listed in `clients.config.json`:

```json
{
  "clients": [
    { "id": "first-client", ... },   ← Shows first
    { "id": "second-client", ... },  ← Shows second
    { "id": "third-client", ... }    ← Shows third
  ]
}
```

Just drag and reorder in your editor, then sync.

## Bulk Operations

### Disable Multiple Clients

```json
{
  "clients": [
    { "id": "client-1", "enabled": false },
    { "id": "client-2", "enabled": false },
    { "id": "client-3", "enabled": true }
  ]
}
```

```bash
npm run sync-clients
```

### Change Multiple Passwords

```json
{
  "clients": [
    { "id": "client-1", "password": "new-pass-1" },
    { "id": "client-2", "password": "new-pass-2" },
    { "id": "client-3", "password": "new-pass-3" }
  ]
}
```

```bash
npm run sync-clients
```

## Organization Strategies

### Group by Status

```json
{
  "clients": [
    // Active clients
    { "id": "active-1", "enabled": true },
    { "id": "active-2", "enabled": true },
    
    // Archived clients
    { "id": "archived-1", "enabled": false },
    { "id": "archived-2", "enabled": false }
  ]
}
```

### Group by Type

```json
{
  "clients": [
    // E-commerce clients
    { "id": "ecommerce-1", "name": "Shop A" },
    { "id": "ecommerce-2", "name": "Shop B" },
    
    // SaaS clients
    { "id": "saas-1", "name": "Software A" },
    { "id": "saas-2", "name": "Software B" }
  ]
}
```

### Use Naming Conventions

```json
{
  "clients": [
    { "id": "ecom-acme", "name": "Acme Shop" },
    { "id": "ecom-techmart", "name": "TechMart" },
    { "id": "saas-cloudapp", "name": "CloudApp" },
    { "id": "saas-dataflow", "name": "DataFlow" }
  ]
}
```

## Advanced Management

### Rename a Client ID

**Warning:** This changes URLs!

1. **Update config:**
   ```json
   {
     "id": "new-client-id",  ← Changed from old-client-id
     "name": "Client Name",
     "password": "password",
     "website": "client.com",
     "enabled": true
   }
   ```

2. **Rename directories:**
   ```bash
   mv src/content/docs/old-client-id \
      src/content/docs/new-client-id
   
   mv src/data/old-client-id-metrics.json \
      src/data/new-client-id-metrics.json
   ```

3. **Sync:**
   ```bash
   npm run sync-clients
   ```

**Impact:**
- Old URLs stop working: `/old-client-id` → 404
- New URLs work: `/new-client-id` → ✅
- Update any bookmarks or links!

### Clone a Client

Create a copy of an existing client:

```bash
# Copy content
cp -r src/content/docs/existing-client \
      src/content/docs/new-client

# Copy metrics
cp src/data/existing-client-metrics.json \
   src/data/new-client-metrics.json
```

Add to config:
```json
{
  "id": "new-client",
  "name": "New Client",
  "password": "newpass",
  "website": "newclient.com",
  "enabled": true
}
```

Sync:
```bash
npm run sync-clients
```

### Migrate Client Data

Move client to different ID:

```bash
# 1. Copy files to new location
cp -r src/content/docs/old-id src/content/docs/new-id
cp src/data/old-id-metrics.json src/data/new-id-metrics.json

# 2. Update config with new ID

# 3. Sync
npm run sync-clients

# 4. Remove old files
rm -rf src/content/docs/old-id
rm src/data/old-id-metrics.json
```

## Verification

After making changes, verify:

```bash
# 1. Check config is valid JSON
cat clients.config.json | jq .

# 2. Sync configuration
npm run sync-clients

# 3. Start dev server
npm run dev

# 4. Test each client
# - Visit homepage
# - Test password
# - Check content loads
```

## Troubleshooting

**Changes not appearing?**
```bash
# Always sync after config changes
npm run sync-clients

# Restart dev server
npm run dev

# Hard refresh browser
Ctrl + Shift + R
```

**Password not working after change?**
```bash
# Make sure you synced
npm run sync-clients

# Check password in config
cat clients.config.json | grep -A 5 "client-id"

# Clear browser cache
```

**Client still showing after disabling?**
```bash
# Verify enabled: false in config
cat clients.config.json

# Re-sync
npm run sync-clients

# Restart dev server
npm run dev
```

**Invalid JSON error?**
```bash
# Validate JSON
cat clients.config.json | jq .

# Common issues:
# - Missing comma
# - Extra comma at end
# - Unmatched quotes
# - Unmatched brackets
```

## Best Practices

### Always Sync After Changes

```bash
# Edit clients.config.json
# Then ALWAYS:
npm run sync-clients
```

### Keep Backups

```bash
# Before major changes
cp clients.config.json clients.config.json.backup

# If something goes wrong
cp clients.config.json.backup clients.config.json
npm run sync-clients
```

### Test Before Production

```bash
# Test locally first
npm run dev
# Verify everything works

# Then deploy
git add .
git commit -m "Update client configuration"
git push
```

### Document Changes

```bash
# Use descriptive commit messages
git commit -m "Disable archived clients"
git commit -m "Update Acme Corp password"
git commit -m "Add new client: TechStart"
```

## Next Steps

- **[Adding Clients](./adding-clients.md)** - Add new clients
- **[Adding Content](./adding-content.md)** - Manage client content
- **[Client Configuration](./client-configuration.md)** - Advanced configuration

---

**Managing clients is easy!** Edit one file, sync, and you're done. 🎯

