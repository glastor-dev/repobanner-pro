// In-memory rate limit and cache for Vercel Serverless Functions with bounded Map
import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 min
const RATE_LIMIT_MAX = 10; // 10 req/min por IP
const CACHE_TTL = 60 * 60 * 1000; // 1h
const MAX_ENTRIES = 500;

interface RateLimitEntry {
  count: number;
  reset: number;
}

interface CacheEntry {
  value: any;
  expires: number;
}

const ipHits = new Map<string, RateLimitEntry>();
const cache = new Map<string, CacheEntry>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return req.socket?.remoteAddress || 'unknown';
}

function cleanExpiredEntries() {
  const now = Date.now();
  if (ipHits.size > MAX_ENTRIES) {
    for (const [key, entry] of ipHits.entries()) {
      if (entry.reset < now) ipHits.delete(key);
    }
  }
  if (cache.size > MAX_ENTRIES) {
    for (const [key, entry] of cache.entries()) {
      if (entry.expires < now) cache.delete(key);
    }
  }
}

export function rateLimit(req: VercelRequest, res: VercelResponse): boolean {
  cleanExpiredEntries();
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = ipHits.get(ip);

  if (!existing || existing.reset < now) {
    ipHits.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW });
  } else {
    existing.count++;
  }

  const current = ipHits.get(ip);
  if (current && current.count > RATE_LIMIT_MAX) {
    res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute.' });
    return false;
  }
  return true;
}

export function getCache(key: string) {
  const entry = cache.get(key);
  if (entry && entry.expires > Date.now()) return entry.value;
  if (entry) cache.delete(key);
  return null;
}

export function setCache(key: string, value: any) {
  cleanExpiredEntries();
  cache.set(key, { value, expires: Date.now() + CACHE_TTL });
}
