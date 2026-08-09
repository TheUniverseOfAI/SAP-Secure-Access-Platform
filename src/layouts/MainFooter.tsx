import styles from './MainFooter.module.css'

/**
 * Post-login footer — small, sits inline at the end of scrollable page
 * content (not viewport-pinned like AuthFooter). Links are static (no
 * routes for privacy/terms/security/contact pages exist yet). Source:
 * .main-footer.
 */
export default function MainFooter() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <span>
        &copy; 2026 <b>SAP</b> — Secure Access Platform. All rights reserved.
      </span>
      <div>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Security</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  )
}
