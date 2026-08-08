import type { InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.css'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

/** Primitive — labeled checkbox, no state beyond what's passed in via props. Source: .remember-me. */
export default function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={[styles.label, className].filter(Boolean).join(' ')}>
      <input type="checkbox" className={styles.input} {...rest} />
      {label}
    </label>
  )
}
