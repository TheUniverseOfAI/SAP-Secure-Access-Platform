import type { ReactNode } from 'react'
import { useModalA11y } from '../hooks/useModalA11y'
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
 * Modal.tsx. Full modal accessibility contract (focus-in on open, focus
 * trap, Escape-to-close, focus restore on close, background scroll lock)
 * comes from useModalA11y — see that hook's comment for why a plain
 * onKeyDown-for-Escape on the overlay div (the previous approach) doesn't
 * actually work. Backdrop click to close is simple enough to keep local.
 */
export default function FormModal({ titleId, title, icon, onClose, footer, children }: FormModalProps) {
  const dialogRef = useModalA11y(onClose)

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
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
