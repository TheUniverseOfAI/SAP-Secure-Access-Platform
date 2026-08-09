import type { ReactNode } from 'react'
import styles from './ActivityItem.module.css'

type ActivityDotColor = 'green' | 'blue' | 'amber' | 'gray'

interface ActivityItemProps {
  color: ActivityDotColor
  text: ReactNode
  time: string
}

const DOT_CLASS: Record<ActivityDotColor, string | undefined> = {
  green: styles.dotGreen,
  blue: styles.dotBlue,
  amber: styles.dotAmber,
  gray: styles.dotGray,
}

/** Primitive — one row in the "Recent Activity" feed. Source: .activity-item. */
export function ActivityItem({ color, text, time }: ActivityItemProps) {
  return (
    <div className={styles.item}>
      <div className={[styles.dot, DOT_CLASS[color]].filter(Boolean).join(' ')} />
      <div>
        <div className={styles.text}>{text}</div>
        <div className={styles.time}>{time}</div>
      </div>
    </div>
  )
}

/** Layout wrapper for a list of ActivityItems. Source: .activity-list. */
export function ActivityList({ children }: { children: ReactNode }) {
  return <div className={styles.list}>{children}</div>
}
