import type { ReactNode } from 'react'
import styles from './Card.module.css'

type BadgeColor = 'blue' | 'green'

interface CardProps {
  title?: string
  icon?: ReactNode
  badge?: { label: string; color: BadgeColor }
  children: ReactNode
}

const BADGE_CLASS: Record<BadgeColor, string | undefined> = {
  blue: styles.badgeBlue,
  green: styles.badgeGreen,
}

/**
 * Primitive — generic white card wrapper with an optional h2 title (+
 * optional icon), and an optional colored badge next to the title (source:
 * .card-header / .card-badge, used e.g. for "Required"/"Active" labels on
 * profile form sections). Source: .card.
 */
export default function Card({ title, icon, badge, children }: CardProps) {
  const heading = title && (
    <h2>
      {icon}
      {title}
    </h2>
  )

  return (
    <div className={styles.card}>
      {badge ? (
        <div className={styles.header}>
          {heading}
          <span className={[styles.badge, BADGE_CLASS[badge.color]].filter(Boolean).join(' ')}>{badge.label}</span>
        </div>
      ) : (
        heading
      )}
      {children}
    </div>
  )
}
