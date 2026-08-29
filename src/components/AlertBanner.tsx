import type { ReactNode } from 'react'
import styles from './AlertBanner.module.css'

type AlertVariant = 'info' | 'warning' | 'danger'

interface AlertBannerProps {
  variant: AlertVariant
  icon: ReactNode
  title: string
  children: ReactNode
}

const VARIANT_CLASS: Record<AlertVariant, string | undefined> = {
  info: styles.info,
  warning: styles.warning,
  danger: styles.danger,
}

/**
 * Reusable inline banner (icon + title + description) — previously used
 * only on the Auth Settings intro page via the raw global .alert-banner
 * class from legacy-sap.css. Scoped and componentized so future callers
 * (the deferred login/profile success banners, when the wiring phase
 * builds them) reuse this instead of duplicating markup.
 * Source: .alert-banner / .alert-banner.info/.warning/.danger.
 */
export default function AlertBanner({ variant, icon, title, children }: AlertBannerProps) {
  return (
    <div className={[styles.banner, VARIANT_CLASS[variant]].filter(Boolean).join(' ')} role="note">
      <span className={styles.icon}>{icon}</span>
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  )
}
