import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import ButtonRow from '../components/ButtonRow'
import Input from '../components/Input'
import OtpInputGroup from '../components/OtpInputGroup'
import PasswordField from '../components/PasswordField'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'
import ResendRow from '../components/ResendRow'
import SuccessVisual from '../components/SuccessVisual'
import VerifyCard from '../components/VerifyCard'
import WizardHeader from '../components/WizardHeader'
import WizardProgress from '../components/WizardProgress'

type VerifyMethod = 'emailOtp' | 'smsOtp' | 'totp' | 'questions'

/**
 * Real forgot-password page UI. Adapts login-portal_v2.html's "Reset Your
 * Password" MODAL wizard into a full page — the approved routing plan
 * treats /forgot-password as its own AuthLayout page, not a modal
 * triggered from LoginPage, so this is a routing-architecture adaptation,
 * not a visual liberty.
 *
 * Step-to-step navigation uses local `useState` (which step is showing,
 * which verification method was picked) — this is the same category as
 * the react-router navigation wired into LoginPage/SignupPage's tabs:
 * just "show the next screen," not business logic. There is NO real
 * validation, no code is actually verified, no password is actually
 * reset, no email/SMS is actually sent — "Continue" always advances
 * regardless of input. That part is explicit wiring-phase work.
 */
export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [method, setMethod] = useState<VerifyMethod | null>(null)

  return (
    <AuthCard
      topBanner={
        <WizardHeader
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          }
          title="Reset Your Password"
          subtitle="Multi-step identity verification to securely reset your password. We recommend Authenticator App for the strongest protection."
        />
      }
    >
      {step <= 4 && <WizardProgress step={step} total={4} />}

      {step === 1 && (
        <>
          <Input id="fpEmail" label="Account Email" required type="email" placeholder="jane.doe@company.com" />
          <Button variant="submit" onClick={() => setStep(2)}>
            Continue
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-700)', marginBottom: '12px' }}>
            Choose a verification method:
          </p>
          <div role="radiogroup" aria-label="Verification method">
            <VerifyCard
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75" />
                </svg>
              }
              iconVariant="email"
              title="Email OTP"
              description="6-digit code sent to your email"
              selected={method === 'emailOtp'}
              onSelect={() => setMethod('emailOtp')}
            />
            <VerifyCard
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              }
              iconVariant="sms"
              title="SMS OTP"
              description="6-digit code sent to •••••0100"
              selected={method === 'smsOtp'}
              onSelect={() => setMethod('smsOtp')}
            />
            <VerifyCard
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              iconVariant="totp"
              title="Authenticator App"
              description="Code from Google/Microsoft Authenticator"
              selected={method === 'totp'}
              onSelect={() => setMethod('totp')}
              recommended
            />
            <VerifyCard
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M12 18h.01" />
                </svg>
              }
              iconVariant="questions"
              title="Security Questions"
              description="Answer 2 of your preset questions"
              selected={method === 'questions'}
              onSelect={() => setMethod('questions')}
            />
          </div>
          <ButtonRow>
            <Button variant="submitSecondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="submit" disabled={!method} onClick={() => setStep(3)}>
              Continue
            </Button>
          </ButtonRow>
        </>
      )}

      {step === 3 && (method === 'emailOtp' || method === 'smsOtp' || method === 'totp') && (
        <>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: '16px' }}>
            {method === 'emailOtp' && 'Enter the 6-digit code sent to your email'}
            {method === 'smsOtp' && 'Enter the 6-digit code sent to your phone ending in •••0100'}
            {method === 'totp' && 'Enter the 6-digit code from your authenticator app'}
          </p>
          <OtpInputGroup label="6-digit verification code" />
          {method !== 'totp' && (
            <ResendRow>
              Didn&apos;t get it? <a href="#">Resend</a>
            </ResendRow>
          )}
          <ButtonRow>
            <Button variant="submitSecondary" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="submit" onClick={() => setStep(4)}>
              Verify
            </Button>
          </ButtonRow>
        </>
      )}

      {step === 3 && method === 'questions' && (
        <>
          <Input id="sq1" label="What city were you born in?" placeholder="Your answer" />
          <Input id="sq2" label="What was the name of your first pet?" placeholder="Your answer" />
          <ButtonRow>
            <Button variant="submitSecondary" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button variant="submit" onClick={() => setStep(4)}>
              Verify
            </Button>
          </ButtonRow>
        </>
      )}

      {step === 4 && (
        <>
          <div>
            <PasswordField id="fpNewPass" label="New Password" required placeholder="Min 12 characters" />
            <PasswordStrengthMeter variant="forgot" />
          </div>
          <PasswordField id="fpConfirmPass" label="Confirm Password" required placeholder="Re-enter new password" />
          <Button variant="submit" onClick={() => setStep(5)}>
            Reset Password
          </Button>
        </>
      )}

      {step === 5 && (
        <SuccessVisual
          variant="green"
          heading="Password Reset Successfully"
          icon={
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
            </svg>
          }
        >
          <p>Your password has been updated. You can now sign in with your new credentials.</p>
          <Button variant="submit" style={{ marginTop: 16 }} onClick={() => navigate('/login')}>
            Back to Sign In
          </Button>
        </SuccessVisual>
      )}

      {step < 5 && (
        <ResendRow>
          <Link to="/login">Back to Sign In</Link>
        </ResendRow>
      )}
    </AuthCard>
  )
}
