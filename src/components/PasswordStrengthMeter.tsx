import styles from './PasswordStrengthMeter.module.css'

interface Requirement {
  text: string
  test: (v: string) => boolean
}

/** Source: pwRules + #pwHintsSignup — longer "At least one X" phrasing. */
const SIGNUP_REQUIREMENTS: Requirement[] = [
  { text: 'At least 12 characters', test: (v) => v.length >= 12 },
  { text: 'At least one uppercase letter (A–Z)', test: (v) => /[A-Z]/.test(v) },
  { text: 'At least one lowercase letter (a–z)', test: (v) => /[a-z]/.test(v) },
  { text: 'At least one number (0–9)', test: (v) => /[0-9]/.test(v) },
  { text: 'At least one special character (!@#$%^&*)', test: (v) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(v) },
  { text: 'No spaces allowed', test: (v) => v.length === 0 || !/\s/.test(v) },
]

/** Source: pwRules + #pwHintsForgot — shorter phrasing, distinct from the signup hints. */
const FORGOT_REQUIREMENTS: Requirement[] = SIGNUP_REQUIREMENTS.map((r, i) => ({
  test: r.test,
  text: ['At least 12 characters', 'Uppercase letter (A–Z)', 'Lowercase letter (a–z)', 'Number (0–9)', 'Special character (!@#$%^&*)', 'No spaces'][i]!,
}))

const STRENGTH_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e']
const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong']

function strengthScore(v: string): number {
  let s = 0
  if (v.length >= 8) s++
  if (v.length >= 12) s++
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) s++
  if (/[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v)) s++
  return s
}

interface PasswordStrengthMeterProps {
  variant?: 'signup' | 'forgot'
  /** Live password value. Omit (or leave empty) for the fully-static neutral state. */
  value?: string
}

/**
 * Live strength bars + met/unmet requirement hints, matching the source's
 * checkStrength()/checkHints() exactly (same score thresholds, same
 * per-rule regexes, same colors). Source: .password-strength /
 * .strength-bar / .strength-label / .pw-hints / .pw-hint / .pw-hint.met /
 * .pw-hint.fail.
 */
export default function PasswordStrengthMeter({ variant = 'signup', value = '' }: PasswordStrengthMeterProps) {
  const REQUIREMENTS = variant === 'forgot' ? FORGOT_REQUIREMENTS : SIGNUP_REQUIREMENTS
  const score = strengthScore(value)
  const barColor = value ? STRENGTH_COLORS[score - 1] : undefined
  const label = value ? STRENGTH_LABELS[score - 1] : undefined

  return (
    <>
      <div className={styles.bars} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={styles.bar} style={{ background: i < score ? barColor : undefined }} />
        ))}
      </div>
      {label && (
        <div className={styles.label} style={{ color: barColor }}>
          {label}
        </div>
      )}
      <div className={styles.hints}>
        <div className={styles.hintsTitle}>Password Requirements</div>
        {REQUIREMENTS.map(({ text, test }) => {
          const met = test(value)
          const fail = value.length > 0 && !met
          const classes = [styles.hint, met ? styles.met : '', fail ? styles.fail : ''].filter(Boolean).join(' ')
          return (
            <div className={classes} key={text}>
              {met ? (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              ) : (
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
              <span>{text}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

/** Whether every rule is met — the same gate the source's allMet() uses before allowing signup/reset to proceed. */
export function isPasswordValid(value: string): boolean {
  return SIGNUP_REQUIREMENTS.every((r) => r.test(value))
}
