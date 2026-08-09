import type { ReactNode } from 'react'
import styles from './StatCard.module.css'

type StatCardColor = 'blue' | 'green' | 'amber' | 'purple'

interface StatCardProps {
  icon: ReactNode
  value: string
  label: string
  color: StatCardColor
  onClick?: () => void
}

const ICON_CLASS: Record<StatCardColor, string | undefined> = {
  blue: styles.iconBlue,
  green: styles.iconGreen,
  amber: styles.iconAmber,
  purple: styles.iconPurple,
}

/** Primitive — one stat tile in the home dashboard's stat grid. Source: .stat-card. */
export function StatCard({ icon, value, label, color, onClick }: StatCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={[styles.icon, ICON_CLASS[color]].filter(Boolean).join(' ')}>{icon}</div>
      <div>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </button>
  )
}

/** Layout wrapper for a row of StatCards. Source: .stat-grid. */
export function StatGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}
