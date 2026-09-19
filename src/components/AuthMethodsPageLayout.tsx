import type { AuthMethodSection } from '../data/authSettings'
import { useAuthMethodsSection } from '../hooks/useAuthMethodsSection'
import { AuthMethodList } from './AuthMethodCard'
import styles from './AuthMethodsPageLayout.module.css'
import PageHeader from './PageHeader'

interface AuthMethodsPageLayoutProps {
  section: AuthMethodSection
  title: string
  description: string
}

/**
 * Shared shell for the 5 Auth Settings category pages (Passwords, MFA,
 * Passwordless, Advanced, Session) — each was a near-byte-identical copy
 * of this same padding/PageHeader/loading-state/AuthMethodList structure,
 * differing only in title, description, and which section key to fetch.
 * Consolidated during the Round 2 structure review.
 */
export default function AuthMethodsPageLayout({ section, title, description }: AuthMethodsPageLayoutProps) {
  const { methods, loading, toggleMethod } = useAuthMethodsSection(section)

  return (
    <div className={styles.page}>
      <PageHeader title={title} description={description} />
      {loading ? (
        <p className={styles.loading}>Loading authentication methods…</p>
      ) : (
        <AuthMethodList methods={methods} onToggle={toggleMethod} />
      )}
    </div>
  )
}
