import DetailLayout from '../../components/DetailLayout'

/** Source: pageData['help-faq']. */
export function HelpFaqPage() {
  return (
    <DetailLayout parent="Help Center" current="FAQ" title="Help Center — FAQ" description="Frequently asked questions about SAP.">
      <h2>Frequently Asked Questions</h2>
      <h3>How do I reset my password?</h3>
      <p>
        Click &quot;Forgot password?&quot; on the login page. You&apos;ll be guided through identity verification via
        email OTP, SMS OTP, authenticator app, or security questions, then prompted to create a new password meeting
        our complexity requirements.
      </p>
      <h3>What MFA methods are supported?</h3>
      <p>
        SAP supports TOTP authenticator apps (Google Authenticator, Microsoft Authenticator), SMS one-time codes,
        email OTP, FIDO2/WebAuthn passkeys, and PIV/CAC smart cards.
      </p>
      <h3>How do I enable SSO for my organization?</h3>
      <p>
        Contact your account administrator or email <a href="#">support@sap-platform.com</a> to configure SAML 2.0 or
        OAuth 2.0 PKCE integration with your identity provider (Okta, Azure AD, Ping Identity, etc.).
      </p>
      <h3>Can I export my data?</h3>
      <p>
        Yes. Navigate to Privacy Policy → Your Rights, or submit a data portability request from Account Settings.
        Data is exported in JSON format within 5 business days.
      </p>
      <h3>What browsers are supported?</h3>
      <p>SAP supports the latest two versions of Chrome, Firefox, Safari, and Edge. Internet Explorer is not supported.</p>
    </DetailLayout>
  )
}

/** Source: pageData['help-kb']. */
export function HelpKbPage() {
  return (
    <DetailLayout
      parent="Help Center"
      current="Knowledge Base"
      title="Help Center — Knowledge Base"
      description="In-depth articles and documentation."
    >
      <h2>Knowledge Base</h2>
      <h3>Getting Started</h3>
      <ul>
        <li>
          <a href="#">First-time login and account setup</a>
        </li>
        <li>
          <a href="#">Configuring multi-factor authentication</a>
        </li>
        <li>
          <a href="#">Understanding your access dashboard</a>
        </li>
        <li>
          <a href="#">Setting up PIV/CAC card authentication</a>
        </li>
      </ul>
      <h3>Administration</h3>
      <ul>
        <li>
          <a href="#">Managing users and groups</a>
        </li>
        <li>
          <a href="#">Configuring role-based access control (RBAC)</a>
        </li>
        <li>
          <a href="#">SSO integration with Azure AD / Okta</a>
        </li>
        <li>
          <a href="#">Audit log configuration and export</a>
        </li>
      </ul>
      <h3>Troubleshooting</h3>
      <ul>
        <li>
          <a href="#">Login failures and account lockout recovery</a>
        </li>
        <li>
          <a href="#">MFA token not working — common fixes</a>
        </li>
        <li>
          <a href="#">Browser compatibility issues</a>
        </li>
        <li>
          <a href="#">Session timeout and cookie settings</a>
        </li>
      </ul>
    </DetailLayout>
  )
}

/** Source: pageData['help-guides']. */
export function HelpGuidesPage() {
  return (
    <DetailLayout
      parent="Help Center"
      current="User Guides"
      title="Help Center — User Guides"
      description="Step-by-step tutorials for SAP features."
    >
      <h2>User Guides</h2>
      <h3>Authentication Guide</h3>
      <p>
        A comprehensive walkthrough of all login methods: password, magic link, OTP, SSO, PIV/CAC, and passkey.
        Includes troubleshooting steps for each method.
      </p>
      <h3>Security Best Practices</h3>
      <p>
        How to keep your account secure: choosing strong passwords, enabling MFA, recognizing phishing attempts,
        managing trusted devices, and reviewing active sessions.
      </p>
      <h3>Admin Console Guide</h3>
      <p>
        For system administrators — how to provision/deprovision users, configure policies, set up conditional access
        rules, monitor audit logs, and generate compliance reports.
      </p>
      <h3>API Integration Guide</h3>
      <p>
        RESTful API documentation for developers integrating with SAP&apos;s authentication and user management
        services. Includes OAuth 2.0 flows, webhook configuration, and SDK references for Python, Node.js, and Java.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['help-ticket']. */
export function HelpTicketPage() {
  return (
    <DetailLayout
      parent="Help Center"
      current="Submit Ticket"
      title="Help Center — Submit Ticket"
      description="Open a support request."
    >
      <h2>Submit a Support Ticket</h2>
      <p>Our support team responds to all tickets within the following timeframes:</p>
      <ul>
        <li>
          <b>Critical (P1):</b> 1 hour — Complete service outage or security incident
        </li>
        <li>
          <b>High (P2):</b> 4 hours — Major feature unavailable, no workaround
        </li>
        <li>
          <b>Medium (P3):</b> 1 business day — Feature impaired with workaround
        </li>
        <li>
          <b>Low (P4):</b> 3 business days — General questions, feature requests
        </li>
      </ul>
      <h3>Before Submitting</h3>
      <p>
        Check the <a href="#">FAQ</a> and <a href="#">Knowledge Base</a> — your answer might already be there.
      </p>
      <h3>How to Submit</h3>
      <p>
        Email <a href="#">support@sap-platform.com</a> with:
      </p>
      <ul>
        <li>Subject line: [Priority] Brief description</li>
        <li>Your username and organization</li>
        <li>Steps to reproduce the issue</li>
        <li>Screenshots or screen recordings if applicable</li>
        <li>Browser, OS, and any assistive technology used</li>
      </ul>
      <p>You&apos;ll receive a ticket confirmation with a tracking number within 15 minutes.</p>
    </DetailLayout>
  )
}
