import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import '../styles/legacy-sap.css'
import styles from './ExternalLayout.module.css'

interface ExternalLayoutProps {
  header: ReactNode
  sidebar: ReactNode
}

/**
 * Shared shell for profile/auth-settings pages — the two ExternalLayout
 * sections from the plan. Takes `header`/`sidebar` as props rather than
 * hardcoding ExternalHeader/ExternalSidebar, since auth-settings needs a
 * different header title and a completely different sidebar
 * (AuthSettingsSidebar) while the wrapper structure (narrow-sidebar
 * positioning, main content offset) is identical between the two —
 * parameterizing avoids duplicating that structural CSS/markup twice.
 *
 * Renders the active tab via <Outlet /> — tabs are real routes
 * (/profile/personal, /auth-settings/passwords, etc.), same pattern as
 * PortalLayout's pages.
 */
export default function ExternalLayout({ header, sidebar }: ExternalLayoutProps) {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {header}
      {sidebar}
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
