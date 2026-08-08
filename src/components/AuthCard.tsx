import type { ReactNode } from 'react'
import styles from './AuthCard.module.css'

interface AuthCardProps {
  /** Top banner — e.g. ConsentBanner (login/signup) or WizardHeader (forgot-password). Has its own top-rounded corners, matching .card's bottom-only radius so they connect as one seamless unit. */
  topBanner: ReactNode
  children: ReactNode
}

/**
 * Shared shell for the auth-flow card: a top banner + rounded/shadowed
 * card body. Used by LoginPage, SignupPage, and ForgotPasswordPage so the
 * container/card/cardInner treatment only needs to exist in one place,
 * even though each page's top banner differs.
 */
export default function AuthCard({ topBanner, children }: AuthCardProps) {
  return (
    <div className={styles.container}>
      {topBanner}
      <div className={styles.card}>
        <div className={styles.cardInner}>{children}</div>
      </div>
    </div>
  )
}
