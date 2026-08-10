import type { SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  required?: boolean
  optional?: boolean
  options: string[]
}

/** Primitive — labeled dropdown. `options` renders as plain <option> text values (no separate value/label pairs needed by any current usage). Source: .form-select. */
export default function Select({ id, label, required, optional, options, className, ...rest }: SelectProps) {
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
      </label>
      <select id={id} className={[styles.select, className].filter(Boolean).join(' ')} aria-required={required} {...rest}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
