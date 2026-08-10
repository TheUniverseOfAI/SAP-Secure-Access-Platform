import { useLocation, useNavigate } from 'react-router-dom'
import SbNavItem from '../components/SbNavItem'
import styles from './AuthSettingsSidebar.module.css'

/**
 * Sidebar for the Auth Settings section (ExternalLayout variant #2).
 * Ported from sap-auth-settings_v3.html's <nav class="sidebar">. All 6
 * items navigate for real with route-derived active state. The two
 * footer links (test first-login wizard / test security alert) trigger
 * modals in the source with no page of their own — left inert, same
 * "unreachable state" reasoning as the forgot-password wizard's skipped
 * steps and the Financial tab's skipped Add Card modal.
 */
export default function AuthSettingsSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={styles.sidebar} aria-label="Security settings navigation">
      <div className={styles.header}>
        <h3>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751" />
          </svg>
          Security Settings
        </h3>
        <p>Authentication methods &amp; access controls</p>
      </div>

      <div className={styles.nav}>
        <div className={styles.title}>Overview</div>
        <SbNavItem
          label="Why Security Matters"
          active={isActive('/auth-settings/intro')}
          onClick={() => navigate('/auth-settings/intro')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
          }
        />

        <div className={styles.divider} />
        <div className={styles.title}>Authentication Methods</div>
        <SbNavItem
          label="Password & Credentials"
          active={isActive('/auth-settings/passwords')}
          onClick={() => navigate('/auth-settings/passwords')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
            </svg>
          }
        />
        <SbNavItem
          label="MFA & OTP Methods"
          active={isActive('/auth-settings/mfa')}
          onClick={() => navigate('/auth-settings/mfa')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          }
        />
        <SbNavItem
          label="Passwordless & SSO"
          active={isActive('/auth-settings/passwordless')}
          onClick={() => navigate('/auth-settings/passwordless')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757" />
            </svg>
          }
        />
        <SbNavItem
          label="Advanced & Adaptive"
          active={isActive('/auth-settings/advanced')}
          onClick={() => navigate('/auth-settings/advanced')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87" />
            </svg>
          }
        />

        <div className={styles.divider} />
        <div className={styles.title}>Session &amp; Access</div>
        <SbNavItem
          label="Session & Access Control"
          active={isActive('/auth-settings/session')}
          onClick={() => navigate('/auth-settings/session')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      <div className={styles.footer}>
        <a href="#">Test first-login wizard</a>
        <br />
        <a href="#">Test security alert</a>
      </div>
    </nav>
  )
}
