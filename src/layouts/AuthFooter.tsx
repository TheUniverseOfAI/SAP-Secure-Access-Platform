import styles from './AuthFooter.module.css'

/**
 * Footer shell for pre-login pages (login, signup, forgot-password).
 * Ported from sap-package/app-files/login-portal_v2.html's <footer class="footer">.
 *
 * Not the same component as MainFooter (post-login, ".main-footer" class) —
 * this one is full-width and pinned to the viewport bottom via AuthLayout's
 * flex wrapper; MainFooter sits inline at the end of scrollable page content.
 */
export default function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <a href="#">Privacy Policy</a>
        <a href="#">Accessibility</a>
        <a href="#">Terms of Use</a>
        <a href="#">System Status</a>
        <a href="#">Security</a>
      </div>
      <p className={styles.copy}>
        &copy; 2026 <span>SAP — Secure Access Platform</span>. All rights reserved.
      </p>
    </footer>
  )
}
