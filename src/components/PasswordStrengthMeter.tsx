import styles from './PasswordStrengthMeter.module.css'

/** Source: #pwHintsSignup — longer "At least one X" phrasing. */
const SIGNUP_REQUIREMENTS = [
  'At least 12 characters',
  'At least one uppercase letter (A–Z)',
  'At least one lowercase letter (a–z)',
  'At least one number (0–9)',
  'At least one special character (!@#$%^&*)',
  'No spaces allowed',
]

/** Source: #pwHintsForgot — shorter phrasing, distinct from the signup hints. */
const FORGOT_REQUIREMENTS = [
  'At least 12 characters',
  'Uppercase letter (A–Z)',
  'Lowercase letter (a–z)',
  'Number (0–9)',
  'Special character (!@#$%^&*)',
  'No spaces',
]

interface PasswordStrengthMeterProps {
  variant?: 'signup' | 'forgot'
}

/**
 * Static — all 4 bars neutral, no strength label, all requirement hints
 * unmet. Live strength calculation and met/unmet hint coloring is explicit
 * wiring-phase work, not built here. Source: .password-strength /
 * .strength-bar / .pw-hints / .pw-hint.
 */
export default function PasswordStrengthMeter({ variant = 'signup' }: PasswordStrengthMeterProps) {
  const REQUIREMENTS = variant === 'forgot' ? FORGOT_REQUIREMENTS : SIGNUP_REQUIREMENTS
  return (
    <>
      <div className={styles.bars} aria-hidden="true">
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
      <div className={styles.hints}>
        <div className={styles.hintsTitle}>Password Requirements</div>
        {REQUIREMENTS.map((text) => (
          <div className={styles.hint} key={text}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </>
  )
}
