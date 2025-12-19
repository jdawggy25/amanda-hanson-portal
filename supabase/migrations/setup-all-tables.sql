-- ============================================
-- Comcreate SEO Reports - Full Database Setup
-- Run this in Supabase SQL Editor to set up all tables
-- ============================================

-- Metrics Cache Table (for Ahrefs/Lighthouse data)
CREATE TABLE IF NOT EXISTS metrics_cache (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  cached_at TIMESTAMPTZ DEFAULT NOW(),
  ttl_ms BIGINT DEFAULT 2592000000  -- 30 days
);

CREATE INDEX IF NOT EXISTS idx_metrics_cache_cached_at ON metrics_cache(cached_at);

-- ============================================
-- Setup Complete!
-- Tables created: metrics_cache
-- ============================================
