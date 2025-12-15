#!/usr/bin/env node

/**
 * Sync Clients Script
 * 
 * Automatically updates all routing files based on clients.config.json
 * This ensures consistency across:
 * - src/pages/[client]/index.astro
 * - src/pages/[client]/[...slug].astro
 * - src/pages/index.astro (password mapping)
 * 
 * Usage: node scripts/sync-clients.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('\n🔄 Syncing client configuration...\n');

// Read clients config
const configPath = path.join(rootDir, 'clients.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const enabledClients = config.clients.filter(c => c.enabled);
const clientIds = enabledClients.map(c => c.id);

console.log(`Found ${enabledClients.length} enabled clients:`);
enabledClients.forEach(c => console.log(`   - ${c.id} (${c.name})`));
console.log('');

// Update [client]/index.astro
console.log('📝 Updating src/pages/[client]/index.astro...');
const clientIndexPath = path.join(rootDir, 'src/pages/[client]/index.astro');
let clientIndexContent = fs.readFileSync(clientIndexPath, 'utf8');

const clientsArrayStr = `['${clientIds.join("', '")}']`;
clientIndexContent = clientIndexContent.replace(
  /const CLIENTS = \[.*?\];/s,
  `const CLIENTS = ${clientsArrayStr};`
);

fs.writeFileSync(clientIndexPath, clientIndexContent);
console.log('   ✓ Updated');

// Update [client]/[...slug].astro
console.log('📝 Updating src/pages/[client]/[...slug].astro...');
const slugPath = path.join(rootDir, 'src/pages/[client]/[...slug].astro');
let slugContent = fs.readFileSync(slugPath, 'utf8');

slugContent = slugContent.replace(
  /const CLIENTS = \[.*?\];/s,
  `const CLIENTS = ${clientsArrayStr};`
);

fs.writeFileSync(slugPath, slugContent);
console.log('   ✓ Updated');

// Update index.astro (password mapping)
console.log('📝 Updating src/pages/index.astro...');
const indexPath = path.join(rootDir, 'src/pages/index.astro');
let indexContent = fs.readFileSync(indexPath, 'utf8');

const passwordMapping = enabledClients
  .map(c => `    '${c.password}': '/${c.id}',`)
  .join('\n');

indexContent = indexContent.replace(
  /const clientPasswords: Record<string, string> = \{[\s\S]*?\};/,
  `const clientPasswords: Record<string, string> = {\n${passwordMapping}\n  };`
);

fs.writeFileSync(indexPath, indexContent);
console.log('   ✓ Updated');

console.log('\n✅ Client configuration synced successfully!\n');
console.log('🎯 All routing files are now in sync with clients.config.json\n');

