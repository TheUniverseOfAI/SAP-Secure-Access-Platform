import styles from './Tabs.module.css'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeId: string
  'aria-label': string
}

/**
 * Primitive — presentational only. `activeId` is a static prop, not
 * internal state; tab-switching behavior gets wired up in the later
 * wiring phase. Source: .auth-tabs / .auth-tab.
 */
export default function Tabs({ tabs, activeId, 'aria-label': ariaLabel }: TabsProps) {
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
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
