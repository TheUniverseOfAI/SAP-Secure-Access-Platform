import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Divider from '../components/Divider'
import Input from '../components/Input'
import PasswordField from '../components/PasswordField'
import Tabs from '../components/Tabs'
import styles from './LoginPage.module.css'

/**
 * Real login page UI — static/placeholder per the UI-first build order: no
 * form state, no submit handler, no tab-switching, no validation wiring.
 * Full visual parity with login-portal_v2.html's Sign In tab, built from
 * primitives (Button, Input, PasswordField, Checkbox, Tabs) plus the shared
 * AuthCard shell. Everything here is clickable but inert - behavior is
 * explicitly deferred to the later wiring phase.
 */
export default function LoginPage() {
  return (
    <AuthCard>
      <h1 className="sr-only">Sign In</h1>

      <Tabs
        aria-label="Authentication method"
        activeId="signin"
        tabs={[
          { id: 'signin', label: 'Sign In' },
          { id: 'signup', label: 'Create Account' },
        ]}
      />

      <Input id="loginUser" label="Username or Email" required placeholder="Enter username or email" autoComplete="username" />
      <PasswordField id="loginPass" label="Password" required placeholder="Enter password" autoComplete="current-password" />

      <div className={styles.formRow}>
        <Checkbox label="Remember me" />
        <span className={styles.forgotLink}>Forgot password?</span>
      </div>

      <Button variant="submit">Sign In</Button>

      <Divider>or</Divider>

      <Button variant="altDark">
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="11" r="2.5" />
          <path d="M8 17c0-2.21 1.79-3 4-3s4 .79 4 3" />
          <line x1="17" y1="7" x2="19" y2="7" />
          <line x1="17" y1="9.5" x2="19" y2="9.5" />
        </svg>
        Sign In with PIV / CAC Card
      </Button>

      <div className={styles.altGrid}>
        <Button variant="alt">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          SSO
        </Button>
        <Button variant="alt">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber-500)" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <circle cx="12" cy="15" r="1.5" />
            <path d="M9 7h6" />
          </svg>
          OTP Code
        </Button>
        <Button variant="alt">
          <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" aria-hidden="true">
            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
            <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
          </svg>
          Magic Link
        </Button>
      </div>
    </AuthCard>
  )
}
