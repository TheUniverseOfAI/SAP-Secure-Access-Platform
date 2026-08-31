import { FORGOT_REQUIREMENTS, SIGNUP_REQUIREMENTS, STRENGTH_COLORS, STRENGTH_LABELS, strengthScore } from '../utils/passwordRules'
import styles from './PasswordStrengthMeter.module.css'

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
