import type { InputHTMLAttributes, ReactNode } from 'react'
import styles from './Checkbox.module.css'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  /** Top-aligns the checkbox with the first line of a multi-line label (source: .terms-check). Default centers it (source: .remember-me). */
  align?: 'center' | 'start'
}

/** Primitive — labeled checkbox, no state beyond what's passed in via props. Sources: .remember-me, .terms-check. */
export default function Checkbox({ label, align = 'center', className, ...rest }: CheckboxProps) {
  return (
    <label className={[styles.label, align === 'start' ? styles.alignStart : '', className].filter(Boolean).join(' ')}>
      <input type="checkbox" className={styles.input} {...rest} />
      <span>{label}</span>
    </label>
  )
}
