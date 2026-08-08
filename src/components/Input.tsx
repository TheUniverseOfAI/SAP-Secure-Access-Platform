import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  required?: boolean
  errorMessage?: string
}

/**
 * Primitive — no business logic. `errorMessage` is prop-driven display only
 * (no internal validation state); actual validation logic gets wired up in
 * the later wiring phase, not here.
 * Source: .form-group / .form-label / .form-input / .error-message in
 * sap-design-system_v2.html's Form Input States section.
 */
export default function Input({
  id,
  label,
  required,
  errorMessage,
  className,
  ...rest
}: InputProps) {
  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        className={[styles.input, errorMessage ? styles.inputError : '', className]
          .filter(Boolean)
          .join(' ')}
        aria-required={required}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        {...rest}
      />
      {errorMessage && (
        <div className={styles.errorMessage} id={`${id}-error`} role="alert">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
