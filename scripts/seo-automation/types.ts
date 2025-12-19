/**
 * Types for SEO Automation Scripts
 */

export interface CollectionOptions {
  clientId?: string;
  month?: string; // YYYY-MM
  country?: string;
  skipLighthouse?: boolean;
  dryRun?: boolean;
}

export interface GenerationOptions {
  clientId?: string;
  month?: string;
  dryRun?: boolean;
}

export interface CollectionResult {
  clientId: string;
  success: boolean;
  metricsPath?: string;
  errors: string[];
  warnings: string[];
  duration: number;
}

export interface GenerationResult {
  clientId: string;
  success: boolean;
  reportPath?: string;
  errors: string[];
}

export interface ClientsConfig {
  clients: Array<{
    id: string;
    name: string;
    password: string;
    website: string;
    enabled: boolean;
    jiraProjectKey: string;
    seoMetrics?: {
      lastUpdated: string;
      domainRating: number;
      ahrefsRank: number;
      organicKeywords: number;
      organicTraffic: number;
      organicTrafficValue: string;
      liveBacklinks: number;
      referringDomains: number;
      trackedKeywords?: number;
      paidKeywords: number;
      paidTraffic: number;
    };
  }>;
}

export interface NarrativeData {
  month: string;
  clientId: string;
  executiveSummary: string;
  keyWins: string[];
  challenges: string[];
  recommendations: string[];
  highlights: string[];
  status: 'draft' | 'ready' | 'published';
  createdAt: string;
  updatedAt: string;
}
