export interface Requirement {
  text: string
  test: (v: string) => boolean
}

/** Source: pwRules + #pwHintsSignup — longer "At least one X" phrasing. */
export const SIGNUP_REQUIREMENTS: Requirement[] = [
  { text: 'At least 12 characters', test: (v) => v.length >= 12 },
  { text: 'At least one uppercase letter (A–Z)', test: (v) => /[A-Z]/.test(v) },
  { text: 'At least one lowercase letter (a–z)', test: (v) => /[a-z]/.test(v) },
  { text: 'At least one number (0–9)', test: (v) => /[0-9]/.test(v) },
  { text: 'At least one special character (!@#$%^&*)', test: (v) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(v) },
  { text: 'No spaces allowed', test: (v) => v.length === 0 || !/\s/.test(v) },
]

/** Source: pwRules + #pwHintsForgot — shorter phrasing, distinct from the signup hints. */
export const FORGOT_REQUIREMENTS: Requirement[] = SIGNUP_REQUIREMENTS.map((r, i) => ({
  test: r.test,
  text: [
    'At least 12 characters',
    'Uppercase letter (A–Z)',
    'Lowercase letter (a–z)',
    'Number (0–9)',
    'Special character (!@#$%^&*)',
    'No spaces',
  ][i]!,
}))

export const STRENGTH_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e']
export const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong']

/** Source: checkStrength() — same 4 thresholds, same order. */
export function strengthScore(v: string): number {
  let s = 0
  if (v.length >= 8) s++
  if (v.length >= 12) s++
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++
  if (/[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v)) s++
  return s
}

/** Whether every rule is met — the same gate the source's allMet() uses before allowing signup/reset to proceed. */
export function isPasswordValid(value: string): boolean {
  return SIGNUP_REQUIREMENTS.every((r) => r.test(value))
}
