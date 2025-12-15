# 🆘 Troubleshooting

Solutions to common issues.

## Client Issues

### Client Not Appearing

**Symptoms:** Client doesn't show up on site

**Solutions:**

1. **Check if enabled:**
   ```bash
   cat clients.config.json | grep -A 5 "your-client"
   # Make sure "enabled": true
   ```

2. **Sync configuration:**
   ```bash
   npm run sync-clients
   ```

3. **Restart dev server:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

4. **Clear browser cache:**
   ```
   Ctrl + Shift + R (Windows/Linux)
   Cmd + Shift + R (Mac)
   ```

### Password Not Working

**Symptoms:** Password doesn't redirect to client

**Solutions:**

1. **Verify password in config:**
   ```bash
   cat clients.config.json
   ```

2. **Re-sync:**
   ```bash
   npm run sync-clients
   ```

3. **Check for typos:**
   - Passwords are case-sensitive
   - No extra spaces
   - Match exactly what's in config

4. **Clear browser cache and try again**

### Client Shows 404

**Symptoms:** Client URL returns "Page not found"

**Solutions:**

1. **Verify client exists in config:**
   ```bash
   cat clients.config.json
   ```

2. **Check content directory exists:**
   ```bash
   ls -la src/content/docs/
   ```

3. **Sync and rebuild:**
   ```bash
   npm run sync-clients
   npm run dev
   ```

## Content Issues

### Page Not Showing

**Symptoms:** Markdown file doesn't appear in navigation

**Solutions:**

1. **Check file extension:**
   ```bash
   # Must be .md
   mv page.txt page.md
   ```

2. **Verify file location:**
   ```bash
   # Should be in:
   src/content/docs/{client-id}/docs/
   # or
   src/content/docs/{client-id}/dev/
   ```

3. **Check frontmatter:**
   ```markdown
   ---
   title: "Page Title"
   ---
   ```

4. **Restart dev server**

### Markdown Not Rendering

**Symptoms:** Content shows as plain text

**Solutions:**

1. **Check frontmatter syntax:**
   ```markdown
   ---
   title: "Title"
   description: "Description"
   ---
   
   # Content starts here
   ```

2. **Verify YAML is valid:**
   - No tabs (use spaces)
   - Quotes around strings with special characters
   - Proper indentation

3. **Check for syntax errors:**
   - Unclosed code blocks
   - Malformed lists
   - Broken links

### Images Not Loading

**Symptoms:** Images show broken icon

**Solutions:**

1. **Check image path:**
   ```markdown
   # Absolute path
   ![Alt text](/images/chart.png)
   
   # External URL
   ![Alt text](https://example.com/image.jpg)
   ```

2. **Verify image exists:**
   ```bash
   ls public/images/
   ```

3. **Use correct format:**
   - Supported: .jpg, .png, .gif, .svg, .webp

## Metrics Issues

### Metrics Not Displaying

**Symptoms:** Dashboard shows no data or errors

**Solutions:**

1. **Check metrics file exists:**
   ```bash
   ls src/data/{client-id}-metrics.json
   ```

2. **Validate JSON:**
   ```bash
   cat src/data/{client-id}-metrics.json | jq .
   ```

3. **Check file naming:**
   ```bash
   # Must match: {client-id}-metrics.json
   # Example: acme-corp-metrics.json
   ```

4. **Verify JSON structure:**
   - No trailing commas
   - All quotes matched
   - All brackets matched

### Charts Not Rendering

**Symptoms:** Charts area is blank or shows error

**Solutions:**

1. **Check browser console:**
   ```
   F12 → Console tab
   Look for errors
   ```

2. **Verify data format:**
   ```json
   {
     "traffic": {
       "trend": [100, 200, 300]  // Must be array of numbers
     }
   }
   ```

3. **Check for NaN or null values:**
   ```json
   // Bad
   "total": null
   
   // Good
   "total": 0
   ```

## Build Issues

### Build Fails

**Symptoms:** `npm run build` shows errors

**Solutions:**

1. **Check error message:**
   ```bash
   npm run build
   # Read the error carefully
   ```

2. **Common causes:**
   - Invalid JSON in metrics files
   - Missing frontmatter in markdown
   - Broken imports
   - TypeScript errors

3. **Validate all JSON files:**
   ```bash
   # Check clients config
   cat clients.config.json | jq .
   
   # Check all metrics files
   for f in src/data/*.json; do
     echo "Checking $f"
     cat "$f" | jq . > /dev/null
   done
   ```

4. **Clear cache and rebuild:**
   ```bash
   rm -rf dist .astro node_modules/.vite
   npm run build
   ```

### Port Already in Use

**Symptoms:** "Port 4321 is already in use"

**Solutions:**

1. **Kill the process:**
   ```bash
   npx kill-port 4321
   ```

2. **Or use different port:**
   ```bash
   npm run dev -- --port 3000
   ```

3. **Find and kill manually:**
   ```bash
   # Linux/Mac
   lsof -i :4321
   kill -9 <PID>
   
   # Windows
   netstat -ano | findstr :4321
   taskkill /PID <PID> /F
   ```

## Sync Issues

### Sync Script Fails

**Symptoms:** `npm run sync-clients` shows errors

**Solutions:**

1. **Check JSON syntax:**
   ```bash
   cat clients.config.json | jq .
   ```

2. **Verify file permissions:**
   ```bash
   chmod +x scripts/*.js
   ```

3. **Check Node version:**
   ```bash
   node --version
   # Should be 18+
   ```

### Changes Not Syncing

**Symptoms:** Config changes don't appear on site

**Solutions:**

1. **Always sync after config changes:**
   ```bash
   npm run sync-clients
   ```

2. **Restart dev server:**
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

3. **Hard refresh browser:**
   ```
   Ctrl + Shift + R
   ```

## Performance Issues

### Slow Page Loads

**Solutions:**

1. **Optimize images:**
   ```bash
   npm install sharp
   # Astro will auto-optimize
   ```

2. **Check metrics file size:**
   ```bash
   ls -lh src/data/*.json
   # Should be < 100KB each
   ```

3. **Reduce chart data points:**
   ```json
   {
     "trend": [1, 2, 3, 4, 5]  // Not [1, 2, 3, ..., 1000]
   }
   ```

### Build Takes Too Long

**Solutions:**

1. **Clear cache:**
   ```bash
   rm -rf .astro dist
   ```

2. **Check number of pages:**
   ```bash
   find src/content/docs -name "*.md" | wc -l
   ```

3. **Optimize content:**
   - Remove unused files
   - Compress large images
   - Reduce markdown file sizes

## Deployment Issues

### Deploy Fails

**Symptoms:** Deployment fails on Vercel/Netlify

**Solutions:**

1. **Test build locally:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check build logs:**
   - Look for specific error
   - Often same as local build errors

3. **Verify Node version:**
   ```json
   // package.json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

### Site Not Updating

**Symptoms:** Changes don't appear on live site

**Solutions:**

1. **Check deployment status:**
   - Vercel: Check deployments tab
   - Netlify: Check deploys tab

2. **Clear CDN cache:**
   - Vercel: Auto-clears
   - Netlify: Trigger redeploy

3. **Hard refresh:**
   ```
   Ctrl + Shift + R
   ```

## Getting Help

### Before Asking for Help

1. **Check this guide**
2. **Read error messages carefully**
3. **Search existing issues**
4. **Try basic troubleshooting:**
   - Restart dev server
   - Clear cache
   - Sync configuration

### When Asking for Help

Include:
- Error message (full text)
- What you were trying to do
- What you've already tried
- Relevant code/config
- Node version: `node --version`
- npm version: `npm --version`

### Contact

- **Email:** [sales@comcreate.org](mailto:sales@comcreate.org)
- **Include:** Error details and steps to reproduce

## Quick Fixes

```bash
# Nuclear option - fixes most issues
rm -rf node_modules dist .astro
npm install
npm run sync-clients
npm run dev
```

---

**Still stuck?** Check the [FAQ](./faq.md) or contact support. 🆘

