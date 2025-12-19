// Script to seed Supabase metrics_cache with MCP-fetched data
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

// 30 days TTL
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

function getReportDate(): string {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function getDateString(): string {
  return new Date().toISOString().split('T')[0];
}

// All client metrics data fetched via MCP on 2024-12-18
const allMetrics = [
  {
    client: { name: 'V3 Biomedical', reportDate: getReportDate(), website: 'v3biomedical.com' },
    overview: {
      domainRating: 3.1,
      ahrefsRank: 51399387,
      organicKeywords: 17,
      organicTraffic: 0,
      trafficValue: 0,
      performanceScore: 93,
      seoScore: 100,
      accessibilityScore: 100,
      bestPracticesScore: 100,
      status: 'Building organic presence',
    },
    keywords: {
      total: 17,
      ranking: [
        { keyword: 'biomed 3', position: 47, volume: 10, traffic: 0, difficulty: 0, url: 'https://www.v3biomedical.com/' },
        { keyword: 'person centered care', position: 76, volume: 1500, traffic: 0, difficulty: 13, url: 'https://www.v3biomedical.com/post/understanding-patient-centered-care-in-wound-care' },
        { keyword: 'biome v3', position: 77, volume: 70, traffic: 0, difficulty: 0, url: 'https://www.v3biomedical.com/' },
        { keyword: 'patient centerd care', position: 77, volume: 40, traffic: 0, difficulty: 35, url: 'https://www.v3biomedical.com/post/understanding-patient-centered-care-in-wound-care' },
        { keyword: "4 c's of patient centered care", position: 78, volume: 30, traffic: 0, difficulty: 0, url: 'https://www.v3biomedical.com/post/understanding-patient-centered-care-in-wound-care' },
      ],
      change: null,
      changePercent: 'N/A',
    },
    traffic: {
      monthly: 0,
      organicValue: 0,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 14,
      domains: 9,
      dofollow: 0,
      nofollow: 14,
      topReferring: [
        { domain: 'crunchbase.com', domainRating: 90, links: 1, traffic: 1451762 },
        { domain: 'za.com', domainRating: 88, links: 12, traffic: 3180382 },
        { domain: 'itxoft.com', domainRating: 83, links: 14, traffic: 0 },
        { domain: 'cience.com', domainRating: 75, links: 2, traffic: 2341 },
      ],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [
      { url: 'https://www.v3biomedical.com/', traffic: 0, keywords: 10, topKeyword: 'v3 care' },
      { url: 'https://www.v3biomedical.com/post/understanding-patient-centered-care-in-wound-care', traffic: 0, keywords: 14, topKeyword: 'patient centered care' },
      { url: 'https://www.v3biomedical.com/post/dealing-with-diabetic-wounds-causes-symptoms-and-treatment', traffic: 0, keywords: 8, topKeyword: 'diabetes wound symptoms' },
    ],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 2.8, unit: 's', status: 'pass', threshold: 2.5 },
      fid: { value: 20, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0, unit: '', status: 'pass', threshold: 0.1 },
      fcp: { value: 2.4, unit: 's', status: 'warning', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 93, accessibility: 100, bestPractices: 100, seo: 100 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'Casita Azul', reportDate: getReportDate(), website: 'casitaazulpdx.com' },
    overview: {
      domainRating: 9.0,
      ahrefsRank: 25817763,
      organicKeywords: 54,
      organicTraffic: 111,
      trafficValue: 25.68,
      performanceScore: 62,
      seoScore: 100,
      accessibilityScore: 81,
      bestPracticesScore: 75,
      status: 'Growing organic traffic',
    },
    keywords: { total: 54, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 111,
      organicValue: 25.68,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 58,
      domains: 10,
      dofollow: 0,
      nofollow: 58,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 15.6, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 0, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0.052, unit: '', status: 'pass', threshold: 0.1 },
      fcp: { value: 3.6, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 62, accessibility: 81, bestPractices: 75, seo: 100 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'BNC Builders Inc.', reportDate: getReportDate(), website: 'bncbuildersinc.com' },
    overview: {
      domainRating: 6.0,
      ahrefsRank: 33418468,
      organicKeywords: 105,
      organicTraffic: 20,
      trafficValue: 53.69,
      performanceScore: 63,
      seoScore: 92,
      accessibilityScore: 71,
      bestPracticesScore: 82,
      status: 'Growing organic traffic',
    },
    keywords: { total: 105, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 20,
      organicValue: 53.69,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 159,
      domains: 37,
      dofollow: 0,
      nofollow: 159,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 11.8, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 10, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0.026, unit: '', status: 'pass', threshold: 0.1 },
      fcp: { value: 3.1, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 63, accessibility: 71, bestPractices: 82, seo: 92 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'Hansen Chiropractic', reportDate: getReportDate(), website: 'hansenchiropracticaz.com' },
    overview: {
      domainRating: 0.2,
      ahrefsRank: 106048403,
      organicKeywords: 26,
      organicTraffic: 6,
      trafficValue: 14.96,
      performanceScore: 77,
      seoScore: 92,
      accessibilityScore: 96,
      bestPracticesScore: 100,
      status: 'Growing organic traffic',
    },
    keywords: { total: 26, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 6,
      organicValue: 14.96,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 24,
      domains: 12,
      dofollow: 0,
      nofollow: 24,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 4.3, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 0, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0.006, unit: '', status: 'pass', threshold: 0.1 },
      fcp: { value: 3.7, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 77, accessibility: 96, bestPractices: 100, seo: 92 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'King Roof', reportDate: getReportDate(), website: 'kingroofco.com' },
    overview: {
      domainRating: 1.9,
      ahrefsRank: 63612846,
      organicKeywords: 31,
      organicTraffic: 35,
      trafficValue: 33.40,
      performanceScore: 76,
      seoScore: 100,
      accessibilityScore: 97,
      bestPracticesScore: 79,
      status: 'Growing organic traffic',
    },
    keywords: { total: 31, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 35,
      organicValue: 33.40,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 37,
      domains: 18,
      dofollow: 0,
      nofollow: 37,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 3.9, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 0, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0.105, unit: '', status: 'warning', threshold: 0.1 },
      fcp: { value: 3.7, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 76, accessibility: 97, bestPractices: 79, seo: 100 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'Salt Creek Dental', reportDate: getReportDate(), website: 'dentistingraham.com' },
    overview: {
      domainRating: 0,
      ahrefsRank: null,
      organicKeywords: 5,
      organicTraffic: 1,
      trafficValue: 0,
      performanceScore: 70,
      seoScore: 100,
      accessibilityScore: 90,
      bestPracticesScore: 79,
      status: 'Building organic presence',
    },
    keywords: { total: 5, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 1,
      organicValue: 0,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 2,
      domains: 2,
      dofollow: 0,
      nofollow: 2,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 3.8, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 10, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0.205, unit: '', status: 'fail', threshold: 0.1 },
      fcp: { value: 3.7, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 70, accessibility: 90, bestPractices: 79, seo: 100 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: '4 Corners Concrete Coatings', reportDate: getReportDate(), website: '4cornersconcretecoatings.com' },
    overview: {
      domainRating: 8.0,
      ahrefsRank: 27297432,
      organicKeywords: 3,
      organicTraffic: 0,
      trafficValue: 0,
      performanceScore: 40,
      seoScore: 100,
      accessibilityScore: 82,
      bestPracticesScore: 100,
      status: 'Page speed critical - needs immediate improvement',
    },
    keywords: { total: 3, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 0,
      organicValue: 0,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 9,
      domains: 5,
      dofollow: 0,
      nofollow: 9,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 11.1, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 140, unit: 'ms', status: 'warning', threshold: 100 },
      cls: { value: 0.627, unit: '', status: 'fail', threshold: 0.1 },
      fcp: { value: 3.3, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 40, accessibility: 82, bestPractices: 100, seo: 100 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'Cocinarte', reportDate: getReportDate(), website: 'cocinartepdx.com' },
    overview: {
      domainRating: 0,
      ahrefsRank: null,
      organicKeywords: 0,
      organicTraffic: 0,
      trafficValue: 0,
      performanceScore: 66,
      seoScore: 92,
      accessibilityScore: 79,
      bestPracticesScore: 75,
      status: 'Building organic presence',
    },
    keywords: { total: 0, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 0,
      organicValue: 0,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 0,
      domains: 0,
      dofollow: 0,
      nofollow: 0,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 8.6, unit: 's', status: 'fail', threshold: 2.5 },
      fid: { value: 30, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0.003, unit: '', status: 'pass', threshold: 0.1 },
      fcp: { value: 3.3, unit: 's', status: 'fail', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 66, accessibility: 79, bestPractices: 75, seo: 92 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
  {
    client: { name: 'Spanish Horizons Academy', reportDate: getReportDate(), website: 'spanishhorizonsacademy.com' },
    overview: {
      domainRating: 0,
      ahrefsRank: null,
      organicKeywords: 0,
      organicTraffic: 0,
      trafficValue: 0,
      performanceScore: 92,
      seoScore: 92,
      accessibilityScore: 79,
      bestPracticesScore: 96,
      status: 'Building organic presence',
    },
    keywords: { total: 0, ranking: [], change: null, changePercent: 'N/A' },
    traffic: {
      monthly: 0,
      organicValue: 0,
      trend: [],
      history: [],
      change: null,
      changePercent: 'N/A',
    },
    backlinks: {
      total: 0,
      domains: 0,
      dofollow: 0,
      nofollow: 0,
      topReferring: [],
      change: null,
      changePercent: 'N/A',
    },
    competitors: [],
    topPages: [],
    brokenBacklinks: [],
    anchorTexts: [],
    coreWebVitals: {
      lcp: { value: 3.4, unit: 's', status: 'warning', threshold: 2.5 },
      fid: { value: 40, unit: 'ms', status: 'pass', threshold: 100 },
      cls: { value: 0, unit: '', status: 'pass', threshold: 0.1 },
      fcp: { value: 1.0, unit: 's', status: 'pass', threshold: 1.8 },
      ttfb: { value: 500, unit: 'ms', status: 'pass', threshold: 800 },
    },
    lighthouse: {
      mobile: { performance: 92, accessibility: 79, bestPractices: 96, seo: 92 },
      desktop: null,
      lastAudit: getDateString(),
    },
    dataSource: { provider: 'Ahrefs + Lighthouse MCP', lastUpdated: getDateString(), cacheAge: null },
  },
];

async function seedCache() {
  console.log('Seeding metrics cache with MCP data...\n');

  for (const metrics of allMetrics) {
    const cacheKey = `metrics-${metrics.client.website.replace(/[^a-z0-9]/gi, '-')}`;

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
      console.error(`❌ Failed to store ${metrics.client.website}:`, error.message);
    } else {
      console.log(`✅ Stored: ${metrics.client.name} (${metrics.client.website})`);
      console.log(`   DR: ${metrics.overview.domainRating} | Traffic: ${metrics.overview.organicTraffic} | Perf: ${metrics.overview.performanceScore}`);
    }
  }

  console.log('\n✨ Cache seeding complete!');
}

seedCache().catch(console.error);
