import { useState, type ReactNode } from 'react'
import NavItem from './NavItem'
import styles from './NavGroup.module.css'

interface NavGroupProps {
  icon: ReactNode
  label: string
  badge?: string
  children: ReactNode
  defaultOpen?: boolean
}

/**
 * A collapsible sidebar nav group (e.g. "Help Center" expanding into
 * FAQ/Knowledge Base/...). Owns its own open/closed state locally — this
 * is self-contained UI state with no effect outside this component, same
 * category as a details/summary disclosure widget, not the deferred
 * business logic. Source: .nav-group / .nav-sub.
 */
export default function NavGroup({ icon, label, badge, children, defaultOpen = false }: NavGroupProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={styles.group}>
      <NavItem
        icon={icon}
        label={label}
        badge={badge}
        onClick={() => setOpen((prev) => !prev)}
        trailingIcon={
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--gray-400)', transition: 'transform 0.2s ease', transform: open ? 'rotate(90deg)' : undefined }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        }
      />
      {open && <div className={styles.sub}>{children}</div>}
    </div>
  )
}
