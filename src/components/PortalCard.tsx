import type { Portal } from '../data/portals'
import { CATEGORY_LABELS } from '../data/portals'
import styles from './PortalCard.module.css'

interface PortalCardProps {
  portal: Portal
}

const STATUS_CLASS: Record<Portal['status'], string | undefined> = {
  live: styles.statusLive,
  beta: styles.statusBeta,
  dev: styles.statusDev,
  planned: styles.statusPlanned,
}
const STATUS_LABEL: Record<Portal['status'], string> = {
  live: 'Live',
  beta: 'Beta',
  dev: 'In Development',
  planned: 'Planned',
}

/**
 * Primitive — one card in the portals hub grid. "Launch" doesn't go
 * anywhere yet (portal apps are external, out of scope for this project).
 * Source: .portal-card and its children.
 */
export default function PortalCard({ portal }: PortalCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.bar} style={{ background: portal.color }} />
      <div className={styles.top}>
        <div className={styles.icon} style={{ background: portal.color }}>
          {portal.icon}
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{portal.name}</div>
          <div className={styles.cat}>{CATEGORY_LABELS[portal.cat]}</div>
        </div>
      </div>
      <div className={styles.desc}>{portal.desc}</div>
      <div className={styles.footer}>
        <span className={[styles.status, STATUS_CLASS[portal.status]].filter(Boolean).join(' ')}>
          {STATUS_LABEL[portal.status]}
        </span>
        <a className={styles.launch} href="#">
          Launch
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}
