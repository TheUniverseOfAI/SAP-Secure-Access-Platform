import AuthCard from '../components/AuthCard'
import Button from '../components/Button'
import Input from '../components/Input'
import WizardHeader from '../components/WizardHeader'
import WizardProgress from '../components/WizardProgress'

/**
 * Real forgot-password page UI — static/placeholder per the UI-first build
 * order: no form state, no submit handler, no step navigation.
 *
 * Adapts login-portal_v2.html's "Reset Your Password" MODAL wizard into a
 * full page. The approved routing plan treats /forgot-password as its own
 * AuthLayout page (not a modal triggered from LoginPage), so this is a
 * routing-architecture adaptation, not a visual liberty — the modal's own
 * content (gradient header, wizard progress dots, step content) is ported
 * directly, just placed in a full page instead of an overlay.
 *
 * Only Step 1 (email entry) is built. Steps 2-5 (choose verification
 * method, enter OTP/security answers, set new password, success) all
 * require real step-navigation state to be meaningful — advancing through
 * them isn't just more static markup, it's exactly the kind of behavior
 * the UI-first rule defers to the later wiring phase. Building fake
 * "step 2 screenshot" markup that can never actually be reached would be
 * more confusing than useful, so this stops at the first real screen.
 */
export default function ForgotPasswordPage() {
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
      <WizardProgress step={1} total={4} />

      <Input id="fpEmail" label="Account Email" required type="email" placeholder="jane.doe@company.com" />

      <Button variant="submit">Continue</Button>
    </AuthCard>
  )
}
