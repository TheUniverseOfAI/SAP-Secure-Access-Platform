import type { InputHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  errorMessage?: string
  /** Rendered right after the label/required marker — e.g. an InfoTip. */
  labelExtra?: ReactNode
  /** Rendered inside the input's own relative wrapper, positioned via CSS — e.g. a password-visibility toggle button. */
  suffix?: ReactNode
}

/**
 * Primitive — no business logic. `errorMessage` is prop-driven display only
 * (no internal validation state); actual validation logic gets wired up in
 * the later wiring phase, not here.
 * Source: .form-group / .form-label / .form-input / .error-message in
 * sap-design-system_v2.html's Form Input States section.
 */
export default function Input({ id, label, required, optional, errorMessage, labelExtra, suffix, className, ...rest }: InputProps) {
  const input = (
    <input
      id={id}
      className={[styles.input, errorMessage ? styles.inputError : '', suffix ? styles.inputWithSuffix : '', className]
        .filter(Boolean)
        .join(' ')}
      aria-required={required}
      aria-invalid={errorMessage ? true : undefined}
      aria-describedby={errorMessage ? `${id}-error` : undefined}
      {...rest}
    />
  )

  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
        {optional && <span className={styles.optional}>(optional)</span>}
        {labelExtra}
      </label>
      {suffix ? (
        <div className={styles.suffixWrapper}>
          {input}
          {suffix}
        </div>
      ) : (
        input
      )}
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
