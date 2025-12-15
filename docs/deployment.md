# 🚀 Deployment Guide

Deploy your SEO platform to production.

## Quick Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial setup"
git push origin main
```

### 2. Deploy to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

**Done!** Your site is live in ~2 minutes.

### 3. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Cloudflare Pages

1. Push to GitHub
2. Visit [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## Build Configuration

### Vercel

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

### Netlify

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Environment Variables

### No Secrets Required

This platform doesn't require environment variables for basic operation.

### Optional Variables

If you add features that need secrets:

**Vercel:**
1. Go to project settings
2. Click "Environment Variables"
3. Add your variables

**Netlify:**
1. Go to site settings
2. Click "Build & deploy"
3. Click "Environment"
4. Add your variables

## Pre-Deployment Checklist

- [ ] All clients tested locally
- [ ] All passwords work
- [ ] All content loads correctly
- [ ] Metrics display properly
- [ ] Charts render correctly
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Fast page loads

## Build Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Client management
npm run add-client       # Add new client
npm run sync-clients     # Sync configuration
```

## Deployment Workflow

### Initial Deployment

```bash
# 1. Prepare
npm run build
npm run preview
# Test everything works

# 2. Commit
git add .
git commit -m "Ready for deployment"
git push

# 3. Deploy
# Vercel/Netlify auto-deploys on push
```

### Update Deployment

```bash
# 1. Make changes
# Edit content, add clients, update metrics

# 2. Test locally
npm run dev
# Verify changes

# 3. Build and test
npm run build
npm run preview

# 4. Deploy
git add .
git commit -m "Update client content"
git push
# Auto-deploys
```

### Add New Client (Production)

```bash
# 1. Add client locally
npm run add-client new-client "New Client" password site.com
npm run sync-clients

# 2. Customize content
# Edit docs and metrics

# 3. Test
npm run dev
npm run build

# 4. Deploy
git add .
git commit -m "Add new client: New Client"
git push
```

## Performance Optimization

### Image Optimization

```bash
# Install sharp for image optimization
npm install sharp

# Astro will automatically optimize images
```

### Build Optimization

Already optimized by default:
- ✅ Static site generation
- ✅ Minified CSS/JS
- ✅ Optimized assets
- ✅ Fast page loads

## Monitoring

### Vercel Analytics

1. Go to your project in Vercel
2. Click "Analytics"
3. View traffic and performance

### Google Analytics (Optional)

Add to `src/layouts/BaseLayout.astro`:

```astro
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>
</head>
```

## Troubleshooting

**Build fails?**
```bash
# Check for errors
npm run build

# Common issues:
# - Invalid JSON in metrics files
# - Missing frontmatter in markdown
# - Broken imports
```

**Site not updating?**
```bash
# Clear build cache
rm -rf dist .astro

# Rebuild
npm run build
```

**404 errors on deployment?**
```bash
# Make sure you synced clients
npm run sync-clients

# Rebuild
npm run build

# Redeploy
git push
```

## Rollback

### Vercel

1. Go to "Deployments"
2. Find previous working deployment
3. Click "Promote to Production"

### Git

```bash
# Revert to previous commit
git revert HEAD
git push

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force
```

## Best Practices

### Version Control

```bash
# Commit often with clear messages
git commit -m "Add Acme Corp client"
git commit -m "Update Q4 metrics for TechStart"
git commit -m "Fix broken links in documentation"
```

### Testing

```bash
# Always test before deploying
npm run dev      # Test in development
npm run build    # Test build succeeds
npm run preview  # Test production build
```

### Backups

```bash
# Backup before major changes
git tag -a v1.0 -m "Stable version"
git push --tags

# Restore if needed
git checkout v1.0
```

## Next Steps

- **[Custom Domains](./custom-domains.md)** - Set up custom domain
- **[Environment Variables](./environment-variables.md)** - Configure environments
- **[Troubleshooting](./troubleshooting.md)** - Common issues

---

**Ready to deploy!** Push to GitHub and let Vercel handle the rest. 🚀

