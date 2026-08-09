import type { ReactNode } from 'react'
import styles from './QuickCard.module.css'

interface QuickCardProps {
  icon: ReactNode
  label: string
  onClick?: () => void
}

/** Primitive — one tile in the "Quick Navigation" grid. Source: .quick-card. */
export function QuickCard({ icon, label, onClick }: QuickCardProps) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  )
}

/** Layout wrapper for a row of QuickCards. Source: .quick-grid. */
export function QuickGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}
