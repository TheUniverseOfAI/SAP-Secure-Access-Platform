import type { ReactNode } from 'react'
import styles from './ThreatCard.module.css'

type ThreatColor = 'red' | 'amber' | 'orange' | 'purple'

const COLOR_CLASS: Record<ThreatColor, string | undefined> = {
  red: styles.red,
  amber: styles.amber,
  orange: styles.orange,
  purple: styles.purple,
}

/**
 * One "real-world threat" card on the Auth Settings intro page. Previously
 * a raw global .threat-card class from legacy-sap.css; scoped and
 * componentized to match the StatCard/QuickCard pattern used elsewhere.
 * Source: .threat-card / .threat-card.red/.amber/.orange/.purple.
 */
export function ThreatCard({ color, title, children }: { color: ThreatColor; title: string; children: ReactNode }) {
  return (
    <div className={[styles.card, COLOR_CLASS[color]].filter(Boolean).join(' ')}>
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  )
}

/** Layout wrapper for a set of ThreatCards. Source: .threat-grid. */
export function ThreatGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}
