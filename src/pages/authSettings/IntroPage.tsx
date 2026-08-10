import PageHeader from '../../components/PageHeader'

/**
 * "Why Security Matters" intro section — the only auth-settings page
 * without a toggle list. Uses the global .card/.threat-grid/.threat-card/
 * .alert-banner classes from legacy-sap.css directly (confirmed matching
 * exactly between this source page's own embedded styles and the merged
 * version before using them, per the AuthHeader divergence lesson) rather
 * than building new scoped primitives for this one-off page.
 */
export default function IntroPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader
        title="Authentication & Authorization"
        description="Why secure identity matters, what can go wrong, and the full arsenal of methods available to protect your organization. Toggle each method on or off per your security policy."
      />

      <div className="card">
        <h2>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
          Why Security Is Non-Negotiable
        </h2>
        <p>
          Authentication is the first and most critical defense line of any system. When authentication fails,
          everything behind it is exposed — data, systems, users, and reputation. The cost of a breach is not just
          financial; it&apos;s operational, legal, and reputational.
        </p>
        <p style={{ marginTop: 10 }}>
          SAP enforces multi-layered authentication because a single method is never enough. Passwords get phished.
          SMS gets intercepted. Devices get stolen. Only defense-in-depth — combining something you <b>know</b>,
          something you <b>have</b>, and something you <b>are</b> — creates real security.
        </p>
      </div>

      <div className="card">
        <h2 style={{ color: 'var(--red-500)' }}>
          <svg fill="none" stroke="var(--red-500)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
          Worst-Case Scenarios &amp; Real-World Threats
        </h2>
        <div className="threat-grid">
          <div className="threat-card red">
            <h4>Credential Stuffing</h4>
            <p>Attackers use leaked password databases to try username/password combos across services. 65% of people reuse passwords.</p>
          </div>
          <div className="threat-card red">
            <h4>Phishing Attacks</h4>
            <p>Fake login pages capture credentials in real time. Even OTPs can be intercepted by sophisticated phishing kits (Evilginx).</p>
          </div>
          <div className="threat-card amber">
            <h4>SIM Swapping</h4>
            <p>Attackers convince carriers to transfer your phone number to their SIM, intercepting all SMS-based OTP codes.</p>
          </div>
          <div className="threat-card amber">
            <h4>Session Hijacking</h4>
            <p>Stolen session tokens let attackers bypass authentication entirely. They don&apos;t need your password if they have your cookie.</p>
          </div>
          <div className="threat-card orange">
            <h4>Man-in-the-Middle</h4>
            <p>Attackers intercept communication between user and server, capturing tokens, passwords, and session data in transit.</p>
          </div>
          <div className="threat-card orange">
            <h4>Brute Force / Spraying</h4>
            <p>Automated tools try thousands of common passwords against many accounts. Even one weak password compromises the org.</p>
          </div>
          <div className="threat-card purple">
            <h4>Insider Threats</h4>
            <p>Employees with excessive privileges access data they shouldn&apos;t. Without proper authorization, roles become attack vectors.</p>
          </div>
          <div className="threat-card purple">
            <h4>Stolen Device</h4>
            <p>A lost laptop or phone with saved sessions grants immediate access to all authenticated services without re-verification.</p>
          </div>
        </div>
      </div>

      <div className="alert-banner info" role="note">
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <h4>First-Time Users</h4>
          <p>
            On first login, SAP requires you to change your temporary password and enroll in at least one MFA method.
            Admins can enforce additional methods via this settings page.
          </p>
        </div>
      </div>
    </div>
  )
}
