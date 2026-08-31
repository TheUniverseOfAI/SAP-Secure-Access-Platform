import AlertBanner from '../../components/AlertBanner'
import Card from '../../components/Card'
import PageHeader from '../../components/PageHeader'
import { ThreatCard, ThreatGrid } from '../../components/ThreatCard'

const WarningIcon = (
  <svg fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
  </svg>
)

/**
 * "Why Security Matters" intro section — the only auth-settings page
 * without a toggle list. Built entirely from reusable components (Card,
 * AlertBanner, ThreatCard/ThreatGrid) instead of the raw global
 * .card/.threat-grid/.threat-card/.alert-banner classes this page used
 * previously — those global values were confirmed to match this source
 * page's own embedded styles exactly, so the componentized versions carry
 * identical CSS, just scoped and reusable now.
 */
export default function IntroPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader
        title="Authentication & Authorization"
        description="Why secure identity matters, what can go wrong, and the full arsenal of methods available to protect your organization. Toggle each method on or off per your security policy."
      />

      <Card icon={WarningIcon} title="Why Security Is Non-Negotiable">
        <p>
          Authentication is the first and most critical defense line of any system. When authentication fails, everything behind it is
          exposed — data, systems, users, and reputation. The cost of a breach is not just financial; it&apos;s operational, legal, and
          reputational.
        </p>
        <p style={{ marginTop: 10 }}>
          SAP enforces multi-layered authentication because a single method is never enough. Passwords get phished. SMS gets intercepted.
          Devices get stolen. Only defense-in-depth — combining something you <b>know</b>, something you <b>have</b>, and something you{' '}
          <b>are</b> — creates real security.
        </p>
      </Card>

      <Card>
        <h2 style={{ color: 'var(--red-500)' }}>
          <svg fill="none" stroke="var(--red-500)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
          Worst-Case Scenarios &amp; Real-World Threats
        </h2>
        <ThreatGrid>
          <ThreatCard color="red" title="Credential Stuffing">
            Attackers use leaked password databases to try username/password combos across services. 65% of people reuse passwords.
          </ThreatCard>
          <ThreatCard color="red" title="Phishing Attacks">
            Fake login pages capture credentials in real time. Even OTPs can be intercepted by sophisticated phishing kits (Evilginx).
          </ThreatCard>
          <ThreatCard color="amber" title="SIM Swapping">
            Attackers convince carriers to transfer your phone number to their SIM, intercepting all SMS-based OTP codes.
          </ThreatCard>
          <ThreatCard color="amber" title="Session Hijacking">
            Stolen session tokens let attackers bypass authentication entirely. They don&apos;t need your password if they have your cookie.
          </ThreatCard>
          <ThreatCard color="orange" title="Man-in-the-Middle">
            Attackers intercept communication between user and server, capturing tokens, passwords, and session data in transit.
          </ThreatCard>
          <ThreatCard color="orange" title="Brute Force / Spraying">
            Automated tools try thousands of common passwords against many accounts. Even one weak password compromises the org.
          </ThreatCard>
          <ThreatCard color="purple" title="Insider Threats">
            Employees with excessive privileges access data they shouldn&apos;t. Without proper authorization, roles become attack vectors.
          </ThreatCard>
          <ThreatCard color="purple" title="Stolen Device">
            A lost laptop or phone with saved sessions grants immediate access to all authenticated services without re-verification.
          </ThreatCard>
        </ThreatGrid>
      </Card>

      <AlertBanner
        variant="info"
        title="First-Time Users"
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      >
        On first login, SAP requires you to change your temporary password and enroll in at least one MFA method. Admins can enforce
        additional methods via this settings page.
      </AlertBanner>
    </div>
  )
}
