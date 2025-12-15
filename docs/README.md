# 📚 Documentation

Complete documentation for the Comcreate Multi-Client SEO Report Platform.

---

## ⚡ Quick Start (Start Here!)

**New to the platform?** Start with these:

1. **[Quick Start Guide](./quick-start.md)** - Get up and running in 2 minutes ⭐
2. **[Adding Clients](./adding-clients.md)** - Add your first client
3. **[Adding Content](./adding-content.md)** - Add documentation pages

---

## 🚀 Getting Started

- **[Quick Start Guide](./quick-start.md)** - Get up and running in 2 minutes
- **[Project Structure](./project-structure.md)** - Understanding the codebase

## 👥 Client Management

- **[Adding Clients](./adding-clients.md)** - How to add new clients (automated & manual)
- **[Managing Clients](./managing-clients.md)** - Edit, disable, and organize clients
- **[Client Configuration](./client-configuration.md)** - Understanding clients.config.json

## 📝 Content Management

- **[Adding Content](./adding-content.md)** - How to add and organize documentation

## 🚀 Deployment

- **[Deployment Guide](./deployment.md)** - Deploy to Vercel, Netlify, or other platforms

## 🆘 Troubleshooting

- **[Troubleshooting Guide](./troubleshooting.md)** - Solutions to common problems

---

---

## 🎯 Most Common Tasks

### 1. Add a New Client
```bash
npm run add-client acme-corp "Acme Corporation" acme acme.com
npm run sync-clients
```
See: [Adding Clients](./adding-clients.md)

### 2. Add Content to Client
Drag markdown files to `src/content/docs/client-id/docs/`

See: [Adding Content](./adding-content.md)

### 3. Update Client Metrics
Edit `src/data/client-id-metrics.json`

### 4. Deploy to Production
```bash
git push
```
See: [Deployment Guide](./deployment.md)

---

## 🆘 Need Help?

- **Common Issues**: [Troubleshooting](./troubleshooting.md)
- **Email Support**: [sales@comcreate.org](mailto:sales@comcreate.org)

---

## 📋 Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Client Management
npm run add-client       # Add new client (automated)
npm run sync-clients     # Sync configuration to routing files
```

---

**Ready to get started?** Begin with the [Quick Start Guide](./quick-start.md)! 🚀

