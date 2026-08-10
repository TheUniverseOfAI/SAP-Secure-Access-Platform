import { CATEGORY_LABELS, type PortalCategory } from '../data/portals'
import styles from './PortalFilter.module.css'

export type PortalFilterValue = 'all' | PortalCategory

interface PortalFilterProps {
  active: PortalFilterValue
  onChange: (value: PortalFilterValue) => void
}

const OPTIONS: { value: PortalFilterValue; label: string }[] = [
  { value: 'all', label: 'All Portals' },
  ...(Object.keys(CATEGORY_LABELS) as PortalCategory[]).map((cat) => ({ value: cat, label: CATEGORY_LABELS[cat] })),
]

/**
 * Primitive — the category filter row. Controlled via active/onChange
 * (same pattern as Tabs) — filtering which cards show is structural UI
 * state, not business logic, so it's wired for real. Source: .portal-filter
 * / .portal-filter-btn.
 */
export default function PortalFilter({ active, onChange }: PortalFilterProps) {
  return (
    <div className={styles.filter}>
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={[styles.btn, active === opt.value ? styles.btnActive : ''].filter(Boolean).join(' ')}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
