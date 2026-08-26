import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'
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
 *
 * Owns the sidebar toggle state shared between AppHeader (the hamburger
 * button) and Sidebar (what actually responds to it). One boolean plus
 * the current viewport width does double duty exactly like the source's
 * toggleSidebar(), which checks window.innerWidth to decide whether
 * toggling means "icon-only collapsed" (desktop) or "off-canvas overlay
 * open" (narrow viewport) — never both, matching the source's
 * `classList.remove('collapsed')` when going mobile. Structural UI state,
 * not business logic — same category as nav-group expand/collapse.
 */
export default function PortalLayout() {
  const [sidebarToggled, setSidebarToggled] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const collapsed = sidebarToggled && !isMobile
  const mobileOpen = sidebarToggled && isMobile

  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AppHeader navExpanded={isMobile ? mobileOpen : !collapsed} onToggleSidebar={() => setSidebarToggled((prev) => !prev)} />
      <Sidebar collapsed={collapsed} mobileOpen={mobileOpen} />
      <div className={[styles.main, collapsed ? styles.mainCollapsed : ''].filter(Boolean).join(' ')}>
        <main id="main-content" className={styles.content}>
          <Outlet />
        </main>
        <MainFooter />
      </div>
    </div>
  )
}
