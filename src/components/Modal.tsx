import type { ReactNode } from 'react'
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
 * Closing on backdrop click and Escape, plus rendering as an
 * aria-modal dialog, is structural a11y wiring (matches the project's
 * established practice for OTP focus-advance, wizard step navigation,
 * etc.) — not the deferred "business logic" (no email is actually sent).
 */
export default function Modal({ titleId, title, subtitle, icon, iconStyle, onClose, children }: ModalProps) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
      }}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
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
