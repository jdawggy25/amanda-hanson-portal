interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;

  const ttlMs = getTtlMs();
  if (Date.now() - entry.timestamp > ttlMs) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCached<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(pattern?: string): void {
  if (!pattern) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
}

function getTtlMs(): number {
  const envTtl = import.meta.env.JIRA_CACHE_TTL;
  if (envTtl) {
    const seconds = parseInt(envTtl, 10);
    if (!isNaN(seconds)) {
      return seconds * 1000;
    }
  }
  return DEFAULT_TTL_MS;
}
