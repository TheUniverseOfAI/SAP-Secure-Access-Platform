import type { ReactNode } from 'react'
import styles from './SuccessVisual.module.css'

type RingColor = 'green' | 'blue'

interface SuccessVisualProps {
  variant: RingColor
  icon: ReactNode
  heading: string
  children: ReactNode
}

/**
 * The icon-ring + heading + description block shown at the end of a
 * multi-step flow (Magic Link's "Check Your Inbox", OTP's "Verified
 * Successfully", the forgot-password wizard's final step). Previously
 * duplicated three times using the raw global .success-visual/.icon-ring
 * classes (or, in ForgotPasswordPage's case, hand-built inline styles).
 * Source: .success-visual / .icon-ring / .icon-ring.green/.blue.
 */
export default function SuccessVisual({ variant, icon, heading, children }: SuccessVisualProps) {
  return (
    <div className={styles.visual}>
      <div className={[styles.ring, variant === 'green' ? styles.green : styles.blue].join(' ')}>{icon}</div>
      <h4>{heading}</h4>
      {children}
    </div>
  )
}

/** Source: .success-visual .email-highlight. */
export function EmailHighlight({ children }: { children: ReactNode }) {
  return <span className={styles.emailHighlight}>{children}</span>
}
