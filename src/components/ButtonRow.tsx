import type { ReactNode } from 'react'
import styles from './ButtonRow.module.css'

/**
 * Back/Continue button pair used on the forgot-password wizard's steps.
 * Previously the raw global .btn-row class — but the merged legacy-sap.css
 * version actually carries a DIFFERENT page's values (profile's
 * right-aligned, top-bordered button row), diverging from this page's own
 * left-aligned, border-free row. Scoping this fixes that mismatch as well
 * as removing the global-class dependency. Source: login-portal_v2.html's
 * own .btn-row (not the merged one — see this file's CSS for the
 * divergence this caught).
 */
export default function ButtonRow({ children }: { children: ReactNode }) {
  return <div className={styles.row}>{children}</div>
}
