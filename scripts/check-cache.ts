// Check the status of the Supabase metrics cache
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

function formatAge(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h`;
  const minutes = Math.floor(ms / (1000 * 60));
  return `${minutes}m`;
}

function formatTTL(ms: number): string {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days} days`;
}

async function checkCache() {
  console.log('📊 Supabase Metrics Cache Status\n');
  console.log('=' .repeat(80));

  const { data, error } = await supabase
    .from('metrics_cache')
    .select('key, cached_at, ttl_ms, data')
    .order('cached_at', { ascending: false });

  if (error) {
    console.error('Error fetching cache:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No cached entries found');
    process.exit(0);
  }

  const now = Date.now();

  console.log(`\n${'Client'.padEnd(35)} ${'Age'.padEnd(10)} ${'Expires'.padEnd(12)} ${'DR'.padEnd(6)} ${'Traffic'.padEnd(10)} ${'Perf'}`);
  console.log('-'.repeat(80));

  for (const row of data) {
    const cachedAt = new Date(row.cached_at).getTime();
    const age = now - cachedAt;
    const expiresIn = row.ttl_ms - age;
    const isExpired = expiresIn <= 0;

    const metrics = row.data as any;
    const clientName = metrics?.client?.name || row.key;
    const dr = metrics?.overview?.domainRating ?? '?';
    const traffic = metrics?.overview?.organicTraffic ?? '?';
    const perf = metrics?.overview?.performanceScore ?? '?';

    const status = isExpired ? '❌ EXPIRED' : `${formatAge(expiresIn)} left`;

    console.log(
      `${clientName.padEnd(35)} ${formatAge(age).padEnd(10)} ${status.padEnd(12)} ${String(dr).padEnd(6)} ${String(traffic).padEnd(10)} ${perf}`
    );
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Total entries: ${data.length}`);

  const expired = data.filter(row => {
    const age = now - new Date(row.cached_at).getTime();
    return age > row.ttl_ms;
  });

  if (expired.length > 0) {
    console.log(`⚠️  ${expired.length} expired entries - run /refresh-metrics to update`);
  } else {
    console.log('✅ All entries are fresh');
  }
}

checkCache().catch(console.error);
