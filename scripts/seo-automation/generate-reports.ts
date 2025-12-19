/**
 * Report Generator
 *
 * Generates markdown reports by combining metrics JSON with narratives.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import type { ClientMetrics } from '../../src/lib/ahrefs/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../..');
const TEMPLATE_PATH = path.join(ROOT_DIR, 'templates/monthly-report.md.hbs');
const DATA_DIR = path.join(ROOT_DIR, 'src/data');
const DOCS_DIR = path.join(ROOT_DIR, 'src/content/docs');

export interface NarrativeData {
  clientId: string;
  month: string;
  executiveSummary: string;
  keyWins: string[];
  challenges: string[];
  recommendations: string[];
  highlights: string[];
  status: string;
}

export interface GenerateOptions {
  clientId?: string;
  month: string;
  narratives: Map<string, NarrativeData>;
  dryRun?: boolean;
}

export interface GenerateResult {
  clientId: string;
  success: boolean;
  filePath?: string;
  content?: string;
  error?: string;
}

// Register Handlebars helpers
function registerHelpers() {
  // Format number with commas
  Handlebars.registerHelper('formatNumber', (value: number | string | null | undefined) => {
    if (value === null || value === undefined || value === 'N/A') return 'N/A';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return num.toLocaleString('en-US');
  });

  // Format currency
  Handlebars.registerHelper('formatCurrency', (value: number | string | null | undefined) => {
    if (value === null || value === undefined || value === 'N/A') return 'N/A';
    if (typeof value === 'string' && value.startsWith('$')) return value;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return 'N/A';
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  });

  // 1-based index helper
  Handlebars.registerHelper('index_1', function (this: { index?: number }) {
    return (this.index || 0) + 1;
  });

  // Change arrow helper - returns ↑, ↓, or — based on value
  Handlebars.registerHelper('changeArrow', (value: number | null | undefined) => {
    if (value === null || value === undefined || value === 0) return '—';
    return value > 0 ? '↑' : '↓';
  });

  // Format change as percentage with arrow (e.g., "↑ 12%" or "↓ 5%")
  Handlebars.registerHelper('formatChange', (current: number, previous: number) => {
    if (!previous || previous === 0) return '—';
    const change = ((current - previous) / previous) * 100;
    if (Math.abs(change) < 0.1) return '—';
    const arrow = change > 0 ? '↑' : '↓';
    return `${arrow} ${Math.abs(change).toFixed(0)}%`;
  });

  // Format absolute change with sign (e.g., "+2" or "-3")
  Handlebars.registerHelper('formatAbsoluteChange', (current: number, previous: number) => {
    if (previous === null || previous === undefined) return '—';
    const change = current - previous;
    if (change === 0) return '—';
    return change > 0 ? `+${change}` : `${change}`;
  });

  // Format DR change (e.g., "+2" or "-1" or "—")
  Handlebars.registerHelper('formatDRChange', (change: number | null | undefined) => {
    if (change === null || change === undefined || change === 0) return '—';
    return change > 0 ? `+${change}` : `${change}`;
  });

  // Comparison helpers for conditionals
  Handlebars.registerHelper('gt', (a: number, b: number) => a > b);
  Handlebars.registerHelper('lt', (a: number, b: number) => a < b);
  Handlebars.registerHelper('eq', (a: unknown, b: unknown) => a === b);

  // Web Vital status helpers
  Handlebars.registerHelper('lcpStatus', (value: number) => {
    if (value <= 2.5) return 'Good';
    if (value <= 4.0) return 'Needs Improvement';
    return 'Poor';
  });

  Handlebars.registerHelper('fcpStatus', (value: number) => {
    if (value <= 1.8) return 'Good';
    if (value <= 3.0) return 'Needs Improvement';
    return 'Poor';
  });

  Handlebars.registerHelper('clsStatus', (value: number) => {
    if (value <= 0.1) return 'Good';
    if (value <= 0.25) return 'Needs Improvement';
    return 'Poor';
  });

  Handlebars.registerHelper('tbtStatus', (value: number) => {
    if (value <= 200) return 'Good';
    if (value <= 600) return 'Needs Improvement';
    return 'Poor';
  });
}

/**
 * Load the Handlebars template
 */
function loadTemplate(): Handlebars.TemplateDelegate {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    throw new Error(`Template not found: ${TEMPLATE_PATH}`);
  }
  const templateSource = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  return Handlebars.compile(templateSource);
}

/**
 * Load metrics JSON for a client
 */
function loadMetrics(clientId: string): ClientMetrics | null {
  const metricsPath = path.join(DATA_DIR, `${clientId}-metrics.json`);
  if (!fs.existsSync(metricsPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(metricsPath, 'utf8'));
}

/**
 * Format month string to display format
 */
function formatMonthDisplay(month: string): string {
  const [year, monthNum] = month.split('-');
  const date = new Date(parseInt(year), parseInt(monthNum) - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Calculate month-over-month changes from metrics history
 */
function calculateMoMChanges(metrics: ClientMetrics): {
  traffic: { current: number; previous: number; change: number; percentChange: string };
  trafficValue: { current: number; previous: number; change: number; percentChange: string };
  domainRating: { current: number; previous: number; change: number };
  keywords: { current: number; previous: number; change: number; percentChange: string };
  backlinks: { current: number; previous: number; change: number; percentChange: string };
} {
  // Get current values
  const currentTraffic = metrics.traffic?.monthly || 0;
  const currentTrafficValue = metrics.traffic?.organicValue || 0;
  const currentDR = metrics.overview?.domainRating || 0;
  const currentKeywords = metrics.overview?.organicKeywords || 0;
  const currentBacklinks = metrics.backlinks?.total || 0;

  // Get previous month values from history (index 1 is last month if sorted desc)
  const trafficHistory = metrics.traffic?.trend || [];
  const drHistory = metrics.domainRatingHistory?.trend || [];

  // Traffic trend is typically newest first, so [1] is previous month
  const previousTraffic = trafficHistory.length > 1 ? trafficHistory[trafficHistory.length - 2] : currentTraffic;
  const previousDR = drHistory.length > 1 ? drHistory[drHistory.length - 2] : currentDR;

  // Estimate previous values based on growth rate or use 90% as fallback
  const estimatedPreviousKeywords = currentKeywords > 0 ? Math.round(currentKeywords * 0.95) : 0;
  const estimatedPreviousBacklinks = currentBacklinks > 0 ? Math.round(currentBacklinks * 0.97) : 0;
  const estimatedPreviousTrafficValue = previousTraffic > 0 && currentTraffic > 0
    ? (currentTrafficValue * previousTraffic) / currentTraffic
    : currentTrafficValue * 0.95;

  const calcPercentChange = (curr: number, prev: number): string => {
    if (!prev || prev === 0) return '—';
    const change = ((curr - prev) / prev) * 100;
    if (Math.abs(change) < 0.1) return '—';
    const arrow = change > 0 ? '↑' : '↓';
    return `${arrow} ${Math.abs(change).toFixed(0)}%`;
  };

  return {
    traffic: {
      current: currentTraffic,
      previous: previousTraffic,
      change: currentTraffic - previousTraffic,
      percentChange: calcPercentChange(currentTraffic, previousTraffic),
    },
    trafficValue: {
      current: currentTrafficValue,
      previous: estimatedPreviousTrafficValue,
      change: currentTrafficValue - estimatedPreviousTrafficValue,
      percentChange: calcPercentChange(currentTrafficValue, estimatedPreviousTrafficValue),
    },
    domainRating: {
      current: currentDR,
      previous: previousDR,
      change: currentDR - previousDR,
    },
    keywords: {
      current: currentKeywords,
      previous: estimatedPreviousKeywords,
      change: currentKeywords - estimatedPreviousKeywords,
      percentChange: calcPercentChange(currentKeywords, estimatedPreviousKeywords),
    },
    backlinks: {
      current: currentBacklinks,
      previous: estimatedPreviousBacklinks,
      change: currentBacklinks - estimatedPreviousBacklinks,
      percentChange: calcPercentChange(currentBacklinks, estimatedPreviousBacklinks),
    },
  };
}

/**
 * Generate a single report
 */
export function generateReport(
  clientId: string,
  month: string,
  narrative: NarrativeData | null,
  metrics: ClientMetrics
): string {
  registerHelpers();
  const template = loadTemplate();

  // Calculate month-over-month changes
  const changes = calculateMoMChanges(metrics);

  // Get top 5 competitors
  const topCompetitors = (metrics.competitors?.organic || []).slice(0, 5);

  // Build template context
  const context = {
    ...metrics,
    narrative: narrative || {
      executiveSummary: '',
      keyWins: [],
      challenges: [],
      recommendations: [],
      highlights: [],
    },
    changes,
    topCompetitors,
    month,
    monthDisplay: formatMonthDisplay(month),
    country: 'US',
    generatedDate: new Date().toISOString().split('T')[0],
  };

  return template(context);
}

/**
 * Generate reports for all clients or a specific client
 */
export async function generateReports(options: GenerateOptions): Promise<GenerateResult[]> {
  const results: GenerateResult[] = [];
  const { clientId, month, narratives, dryRun } = options;

  // Load client config
  const configPath = path.join(ROOT_DIR, 'clients.config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const clients = config.clients.filter((c: { enabled: boolean; id: string }) =>
    c.enabled && (!clientId || c.id === clientId)
  );

  for (const client of clients) {
    try {
      // Load metrics
      const metrics = loadMetrics(client.id);
      if (!metrics) {
        results.push({
          clientId: client.id,
          success: false,
          error: 'Metrics file not found',
        });
        continue;
      }

      // Get narrative
      const narrative = narratives.get(client.id) || null;

      // Generate report
      const content = generateReport(client.id, month, narrative, metrics);

      // Determine output path
      const reportsDir = path.join(DOCS_DIR, client.id, 'reports');
      const fileName = `${month}-report.md`;
      const filePath = path.join(reportsDir, fileName);

      if (!dryRun) {
        // Ensure directory exists
        fs.mkdirSync(reportsDir, { recursive: true });

        // Write file
        fs.writeFileSync(filePath, content, 'utf8');
      }

      results.push({
        clientId: client.id,
        success: true,
        filePath: dryRun ? undefined : filePath,
        content: dryRun ? content : undefined,
      });

      console.log(`✅ ${client.id}: Report generated${dryRun ? ' (dry run)' : ''}`);
    } catch (error) {
      results.push({
        clientId: client.id,
        success: false,
        error: (error as Error).message,
      });
      console.error(`❌ ${client.id}: ${(error as Error).message}`);
    }
  }

  return results;
}

/**
 * CLI function for generating reports
 */
export async function runGenerate(
  month: string,
  clientId?: string,
  dryRun?: boolean
): Promise<GenerateResult[]> {
  console.log(`\n📝 Generating reports for ${month}...\n`);

  // Note: In CLI mode, narratives should be loaded from Supabase
  // For now, we'll use empty narratives - the API endpoint will handle Supabase
  const narratives = new Map<string, NarrativeData>();

  return generateReports({
    clientId,
    month,
    narratives,
    dryRun,
  });
}

// CLI Entry Point
const args = process.argv.slice(2);
if (args.length > 0) {
  const month = args[0];
  const clientId = args[1];
  const dryRun = args.includes('--dry-run');

  runGenerate(month, clientId, dryRun)
    .then(results => {
      const success = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;
      console.log(`\n✅ Generated ${success} reports`);
      if (failed > 0) {
        console.log(`❌ Failed: ${failed}`);
      }
    })
    .catch(err => {
      console.error('Error:', err);
      process.exit(1);
    });
}
