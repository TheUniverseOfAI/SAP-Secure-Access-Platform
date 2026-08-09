import type { ReactNode } from 'react'
import styles from './NavItem.module.css'

interface NavItemProps {
  icon?: ReactNode
  label: string
  badge?: string
  trailingIcon?: ReactNode
  active?: boolean
  featured?: boolean
  nested?: boolean
  onClick?: () => void
}

/**
 * Primitive — a single sidebar navigation row. Covers three visual
 * variants from the source: plain top-level item, the one "featured"
 * item (Portals, gradient background), and nested sub-items (inside an
 * expanded group, source: .nav-sub .nav-item). `trailingIcon` is generic
 * so it can be either a group-toggle chevron (rotates via the caller
 * passing a rotated icon/wrapper) or a static external-link arrow (User
 * Profile, Auth & Authorization) — this component doesn't know which.
 * `active` is a controlled prop; no route-matching logic lives here.
 * Source: .nav-item / .nav-icon / .nav-text / .nav-badge / .nav-arrow.
 */
export default function NavItem({ icon, label, badge, trailingIcon, active, featured, nested, onClick }: NavItemProps) {
  const classes = [
    styles.item,
    nested ? styles.nested : '',
    active ? (nested ? styles.nestedActive : styles.itemActive) : '',
    featured ? styles.featured : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={classes} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={[styles.text, featured ? styles.featuredText : ''].filter(Boolean).join(' ')}>{label}</span>
      {badge && <span className={[styles.badge, featured ? styles.featuredBadge : ''].filter(Boolean).join(' ')}>{badge}</span>}
      {trailingIcon}
    </button>
  )
}
