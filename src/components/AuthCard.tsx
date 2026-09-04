import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import styles from './AuthCard.module.css'

interface AuthCardProps {
  /** Top banner — e.g. ConsentBanner (login/signup) or WizardHeader (forgot-password). Has its own top-rounded corners, matching .card's bottom-only radius so they connect as one seamless unit. */
  topBanner: ReactNode
  /**
   * Measures the card body's height on first mount (its error-free
   * state) and locks it there, so a validation error or FormAlert
   * appearing later scrolls inside that fixed height instead of growing
   * the card and re-centering the whole page. Only pass this for pages
   * whose content height shouldn't otherwise change — Login/Signup, not
   * ForgotPasswordPage's wizard, where height SHOULD change per step.
   */
  lockHeight?: boolean
  children: ReactNode
}

/**
 * Shared shell for the auth-flow card: a top banner + rounded/shadowed
 * card body. Used by LoginPage, SignupPage, and ForgotPasswordPage so the
 * container/card/cardInner treatment only needs to exist in one place,
 * even though each page's top banner differs.
 */
export default function AuthCard({ topBanner, lockHeight, children }: AuthCardProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [lockedHeight, setLockedHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (lockHeight && innerRef.current && lockedHeight === null) {
      setLockedHeight(innerRef.current.getBoundingClientRect().height)
    }
    // Only ever measure once, on this AuthCard instance's first paint — re-running on every
    // render would re-measure (and re-lock to) whatever height the error state has already grown to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {topBanner}
      <div className={styles.card}>
        <div
          ref={innerRef}
          className={[styles.cardInner, lockedHeight !== null ? styles.cardInnerLocked : ''].filter(Boolean).join(' ')}
          style={lockedHeight !== null ? { height: lockedHeight } : undefined}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
