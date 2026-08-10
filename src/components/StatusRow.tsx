import styles from './StatusRow.module.css'

type StatusValue = 'operational' | 'degraded' | 'down'

interface StatusRowProps {
  name: string
  status: StatusValue
}

const DOT_CLASS: Record<StatusValue, string | undefined> = {
  operational: styles.dotOperational,
  degraded: styles.dotDegraded,
  down: styles.dotDown,
}
const BADGE_CLASS: Record<StatusValue, string | undefined> = {
  operational: styles.badgeOperational,
  degraded: styles.badgeDegraded,
  down: styles.badgeDown,
}
const STATUS_LABEL: Record<StatusValue, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  down: 'Down',
}

/** Primitive — one service row on the System Status page. Source: .status-row. */
export default function StatusRow({ name, status }: StatusRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.left}>
        <div className={[styles.dot, DOT_CLASS[status]].filter(Boolean).join(' ')} />
        <div className={styles.name}>{name}</div>
      </div>
      <span className={[styles.badge, BADGE_CLASS[status]].filter(Boolean).join(' ')}>{STATUS_LABEL[status]}</span>
    </div>
  )
}
