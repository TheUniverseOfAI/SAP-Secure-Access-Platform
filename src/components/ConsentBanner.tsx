import styles from './ConsentBanner.module.css'

interface ConsentBannerProps {
  accepted: boolean
  onAccept: () => void
}

/**
 * Source: .consent-banner and its children. `accepted` is lifted to the
 * parent page (LoginPage/SignupPage) rather than owned locally, because
 * the source's gate() check reads consentAccepted before allowing
 * Sign In/Create Account to proceed — the page needs to know this
 * banner's state, not just the banner itself.
 */
export default function ConsentBanner({ accepted, onAccept }: ConsentBannerProps) {
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
        By continuing, you agree to our company&apos;s acceptable use policy. All activity is monitored and logged in accordance with
        corporate security standards. Unauthorized access is strictly prohibited.
      </div>
      <button
        className={[styles.button, accepted ? styles.accepted : ''].filter(Boolean).join(' ')}
        type="button"
        onClick={onAccept}
        disabled={accepted}
      >
        {accepted ? '✓ Acknowledged' : 'I Understand & Agree'}
      </button>
    </div>
  )
}
