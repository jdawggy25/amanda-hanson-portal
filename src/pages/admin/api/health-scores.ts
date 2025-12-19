/**
 * Health Scores API Endpoint
 *
 * GET /admin/api/health-scores?month=YYYY-MM
 *
 * Returns health scores for all enabled clients.
 */

import type { APIRoute } from 'astro';
import { aggregateAllClients, getCurrentMonth } from '../../../lib/admin';
import { checkAuth } from '../../../lib/auth/supabase-auth';

export const GET: APIRoute = async ({ request, cookies }) => {
  // Check authentication using Supabase Auth
  const auth = await checkAuth(cookies);

  if (!auth.authenticated || !auth.authorized) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get month from query params or use current month
    const url = new URL(request.url);
    const month = url.searchParams.get('month') || getCurrentMonth();

    // Aggregate all client data
    const data = await aggregateAllClients(month);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to get health scores:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to get health scores',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
