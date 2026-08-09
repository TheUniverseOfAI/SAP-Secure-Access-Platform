import styles from './PageHeader.module.css'

interface PageHeaderProps {
  title: string
  description: string
}

/** Primitive — page title + description, used at the top of every portal page. Source: .page-header. */
export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
