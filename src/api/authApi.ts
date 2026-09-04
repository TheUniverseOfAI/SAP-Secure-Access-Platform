import { request } from './client'

/**
 * Mock auth API — no real backend/identity provider exists yet, so every
 * call here just resolves after simulated latency (see client.ts). Every
 * auth-related action a user can take on Login/Signup now funnels through
 * here rather than resolving synchronously in the page component, so the
 * call sites already have the real async shape a live backend would need.
 * Params are accepted (and underscore-prefixed, since nothing here
 * actually checks them yet) purely to keep each signature matching what a
 * real backend call would take.
 */
export async function acceptConsent(): Promise<{ accepted: true }> {
  return request({ accepted: true })
}

export async function login(_username: string, _password: string): Promise<{ success: true }> {
  return request({ success: true })
}

export interface SignupPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export async function signup(_payload: SignupPayload): Promise<{ success: true }> {
  return request({ success: true })
}

export async function socialLogin(_provider: string): Promise<{ success: true }> {
  return request({ success: true })
}

export async function pivLogin(): Promise<{ success: true }> {
  return request({ success: true })
}
