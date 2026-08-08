import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'submit'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * Primitive — no business logic, just markup/styling/a11y. Source: the
 * .btn / .btn-* / .submit-btn rules in sap-design-system_v2.html's Button
 * Library section (24+ variants shown there; only the ones actually needed
 * so far are implemented — more get added as later pages require them,
 * per the "primitives pulled in on-demand" build order).
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes =
    variant === 'submit'
      ? [styles.submit, className].filter(Boolean).join(' ')
      : [styles.btn, styles[variant], size !== 'md' ? styles[size] : '', className]
          .filter(Boolean)
          .join(' ')

  return <button type={type} className={classes} {...rest} />
}
