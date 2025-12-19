/**
 * Client Data API Endpoint
 *
 * GET /admin/api/client-data/:id?month=YYYY-MM
 *
 * Returns full aggregated data for a single client.
 */

import type { APIRoute } from 'astro';
import { aggregateClientData, getCurrentMonth } from '../../../../lib/admin';
import { checkAuth } from '../../../../lib/auth/supabase-auth';

export const GET: APIRoute = async ({ params, request, cookies }) => {
  // Check authentication using Supabase Auth
  const auth = await checkAuth(cookies);

  if (!auth.authenticated || !auth.authorized) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const clientId = params.id;

  if (!clientId) {
    return new Response(JSON.stringify({ error: 'Client ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get month from query params or use current month
    const url = new URL(request.url);
    const month = url.searchParams.get('month') || getCurrentMonth();

    // Aggregate client data
    const data = await aggregateClientData(clientId, month);

    if (!data) {
      return new Response(JSON.stringify({ error: 'Client not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Failed to get client data for ${clientId}:`, error);
    return new Response(
      JSON.stringify({
        error: 'Failed to get client data',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
