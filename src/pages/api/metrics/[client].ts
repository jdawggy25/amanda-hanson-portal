import type { APIRoute } from 'astro';
import { fetchClientMetrics, clearClientMetricsCache } from '../../../lib/metrics';
import clientsConfig from '../../../../clients.config.json';

export const prerender = false; // This route must be server-rendered

interface ClientConfig {
  id: string;
  name: string;
  website: string;
  enabled: boolean;
}

function findClient(clientId: string): ClientConfig | undefined {
  return clientsConfig.clients.find(
    (c: ClientConfig) => c.id === clientId && c.enabled
  );
}

// GET /api/metrics/[client] - Get metrics (uses cache)
export const GET: APIRoute = async ({ params, request }) => {
  const clientId = params.client;

  if (!clientId) {
    return new Response(JSON.stringify({ error: 'Client ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = findClient(clientId);

  if (!client) {
    return new Response(JSON.stringify({ error: `Client not found: ${clientId}` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!client.website) {
    return new Response(JSON.stringify({ error: `No website configured for client: ${clientId}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(request.url);
    const forceRefresh = url.searchParams.get('refresh') === 'true';

    const metrics = await fetchClientMetrics(client.name, client.website, forceRefresh);

    return new Response(JSON.stringify(metrics), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Browser cache for 1 hour
      },
    });
  } catch (error) {
    console.error(`Failed to fetch metrics for ${clientId}:`, error);

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch metrics',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// POST /api/metrics/[client] - Force refresh (bypasses cache)
export const POST: APIRoute = async ({ params }) => {
  const clientId = params.client;

  if (!clientId) {
    return new Response(JSON.stringify({ error: 'Client ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = findClient(clientId);

  if (!client) {
    return new Response(JSON.stringify({ error: `Client not found: ${clientId}` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!client.website) {
    return new Response(JSON.stringify({ error: `No website configured for client: ${clientId}` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Clear existing cache first
    await clearClientMetricsCache(client.website);

    // Fetch fresh metrics
    const metrics = await fetchClientMetrics(client.name, client.website, true);

    return new Response(JSON.stringify({ success: true, metrics }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Failed to refresh metrics for ${clientId}:`, error);

    return new Response(
      JSON.stringify({
        error: 'Failed to refresh metrics',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

// DELETE /api/metrics/[client] - Clear cache only
export const DELETE: APIRoute = async ({ params }) => {
  const clientId = params.client;

  if (!clientId) {
    return new Response(JSON.stringify({ error: 'Client ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const client = findClient(clientId);

  if (!client?.website) {
    return new Response(JSON.stringify({ error: `Client not found or no website: ${clientId}` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await clearClientMetricsCache(client.website);

    return new Response(JSON.stringify({ success: true, message: 'Cache cleared' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to clear cache' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
