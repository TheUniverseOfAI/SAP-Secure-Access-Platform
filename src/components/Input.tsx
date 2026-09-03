import type { InputHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  errorMessage?: string
  /** Shows the field in its valid/success state (green border+bg). Ignored while errorMessage is set. */
  success?: boolean
  /** Neutral helper text shown below the field when there's no error — e.g. "Must be at least 8 characters". */
  hint?: string
  /** Rendered right after the label/required marker — e.g. an InfoTip. */
  labelExtra?: ReactNode
  /** Rendered inside the input's own relative wrapper, positioned via CSS — e.g. a password-visibility toggle button. */
  suffix?: ReactNode
}

/**
 * Primitive — no business logic. `errorMessage`/`success`/`hint` are
 * prop-driven display only (no internal validation state); actual
 * validation logic gets wired up by the caller.
 * Source: .form-group / .form-label / .form-input / .error-message /
 * .state-success / .state-disabled / .state-readonly / .state-hint in
 * sap-design-system_v2.html's Form Input States section.
 */
export default function Input({
  id,
  label,
  required,
  optional,
  errorMessage,
  success,
  hint,
  labelExtra,
  suffix,
  className,
  disabled,
  readOnly,
  ...rest
}: InputProps) {
  const input = (
    <input
      id={id}
      disabled={disabled}
      readOnly={readOnly}
      className={[
        styles.input,
        errorMessage ? styles.inputError : success ? styles.inputSuccess : '',
        suffix ? styles.inputWithSuffix : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-required={required}
      aria-invalid={errorMessage ? true : undefined}
      aria-describedby={errorMessage ? `${id}-error` : hint ? `${id}-hint` : undefined}
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
      {errorMessage ? (
        <div className={styles.errorMessage} id={`${id}-error`} role="alert">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      ) : (
        hint && (
          <div className={styles.hint} id={`${id}-hint`}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <span>{hint}</span>
          </div>
        )
      )}
    </div>
  )
}
