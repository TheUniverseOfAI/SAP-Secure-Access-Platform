import type { ReactNode } from 'react'
import type { TeamMember } from '../data/leadership'
import styles from './TeamCard.module.css'

/** Primitive — one card in a team grid. Source: .team-card. */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatar} style={{ background: member.color }}>
        {member.initials}
      </div>
      <div className={styles.name}>{member.name}</div>
      <div className={styles.role}>{member.role}</div>
    </div>
  )
}

/** Layout wrapper for a row of TeamCards. Source: .team-grid. */
export function TeamGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}
