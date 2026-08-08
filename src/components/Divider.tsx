import type { ReactNode } from 'react'
import styles from './Divider.module.css'

interface DividerProps {
  children: ReactNode
}

/** Primitive — labeled horizontal rule. Source: .divider. */
export default function Divider({ children }: DividerProps) {
  return (
    <div className={styles.divider}>
      <span className={styles.label}>{children}</span>
    </div>
  )
}
