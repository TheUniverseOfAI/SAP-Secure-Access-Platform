import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'submit' | 'submitSecondary' | 'alt' | 'altDark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/** Variants with their own base shape (full-width row buttons), distinct from the standard inline .btn shape. */
const STANDALONE_VARIANTS = new Set<ButtonVariant>(['submit', 'submitSecondary', 'alt', 'altDark'])

/**
 * Primitive — no business logic, just markup/styling/a11y. Source: the
 * .btn / .btn-* / .submit-btn / .alt-btn / .alt-btn.piv-btn rules in
 * sap-design-system_v2.html's Button Library section (24+ variants shown
 * there; only the ones actually needed so far are implemented — more get
 * added as later pages require them, per the "primitives pulled in
 * on-demand" build order).
 */
export default function Button({ variant = 'primary', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  const classes = STANDALONE_VARIANTS.has(variant)
    ? [styles[variant], className].filter(Boolean).join(' ')
    : [styles.btn, styles[variant], size !== 'md' ? styles[size] : '', className].filter(Boolean).join(' ')

  return <button type={type} className={classes} {...rest} />
}
