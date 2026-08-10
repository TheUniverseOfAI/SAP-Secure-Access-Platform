import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'
import OtpInputGroup from './OtpInputGroup'

/**
 * Source: #otpModal in login-portal_v2.html. Step 1 collects an email,
 * step 2 collects the 6-digit code, step 3 shows a verified/redirecting
 * confirmation. Local step state only (structural) — no code is actually
 * sent or verified.
 */
export default function OtpCodeModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [email, setEmail] = useState('')

  return (
    <Modal
      titleId="otpModalTitle"
      title="One-Time Passcode"
      subtitle="Enter your email to receive a 6-digit verification code. The code expires in 5 minutes."
      icon={
        <svg fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="15" r="1.5" />
          <path d="M9 7h6" />
        </svg>
      }
      iconStyle={{ background: 'rgba(245,158,11,0.15)', borderColor: 'rgba(245,158,11,0.2)' }}
      onClose={onClose}
    >
      {step === 1 && (
        <>
          <Input
            id="otpEmail"
            label="Email Address"
            required
            type="email"
            placeholder="jane.doe@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="submit" onClick={() => setStep(2)}>
            Send Code
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--gray-600)', marginBottom: 4 }}>
            Enter the 6-digit code sent to
          </p>
          <p style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 700, color: 'var(--blue-600)', marginBottom: 6 }}>
            {email || '—'}
          </p>
          <OtpInputGroup label="6-digit verification code" />
          <Button variant="submit" style={{ marginTop: 10 }} onClick={() => setStep(3)}>
            Verify &amp; Sign In
          </Button>
          <div className="resend-row">
            Didn&apos;t receive it? <a href="#">Resend code</a>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="success-visual">
          <div className="icon-ring green">
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
            </svg>
          </div>
          <h4>Verified Successfully</h4>
          <p>Redirecting you to the dashboard…</p>
        </div>
      )}
    </Modal>
  )
}
