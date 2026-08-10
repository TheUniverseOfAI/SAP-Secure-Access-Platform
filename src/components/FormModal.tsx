import type { ReactNode } from 'react'
import styles from './FormModal.module.css'

interface FormModalProps {
  titleId: string
  title: ReactNode
  icon: ReactNode
  onClose: () => void
  footer: ReactNode
  children: ReactNode
}

/**
 * Form-style modal shell (Edit Employment Record, Add Card) — see
 * FormModal.module.css for why this is separate from the login page's
 * Modal.tsx. Backdrop-click/Escape-to-close and aria-modal dialog
 * semantics are structural a11y wiring, same as Modal.tsx.
 */
export default function FormModal({ titleId, title, icon, onClose, footer, children }: FormModalProps) {
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
        <div className={styles.head}>
          <h3 id={titleId}>
            {icon}
            {title}
          </h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>{footer}</div>
      </div>
    </div>
  )
}
