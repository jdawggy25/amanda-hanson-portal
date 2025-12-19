/**
 * POST /admin/api/collect-metrics
 *
 * Collects metrics for clients.
 *
 * Note: For full automation, the CLI script (npm run seo:collect) requires
 * a valid Ahrefs API token with v3 API access.
 *
 * For manual collection, use Claude Code with MCP tools which has built-in
 * Ahrefs access.
 */

import type { APIRoute } from 'astro';
import { checkAuth } from '../../../lib/auth/supabase-auth';

export const POST: APIRoute = async ({ cookies }) => {
  // Check authentication using Supabase Auth
  const auth = await checkAuth(cookies);

  if (!auth.authenticated || !auth.authorized) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({
    success: false,
    message: 'Manual data collection required',
    instructions: [
      'The Ahrefs API requires a paid plan with v3 API access.',
      '',
      'To collect fresh metrics, use Claude Code with these commands:',
      '',
      '1. Ask Claude: "Collect SEO metrics for [client-name] and update the JSON file"',
      '2. Or run bulk collection: "Collect metrics for all SEO clients"',
      '',
      'Claude will use the built-in Ahrefs MCP tools to fetch fresh data.',
      '',
      'Alternative: If you have API access, run locally:',
      '  npm run seo:collect',
    ],
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
