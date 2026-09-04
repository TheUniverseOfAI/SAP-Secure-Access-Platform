import styles from './FormAlert.module.css'

interface FormAlertProps {
  type: 'error' | 'warning' | 'success'
  children: string
}

const TYPE_CLASS = {
  error: styles.error,
  warning: styles.warning,
  success: styles.success,
}

/**
 * Top-of-form inline alert (Login/Signup's "Please fill in all required
 * fields" / "Authentication successful"). This was previously deferred as
 * unreachable — it only appears after a real form submission, which
 * didn't exist yet — now that Sign In/Create Account have real
 * validation, this becomes an actual gap to fill. Source: .alert /
 * .alert.error / .alert-warning / .alert.success. `warning` (amber) is
 * for a failure that isn't a straightforward "you did something wrong"
 * error — e.g. account lockout, which is the caller's own security
 * policy reacting to repeated failures rather than this specific
 * attempt being invalid.
 */
export default function FormAlert({ type, children }: FormAlertProps) {
  return (
    <div className={[styles.alert, TYPE_CLASS[type]].join(' ')} role="alert" aria-live="assertive">
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <span>{children}</span>
    </div>
  )
}
