import { authMethods as seedMethods, type AuthMethod } from '../data/authSettings'
import { request } from './client'

/**
 * In-memory mock "database" for the 23 auth methods — a mutable copy of
 * the seed data in src/data/authSettings.ts, standing in for a real
 * backend table. Resets to the seed values on a full page reload (the
 * module re-evaluates), and explicitly via resetAuthMethods() on logout.
 */
let db: AuthMethod[] = seedMethods.map((m) => ({ ...m }))

export async function getAuthMethods(): Promise<AuthMethod[]> {
  return request(db.map((m) => ({ ...m })))
}

export async function updateAuthMethod(id: string, enabled: boolean): Promise<AuthMethod[]> {
  db = db.map((m) => (m.id === id ? { ...m, enabled } : m))
  return request(db.map((m) => ({ ...m })))
}

/** Restores every method to its seed default — called on logout so a fresh session starts clean. */
export function resetAuthMethods(): void {
  db = seedMethods.map((m) => ({ ...m }))
}
