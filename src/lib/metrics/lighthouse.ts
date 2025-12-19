// Lighthouse metrics via Google PageSpeed Insights API

const PAGESPEED_API_BASE = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export interface LighthouseScores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

export interface CoreWebVitals {
  lcp: { value: number; unit: string; status: 'good' | 'needs-improvement' | 'poor' };
  fid: { value: number; unit: string; status: 'good' | 'needs-improvement' | 'poor' };
  cls: { value: number; unit: string; status: 'good' | 'needs-improvement' | 'poor' };
  fcp: { value: number; unit: string; status: 'good' | 'needs-improvement' | 'poor' };
  ttfb: { value: number; unit: string; status: 'good' | 'needs-improvement' | 'poor' };
  inp: { value: number; unit: string; status: 'good' | 'needs-improvement' | 'poor' } | null;
}

export interface LighthouseMetrics {
  scores: LighthouseScores;
  coreWebVitals: CoreWebVitals;
  fetchedAt: string;
}

interface PageSpeedResponse {
  lighthouseResult?: {
    categories?: {
      performance?: { score: number };
      seo?: { score: number };
      accessibility?: { score: number };
      'best-practices'?: { score: number };
    };
    audits?: {
      'largest-contentful-paint'?: { numericValue: number; displayValue: string };
      'first-input-delay'?: { numericValue: number };
      'max-potential-fid'?: { numericValue: number };
      'cumulative-layout-shift'?: { numericValue: number; displayValue: string };
      'first-contentful-paint'?: { numericValue: number; displayValue: string };
      'server-response-time'?: { numericValue: number };
      'interaction-to-next-paint'?: { numericValue: number };
    };
  };
  loadingExperience?: {
    metrics?: {
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile: number; category: string };
      FIRST_INPUT_DELAY_MS?: { percentile: number; category: string };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile: number; category: string };
      FIRST_CONTENTFUL_PAINT_MS?: { percentile: number; category: string };
      INTERACTION_TO_NEXT_PAINT?: { percentile: number; category: string };
      EXPERIMENTAL_TIME_TO_FIRST_BYTE?: { percentile: number; category: string };
    };
  };
}

function getApiKey(): string | undefined {
  return import.meta.env.PAGESPEED_API_KEY;
}

function categoryToStatus(category: string): 'good' | 'needs-improvement' | 'poor' {
  switch (category?.toUpperCase()) {
    case 'FAST':
      return 'good';
    case 'AVERAGE':
      return 'needs-improvement';
    case 'SLOW':
      return 'poor';
    default:
      return 'needs-improvement';
  }
}

function scoreToStatus(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value >= thresholds.poor) return 'poor';
  return 'needs-improvement';
}

export async function fetchLighthouseMetrics(
  url: string,
  strategy: 'mobile' | 'desktop' = 'mobile'
): Promise<LighthouseMetrics | null> {
  try {
    // Ensure URL has protocol
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;

    const params = new URLSearchParams({
      url: targetUrl,
      strategy,
      category: ['performance', 'seo', 'accessibility', 'best-practices'].join('&category='),
    });

    const apiKey = getApiKey();
    if (apiKey) {
      params.set('key', apiKey);
    }

    const apiUrl = `${PAGESPEED_API_BASE}?${params.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`PageSpeed API error: ${response.status} - ${text}`);
      return null;
    }

    const data: PageSpeedResponse = await response.json();

    if (!data.lighthouseResult?.categories) {
      console.error('No Lighthouse data in response');
      return null;
    }

    const categories = data.lighthouseResult.categories;
    const audits = data.lighthouseResult.audits || {};
    const fieldData = data.loadingExperience?.metrics || {};

    // Scores (0-100 scale)
    const scores: LighthouseScores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    };

    // Core Web Vitals - prefer field data, fall back to lab data
    const lcpMs = fieldData.LARGEST_CONTENTFUL_PAINT_MS?.percentile || audits['largest-contentful-paint']?.numericValue || 0;
    const fidMs = fieldData.FIRST_INPUT_DELAY_MS?.percentile || audits['max-potential-fid']?.numericValue || 0;
    const cls = fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile
      ? fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
      : audits['cumulative-layout-shift']?.numericValue || 0;
    const fcpMs = fieldData.FIRST_CONTENTFUL_PAINT_MS?.percentile || audits['first-contentful-paint']?.numericValue || 0;
    const ttfbMs = fieldData.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.percentile || audits['server-response-time']?.numericValue || 0;
    const inpMs = fieldData.INTERACTION_TO_NEXT_PAINT?.percentile || audits['interaction-to-next-paint']?.numericValue;

    const coreWebVitals: CoreWebVitals = {
      lcp: {
        value: Math.round(lcpMs / 10) / 100, // Convert to seconds
        unit: 's',
        status: fieldData.LARGEST_CONTENTFUL_PAINT_MS?.category
          ? categoryToStatus(fieldData.LARGEST_CONTENTFUL_PAINT_MS.category)
          : scoreToStatus(lcpMs, { good: 2500, poor: 4000 }),
      },
      fid: {
        value: Math.round(fidMs),
        unit: 'ms',
        status: fieldData.FIRST_INPUT_DELAY_MS?.category
          ? categoryToStatus(fieldData.FIRST_INPUT_DELAY_MS.category)
          : scoreToStatus(fidMs, { good: 100, poor: 300 }),
      },
      cls: {
        value: Math.round(cls * 1000) / 1000,
        unit: '',
        status: fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE?.category
          ? categoryToStatus(fieldData.CUMULATIVE_LAYOUT_SHIFT_SCORE.category)
          : scoreToStatus(cls, { good: 0.1, poor: 0.25 }),
      },
      fcp: {
        value: Math.round(fcpMs / 10) / 100, // Convert to seconds
        unit: 's',
        status: fieldData.FIRST_CONTENTFUL_PAINT_MS?.category
          ? categoryToStatus(fieldData.FIRST_CONTENTFUL_PAINT_MS.category)
          : scoreToStatus(fcpMs, { good: 1800, poor: 3000 }),
      },
      ttfb: {
        value: Math.round(ttfbMs),
        unit: 'ms',
        status: fieldData.EXPERIMENTAL_TIME_TO_FIRST_BYTE?.category
          ? categoryToStatus(fieldData.EXPERIMENTAL_TIME_TO_FIRST_BYTE.category)
          : scoreToStatus(ttfbMs, { good: 800, poor: 1800 }),
      },
      inp: inpMs
        ? {
            value: Math.round(inpMs),
            unit: 'ms',
            status: fieldData.INTERACTION_TO_NEXT_PAINT?.category
              ? categoryToStatus(fieldData.INTERACTION_TO_NEXT_PAINT.category)
              : scoreToStatus(inpMs, { good: 200, poor: 500 }),
          }
        : null,
    };

    return {
      scores,
      coreWebVitals,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to fetch Lighthouse metrics:', error);
    return null;
  }
}

// Fetch both mobile and desktop metrics
export async function fetchFullLighthouseMetrics(
  url: string
): Promise<{ mobile: LighthouseMetrics | null; desktop: LighthouseMetrics | null }> {
  const [mobile, desktop] = await Promise.all([
    fetchLighthouseMetrics(url, 'mobile'),
    fetchLighthouseMetrics(url, 'desktop'),
  ]);

  return { mobile, desktop };
}
