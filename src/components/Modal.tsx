import type { ReactNode } from 'react'
import { useModalA11y } from '../hooks/useModalA11y'
import styles from './Modal.module.css'

interface ModalProps {
  titleId: string
  title: string
  subtitle: string
  icon: ReactNode
  iconStyle?: React.CSSProperties
  onClose: () => void
  children: ReactNode
}

/**
 * Modal shell for the login page's Magic Link / OTP Code dialogs. Fully
 * scoped (see Modal.module.css) rather than reusing the global
 * .modal-overlay/.modal classes, since those diverge from this page's own
 * values in the merged legacy-sap.css.
 *
 * Full modal accessibility contract (focus-in on open, focus trap,
 * Escape-to-close, focus restore on close, background scroll lock) comes
 * from useModalA11y — see that hook's comment for why a plain
 * onKeyDown-for-Escape on the overlay div (the previous approach) doesn't
 * actually work. Backdrop click to close is simple enough to keep local.
 */
export default function Modal({ titleId, title, subtitle, icon, iconStyle, onClose, children }: ModalProps) {
  const dialogRef = useModalA11y(onClose)

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <div className={styles.headerIcon} style={iconStyle} aria-hidden="true">
              {icon}
            </div>
            <div className={styles.headerText}>
              <h3 id={titleId}>{title}</h3>
            </div>
          </div>
          <p className={styles.headerSubtitle}>{subtitle}</p>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
