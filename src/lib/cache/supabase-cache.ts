/**
 * Supabase-backed Cache Service for SEO Metrics
 *
 * Provides persistent caching compatible with Vercel serverless deployment.
 * 5-day TTL by default.
 *
 * REQUIRED: Run this SQL migration in your Supabase dashboard:
 *
 * CREATE TABLE metrics_cache (
 *   key TEXT PRIMARY KEY,
 *   data JSONB NOT NULL,
 *   cached_at TIMESTAMPTZ DEFAULT NOW(),
 *   ttl_ms BIGINT DEFAULT 432000000
 * );
 *
 * CREATE INDEX idx_metrics_cache_cached_at ON metrics_cache(cached_at);
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 30 days in milliseconds
const DEFAULT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface CacheRow {
  key: string;
  data: unknown;
  cached_at: string;
  ttl_ms: number;
}

// Singleton client
let supabaseClient: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = import.meta.env.SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
  }

  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}

/**
 * Get cached data by key
 * Returns null if not found or expired
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const client = getClient();

    const { data, error } = await client
      .from('metrics_cache')
      .select('*')
      .eq('key', key)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found
        return null;
      }
      // Table doesn't exist or other DB error
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Cache table does not exist. Run the migration: supabase/migrations/20241218_create_metrics_cache.sql');
        return null;
      }
      console.error('Cache get error:', error.code, error.message);
      return null;
    }

    const row = data as CacheRow;
    const cachedAt = new Date(row.cached_at).getTime();
    const age = Date.now() - cachedAt;

    // Check if expired
    if (age > row.ttl_ms) {
      // Delete expired entry
      await clearCache(key);
      return null;
    }

    console.log(`Cache hit for ${key} (age: ${formatCacheAge(age)})`);
    return row.data as T;
  } catch (error) {
    console.error('Cache get failed:', error);
    return null;
  }
}

/**
 * Store data in cache
 */
export async function setCached<T>(
  key: string,
  data: T,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<void> {
  try {
    const client = getClient();

    const { error } = await client.from('metrics_cache').upsert(
      {
        key,
        data,
        cached_at: new Date().toISOString(),
        ttl_ms: ttlMs,
      },
      { onConflict: 'key' }
    );

    if (error) {
      // Table doesn't exist
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('Cache table does not exist. Run the migration: supabase/migrations/20241218_create_metrics_cache.sql');
        return;
      }
      console.error('Cache set error:', error.code, error.message);
    } else {
      console.log(`Cache set for ${key} (TTL: ${Math.round(ttlMs / (1000 * 60 * 60 * 24))} days)`);
    }
  } catch (error) {
    console.error('Cache set failed:', error);
  }
}

/**
 * Clear a specific cache entry
 */
export async function clearCache(key: string): Promise<void> {
  try {
    const client = getClient();

    await client.from('metrics_cache').delete().eq('key', key);
  } catch (error) {
    console.error('Cache clear failed:', error);
  }
}

/**
 * Clear all cache entries
 */
export async function clearAllCache(): Promise<void> {
  try {
    const client = getClient();

    // Delete all rows - using a condition that matches everything
    await client.from('metrics_cache').delete().neq('key', '');
  } catch (error) {
    console.error('Cache clear all failed:', error);
  }
}

/**
 * Get the age of a cached entry in milliseconds
 */
export async function getCacheAge(key: string): Promise<number | null> {
  try {
    const client = getClient();

    const { data, error } = await client
      .from('metrics_cache')
      .select('cached_at')
      .eq('key', key)
      .single();

    if (error || !data) {
      return null;
    }

    const cachedAt = new Date((data as { cached_at: string }).cached_at).getTime();
    return Date.now() - cachedAt;
  } catch {
    return null;
  }
}

/**
 * Format cache age for display
 */
export function formatCacheAge(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  const minutes = Math.floor(ms / (1000 * 60));
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

/**
 * Check if cache is expired (useful for conditional refresh)
 */
export async function isCacheExpired(key: string): Promise<boolean> {
  try {
    const client = getClient();

    const { data, error } = await client
      .from('metrics_cache')
      .select('cached_at, ttl_ms')
      .eq('key', key)
      .single();

    if (error || !data) {
      return true;
    }

    const row = data as { cached_at: string; ttl_ms: number };
    const cachedAt = new Date(row.cached_at).getTime();
    const age = Date.now() - cachedAt;

    return age > row.ttl_ms;
  } catch {
    return true;
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  totalEntries: number;
  expiredEntries: number;
}> {
  try {
    const client = getClient();

    const { data, error } = await client
      .from('metrics_cache')
      .select('cached_at, ttl_ms');

    if (error || !data) {
      return { totalEntries: 0, expiredEntries: 0 };
    }

    const now = Date.now();
    let expiredCount = 0;

    for (const row of data as CacheRow[]) {
      const cachedAt = new Date(row.cached_at).getTime();
      if (now - cachedAt > row.ttl_ms) {
        expiredCount++;
      }
    }

    return {
      totalEntries: data.length,
      expiredEntries: expiredCount,
    };
  } catch {
    return { totalEntries: 0, expiredEntries: 0 };
  }
}
