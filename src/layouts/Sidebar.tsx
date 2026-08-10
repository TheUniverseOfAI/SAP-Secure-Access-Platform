import { useLocation, useNavigate } from 'react-router-dom'
import NavGroup from '../components/NavGroup'
import NavItem from '../components/NavItem'
import styles from './Sidebar.module.css'

const ExternalArrow = (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" style={{ width: 16, height: 16, flexShrink: 0, color: 'var(--gray-400)', opacity: 0.4 }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
)

/**
 * Post-login sidebar nav tree. Ported from sap-package/app-files/sap-portal_v2.html
 * (lines 407-555). Static/inert per the UI-first rule, EXCEPT Home and
 * Portals, which now have real routes (/home, /portals) — those two use
 * real react-router navigation with route-derived `active` state, same
 * "structural navigation, not business logic" reasoning already applied
 * to LoginPage/SignupPage's tabs. Every other item (About, Leadership,
 * User Profile, and everything inside the Support/Legal/Operations
 * groups) still has no target page/route to go to, so those remain
 * inert. Group expand/collapse works for real regardless (local state,
 * see NavGroup.tsx) since that's structural UI, not business logic.
 */
export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={styles.sidebar} aria-label="Main navigation">
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Main</div>
        <NavItem
          active={location.pathname === '/home'}
          label="Home"
          onClick={() => navigate('/home')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          }
        />
        <NavItem
          featured
          active={location.pathname === '/portals'}
          label="Portals"
          badge="20"
          onClick={() => navigate('/portals')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" style={{ opacity: 0.9 }}>
              <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          }
        />
        <NavItem
          label="About"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          }
        />
        <NavItem
          label="Leadership"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          }
        />
        <NavItem
          label="User Profile"
          trailingIcon={ExternalArrow}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          }
        />
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Support</div>
        <NavGroup
          label="Help Center"
          badge="4"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18.75h.008v.008H12v-.008z" />
              <circle cx="12" cy="12" r="9.75" fill="none" />
            </svg>
          }
        >
          <NavItem nested label="FAQ" />
          <NavItem nested label="Knowledge Base" />
          <NavItem nested label="User Guides" />
          <NavItem nested label="Submit Ticket" />
        </NavGroup>
        <NavGroup
          label="Contact"
          badge="3"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          }
        >
          <NavItem nested label="General Inquiry" />
          <NavItem nested label="Technical Support" />
          <NavItem nested label="Enterprise Sales" />
        </NavGroup>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Legal &amp; Compliance</div>
        <NavGroup
          label="Privacy Policy"
          badge="4"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751" />
            </svg>
          }
        >
          <NavItem nested label="Overview" />
          <NavItem nested label="Data Collection" />
          <NavItem nested label="Data Sharing" />
          <NavItem nested label="Your Rights" />
        </NavGroup>
        <NavGroup
          label="Accessibility"
          badge="4"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        >
          <NavItem nested label="Statement" />
          <NavItem nested label="Standards (WCAG)" />
          <NavItem nested label="Features" />
          <NavItem nested label="Report Issues" />
        </NavGroup>
        <NavGroup
          label="Terms of Use"
          badge="3"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          }
        >
          <NavItem nested label="Agreement" />
          <NavItem nested label="Acceptable Use" />
          <NavItem nested label="Limitations" />
        </NavGroup>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Operations</div>
        <NavGroup
          label="System Status"
          badge="4"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          }
        >
          <NavItem nested label="Current Status" />
          <NavItem nested label="Incident History" />
          <NavItem nested label="Maintenance" />
          <NavItem nested label="Uptime Report" />
        </NavGroup>
        <NavGroup
          label="Security"
          badge="5"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
        >
          <NavItem nested label="Overview" />
          <NavItem nested label="Auth & Authorization" trailingIcon={ExternalArrow} />
          <NavItem nested label="Compliance" />
          <NavItem nested label="Vulnerability Program" />
          <NavItem nested label="Incident Response" />
        </NavGroup>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerDot} />
        <div className={styles.footerText}>
          <b>All systems operational</b>
          <br />
          Last checked: 2 min ago
        </div>
      </div>
    </nav>
  )
}
