import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader'
import Sidebar from './Sidebar'
import MainFooter from './MainFooter'
import '../styles/legacy-sap.css'
import styles from './PortalLayout.module.css'

/**
 * Shared shell for post-login pages (portal home, about, leadership, etc.).
 * Renders the active portal route via <Outlet /> (data mode router — see
 * src/router.tsx).
 *
 * Breadcrumb isn't rendered here, unlike AuthHeader/AuthFooter which are
 * fixed for every auth page — the breadcrumb's "current" label changes per
 * page (Dashboard, Portals, About, ...), so each page renders its own
 * <Breadcrumb current="..."/> at the top of its content instead of
 * PortalLayout hardcoding one label for every route.
 */
export default function PortalLayout() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AppHeader />
      <Sidebar />
      <div className={styles.main}>
        <main id="main-content" className={styles.content}>
          <Outlet />
        </main>
        <MainFooter />
      </div>
    </div>
  )
}
