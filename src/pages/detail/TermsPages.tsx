import DetailLayout from '../../components/DetailLayout'

/** Source: pageData['terms-agreement']. */
export function TermsAgreementPage() {
  return (
    <DetailLayout
      parent="Terms of Use"
      current="Agreement"
      title="Terms of Use — Agreement"
      description="The governing agreement for platform usage."
      updated="Effective: January 1, 2026"
    >
      <h2>Terms of Service Agreement</h2>
      <p>
        By accessing or using the Secure Access Platform (&quot;SAP&quot;), you agree to be bound by these Terms of
        Use. If you do not agree, you must not use the platform.
      </p>
      <h3>Account Responsibility</h3>
      <p>
        You are responsible for maintaining the confidentiality of your credentials and for all activities that occur
        under your account. You must immediately notify the administrator of any unauthorized use.
      </p>
      <h3>Service Availability</h3>
      <p>
        We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance windows are
        communicated at least 72 hours in advance.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['terms-usage']. */
export function TermsUsagePage() {
  return (
    <DetailLayout
      parent="Terms of Use"
      current="Acceptable Use"
      title="Terms of Use — Acceptable Use"
      description="Rules for acceptable platform usage."
      updated="Effective: January 1, 2026"
    >
      <h2>Acceptable Use Policy</h2>
      <p>You agree to use SAP only for lawful purposes and in accordance with your organization&apos;s policies.</p>
      <h3>Prohibited Activities</h3>
      <ul>
        <li>Attempting to gain unauthorized access to systems, accounts, or data.</li>
        <li>Using the platform to transmit malware, viruses, or harmful code.</li>
        <li>Sharing authentication credentials with unauthorized individuals.</li>
        <li>Circumventing or disabling security features, including MFA.</li>
        <li>Using automated tools to scrape, crawl, or overload the platform.</li>
        <li>Engaging in any activity that violates applicable laws or regulations.</li>
      </ul>
    </DetailLayout>
  )
}

/** Source: pageData['terms-limits']. */
export function TermsLimitsPage() {
  return (
    <DetailLayout
      parent="Terms of Use"
      current="Limitations"
      title="Terms of Use — Limitations"
      description="Liability limitations and disclaimers."
      updated="Effective: January 1, 2026"
    >
      <h2>Limitations &amp; Disclaimers</h2>
      <h3>Limitation of Liability</h3>
      <p>
        To the maximum extent permitted by law, SAP and its operators shall not be liable for any indirect, incidental,
        special, consequential, or punitive damages arising from your use of the platform.
      </p>
      <h3>Warranty Disclaimer</h3>
      <p>
        The platform is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either
        express or implied, including implied warranties of merchantability and fitness for a particular purpose.
      </p>
      <h3>Modifications</h3>
      <p>
        We reserve the right to modify these terms at any time. Material changes will be communicated via email and
        in-platform notification at least 30 days before they take effect.
      </p>
    </DetailLayout>
  )
}
