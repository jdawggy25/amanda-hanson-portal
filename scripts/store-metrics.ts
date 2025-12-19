// Script to store metrics data fetched via MCP into Supabase cache
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 5 days TTL
const TTL_MS = 5 * 24 * 60 * 60 * 1000;

interface ClientMetrics {
  client: { name: string; reportDate: string; website: string };
  overview: any;
  keywords: any;
  traffic: any;
  backlinks: any;
  competitors: any[];
  topPages: any[];
  brokenBacklinks: any[];
  anchorTexts: any[];
  coreWebVitals: any;
  lighthouse: any;
  dataSource: any;
}

async function storeMetrics(website: string, metrics: ClientMetrics) {
  const cacheKey = `metrics-${website.replace(/[^a-z0-9]/gi, '-')}`;

  const { error } = await supabase.from('metrics_cache').upsert(
    {
      key: cacheKey,
      data: metrics,
      cached_at: new Date().toISOString(),
      ttl_ms: TTL_MS,
    },
    { onConflict: 'key' }
  );

  if (error) {
    console.error(`Failed to store ${website}:`, error.message);
    return false;
  }

  console.log(`Stored metrics for ${website}`);
  return true;
}

// Metrics data from MCP calls - will be populated by the main script
const metricsData: Record<string, ClientMetrics> = {};

// Export for use
export { storeMetrics, metricsData };

// If run directly with args
const args = process.argv.slice(2);
if (args[0] === '--store' && args[1]) {
  const jsonFile = args[1];
  import('fs').then(fs => {
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
    storeMetrics(data.client.website, data).then(success => {
      process.exit(success ? 0 : 1);
    });
  });
}
