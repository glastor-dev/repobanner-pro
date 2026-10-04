// Simple in-memory rate limit and cache for Vercel Serverless Functions
import type { VercelRequest, VercelResponse } from '@vercel/node';

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 min
const RATE_LIMIT_MAX = 10; // 10 req/min por IP
const CACHE_TTL = 60 * 60 * 1000; // 1h

const ipHits: Record<string, { count: number; reset: number }> = {};
const cache: Record<string, { value: any; expires: number }> = {};

export function rateLimit(req: VercelRequest, res: VercelResponse): boolean {
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  if (!ipHits[ip] || ipHits[ip].reset < now) {
    ipHits[ip] = { count: 1, reset: now + RATE_LIMIT_WINDOW };
  } else {
    ipHits[ip].count++;
  }
  if (ipHits[ip].count > RATE_LIMIT_MAX) {
    res.status(429).json({ error: 'Rate limit exceeded' });
    return false;
  }
  return true;
}

export function getCache(key: string) {
  const entry = cache[key];
  if (entry && entry.expires > Date.now()) return entry.value;
  return null;
}

export function setCache(key: string, value: any) {
  cache[key] = { value, expires: Date.now() + CACHE_TTL };
}
