import type { ReactNode } from 'react'
import styles from './VerifyCard.module.css'

type VerifyCardIconVariant = 'email' | 'sms' | 'totp' | 'questions'

interface VerifyCardProps {
  icon: ReactNode
  iconVariant: VerifyCardIconVariant
  title: string
  description: string
  selected: boolean
  recommended?: boolean
  onSelect: () => void
}

const ICON_CLASS: Record<VerifyCardIconVariant, string | undefined> = {
  email: styles.iconEmail,
  sms: styles.iconSms,
  totp: styles.iconTotp,
  questions: styles.iconQuestions,
}

/**
 * Primitive — a single selectable option in a radio-like card group.
 * Controlled via `selected`/`onSelect`, same pattern as Tabs — no internal
 * state. Source: .verify-card / .verify-card-icon / .verify-card-text /
 * .verify-card-badge.
 */
export default function VerifyCard({ icon, iconVariant, title, description, selected, recommended, onSelect }: VerifyCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={[styles.card, selected ? styles.cardSelected : ''].filter(Boolean).join(' ')}
      onClick={onSelect}
    >
      <div className={[styles.icon, ICON_CLASS[iconVariant]].filter(Boolean).join(' ')}>{icon}</div>
      <div className={styles.text}>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      {recommended && <span className={styles.badge}>Recommended</span>}
    </button>
  )
}
