/**
 * Generic request simulator standing in for a real HTTP client until a
 * backend exists. Every `api/*.ts` function funnels through this so
 * pages get real async/loading-state behavior now (a Promise that
 * resolves after a short delay, like a real network round-trip) and
 * swapping in actual `fetch()` calls later requires no changes to any
 * caller — same function signatures, same await-based usage.
 */
const DEFAULT_LATENCY_MS = 350

export function request<T>(data: T, latencyMs = DEFAULT_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), latencyMs))
}
