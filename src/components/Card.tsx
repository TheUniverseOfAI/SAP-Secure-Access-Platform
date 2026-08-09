import type { ReactNode } from 'react'
import styles from './Card.module.css'

interface CardProps {
  title?: string
  children: ReactNode
}

/** Primitive — generic white card wrapper with an optional h2 title. Source: .card. */
export default function Card({ title, children }: CardProps) {
  return (
    <div className={styles.card}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  )
}
