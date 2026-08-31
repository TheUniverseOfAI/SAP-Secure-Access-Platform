import DetailLayout from '../../components/DetailLayout'

/** Source: pageData['sec-overview']. */
export function SecurityOverviewPage() {
  return (
    <DetailLayout parent="Security" current="Overview" title="Security — Overview" description="How SAP protects your data.">
      <h2>Security Overview</h2>
      <p>
        Security is the foundation of SAP. Every layer of the platform — from network infrastructure to application code — is designed with
        defense in depth.
      </p>
      <h3>Encryption</h3>
      <p>
        All data is encrypted at rest using AES-256 and in transit using TLS 1.3. Database connections use mutual TLS authentication.
        Encryption keys are managed through AWS KMS with automatic rotation every 90 days.
      </p>
      <h3>Authentication</h3>
      <p>
        SAP supports multi-factor authentication (TOTP, SMS, PIV/CAC), SAML 2.0 SSO, OAuth 2.0 with PKCE, magic link email, and
        FIDO2/WebAuthn passkeys.
      </p>
      <h3>Infrastructure</h3>
      <p>Hosted on AWS GovCloud with isolated VPCs, network segmentation, WAF, and DDoS protection via AWS Shield Advanced.</p>
    </DetailLayout>
  )
}

/** Source: pageData['sec-compliance']. */
export function SecurityCompliancePage() {
  return (
    <DetailLayout
      parent="Security"
      current="Compliance"
      title="Security — Compliance"
      description="Certifications and regulatory compliance."
    >
      <h2>Compliance &amp; Certifications</h2>
      <ul>
        <li>
          <b>SOC 2 Type II</b> — Independently audited annually. Current report valid through March 2027.
        </li>
        <li>
          <b>ISO 27001:2022</b> — Certified information security management system.
        </li>
        <li>
          <b>FedRAMP Moderate</b> — Authorization in progress (expected Q3 2026).
        </li>
        <li>
          <b>GDPR</b> — Full compliance with EU data protection regulations, including DPAs for all sub-processors.
        </li>
        <li>
          <b>CCPA/CPRA</b> — California Consumer Privacy Act compliance for US users.
        </li>
        <li>
          <b>HIPAA</b> — BAA available for healthcare customers upon request.
        </li>
      </ul>
      <h3>Audit Reports</h3>
      <p>
        SOC 2 and ISO 27001 audit reports are available to enterprise customers under NDA. Contact your account manager or email{' '}
        <a href="#">compliance@sap-platform.com</a>.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['sec-vuln']. */
export function SecurityVulnPage() {
  return (
    <DetailLayout
      parent="Security"
      current="Vulnerability Program"
      title="Security — Vulnerability Program"
      description="How to report security vulnerabilities."
    >
      <h2>Vulnerability Disclosure Program</h2>
      <p>We take the security of SAP seriously and welcome responsible disclosure from the security research community.</p>
      <h3>Scope</h3>
      <ul>
        <li>Authentication and authorization bypass</li>
        <li>Cross-site scripting (XSS) and injection flaws</li>
        <li>Server-side request forgery (SSRF)</li>
        <li>Privilege escalation</li>
        <li>Data exposure through API endpoints</li>
      </ul>
      <h3>Rewards</h3>
      <p>
        We offer bounties ranging from $250 to $10,000 depending on severity (CVSS 3.1 scoring). Critical vulnerabilities (CVSS 9.0+)
        receive expedited review within 24 hours.
      </p>
      <h3>Reporting</h3>
      <p>
        Submit findings to <a href="#">security@sap-platform.com</a> with PGP encryption (key available on our security page). Include proof
        of concept and impact assessment.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['sec-incident']. */
export function SecurityIncidentPage() {
  return (
    <DetailLayout
      parent="Security"
      current="Incident Response"
      title="Security — Incident Response"
      description="Our incident response procedures."
    >
      <h2>Incident Response</h2>
      <h3>Response Framework</h3>
      <p>
        SAP follows the NIST Computer Security Incident Handling Guide (SP 800-61r2) with four phases: Preparation, Detection &amp;
        Analysis, Containment/Eradication/Recovery, and Post-Incident Activity.
      </p>
      <h3>Response Times</h3>
      <ul>
        <li>
          <b>Critical (P1):</b> Response within 15 minutes, resolution target 4 hours.
        </li>
        <li>
          <b>High (P2):</b> Response within 1 hour, resolution target 24 hours.
        </li>
        <li>
          <b>Medium (P3):</b> Response within 4 hours, resolution target 72 hours.
        </li>
        <li>
          <b>Low (P4):</b> Response within 24 hours, resolution target 10 business days.
        </li>
      </ul>
      <h3>Notification</h3>
      <p>
        Customers are notified of security incidents affecting their data within 72 hours of confirmed impact, in compliance with GDPR
        Article 33 and applicable breach notification laws.
      </p>
    </DetailLayout>
  )
}
