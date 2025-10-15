// Simple localStorage-backed cache with TTL

const NS = 'apiCache_v1';

function makeKey(key) {
  return `${NS}:${key}`;
}

export function getCache(key) {
  try {
    const raw = localStorage.getItem(makeKey(key));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const { e: expiresAt, d: data } = parsed;
    if (typeof expiresAt === 'number' && Date.now() > expiresAt) {
      localStorage.removeItem(makeKey(key));
      return null;
    }
    return data ?? null;
  } catch {
    return null;
  }
}

export function setCache(key, data, ttlMs) {
  try {
    const expiresAt = typeof ttlMs === 'number' && ttlMs > 0 ? Date.now() + ttlMs : null;
    const payload = { e: expiresAt, d: data };
    localStorage.setItem(makeKey(key), JSON.stringify(payload));
  } catch {
    // ignore quota or serialization errors
  }
}

export function removeCache(key) {
  try { localStorage.removeItem(makeKey(key)); } catch {}
}

