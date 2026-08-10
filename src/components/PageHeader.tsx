import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  description: string
  /** "Last updated: April 10, 2026" / "Effective: January 1, 2026" — source: .page-header .updated. */
  updated?: string
}

/** Primitive — page title + description, used at the top of every portal page. Source: .page-header. */
export default function PageHeader({ title, description, updated }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <p>{description}</p>
      {updated && (
        <div className={styles.updated}>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {updated}
        </div>
      )}
    </div>
  )
}
