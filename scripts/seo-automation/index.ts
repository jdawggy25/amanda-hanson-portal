#!/usr/bin/env npx tsx

/**
 * SEO Automation CLI
 *
 * Commands:
 *   validate    - Validate metrics files
 *   sync        - Sync metrics to clients.config.json
 *   generate    - Generate markdown reports (see generate-reports.ts)
 *
 * Note: Metrics collection is done via Claude Code with MCP tools.
 * The `collect` command is deprecated.
 */

import 'dotenv/config';
import {
  loadExistingMetrics,
  loadClientsConfig,
  validateMetrics,
  getMetricsAge,
  syncConfigSnapshots,
} from './collect-metrics';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../..');
const CONFIG_PATH = path.join(ROOT_DIR, 'clients.config.json');

function printUsage(): void {
  console.log(`
SEO Automation CLI

Usage:
  npx tsx scripts/seo-automation/index.ts <command> [options]

Commands:
  validate    Validate all metrics files
  sync        Sync metrics to clients.config.json
  help        Show this help message

Note: Metrics collection is now done via Claude Code with MCP tools.

Workflow:
  1. Ask Claude: "Collect fresh SEO metrics for all clients"
  2. Claude uses MCP tools and saves to src/data/{client}-metrics.json
  3. Validate: npx tsx scripts/seo-automation/index.ts validate
  4. Generate reports: npx tsx scripts/seo-automation/generate-reports.ts 2025-12
  5. (Optional) Sync config: npx tsx scripts/seo-automation/index.ts sync

MCP Tools Used:
  - mcp__ahrefs__batch-analysis-batch-analysis
  - mcp__ahrefs__site-explorer-organic-keywords
  - mcp__ahrefs__site-explorer-refdomains
  - mcp__lighthouse__run_audit

Examples:
  npx tsx scripts/seo-automation/index.ts validate
  npx tsx scripts/seo-automation/index.ts sync
  npx tsx scripts/seo-automation/generate-reports.ts 2025-12
`);
}

function parseArgs(args: string[]): { command: string; options: Record<string, string | boolean> } {
  const command = args[0] || 'help';
  const options: Record<string, string | boolean> = {};

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return { command, options };
}

async function runValidate(): Promise<void> {
  console.log('\n🔍 Validating metrics files...\n');

  const config = loadClientsConfig();
  const clients = config.clients.filter((c: { enabled: boolean }) => c.enabled);
  let hasErrors = false;

  for (const client of clients) {
    const metrics = loadExistingMetrics(client.id);

    if (!metrics) {
      console.log(`❌ ${client.id}: Missing metrics file`);
      hasErrors = true;
      continue;
    }

    const validation = validateMetrics(metrics);
    const age = getMetricsAge(client.id);

    if (!validation.valid) {
      console.log(`⚠️  ${client.id}: ${validation.errors.join(', ')}`);
      hasErrors = true;
    } else if (age !== null && age > 35) {
      console.log(`⚠️  ${client.id}: Data is ${age} days old (stale)`);
    } else {
      const ageStr = age !== null ? `updated ${age} days ago` : 'no date';
      console.log(`✅ ${client.id}: Valid (${ageStr})`);
    }
  }

  if (hasErrors) {
    console.log('\n⚠️  Validation completed with warnings/errors');
    process.exit(1);
  } else {
    console.log('\n✅ All metrics files are valid');
  }
}

async function runSync(): Promise<void> {
  console.log('\n🔄 Syncing metrics to clients.config.json...\n');
  syncConfigSnapshots();
  console.log('\n✅ Config synced successfully');
}

function printDeprecationWarning(): void {
  console.error(`
===============================================
DEPRECATED: The 'collect' command is no longer supported.

Metrics are now collected via Claude Code with MCP tools:

  1. Ask Claude: "Collect fresh SEO metrics for all clients"
  2. Claude uses MCP tools:
     - mcp__ahrefs__batch-analysis-batch-analysis
     - mcp__ahrefs__site-explorer-organic-keywords
     - mcp__ahrefs__site-explorer-refdomains
     - mcp__lighthouse__run_audit
  3. Claude saves data to src/data/{client}-metrics.json

After collection, run:
  npx tsx scripts/seo-automation/index.ts validate
  npx tsx scripts/seo-automation/generate-reports.ts 2025-12

===============================================
`);
  process.exit(1);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const { command, options } = parseArgs(args);

  if (options.help) {
    printUsage();
    return;
  }

  switch (command) {
    case 'collect':
      printDeprecationWarning();
      break;

    case 'validate':
      await runValidate();
      break;

    case 'sync':
      await runSync();
      break;

    case 'help':
    default:
      printUsage();
      break;
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
