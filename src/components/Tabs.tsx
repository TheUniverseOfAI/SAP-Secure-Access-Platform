import styles from './Tabs.module.css'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeId: string
  'aria-label': string
  /** Called with the clicked tab's id. Kept router-agnostic — the page decides what "selecting" a tab means (e.g. navigate). Omit for a purely decorative/inert tab bar. */
  onSelect?: (id: string) => void
}

/**
 * Primitive — presentational, with an optional onSelect callback. `activeId`
 * is a controlled prop, not internal state — this component never decides
 * which tab is active on its own. Source: .auth-tabs / .auth-tab.
 */
export default function Tabs({ tabs, activeId, 'aria-label': ariaLabel, onSelect }: TabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[styles.tab, isActive ? styles.tabActive : ''].filter(Boolean).join(' ')}
            onClick={onSelect ? () => onSelect(tab.id) : undefined}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
