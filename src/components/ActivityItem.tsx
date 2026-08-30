import type { ReactNode } from 'react'
import styles from './ActivityItem.module.css'

type ActivityDotColor = 'green' | 'blue' | 'amber' | 'gray'

interface ActivityItemProps {
  color: ActivityDotColor
  label: string
  detail: string
  time: string
  /** Renders as a real clickable row when provided; a plain static row otherwise. */
  onClick?: () => void
}

const DOT_CLASS: Record<ActivityDotColor, string | undefined> = {
  green: styles.dotGreen,
  blue: styles.dotBlue,
  amber: styles.dotAmber,
  gray: styles.dotGray,
}

/**
 * One row in the "Recent Activity" feed. Source: .activity-item — a
 * static, non-interactive div there. Made clickable when `onClick` is
 * given (backed by a real `link` in src/data/activity.ts), same
 * structural-navigation treatment as StatCard/QuickCard on this page.
 */
export function ActivityItem({ color, label, detail, time, onClick }: ActivityItemProps) {
  const content: ReactNode = (
    <>
      <div className={[styles.dot, DOT_CLASS[color]].filter(Boolean).join(' ')} />
      <div>
        <div className={styles.text}>
          <b>{label}</b> {detail}
        </div>
        <div className={styles.time}>{time}</div>
      </div>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={[styles.item, styles.itemButton].join(' ')} onClick={onClick}>
        {content}
      </button>
    )
  }

  return <div className={styles.item}>{content}</div>
}

/** Layout wrapper for a list of ActivityItems. Source: .activity-list. */
export function ActivityList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}
