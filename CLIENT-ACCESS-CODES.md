# Client Access Codes

This document contains the access codes for each client to view their SEO reports.

## How to Access

1. Go to the homepage: `https://your-domain.com/` (or `http://localhost:4322/` for local dev)
2. Enter the access code for your client
3. You'll be redirected to your client dashboard

## Access Codes

| Client Name    | Access Code    | Dashboard URL              |
|----------------|----------------|----------------------------|
| V3             | `v3`           | `/v3`                      |
| Casita         | `casita`       | `/casita`                  |
| BNC Builders   | `bnc-builders` | `/bnc-builders`            |

## Direct Access

You can also access client dashboards directly by navigating to:
- V3: `https://your-domain.com/v3`
- Casita: `https://your-domain.com/casita`
- BNC Builders: `https://your-domain.com/bnc-builders`

## Adding New Clients

To add a new client access code:

1. Open `src/pages/index.astro`
2. Find the `clientPasswords` object (around line 78)
3. Add a new entry:
   ```javascript
   const clientPasswords: Record<string, string> = {
     'v3': '/v3',
     'casita': '/casita',
     'bnc-builders': '/bnc-builders',
     'new-client': '/new-client',  // Add this line
   };
   ```
4. Make sure the client directory exists in `src/content/docs/new-client/`

## Security Note

⚠️ **Important:** These are simple access codes for basic client separation. They are NOT secure passwords. For production use with sensitive data, implement proper authentication (OAuth, JWT, etc.).

The current implementation is suitable for:
- Demo sites
- Internal documentation
- Non-sensitive client reports
- Development environments

For production with sensitive data, consider:
- Implementing proper authentication (Auth0, Clerk, etc.)
- Using environment variables for access codes
- Adding session management
- Implementing rate limiting
- Using HTTPS only

