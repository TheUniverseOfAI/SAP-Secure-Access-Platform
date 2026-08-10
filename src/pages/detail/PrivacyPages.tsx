import DetailLayout from '../../components/DetailLayout'

/** Source: sap-portal_v2.html's pageData['privacy-overview']. */
export function PrivacyOverviewPage() {
  return (
    <DetailLayout
      parent="Privacy Policy"
      current="Overview"
      title="Privacy Policy — Overview"
      description="Summary of our privacy practices."
      updated="Last updated: April 10, 2026"
    >
      <h2>Overview</h2>
      <p>
        SAP is committed to protecting the privacy and security of your personal information. This Privacy Policy
        explains what data we collect, how we use it, and your rights regarding your data.
      </p>
      <h3>Scope</h3>
      <p>
        This policy applies to all users of the SAP platform, including employees, contractors, and authorized third
        parties accessing company systems through our secure access gateway.
      </p>
      <h3>Key Principles</h3>
      <ul>
        <li>We collect only the minimum data necessary to provide our services.</li>
        <li>We never sell your personal information to third parties.</li>
        <li>All data is encrypted at rest and in transit using AES-256 and TLS 1.3.</li>
        <li>You have the right to access, correct, and delete your personal data at any time.</li>
      </ul>
    </DetailLayout>
  )
}

/** Source: pageData['privacy-collection']. */
export function PrivacyCollectionPage() {
  return (
    <DetailLayout
      parent="Privacy Policy"
      current="Data Collection"
      title="Privacy Policy — Data Collection"
      description="What information we collect and why."
      updated="Last updated: April 10, 2026"
    >
      <h2>Data Collection</h2>
      <h3>Information You Provide</h3>
      <ul>
        <li>
          <b>Account Information:</b> Name, email address, phone number, job title, and department.
        </li>
        <li>
          <b>Authentication Data:</b> Passwords (hashed), MFA tokens, PIV/CAC card identifiers, biometric templates.
        </li>
        <li>
          <b>Support Requests:</b> Any information you voluntarily share when contacting support.
        </li>
      </ul>
      <h3>Information Collected Automatically</h3>
      <ul>
        <li>
          <b>Access Logs:</b> IP address, browser type, device fingerprint, login timestamps, and session duration.
        </li>
        <li>
          <b>Usage Analytics:</b> Pages visited, features used, and navigation patterns (anonymized).
        </li>
        <li>
          <b>Security Events:</b> Failed login attempts, permission escalation requests, and anomaly detections.
        </li>
      </ul>
      <h3>Legal Basis</h3>
      <p>
        We process personal data under the following legal bases: contractual necessity (providing the service),
        legitimate interest (security monitoring), and consent (optional analytics).
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['privacy-sharing']. */
export function PrivacySharingPage() {
  return (
    <DetailLayout
      parent="Privacy Policy"
      current="Data Sharing"
      title="Privacy Policy — Data Sharing"
      description="When and with whom we share your data."
      updated="Last updated: April 10, 2026"
    >
      <h2>Data Sharing &amp; Third Parties</h2>
      <p>SAP does not sell, rent, or trade your personal information. We share data only in the following circumstances:</p>
      <h3>Service Providers</h3>
      <p>
        We work with carefully vetted third-party providers for infrastructure hosting (AWS GovCloud), email delivery
        (SendGrid), and monitoring (Datadog). All providers are bound by data processing agreements.
      </p>
      <h3>Legal Requirements</h3>
      <p>
        We may disclose data when required by law, court order, or regulatory investigation. We will notify you unless
        legally prohibited from doing so.
      </p>
      <h3>Business Transfers</h3>
      <p>
        In the event of a merger, acquisition, or sale of assets, your data may be transferred. We will provide 30 days
        notice before any such transfer.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['privacy-rights']. */
export function PrivacyRightsPage() {
  return (
    <DetailLayout
      parent="Privacy Policy"
      current="Your Rights"
      title="Privacy Policy — Your Rights"
      description="Your data rights and how to exercise them."
      updated="Last updated: April 10, 2026"
    >
      <h2>Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights:</p>
      <ul>
        <li>
          <b>Right to Access:</b> Request a copy of all personal data we hold about you.
        </li>
        <li>
          <b>Right to Rectification:</b> Correct inaccurate or incomplete data.
        </li>
        <li>
          <b>Right to Erasure:</b> Request deletion of your data (subject to legal retention requirements).
        </li>
        <li>
          <b>Right to Portability:</b> Receive your data in a machine-readable format.
        </li>
        <li>
          <b>Right to Object:</b> Opt out of certain data processing activities.
        </li>
        <li>
          <b>Right to Restrict:</b> Limit how we process your data while a dispute is resolved.
        </li>
      </ul>
      <h3>How to Exercise Your Rights</h3>
      <p>
        Submit a request through your Account Settings or email <a href="#">privacy@sap-platform.com</a>. We respond to
        all requests within 30 calendar days.
      </p>
    </DetailLayout>
  )
}
