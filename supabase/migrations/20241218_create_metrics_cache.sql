-- Migration: Create metrics_cache table for SEO metrics caching
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Create the metrics_cache table
CREATE TABLE IF NOT EXISTS metrics_cache (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  ttl_ms BIGINT DEFAULT 432000000  -- 5 days in milliseconds
);

-- Create index for efficient cache expiration queries
CREATE INDEX IF NOT EXISTS idx_metrics_cache_cached_at ON metrics_cache(cached_at);

-- Enable Row Level Security (RLS)
ALTER TABLE metrics_cache ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust as needed for your security requirements)
-- For a server-side only cache, you might want to restrict this to service_role only
CREATE POLICY "Allow all operations on metrics_cache" ON metrics_cache
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON metrics_cache TO anon;
GRANT ALL ON metrics_cache TO authenticated;
GRANT ALL ON metrics_cache TO service_role;

-- Add comment for documentation
COMMENT ON TABLE metrics_cache IS 'Cache for SEO metrics from Ahrefs and Lighthouse APIs. TTL is 5 days by default.';
