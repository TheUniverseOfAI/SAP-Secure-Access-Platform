import styles from './FormAlert.module.css'

interface FormAlertProps {
  type: 'error' | 'success'
  children: string
}

/**
 * Top-of-form inline alert (Login/Signup's "Please fill in all required
 * fields" / "Authentication successful"). This was previously deferred as
 * unreachable — it only appears after a real form submission, which
 * didn't exist yet — now that Sign In/Create Account have real
 * validation, this becomes an actual gap to fill. Source: .alert /
 * .alert.error / .alert.success.
 */
export default function FormAlert({ type, children }: FormAlertProps) {
  return (
    <div className={[styles.alert, type === 'success' ? styles.success : styles.error].join(' ')} role="alert" aria-live="assertive">
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <span>{children}</span>
    </div>
  )
}
