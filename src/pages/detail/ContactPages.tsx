import DetailLayout from '../../components/DetailLayout'

/** Source: pageData['contact-general']. */
export function ContactGeneralPage() {
  return (
    <DetailLayout
      parent="Contact"
      current="General Inquiry"
      title="Contact — General Inquiry"
      description="General questions and feedback."
    >
      <h2>General Inquiry</h2>
      <p>For general questions, feedback, partnership inquiries, or media requests:</p>
      <h3>Email</h3>
      <p>
        <a href="#">hello@sap-platform.com</a>
      </p>
      <h3>Phone</h3>
      <p>+1 (800) 555-0199 — Monday to Friday, 8 AM – 6 PM EST</p>
      <h3>Mailing Address</h3>
      <p>
        SAP — Secure Access Platform
        <br />
        1200 Security Blvd, Suite 800
        <br />
        Reston, VA 20190
        <br />
        United States
      </p>
      <h3>Social</h3>
      <ul>
        <li>
          <a href="#">LinkedIn: /company/sap-platform</a>
        </li>
        <li>
          <a href="#">Twitter/X: @sap_platform</a>
        </li>
        <li>
          <a href="#">GitHub: /sap-platform</a>
        </li>
      </ul>
    </DetailLayout>
  )
}

/** Source: pageData['contact-support']. */
export function ContactSupportPage() {
  return (
    <DetailLayout
      parent="Contact"
      current="Technical Support"
      title="Contact — Technical Support"
      description="Get help with technical issues."
    >
      <h2>Technical Support</h2>
      <p>For platform issues, bugs, authentication problems, or integration help:</p>
      <h3>Support Portal</h3>
      <p>
        Submit a ticket through the <a href="#">Help Center</a> for tracked, prioritized support.
      </p>
      <h3>Direct Email</h3>
      <p>
        <a href="#">support@sap-platform.com</a>
      </p>
      <h3>Emergency Hotline</h3>
      <p>
        For P1 critical issues (complete outage, active security breach):
        <br />
        <b>+1 (800) 555-0911</b> — 24/7/365
      </p>
      <h3>Live Chat</h3>
      <p>Available Monday – Friday, 8 AM – 8 PM EST. Click the chat icon in the bottom-right corner of any page (Enterprise plan only).</p>
    </DetailLayout>
  )
}

/** Source: pageData['contact-sales']. */
export function ContactSalesPage() {
  return (
    <DetailLayout
      parent="Contact"
      current="Enterprise Sales"
      title="Contact — Enterprise Sales"
      description="Explore enterprise plans and partnerships."
    >
      <h2>Enterprise Sales</h2>
      <p>Interested in SAP for your organization? Our enterprise plans include:</p>
      <ul>
        <li>Unlimited users with volume pricing</li>
        <li>Dedicated customer success manager</li>
        <li>Custom SSO/SAML integration support</li>
        <li>SLA-backed 99.99% uptime guarantee</li>
        <li>On-premise deployment option</li>
        <li>Priority security incident response</li>
        <li>Custom compliance reporting (SOC 2, HIPAA, FedRAMP)</li>
      </ul>
      <h3>Request a Demo</h3>
      <p>
        Email <a href="#">sales@sap-platform.com</a> or call <b>+1 (800) 555-0199 ext. 2</b>
      </p>
      <p>
        Include your organization name, estimated user count, and any specific compliance requirements. We typically
        respond within 4 business hours.
      </p>
    </DetailLayout>
  )
}
