/**
 * SEO Metrics Loader
 *
 * IMPORTANT: Metrics are now collected via MCP (Model Context Protocol) tools.
 * Direct API collection is deprecated.
 *
 * New Workflow:
 * 1. Ask Claude Code to collect metrics for clients
 * 2. Claude uses MCP tools (mcp__ahrefs__*, mcp__lighthouse__*)
 * 3. Claude saves data to src/data/{client}-metrics.json
 * 4. Run: npx tsx scripts/seo-automation/generate-reports.ts 2025-12
 *
 * This file now provides utilities for loading and validating
 * MCP-collected metrics files.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ClientMetrics, ClientConfig } from '../../src/lib/ahrefs/types';
import type { CollectionResult, ClientsConfig } from './types';
import { transformToConfigSnapshot } from '../../src/lib/ahrefs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../..');
const DATA_DIR = path.join(ROOT_DIR, 'src/data');
const CONFIG_PATH = path.join(ROOT_DIR, 'clients.config.json');

/**
 * Load clients configuration
 */
export function loadClientsConfig(): ClientsConfig {
  const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
  return JSON.parse(configData);
}

/**
 * Save clients configuration
 */
export function saveClientsConfig(config: ClientsConfig): void {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n');
}

/**
 * Load existing metrics for a client
 */
export function loadExistingMetrics(clientId: string): ClientMetrics | null {
  const metricsPath = path.join(DATA_DIR, `${clientId}-metrics.json`);
  if (!fs.existsSync(metricsPath)) {
    return null;
  }
  const data = fs.readFileSync(metricsPath, 'utf8');
  return JSON.parse(data);
}

/**
 * Get metrics file path for a client
 */
export function getMetricsPath(clientId: string): string {
  return path.join(DATA_DIR, `${clientId}-metrics.json`);
}

/**
 * Check if metrics file exists for a client
 */
export function metricsExist(clientId: string): boolean {
  return fs.existsSync(getMetricsPath(clientId));
}

/**
 * Get metrics age in days
 */
export function getMetricsAge(clientId: string): number | null {
  const metrics = loadExistingMetrics(clientId);
  if (!metrics?.dataSource?.lastUpdated) {
    return null;
  }
  const lastUpdated = new Date(metrics.dataSource.lastUpdated);
  return Math.floor((Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Validate metrics file structure
 */
export function validateMetrics(metrics: ClientMetrics): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!metrics.client?.name) {
    errors.push('Missing client.name');
  }
  if (metrics.overview?.domainRating === undefined) {
    errors.push('Missing overview.domainRating');
  }
  if (!metrics.dataSource?.lastUpdated) {
    errors.push('Missing dataSource.lastUpdated');
  }
  if (!metrics.lighthouse) {
    errors.push('Missing lighthouse data');
  }
  if (!metrics.coreWebVitals) {
    errors.push('Missing coreWebVitals data');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Load and validate all client metrics
 */
export function loadAllMetrics(): Map<string, ClientMetrics> {
  const config = loadClientsConfig();
  const clients = config.clients.filter(c => c.enabled);
  const metricsMap = new Map<string, ClientMetrics>();

  for (const client of clients) {
    const metrics = loadExistingMetrics(client.id);
    if (metrics) {
      metricsMap.set(client.id, metrics);
    }
  }

  return metricsMap;
}

/**
 * Update clients.config.json with metrics snapshots
 */
export function syncConfigSnapshots(): void {
  const config = loadClientsConfig();

  for (const client of config.clients) {
    const metrics = loadExistingMetrics(client.id);
    if (metrics) {
      client.seoMetrics = transformToConfigSnapshot(metrics);
    }
  }

  saveClientsConfig(config);
  console.log('Updated clients.config.json with metrics snapshots');
}

/**
 * DEPRECATED: Direct API collection
 * Use Claude Code with MCP tools instead.
 */
export async function collectClientMetrics(
  _client: ClientConfig,
  _options: Record<string, unknown> = {}
): Promise<CollectionResult> {
  console.error(`
===============================================
DEPRECATED: Direct API collection is no longer supported.

Use Claude Code with MCP tools to collect metrics:

  1. Ask Claude: "Collect fresh SEO metrics for all clients"
  2. Claude will use MCP tools:
     - mcp__ahrefs__batch-analysis-batch-analysis
     - mcp__ahrefs__site-explorer-organic-keywords
     - mcp__ahrefs__site-explorer-refdomains
     - mcp__lighthouse__run_audit
  3. Claude saves data to src/data/{client}-metrics.json
  4. Generate reports:
     npx tsx scripts/seo-automation/generate-reports.ts 2025-12

===============================================
`);

  return {
    clientId: _client.id,
    success: false,
    errors: ['Direct API collection is deprecated. Use Claude Code with MCP tools.'],
    warnings: [],
    duration: 0,
  };
}

/**
 * DEPRECATED: Direct API collection
 * Use Claude Code with MCP tools instead.
 */
export async function collectAllMetrics(
  _options: Record<string, unknown> = {}
): Promise<CollectionResult[]> {
  console.error(`
===============================================
DEPRECATED: Direct API collection is no longer supported.

Use Claude Code with MCP tools to collect metrics.
See the documentation in docs/REFRESH-METRICS.md

===============================================
`);

  return [];
}
