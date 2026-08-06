import '../styles/legacy-sap.css'
import styles from './LoginPreviewPage.module.css'

/**
 * TEMPORARY visual-only test page — not a real Login feature.
 *
 * Ported from sap-package/app-files/login-portal_v2.html to verify Phase 2's
 * tokens/reset/a11y render correctly against real markup. No form state, no
 * submit handlers, no tab switching — purely static, styled with the full
 * legacy sap.css (not yet split into primitives, per the "don't split CSS
 * until building components" decision).
 *
 * Delete or replace once Phase 6 (real component library) exists — this JSX
 * is not the final Button/Input/AuthLayout structure, just raw markup for
 * a quick style check.
 */
export default function LoginPreviewPage() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="header" role="banner">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M40 4L72 18V40C72 58 58 72 40 76C22 72 8 58 8 40V18Z" fill="url(#sg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
              <path d="M40 10L66 22V40C66 55 54 67 40 70C26 67 14 55 14 40V22Z" fill="url(#si)" opacity="0.3" />
              <ellipse cx="24" cy="24" rx="5" ry="4" fill="#4b5563" opacity="0.8" />
              <ellipse cx="56" cy="24" rx="5" ry="4" fill="#4b5563" opacity="0.8" />
              <path d="M20 30C20 22 28 16 40 16C52 16 60 22 60 30V44C60 52 52 58 40 58C28 58 20 52 20 44Z" fill="#374151" />
              <path d="M40 14C44 14 50 16 54 20L40 28L26 20C30 16 36 14 40 14Z" fill="#e5e7eb" opacity="0.92" />
              <ellipse cx="32" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity="0.9" />
              <ellipse cx="48" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity="0.9" />
              <ellipse cx="32" cy="34" rx="3.5" ry="3.2" fill="#0f2240" />
              <ellipse cx="48" cy="34" rx="3.5" ry="3.2" fill="#0f2240" />
              <circle cx="33" cy="33.5" r="1.8" fill="#3b82f6" opacity="0.9" />
              <circle cx="47" cy="33.5" r="1.8" fill="#3b82f6" opacity="0.9" />
              <ellipse cx="40" cy="42" rx="3.5" ry="2.5" fill="#1f2937" />
              <path d="M36 46Q40 49 44 46" stroke="#1f2937" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
              <text x="40" y="68" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="9" fontWeight="700" fill="#dbeafe" letterSpacing="2.5">
                SAP
              </text>
              <defs>
                <linearGradient id="sg" x1="8" y1="4" x2="72" y2="76" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#1a4080" />
                  <stop offset="1" stopColor="#0f2240" />
                </linearGradient>
                <linearGradient id="si" x1="14" y1="10" x2="66" y2="70" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#1d5cbf" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="header-title">
            <span>SAP</span> — Secure Access Platform
          </div>
        </div>
        <nav className="header-nav" aria-label="Utility navigation">
          <a href="#">Help Center</a>
          <a href="#">Contact</a>
          <a href="#">Status</a>
        </nav>
      </header>

      <main className={styles.authMain} id="main-content">
        <div className="auth-container">
          <div className="consent-banner">
            <div className="consent-icon">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="consent-title">Company Policy &amp; Consent</div>
            <div className="consent-text">
              By continuing, you agree to our company&apos;s acceptable use policy. All activity is monitored and logged
              in accordance with corporate security standards. Unauthorized access is strictly prohibited.
            </div>
            <button className="consent-btn" type="button">
              I Understand &amp; Agree
            </button>
          </div>

          <div className="auth-card">
            <div className="auth-card-inner">
              <h1 className="sr-only">SAP Authentication</h1>
              <div className="auth-tabs" role="tablist" aria-label="Authentication method">
                <button className="auth-tab active" role="tab" aria-selected="true" type="button">
                  Sign In
                </button>
                <button className="auth-tab" role="tab" aria-selected="false" type="button">
                  Create Account
                </button>
              </div>

              <div className="form-section active">
                <div className="form-group">
                  <label className="form-label" htmlFor="loginUser">
                    Username or Email <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    id="loginUser"
                    placeholder="Enter username or email"
                    autoComplete="username"
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="loginPass">
                    Password <span className="required" aria-hidden="true">*</span>
                  </label>
                  <div className="password-wrapper">
                    <input
                      type="password"
                      className="form-input"
                      id="loginPass"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      aria-required="true"
                    />
                    <button type="button" className="password-toggle" aria-label="Show password">
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="form-row">
                  <label className="remember-me">
                    <input type="checkbox" /> Remember me
                  </label>
                  <span className="forgot-link">Forgot password?</span>
                </div>
                <button className="submit-btn" type="button">
                  Sign In
                </button>
                <div className="divider">
                  <span>or</span>
                </div>
                <button className="alt-btn piv-btn" type="button">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <circle cx="12" cy="11" r="2.5" />
                    <path d="M8 17c0-2.21 1.79-3 4-3s4 .79 4 3" />
                    <line x1="17" y1="7" x2="19" y2="7" />
                    <line x1="17" y1="9.5" x2="19" y2="9.5" />
                  </svg>
                  Sign In with PIV / CAC Card
                </button>
                <div className="alt-grid-3">
                  <button className="alt-btn" type="button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-500)" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                    SSO
                  </button>
                  <button className="alt-btn" type="button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber-500)" strokeWidth="2" aria-hidden="true">
                      <rect x="5" y="3" width="14" height="18" rx="2" />
                      <circle cx="12" cy="15" r="1.5" />
                      <path d="M9 7h6" />
                    </svg>
                    OTP Code
                  </button>
                  <button className="alt-btn" type="button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" aria-hidden="true">
                      <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                      <path d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Magic Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
