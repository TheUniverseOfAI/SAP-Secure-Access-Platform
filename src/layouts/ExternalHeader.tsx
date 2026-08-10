import { Link } from 'react-router-dom'
import styles from './ExternalHeader.module.css'

/**
 * Header for ExternalLayout (profile, auth-settings). Ported from
 * sap-user-profile_v2.html's <header class="header">. Simpler than
 * AppHeader — a "Back to Portal" link instead of menu-toggle/search/
 * notifications, since there's no main portal sidebar here to control.
 */
export default function ExternalHeader() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <Link className={styles.backBtn} to="/home">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Portal
        </Link>
        <div className={styles.brand}>
          <svg viewBox="0 0 80 80" fill="none" width="34" height="34" aria-hidden="true">
            <path d="M40 4L72 18V40C72 58 58 72 40 76C22 72 8 58 8 40V18Z" fill="#1a4080" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path d="M40 10L66 22V40C66 55 54 67 40 70C26 67 14 55 14 40V22Z" fill="rgba(59,130,246,0.15)" />
            <ellipse cx="24" cy="24" rx="5" ry="4" fill="#4b5563" opacity=".8" />
            <ellipse cx="56" cy="24" rx="5" ry="4" fill="#4b5563" opacity=".8" />
            <path d="M20 30C20 22 28 16 40 16C52 16 60 22 60 30V44C60 52 52 58 40 58C28 58 20 52 20 44Z" fill="#374151" />
            <path d="M40 14C44 14 50 16 54 20L40 28L26 20C30 16 36 14 40 14Z" fill="#e5e7eb" opacity=".92" />
            <ellipse cx="32" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity=".9" />
            <ellipse cx="48" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity=".9" />
            <circle cx="33" cy="33.5" r="1.8" fill="#3b82f6" opacity=".9" />
            <circle cx="47" cy="33.5" r="1.8" fill="#3b82f6" opacity=".9" />
            <ellipse cx="40" cy="42" rx="3.5" ry="2.5" fill="#1f2937" />
            <text x="40" y="68" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="9" fontWeight="700" fill="#dbeafe" letterSpacing="2.5">
              SAP
            </text>
          </svg>
          <div className={styles.title}>
            <b>SAP</b> — User Profile
          </div>
        </div>
      </div>
      <div className={styles.avatar}>MA</div>
    </header>
  )
}
