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
  /**
   * Rendered below the scrollable/height-locked area, always fully
   * visible regardless of scroll position — e.g. the "or sign in with"
   * divider plus social/PIV buttons. Without this, a tall form (Signup
   * has 6 fields vs. Login's 2) locks to a height taller than most
   * viewports, and those buttons end up needing a scroll to reach even
   * though they're not part of what should ever scroll. Only meaningful
   * alongside lockHeight.
   */
  footer?: ReactNode
  children: ReactNode
}

/**
 * Shared shell for the auth-flow card: a top banner + rounded/shadowed
 * card body. Used by LoginPage, SignupPage, and ForgotPasswordPage so the
 * container/card/cardInner treatment only needs to exist in one place,
 * even though each page's top banner differs.
 */
export default function AuthCard({ topBanner, lockHeight, footer, children }: AuthCardProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const [lockedHeight, setLockedHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (!lockHeight || !innerRef.current || lockedHeight !== null) return

    const naturalHeight = innerRef.current.getBoundingClientRect().height
    // How much room is actually left below the fields, in *this* viewport: from where the
    // scrollable area starts (already past the fixed header + topBanner, whatever their real
    // heights are) down to the bottom of the window, minus whatever the footer (Divider +
    // social/PIV buttons) itself needs — that footer always renders in full, so its height has
    // to come out of the budget rather than being guessed at in CSS. 24px is just breathing room
    // so the card doesn't sit flush against the viewport edge.
    const top = innerRef.current.getBoundingClientRect().top
    const footerHeight = footerRef.current?.getBoundingClientRect().height ?? 0
    const availableHeight = window.innerHeight - top - footerHeight - 24

    setLockedHeight(Math.min(naturalHeight, Math.max(availableHeight, 120)))
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
          className={[
            styles.cardInner,
            lockedHeight !== null ? styles.cardInnerLocked : '',
            footer ? styles.cardInnerWithFooter : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={lockedHeight !== null ? { height: lockedHeight } : undefined}
        >
          {children}
        </div>
        {footer && (
          <div ref={footerRef} className={styles.cardFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
