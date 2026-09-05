import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as authApi from '../api/authApi'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import ConsentBanner from '../components/ConsentBanner'
import Divider from '../components/Divider'
import FormAlert from '../components/FormAlert'
import Input from '../components/Input'
import MagicLinkModal from '../components/MagicLinkModal'
import OtpCodeModal from '../components/OtpCodeModal'
import PasswordField from '../components/PasswordField'
import Tabs from '../components/Tabs'
import { useAuth } from '../context/useAuth'
import styles from './LoginPage.module.css'

/**
 * Real login page — real client-side validation and submission, matching
 * the source's handleLogin() exactly (required-field checks, the same
 * consent gate, the same error copy). There's still no real backend, but
 * every action (accepting consent, signing in, PIV/social login) now goes
 * through src/api/authApi.ts's mocked async calls rather than resolving
 * synchronously in this component, so the call shape already matches what
 * a real backend integration would need.
 *
 * Unlike the source (where any non-empty input "succeeded"), authApi.login
 * now has a real success/failure contract: only the fixed demo credentials
 * (see authApi.ts) succeed, anything else is 'invalid', and 5 consecutive
 * failures triggers 'locked' — copy for both matches the exact toast text
 * defined in sap-design-system_v2.html's alert catalog (auth-invalid/
 * auth-locked) but never wired to anything there. A successful login shows
 * a success alert and holds on this page for authApi.completeLoginRedirect's
 * simulated delay before navigating, so "redirecting…" is visible rather
 * than the page instantly changing.
 *
 * Tab switching and the forgot-password link ARE wired to real navigation
 * (via react-router-dom) — that's just routing, not business logic, so it
 * doesn't fall under the "no wiring yet" rule the way form submission did.
 * Same reasoning for the OTP Code / Magic Link buttons: opening their
 * modal is structural (which UI is showing), the modals themselves do no
 * real sending/verification.
 *
 * PIV/SSO/Google/Microsoft/Apple/Passkey buttons match the source's own
 * handlePIV()/socialLogin() exactly: gated by the same consent check,
 * showing a "Redirecting to X for authentication…" / "Detecting PIV/CAC
 * smart card…" success alert. The source never actually redirects
 * anywhere either — this is genuinely as real as that behavior gets
 * without a real identity provider to redirect to.
 */
/** PIV/CAC sign-in isn't ready to surface yet — kept in code, hidden from the UI until it is. */
const SHOW_PIV = false

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [activeModal, setActiveModal] = useState<'magicLink' | 'otp' | null>(null)
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const handleAcceptConsent = async () => {
    await authApi.acceptConsent()
    setConsentAccepted(true)
  }

  const handleSignIn = async () => {
    setAlert(null)
    setUsernameError('')
    setPasswordError('')

    if (!consentAccepted) {
      setAlert({ type: 'error', text: 'Please acknowledge the consent notice first.' })
      return
    }

    let ok = true
    if (!username.trim()) {
      setUsernameError('Username or email is required')
      ok = false
    }
    if (!password) {
      setPasswordError('Password is required')
      ok = false
    }
    if (!ok) {
      setAlert({ type: 'error', text: 'Please fill in all required fields.' })
      return
    }

    setSubmitting(true)
    const result = await authApi.login(username, password)
    setSubmitting(false)

    if (result.status === 'locked') {
      setAlert({ type: 'warning', text: 'Your account has been locked after 5 failed attempts. Try again in 15 minutes.' })
      return
    }
    if (result.status === 'invalid') {
      setAlert({ type: 'error', text: 'Invalid credentials. Please check your username and password.' })
      return
    }

    setAlert({ type: 'success', text: 'Authentication successful — redirecting to dashboard…' })
    setRedirecting(true)
    await authApi.completeLoginRedirect()
    login()
    navigate('/home')
  }

  const gate = () => {
    if (!consentAccepted) {
      setAlert({ type: 'error', text: 'Please acknowledge the consent notice first.' })
      return false
    }
    setAlert(null)
    return true
  }

  const handlePiv = async () => {
    if (!gate()) return
    await authApi.pivLogin()
    setAlert({ type: 'success', text: 'Detecting PIV / CAC smart card — please insert your card…' })
  }

  const handleSocialLogin = async (provider: string) => {
    if (!gate()) return
    await authApi.socialLogin(provider)
    setAlert({ type: 'success', text: `Redirecting to ${provider} for authentication…` })
  }

  return (
    <>
      <AuthCard
        lockHeight
        topBanner={<ConsentBanner accepted={consentAccepted} onAccept={handleAcceptConsent} />}
        footer={
          <>
            <Divider>or</Divider>

            {SHOW_PIV && (
              <Button variant="altDark" onClick={handlePiv} disabled={!consentAccepted || submitting || redirecting}>
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="12" cy="11" r="2.5" />
                  <path d="M8 17c0-2.21 1.79-3 4-3s4 .79 4 3" />
                  <line x1="17" y1="7" x2="19" y2="7" />
                  <line x1="17" y1="9.5" x2="19" y2="9.5" />
                </svg>
                Sign In with PIV / CAC Card
              </Button>
            )}

            <div className={styles.altGrid}>
              <Button variant="alt" onClick={() => handleSocialLogin('SSO')} disabled={!consentAccepted || submitting || redirecting}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
                SSO
              </Button>
              <Button variant="alt" onClick={() => setActiveModal('otp')} disabled={!consentAccepted || submitting || redirecting}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber-500)" strokeWidth="2" aria-hidden="true">
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <circle cx="12" cy="15" r="1.5" />
                  <path d="M9 7h6" />
                </svg>
                OTP Code
              </Button>
              <Button variant="alt" onClick={() => setActiveModal('magicLink')} disabled={!consentAccepted || submitting || redirecting}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" aria-hidden="true">
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
                </svg>
                Magic Link
              </Button>
            </div>
          </>
        }
      >
        <h1 className="sr-only">Sign In</h1>

        {alert && <FormAlert type={alert.type}>{alert.text}</FormAlert>}

        <Tabs
          aria-label="Authentication method"
          activeId="signin"
          onSelect={(id) => navigate(id === 'signup' ? '/signup' : '/login')}
          tabs={[
            { id: 'signin', label: 'Sign In' },
            { id: 'signup', label: 'Create Account' },
          ]}
        />

        <Input
          id="loginUser"
          label="Username or Email"
          required
          placeholder="Enter username or email"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          errorMessage={usernameError}
          hint={!usernameError ? 'Demo credentials: demo / Password123!' : undefined}
          disabled={!consentAccepted || submitting || redirecting}
        />
        <PasswordField
          id="loginPass"
          label="Password"
          required
          placeholder="Enter password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={passwordError}
          disabled={!consentAccepted || submitting || redirecting}
        />

        <div className={styles.formRow}>
          <Checkbox label="Remember me" disabled={!consentAccepted || submitting || redirecting} />
          <Link to="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        <Button variant="submit" onClick={handleSignIn} disabled={!consentAccepted || submitting || redirecting}>
          {redirecting ? 'Redirecting…' : submitting ? 'Signing in…' : 'Sign In'}
        </Button>
      </AuthCard>

      {activeModal === 'magicLink' && <MagicLinkModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'otp' && <OtpCodeModal onClose={() => setActiveModal(null)} />}
    </>
  )
}
