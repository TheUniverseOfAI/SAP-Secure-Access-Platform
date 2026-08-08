import type { ReactNode } from 'react'
import ConsentBanner from './ConsentBanner'
import styles from './AuthCard.module.css'

interface AuthCardProps {
  children: ReactNode
}

/**
 * Shared shell for the auth-flow card: consent banner + rounded/shadowed
 * card body. Used by LoginPage and SignupPage (and will be used by
 * ForgotPasswordPage) so the container/card/cardInner treatment and
 * ConsentBanner placement only need to exist in one place.
 */
export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className={styles.container}>
      <ConsentBanner />
      <div className={styles.card}>
        <div className={styles.cardInner}>{children}</div>
      </div>
    </div>
  )
}
