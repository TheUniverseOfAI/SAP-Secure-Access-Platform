import { Link } from 'react-router-dom'
import styles from './MainFooter.module.css'

/**
 * Post-login footer — small, sits inline at the end of scrollable page
 * content (not viewport-pinned like AuthFooter). Links now navigate for
 * real, since privacy/terms/security/contact pages all exist as of the
 * detail-pages round. Source: .main-footer.
 */
export default function MainFooter() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <span>
        &copy; 2026 <b>SAP</b> — Secure Access Platform. All rights reserved.
      </span>
      <div>
        <Link to="/privacy/overview">Privacy</Link>
        <Link to="/terms/agreement">Terms</Link>
        <Link to="/security/overview">Security</Link>
        <Link to="/contact/general">Contact</Link>
      </div>
    </footer>
  )
}
