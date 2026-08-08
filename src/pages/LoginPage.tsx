import Button from '../components/Button'
import Input from '../components/Input'

/**
 * Real login page UI — static/placeholder per the UI-first build order (no
 * form state, no submit handler, no validation wiring). Uses the real Button
 * and Input primitives. Still missing pieces from the full source design
 * (consent banner, auth tabs, remember-me/forgot-password row, social/PIV
 * sign-in options) — deliberately scoped to just the core form for this
 * round; those get added in later rounds as their own primitives/composed
 * components (Checkbox, Tabs, Card) are built.
 *
 * Card shell still uses .auth-container/.auth-card/.auth-card-inner from
 * src/styles/legacy-sap.css, since Card isn't extracted as a primitive yet.
 */
export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <h1 className="sr-only">Sign In</h1>
          <Input id="loginUser" label="Username or Email" required placeholder="Enter username or email" autoComplete="username" />
          <Input id="loginPass" label="Password" required type="password" placeholder="Enter password" autoComplete="current-password" />
          <Button variant="submit">Sign In</Button>
        </div>
      </div>
    </div>
  )
}
