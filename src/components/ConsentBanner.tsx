import styles from './ConsentBanner.module.css'

/**
 * Static — no accepted/dismissed state wired up yet (that's wiring-phase
 * work). The button renders and is clickable but does nothing right now.
 * Source: .consent-banner and its children.
 */
export default function ConsentBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.icon}>
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      </div>
      <div className={styles.title}>Company Policy &amp; Consent</div>
      <div className={styles.text}>
        By continuing, you agree to our company&apos;s acceptable use policy. All activity is monitored and logged in
        accordance with corporate security standards. Unauthorized access is strictly prohibited.
      </div>
      <button className={styles.button} type="button">
        I Understand &amp; Agree
      </button>
    </div>
  )
}
