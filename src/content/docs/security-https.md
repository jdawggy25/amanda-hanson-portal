---
title: "Security & HTTPS Implementation Guide"
description: "SSL/TLS certificate setup, HTTPS migration, security headers, and best practices for protecting user data and improving SEO."
---

# Security & HTTPS Implementation Guide

Comprehensive security and HTTPS setup for Casita Azul to protect user data and boost SEO rankings.

---

## Why Security Matters for SEO

1. **HTTPS is a ranking factor** - Google confirmed in 2014
2. **Chrome marks HTTP as "Not Secure"** - Scares away parents
3. **Trust signals** - Parents sharing sensitive info need security
4. **Core Web Vitals** - HTTP/2 (requires HTTPS) improves performance
5. **Form protection** - Contact and enrollment forms need encryption

---

## SSL/TLS Certificate Setup

### Option 1: Free SSL with Let's Encrypt

**For most hosting providers:**
1. Access hosting control panel (cPanel, Plesk, etc.)
2. Find "SSL/TLS" or "Security" section
3. Enable "Let's Encrypt" or "AutoSSL"
4. Select domain: casitaazul.com
5. Include www subdomain
6. Auto-renewal should be enabled by default

**For manual installation (advanced):**
```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d casitaazul.com -d www.casitaazul.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### Option 2: Cloudflare Free SSL

1. Sign up at cloudflare.com
2. Add casitaazul.com
3. Update nameservers to Cloudflare
4. SSL/TLS > Overview > Select "Full (strict)"
5. Enable "Always Use HTTPS"

### Option 3: Paid SSL (Extended Validation)

For maximum trust (shows company name in browser):
- DigiCert EV SSL (~$300/year)
- Comodo EV SSL (~$200/year)
- GlobalSign EV SSL (~$250/year)

---

## HTTPS Migration Checklist

### Before Migration
- [ ] Backup entire website
- [ ] Document all current URLs
- [ ] List all third-party integrations
- [ ] Check if CMS supports HTTPS
- [ ] Verify SSL certificate is installed

### During Migration
- [ ] Update all internal links to HTTPS
- [ ] Update canonical tags to HTTPS
- [ ] Update sitemap URLs to HTTPS
- [ ] Update robots.txt sitemap reference
- [ ] Update CDN to serve HTTPS
- [ ] Update social media profile links

### After Migration
- [ ] Set up 301 redirects (HTTP → HTTPS)
- [ ] Test all pages for mixed content
- [ ] Update Google Search Console property
- [ ] Update Google Analytics settings
- [ ] Update Google Business Profile
- [ ] Verify in Bing Webmaster Tools
- [ ] Test forms and checkout processes

---

## Force HTTPS Redirects

### Apache (.htaccess)

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force www (optional - pick one)
RewriteCond %{HTTP_HOST} ^casitaazul\.com [NC]
RewriteRule ^(.*)$ https://www.casitaazul.com/$1 [L,R=301]

# OR Force non-www (pick one)
RewriteCond %{HTTP_HOST} ^www\.casitaazul\.com [NC]
RewriteRule ^(.*)$ https://casitaazul.com/$1 [L,R=301]
```

### Nginx

```nginx
# Force HTTPS
server {
    listen 80;
    server_name casitaazul.com www.casitaazul.com;
    return 301 https://casitaazul.com$request_uri;
}

# Force non-www HTTPS
server {
    listen 443 ssl http2;
    server_name www.casitaazul.com;
    return 301 https://casitaazul.com$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    server_name casitaazul.com;

    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    # ... rest of config
}
```

### WordPress (wp-config.php)

```php
// Force HTTPS
define('FORCE_SSL_ADMIN', true);

// Update site URLs (also do in Settings > General)
define('WP_HOME', 'https://casitaazul.com');
define('WP_SITEURL', 'https://casitaazul.com');

// If behind a proxy/load balancer
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    $_SERVER['HTTPS'] = 'on';
}
```

---

## Security Headers

### Essential Security Headers

Add these to your server configuration or via a plugin:

```apache
# Apache .htaccess
<IfModule mod_headers.c>
    # Prevent clickjacking
    Header always set X-Frame-Options "SAMEORIGIN"

    # Prevent MIME-type sniffing
    Header always set X-Content-Type-Options "nosniff"

    # Enable XSS filter
    Header always set X-XSS-Protection "1; mode=block"

    # Referrer policy
    Header always set Referrer-Policy "strict-origin-when-cross-origin"

    # Permissions policy
    Header always set Permissions-Policy "geolocation=(self), microphone=(), camera=()"

    # HSTS - Force HTTPS for 1 year
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>
```

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(self), microphone=(), camera=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

### Content Security Policy (CSP)

```apache
# Basic CSP for Casita Azul
Header always set Content-Security-Policy "\
    default-src 'self'; \
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com; \
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; \
    img-src 'self' data: https: blob:; \
    font-src 'self' https://fonts.gstatic.com; \
    connect-src 'self' https://www.google-analytics.com https://analytics.google.com; \
    frame-src 'self' https://www.google.com https://www.youtube.com; \
    object-src 'none'; \
    base-uri 'self'; \
    form-action 'self';"
```

---

## Mixed Content Detection & Fixes

### Finding Mixed Content

**Browser Console Method:**
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for "Mixed Content" warnings
4. Note the insecure URLs

**Online Tools:**
- WhyNoPadlock.com
- JitBit SSL Check
- SSL Labs Server Test

### Common Mixed Content Issues

| Issue | Solution |
|-------|----------|
| Images with http:// | Change to https:// or // |
| External scripts | Update CDN links to HTTPS |
| Embedded videos | Use HTTPS embed codes |
| Google Maps | Use HTTPS API URL |
| Social media widgets | Update embed codes |
| CSS background images | Update URLs in stylesheets |

### WordPress Mixed Content Fix

```php
// Add to functions.php or use plugin
function fix_mixed_content($content) {
    $content = str_replace('http://casitaazul.com', 'https://casitaazul.com', $content);
    return $content;
}
add_filter('the_content', 'fix_mixed_content');
add_filter('widget_text', 'fix_mixed_content');
```

**Recommended Plugins:**
- Really Simple SSL (easiest)
- SSL Insecure Content Fixer
- Better Search Replace (for database)

---

## WordPress Security Hardening

### Essential Security Measures

```php
// wp-config.php additions

// Disable file editing from admin
define('DISALLOW_FILE_EDIT', true);

// Limit post revisions
define('WP_POST_REVISIONS', 5);

// Disable XML-RPC (if not using mobile apps)
add_filter('xmlrpc_enabled', '__return_false');

// Hide WordPress version
remove_action('wp_head', 'wp_generator');

// Disable user enumeration
if (!is_admin()) {
    if (preg_match('/author=([0-9]*)/i', $_SERVER['QUERY_STRING'])) {
        wp_redirect(home_url());
        exit;
    }
}
```

### .htaccess Security Rules

```apache
# Protect wp-config.php
<files wp-config.php>
    order allow,deny
    deny from all
</files>

# Protect .htaccess
<files .htaccess>
    order allow,deny
    deny from all
</files>

# Disable directory browsing
Options -Indexes

# Block access to sensitive files
<FilesMatch "^.*(error_log|wp-config\.php|php.ini|\.[hH][tT][aApP].*)$">
    Order deny,allow
    Deny from all
</FilesMatch>

# Block PHP execution in uploads
<Directory "/wp-content/uploads/">
    <Files "*.php">
        Order Deny,Allow
        Deny from All
    </Files>
</Directory>

# Limit login attempts (basic)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_METHOD} POST
    RewriteCond %{REQUEST_URI} ^/wp-login\.php$
    RewriteCond %{HTTP_REFERER} !^https://casitaazul\.com [NC]
    RewriteRule .* - [F]
</IfModule>
```

### Recommended Security Plugins

| Plugin | Purpose | Priority |
|--------|---------|----------|
| Wordfence | Firewall + malware scanning | High |
| Sucuri Security | Security monitoring | High |
| Two-Factor | 2FA for admin login | High |
| Limit Login Attempts | Brute force protection | Medium |
| UpdraftPlus | Backups | High |
| iThemes Security | Comprehensive security | Medium |

---

## Form Security

### Contact/Tour Request Forms

```html
<!-- Add honeypot field to catch bots -->
<form action="/submit-tour" method="POST">
    <!-- Hidden honeypot - bots will fill this -->
    <input type="text" name="website" style="display:none;" tabindex="-1" autocomplete="off">

    <!-- Visible fields -->
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <input type="tel" name="phone">
    <textarea name="message"></textarea>

    <!-- reCAPTCHA v3 -->
    <input type="hidden" name="recaptcha_token" id="recaptcha_token">

    <button type="submit">Schedule Tour</button>
</form>

<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
<script>
grecaptcha.ready(function() {
    grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
        document.getElementById('recaptcha_token').value = token;
    });
});
</script>
```

### Input Validation (Server-Side)

```php
// Always validate server-side
function sanitize_tour_request($data) {
    $clean = array();

    // Name - letters, spaces, hyphens only
    $clean['name'] = preg_replace('/[^a-zA-Z\s\-]/', '', $data['name']);

    // Email - validate format
    $clean['email'] = filter_var($data['email'], FILTER_VALIDATE_EMAIL);

    // Phone - digits, spaces, dashes, parens
    $clean['phone'] = preg_replace('/[^0-9\s\-\(\)\+]/', '', $data['phone']);

    // Message - escape HTML
    $clean['message'] = htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8');

    // Check honeypot
    if (!empty($data['website'])) {
        return false; // Bot detected
    }

    return $clean;
}
```

---

## Database Security

### WordPress Database Prefix

Change default `wp_` prefix during installation, or use a plugin to change it later.

### Regular Backups

```bash
# Automated backup script (cron)
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups"

# Database backup
mysqldump -u username -p'password' database_name > $BACKUP_DIR/db_$DATE.sql
gzip $BACKUP_DIR/db_$DATE.sql

# File backup
tar -czf $BACKUP_DIR/files_$DATE.tar.gz /var/www/casitaazul.com/

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
```

### Database Security Checklist

- [ ] Change default table prefix
- [ ] Use strong database password
- [ ] Limit database user permissions
- [ ] Regular automated backups
- [ ] Backup stored off-site
- [ ] Test backup restoration quarterly

---

## Monitoring & Alerts

### Security Monitoring Setup

1. **Google Search Console** - Monitors for security issues
2. **Sucuri SiteCheck** - Free malware scanning
3. **UptimeRobot** - Monitors site availability
4. **Cloudflare** - DDoS protection + analytics

### Alert Configuration

Set up alerts for:
- [ ] Failed login attempts (>5 in 1 hour)
- [ ] File changes in core directories
- [ ] New admin user creation
- [ ] Plugin/theme updates
- [ ] SSL certificate expiration (30 days before)
- [ ] Site downtime

---

## Security Audit Checklist

### Weekly
- [ ] Review login attempts/security logs
- [ ] Check for WordPress/plugin updates
- [ ] Verify backups completed successfully

### Monthly
- [ ] Run malware scan
- [ ] Test SSL certificate
- [ ] Review user accounts (remove unused)
- [ ] Check security headers (securityheaders.com)

### Quarterly
- [ ] Full security audit
- [ ] Test backup restoration
- [ ] Review and update passwords
- [ ] Update security plugins
- [ ] Check for vulnerable plugins/themes

### Annual
- [ ] Penetration testing (optional)
- [ ] Review SSL certificate renewal
- [ ] Update security policies
- [ ] Staff security training

---

## Security Testing Tools

| Tool | Purpose | URL |
|------|---------|-----|
| SSL Labs | SSL configuration test | ssllabs.com/ssltest |
| Security Headers | Header analysis | securityheaders.com |
| Sucuri SiteCheck | Malware scanning | sitecheck.sucuri.net |
| Google Safe Browsing | Blacklist check | transparencyreport.google.com |
| Mozilla Observatory | Security grading | observatory.mozilla.org |

---

## Emergency Response Plan

### If Site is Hacked

1. **Immediately:**
   - Take site offline (maintenance mode)
   - Change all passwords (hosting, WP, database, FTP)
   - Contact hosting provider

2. **Investigate:**
   - Check malware scan results
   - Review server access logs
   - Identify entry point

3. **Clean:**
   - Restore from clean backup OR
   - Remove malware manually
   - Update all plugins/themes/core

4. **Secure:**
   - Implement additional security measures
   - Change all user passwords
   - Enable 2FA for all admins

5. **Report:**
   - Request Google review if blacklisted
   - Document incident
   - Notify affected users if data breach

---

## SSL Certificate Monitoring

### Auto-Renewal Verification

```bash
# Check certificate expiration
echo | openssl s_client -servername casitaazul.com -connect casitaazul.com:443 2>/dev/null | openssl x509 -noout -dates

# Set up cron to check monthly
0 0 1 * * /usr/bin/certbot renew --quiet
```

### Expiration Alerts

Use these services for SSL monitoring:
- SSL Certificate Expiry Reminder (sslchecker.com)
- UptimeRobot SSL monitoring
- Cloudflare (if using their SSL)

---

*Last Updated: December 2024*
