import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/authApi'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import ConsentBanner from '../components/ConsentBanner'
import Divider from '../components/Divider'
import FormAlert from '../components/FormAlert'
import InfoTip from '../components/InfoTip'
import Input from '../components/Input'
import PasswordField from '../components/PasswordField'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import Tabs from '../components/Tabs'
import { useAuth } from '../context/useAuth'
import { isPasswordValid } from '../utils/passwordRules'
import styles from './SignupPage.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Real signup page — real client-side validation and submission, matching
 * the source's handleSignup() exactly (required fields, email format, the
 * password strength gate, the terms checkbox, the same consent gate and
 * error copy). No real backend/account creation exists, but every action
 * (accepting consent, creating the account, social signup) now goes
 * through src/api/authApi.ts's mocked async calls rather than resolving
 * synchronously in this component.
 *
 * authApi.signup has a real success/failure contract, same idea as
 * LoginPage's: submitting the fixed "already registered" email (see
 * authApi.ts) returns a warning alert instead of succeeding — the only
 * conflict this mock can simulate without a backend to check uniqueness
 * against. Any other email succeeds, shows a success alert, and holds on
 * this page for authApi.completeSignupRedirect's simulated delay before
 * logging in via AuthContext and navigating to the dashboard, so
 * "redirecting…" is visible instead of the page instantly changing.
 *
 * Tab switching IS wired to real navigation (via react-router-dom) — see
 * LoginPage.tsx's comment for why that's not considered "wiring-phase"
 * work.
 *
 * The 4 social sign-up buttons match the source's socialLogin() exactly
 * — same consent gate, same "Redirecting to X for authentication…"
 * success alert. See LoginPage.tsx's comment for why this is as real as
 * that behavior gets without an actual identity provider.
 */
export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [consentAccepted, setConsentAccepted] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const handleAcceptConsent = async () => {
    await authApi.acceptConsent()
    setConsentAccepted(true)
  }

  const handleCreateAccount = async () => {
    setAlert(null)
    setFirstNameError('')
    setLastNameError('')
    setEmailError('')
    setPasswordError('')

    if (!consentAccepted) {
      setAlert({ type: 'error', text: 'Please acknowledge the consent notice first.' })
      return
    }

    let ok = true
    if (!firstName.trim()) {
      setFirstNameError('First name is required')
      ok = false
    }
    if (!lastName.trim()) {
      setLastNameError('Last name is required')
      ok = false
    }
    if (!email.trim() || !EMAIL_RE.test(email)) {
      setEmailError('A valid email address is required')
      ok = false
    }
    if (!password || !isPasswordValid(password)) {
      setPasswordError('Password does not meet all requirements')
      ok = false
    }
    if (!ok) {
      setAlert({ type: 'error', text: 'Please correct the highlighted fields.' })
      return
    }
    if (!termsAccepted) {
      setAlert({ type: 'error', text: 'You must agree to the Terms of Service.' })
      return
    }

    setSubmitting(true)
    const result = await authApi.signup({ firstName, lastName, email, phone, password })
    setSubmitting(false)

    if (result.status === 'exists') {
      setAlert({ type: 'warning', text: 'This email is already registered. Please sign in or use a different email address.' })
      return
    }

    setAlert({ type: 'success', text: 'Account created successfully — redirecting to dashboard…' })
    setRedirecting(true)
    await authApi.completeSignupRedirect()
    login()
    navigate('/home')
  }

  const handleSocialLogin = async (provider: string) => {
    if (!consentAccepted) {
      setAlert({ type: 'error', text: 'Please acknowledge the consent notice first.' })
      return
    }
    await authApi.socialLogin(provider)
    setAlert({ type: 'success', text: `Redirecting to ${provider} for authentication…` })
  }

  return (
    <AuthCard lockHeight topBanner={<ConsentBanner accepted={consentAccepted} onAccept={handleAcceptConsent} />}>
      <h1 className="sr-only">Create Account</h1>

      {alert && <FormAlert type={alert.type}>{alert.text}</FormAlert>}

      <Tabs
        aria-label="Authentication method"
        activeId="signup"
        onSelect={(id) => navigate(id === 'signup' ? '/signup' : '/login')}
        tabs={[
          { id: 'signin', label: 'Sign In' },
          { id: 'signup', label: 'Create Account' },
        ]}
      />

      <div className={styles.nameRow}>
        <Input
          id="signupFirst"
          label="First Name"
          required
          placeholder="Jane"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          errorMessage={firstNameError}
          disabled={!consentAccepted || submitting || redirecting}
        />
        <Input
          id="signupLast"
          label="Last Name"
          required
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          errorMessage={lastNameError}
          disabled={!consentAccepted || submitting || redirecting}
        />
      </div>

      <Input
        id="signupEmail"
        label="Work Email"
        required
        type="email"
        placeholder="jane.doe@company.com"
        labelExtra={<InfoTip text="Use your company-issued email" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        errorMessage={emailError}
        hint={!emailError ? 'Try jane.doe@sap.gov to see the "already registered" state' : undefined}
        disabled={!consentAccepted || submitting || redirecting}
      />

      <Input
        id="signupPhone"
        label="Phone Number"
        type="tel"
        placeholder="(202) 555-0100"
        labelExtra={<InfoTip text="For multi-factor authentication" />}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={!consentAccepted || submitting || redirecting}
      />

      <div>
        <PasswordField
          id="signupPass"
          label="Create Password"
          required
          placeholder="Min 12 characters"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={passwordError}
          disabled={!consentAccepted || submitting || redirecting}
        />
        <PasswordStrengthMeter value={password} />
      </div>

      <Checkbox
        align="start"
        className={styles.terms}
        checked={termsAccepted}
        onChange={(e) => setTermsAccepted(e.target.checked)}
        disabled={!consentAccepted || submitting || redirecting}
        label={
          <>
            I agree to the <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a>, and the <a href="#">Acceptable Use Policy</a>.
          </>
        }
      />

      <Button variant="submit" onClick={handleCreateAccount} disabled={!consentAccepted || submitting || redirecting}>
        {redirecting ? 'Redirecting…' : submitting ? 'Creating account…' : 'Create Account'}
      </Button>

      <Divider>or sign up with</Divider>

      <div className={styles.socialGrid}>
        <Button variant="alt" onClick={() => handleSocialLogin('Google')} disabled={!consentAccepted || submitting || redirecting}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button variant="alt" onClick={() => handleSocialLogin('Microsoft')} disabled={!consentAccepted || submitting || redirecting}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <rect x="1" y="1" width="10" height="10" fill="#F25022" />
            <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
            <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
            <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
          </svg>
          Microsoft
        </Button>
      </div>
      <div className={styles.socialGrid}>
        <Button variant="alt" onClick={() => handleSocialLogin('Apple')} disabled={!consentAccepted || submitting || redirecting}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Apple
        </Button>
        <Button variant="alt" onClick={() => handleSocialLogin('Passkey')} disabled={!consentAccepted || submitting || redirecting}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 7a4 4 0 11-8 0 4 4 0 018 0z" />
            <path d="M19 21v-2a4 4 0 00-3-3.87M15 14.5l3 3 3-3M18 17.5V22" />
          </svg>
          Passkey
        </Button>
      </div>
    </AuthCard>
  )
}
