import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.css'

interface BreadcrumbProps {
  current: string
  /** Optional middle segment (e.g. "Privacy Policy" before "Overview"). Source: middle breadcrumb segments are inert `<a href="#">` (no onclick) — not real navigation, since there's no dedicated "group root" page, so this is rendered the same way rather than faked as a working link. */
  parent?: string
}

/**
 * Source: .breadcrumb. "Home" links to /home (see router.tsx's comment on
 * why portal home is at /home rather than / for now — temporary until
 * real auth-gated redirect logic exists).
 */
export default function Breadcrumb({ current, parent }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link to="/home">Home</Link>
      {parent && (
        <>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <a href="#">{parent}</a>
        </>
      )}
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
      <span className={styles.current}>{current}</span>
    </nav>
  )
}
