import { request } from './client'

/**
 * Mock auth API — no real backend/identity provider exists yet, so every
 * call here just resolves after simulated latency (see client.ts). Every
 * auth-related action a user can take on Login/Signup now funnels through
 * here rather than resolving synchronously in the page component, so the
 * call sites already have the real async shape a live backend would need.
 * Params are accepted (and underscore-prefixed where nothing checks them
 * yet) purely to keep each signature matching what a real backend call
 * would take.
 */
export async function acceptConsent(): Promise<{ accepted: true }> {
  return request({ accepted: true })
}

/** Only real credential mock in this app — everything else (signup, social/PIV) still auto-succeeds. */
const DEMO_USERNAME = 'demo'
const DEMO_PASSWORD = 'Password123!'
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000

export type LoginResult = { status: 'success' } | { status: 'invalid' } | { status: 'locked' }

/**
 * In-memory failed-attempt counter and lockout timestamp — module-level
 * mutable state standing in for a real backend's rate-limiting, same
 * pattern as authSettingsApi's/documentsApi's mock "database". Copy for
 * both failure states (invalid/locked) matches the exact toast text
 * defined in sap-design-system_v2.html's Alerts & Hint Messages section,
 * which was never actually wired to anything until now.
 */
let failedAttempts = 0
let lockedUntil: number | null = null

export async function login(username: string, password: string): Promise<LoginResult> {
  if (lockedUntil !== null) {
    if (Date.now() < lockedUntil) return request({ status: 'locked' })
    lockedUntil = null
    failedAttempts = 0
  }

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    failedAttempts = 0
    return request({ status: 'success' })
  }

  failedAttempts += 1
  if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
    lockedUntil = Date.now() + LOCKOUT_DURATION_MS
    return request({ status: 'locked' })
  }
  return request({ status: 'invalid' })
}

/** Restores a clean login-attempt/lockout state — called on logout so a fresh session isn't still counting a previous session's failures. */
export function resetLoginAttempts(): void {
  failedAttempts = 0
  lockedUntil = null
}

/** Simulated delay between "authentication successful" and the actual redirect, so the success message is visible rather than instantly replaced by navigation. */
export async function completeLoginRedirect(): Promise<void> {
  await request(undefined, 900)
}

export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export type SignupResult = { status: 'success' } | { status: 'exists' }

/** Fixed "already registered" email — the only real conflict this mock can simulate, since there's no backend to check uniqueness against. */
const REGISTERED_EMAIL = 'jane.doe@sap.gov'

export async function signup(payload: SignupPayload): Promise<SignupResult> {
  if (payload.email.trim().toLowerCase() === REGISTERED_EMAIL) {
    return request({ status: 'exists' })
  }
  return request({ status: 'success' })
}

/** Simulated delay between "account created" and the actual redirect, so the success message is visible rather than instantly replaced by navigation. Mirrors completeLoginRedirect. */
export async function completeSignupRedirect(): Promise<void> {
  await request(undefined, 900)
}

export async function socialLogin(_provider: string): Promise<{ success: true }> {
  return request({ success: true })
}

export async function pivLogin(): Promise<{ success: true }> {
  return request({ success: true })
}
