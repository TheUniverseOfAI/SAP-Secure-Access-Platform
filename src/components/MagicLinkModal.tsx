import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'

/**
 * Source: #magicModal in login-portal_v2.html. Step 1 collects an email,
 * step 2 shows the "check your inbox" confirmation. Local step state only
 * (structural) — no email is actually sent, no code is verified.
 */
export default function MagicLinkModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')

  return (
    <Modal
      titleId="magicModalTitle"
      title="Sign In with Magic Link"
      subtitle="No password needed — we'll email you a secure, one-time sign-in link that expires in 15 minutes."
      icon={
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
          <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
        </svg>
      }
      onClose={onClose}
    >
      {step === 1 && (
        <>
          <Input
            id="magicEmail"
            label="Your Email Address"
            required
            type="email"
            placeholder="jane.doe@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="submit" onClick={() => setStep(2)}>
            Send Magic Link
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="success-visual">
            <div className="icon-ring blue">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <h4>Check Your Inbox</h4>
            <p>
              We&apos;ve sent a secure sign-in link to
              <br />
              <span className="email-highlight">{email || '—'}</span>
            </p>
            <p style={{ marginTop: 10, fontSize: '0.76rem', color: 'var(--gray-400)' }}>
              The link expires in 15 minutes. Check spam if needed.
            </p>
          </div>
          <div className="resend-row">
            Didn&apos;t get it? <a href="#">Resend link</a>
          </div>
        </>
      )}
    </Modal>
  )
}
