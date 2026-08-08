import type { ReactNode } from 'react'
import styles from './WizardHeader.module.css'

interface WizardHeaderProps {
  icon: ReactNode
  title: string
  subtitle: string
}

/** Gradient header used as AuthCard's topBanner for wizard-style flows (forgot-password). */
export default function WizardHeader({ icon, title, subtitle }: WizardHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <div className={styles.icon}>{icon}</div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}
