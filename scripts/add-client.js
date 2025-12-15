#!/usr/bin/env node

/**
 * Add Client Script
 * 
 * Automatically sets up a new client by:
 * 1. Creating content directories from template
 * 2. Creating metrics file from template
 * 3. Updating clients.config.json
 * 4. Updating routing files
 * 
 * Usage: node scripts/add-client.js <client-id> <client-name> [password] [website]
 * Example: node scripts/add-client.js acme-corp "Acme Corporation" acme acme.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Parse command line arguments
const [,, clientId, clientName, password, website] = process.argv;

if (!clientId || !clientName) {
  console.error('❌ Error: Client ID and name are required');
  console.log('\nUsage: node scripts/add-client.js <client-id> <client-name> [password] [website]');
  console.log('Example: node scripts/add-client.js acme-corp "Acme Corporation" acme acme.com\n');
  process.exit(1);
}

const clientPassword = password || clientId;
const clientWebsite = website || 'example.com';

console.log('\n🚀 Adding new client...\n');
console.log(`   ID: ${clientId}`);
console.log(`   Name: ${clientName}`);
console.log(`   Password: ${clientPassword}`);
console.log(`   Website: ${clientWebsite}\n`);

// Helper function to copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Create content directories
const templateDir = path.join(rootDir, 'client-template');
const contentDir = path.join(rootDir, 'src/content/docs', clientId);

if (fs.existsSync(contentDir)) {
  console.error(`❌ Error: Client "${clientId}" already exists at ${contentDir}`);
  process.exit(1);
}

console.log('📁 Creating content directories...');
copyDir(path.join(templateDir, 'docs'), path.join(contentDir, 'docs'));
copyDir(path.join(templateDir, 'dev'), path.join(contentDir, 'dev'));
console.log('   ✓ Content directories created');

// 2. Create metrics file
console.log('📊 Creating metrics file...');
const metricsTemplate = fs.readFileSync(path.join(templateDir, 'client-metrics.json'), 'utf8');
const metricsContent = metricsTemplate.replace('CLIENT_NAME', clientName);
const metricsPath = path.join(rootDir, 'src/data', `${clientId}-metrics.json`);
fs.writeFileSync(metricsPath, metricsContent);
console.log('   ✓ Metrics file created');

// 3. Update clients.config.json
console.log('⚙️  Updating configuration...');
const configPath = path.join(rootDir, 'clients.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

config.clients.push({
  id: clientId,
  name: clientName,
  password: clientPassword,
  website: clientWebsite,
  enabled: true
});

fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
console.log('   ✓ Configuration updated');

console.log('\n✅ Client setup complete!\n');
console.log('📝 Next steps:');
console.log(`   1. Run: npm run sync-clients`);
console.log(`   2. Add your content to: src/content/docs/${clientId}/`);
console.log(`   3. Update metrics in: src/data/${clientId}-metrics.json`);
console.log(`   4. Test locally: npm run dev`);
console.log(`   5. Access at: http://localhost:4321/${clientId}\n`);

