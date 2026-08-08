import type { ReactNode } from 'react'
import '../styles/legacy-sap.css'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'
import styles from './AuthLayout.module.css'

interface AuthLayoutProps {
  children: ReactNode
}

/**
 * Shared shell for pre-login pages (login, signup, forgot-password).
 *
 * Takes `children` instead of rendering React Router's <Outlet /> because
 * routing doesn't exist yet (that's Phase 5) — this prop will be swapped for
 * <Outlet /> once createBrowserRouter is wired up, with no other changes
 * needed here.
 *
 * Still using legacy-sap.css (full unsplit sap.css) rather than component-
 * level CSS Modules, per the "split CSS only once real components are being
 * built" decision — AuthHeader/AuthFooter are real components now, but their
 * styling hasn't been migrated to CSS Modules yet.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AuthHeader />
      <main id="main-content" className={styles.content}>
        {children}
      </main>
      <AuthFooter />
    </div>
  )
}
