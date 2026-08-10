import { Link, useLocation, useNavigate } from 'react-router-dom'
import SbNavItem from '../components/SbNavItem'
import styles from './ExternalSidebar.module.css'

/**
 * Narrow sidebar for ExternalLayout (profile section navigation). Ported
 * from sap-user-profile_v2.html's <nav class="sidebar">. Personal/Contact/
 * Employment (Round A) navigate for real with route-derived active state.
 * Identity/Financial/Health/Education/Documents/Danger Zone (Round B, not
 * built yet) remain inert. Avatar upload button renders but doesn't
 * actually accept/preview a file yet (no state) — visual only.
 */
export default function ExternalSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className={styles.sidebar} aria-label="Profile sections">
      <div className={styles.profile}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatarImg}>MA</div>
          <label className={styles.avatarUpload} aria-label="Upload avatar photo">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <input type="file" accept="image/*" />
          </label>
        </div>
        <div className={styles.name}>Muhanned</div>
        <div className={styles.role}>AI Engineer &amp; ML Ops Specialist</div>
        <div className={styles.badges}>
          <span className={[styles.badge, styles.badgeBlue].join(' ')}>Admin</span>
          <span className={[styles.badge, styles.badgeGreen].join(' ')}>MFA</span>
          <span className={[styles.badge, styles.badgePurple].join(' ')}>SOC 2</span>
        </div>
      </div>

      <div className={styles.nav}>
        <div className={styles.sectionTitle}>Profile</div>
        <SbNavItem
          label="Personal Info"
          count="18"
          active={isActive('/profile/personal')}
          onClick={() => navigate('/profile/personal')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
            </svg>
          }
        />
        <SbNavItem
          label="Contact & Address"
          count="20"
          active={isActive('/profile/contact')}
          onClick={() => navigate('/profile/contact')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75" />
            </svg>
          }
        />
        <SbNavItem
          label="Employment"
          count="16"
          active={isActive('/profile/employment')}
          onClick={() => navigate('/profile/employment')}
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          }
        />

        <div className={styles.divider} />
        <div className={styles.sectionTitle}>Sensitive</div>
        <SbNavItem
          label="Identity & IDs"
          count="16"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
            </svg>
          }
        />
        <SbNavItem
          label="Financial"
          count="30+"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          }
        />
        <SbNavItem
          label="Health & Safety"
          count="10"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          }
        />

        <div className={styles.divider} />
        <div className={styles.sectionTitle}>Credentials</div>
        <SbNavItem
          label="Education & Certs"
          count="14"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
          }
        />
        <SbNavItem
          label="Documents"
          count="4"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m0 0l3-3m-3 3l3 3m-8.25 0h13.5a.75.75 0 00.75-.75V5.25a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v14.25c0 .414.336.75.75.75z" />
            </svg>
          }
        />

        <div className={styles.divider} />
        <SbNavItem
          danger
          label="Danger Zone"
          icon={
            <svg fill="none" stroke="var(--red-500)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
            </svg>
          }
        />
      </div>

      <div className={styles.footer}>
        Profile completeness: <b>78%</b>
        <br />
        <Link to="/home">Return to Portal</Link>
      </div>
    </nav>
  )
}
