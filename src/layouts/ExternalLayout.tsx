import { Outlet } from 'react-router-dom'
import ExternalHeader from './ExternalHeader'
import ExternalSidebar from './ExternalSidebar'
import '../styles/legacy-sap.css'
import styles from './ExternalLayout.module.css'

/**
 * Shared shell for profile/auth-settings pages. Renders the active tab
 * via <Outlet /> — tabs are real routes (/profile/personal, etc.), same
 * pattern as PortalLayout's pages, not local tab-switch state, since
 * navigating between profile sections is exactly the kind of "which
 * screen is showing" structural navigation already wired everywhere else.
 */
export default function ExternalLayout() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ExternalHeader />
      <ExternalSidebar />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
