import styles from './AuthHeader.module.css'

/**
 * Header shell for pre-login pages (login, signup, forgot-password).
 * Ported from sap-package/app-files/login-portal_v2.html's <header class="header">.
 *
 * Deliberately simpler than the post-login AppHeader (see docs/... once written) —
 * no sidebar toggle, no search, no notifications, no avatar, since there's no
 * authenticated user yet. Do not merge this with AppHeader; they diverge enough
 * in content to stay separate components (see the layout-structure discussion
 * that led to this split).
 */
export default function AuthHeader() {
  return (
    <header className={styles.header} role="banner">
      <div className={styles.brand}>
        <div className={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M40 4L72 18V40C72 58 58 72 40 76C22 72 8 58 8 40V18Z"
              fill="url(#sg)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
            />
            <path d="M40 10L66 22V40C66 55 54 67 40 70C26 67 14 55 14 40V22Z" fill="url(#si)" opacity="0.3" />
            <ellipse cx="24" cy="24" rx="5" ry="4" fill="#4b5563" opacity="0.8" />
            <ellipse cx="56" cy="24" rx="5" ry="4" fill="#4b5563" opacity="0.8" />
            <path d="M20 30C20 22 28 16 40 16C52 16 60 22 60 30V44C60 52 52 58 40 58C28 58 20 52 20 44Z" fill="#374151" />
            <path d="M40 14C44 14 50 16 54 20L40 28L26 20C30 16 36 14 40 14Z" fill="#e5e7eb" opacity="0.92" />
            <ellipse cx="32" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity="0.9" />
            <ellipse cx="48" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity="0.9" />
            <ellipse cx="32" cy="34" rx="3.5" ry="3.2" fill="#0f2240" />
            <ellipse cx="48" cy="34" rx="3.5" ry="3.2" fill="#0f2240" />
            <circle cx="33" cy="33.5" r="1.8" fill="#3b82f6" opacity="0.9" />
            <circle cx="47" cy="33.5" r="1.8" fill="#3b82f6" opacity="0.9" />
            <ellipse cx="40" cy="42" rx="3.5" ry="2.5" fill="#1f2937" />
            <path d="M36 46Q40 49 44 46" stroke="#1f2937" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
            <text
              x="40"
              y="68"
              textAnchor="middle"
              fontFamily="DM Sans,sans-serif"
              fontSize="9"
              fontWeight="700"
              fill="#dbeafe"
              letterSpacing="2.5"
            >
              SAP
            </text>
            <defs>
              <linearGradient id="sg" x1="8" y1="4" x2="72" y2="76" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1a4080" />
                <stop offset="1" stopColor="#0f2240" />
              </linearGradient>
              <linearGradient id="si" x1="14" y1="10" x2="66" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#1d5cbf" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={styles.title}>
          <span>SAP</span> — Secure Access Platform
        </div>
      </div>
      <nav className={styles.nav} aria-label="Utility navigation">
        <a href="#">Help Center</a>
        <a href="#">Contact</a>
        <a href="#">Status</a>
      </nav>
    </header>
  )
}
