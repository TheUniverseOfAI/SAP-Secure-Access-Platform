import type { ReactNode } from 'react'
import styles from './ResendRow.module.css'

/**
 * Small centered text row used under an OTP/magic-link step ("Didn't get
 * it? Resend") and for the "Back to Sign In" link on auth wizard steps.
 * Previously the raw global .resend-row class from legacy-sap.css, used
 * in three separate places. Source: .resend-row.
 */
export default function ResendRow({ children }: { children: ReactNode }) {
  return <p className={styles.row}>{children}</p>
}
