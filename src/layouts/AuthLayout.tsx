import { Outlet } from 'react-router-dom'
import '../styles/legacy-sap.css'
import AuthHeader from './AuthHeader'
import AuthFooter from './AuthFooter'
import styles from './AuthLayout.module.css'

/**
 * Shared shell for pre-login pages (login, signup, forgot-password).
 * Renders the active auth route via React Router's <Outlet /> (data mode,
 * createBrowserRouter — see src/router.tsx).
 *
 * Still using legacy-sap.css (full unsplit sap.css) rather than component-
 * level CSS Modules, per the "split CSS only once real components are being
 * built" decision — AuthHeader/AuthFooter are real components now, but their
 * styling hasn't been migrated to CSS Modules yet.
 */
export default function AuthLayout() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AuthHeader />
      <main id="main-content" className={styles.content}>
        <Outlet />
      </main>
      <AuthFooter />
    </div>
  )
}
