import type { Notification } from '../data/notifications'
import styles from './NotificationsPanel.module.css'

/**
 * Dropdown panel for AppHeader's Notifications button — mock content
 * (src/data/notifications.ts), since no real notification system exists.
 * The header button itself had no onClick at all before this; opening a
 * panel is structural UI state, not business logic.
 */
export default function NotificationsPanel({ notifications }: { notifications: Notification[] }) {
  return (
    <div className={styles.panel} role="menu" aria-label="Notifications">
      <div className={styles.header}>Notifications</div>
      {notifications.length === 0 ? (
        <p className={styles.empty}>You're all caught up.</p>
      ) : (
        <ul className={styles.list}>
          {notifications.map((n) => (
            <li key={n.id} className={styles.item}>
              {!n.read && <span className={styles.dot} aria-hidden="true" />}
              <div className={n.read ? styles.textRead : styles.text}>
                <div>{n.text}</div>
                <div className={styles.time}>{n.time}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
