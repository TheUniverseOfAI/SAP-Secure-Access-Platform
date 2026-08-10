import type { ReactNode } from 'react'
import styles from './SbNavItem.module.css'

interface SbNavItemProps {
  icon: ReactNode
  label: string
  count?: string
  active?: boolean
  danger?: boolean
  onClick?: () => void
}

/** Primitive — a row in the narrow profile/settings sidebar (ExternalLayout). Source: .sb-item. */
export default function SbNavItem({ icon, label, count, active, danger, onClick }: SbNavItemProps) {
  return (
    <button
      type="button"
      className={[styles.item, active ? styles.itemActive : ''].filter(Boolean).join(' ')}
      style={danger ? { color: 'var(--red-500)' } : undefined}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
      {count && <span className={styles.count}>{count}</span>}
    </button>
  )
}
