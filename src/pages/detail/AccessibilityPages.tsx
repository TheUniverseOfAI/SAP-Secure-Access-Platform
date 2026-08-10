import DetailLayout from '../../components/DetailLayout'

/** Source: pageData['a11y-statement']. */
export function AccessibilityStatementPage() {
  return (
    <DetailLayout parent="Accessibility" current="Statement" title="Accessibility — Statement" description="Our accessibility commitment.">
      <h2>Accessibility Statement</h2>
      <p>
        SAP is committed to ensuring digital accessibility for people of all abilities. We continually improve the user
        experience for everyone and apply relevant accessibility standards.
      </p>
      <h3>Our Commitment</h3>
      <p>
        We believe technology should be inclusive. Every feature in SAP is designed, developed, and tested with
        accessibility as a core requirement — not an afterthought.
      </p>
      <h3>Feedback</h3>
      <p>
        We welcome your feedback on the accessibility of SAP. If you encounter any barriers, please contact us at{' '}
        <a href="#">accessibility@sap-platform.com</a>.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['a11y-standards']. */
export function AccessibilityStandardsPage() {
  return (
    <DetailLayout
      parent="Accessibility"
      current="Standards"
      title="Accessibility — Standards"
      description="WCAG compliance and standards."
    >
      <h2>Standards &amp; Compliance</h2>
      <h3>WCAG 2.2 Level AA</h3>
      <p>
        SAP conforms to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. This includes all success
        criteria for perceivable, operable, understandable, and robust content.
      </p>
      <h3>Section 508</h3>
      <p>
        As a platform serving corporate clients, SAP meets Section 508 requirements of the Rehabilitation Act, ensuring
        compatibility with assistive technologies used in the workplace.
      </p>
      <h3>ARIA Implementation</h3>
      <p>All interactive components use appropriate WAI-ARIA attributes to convey state, roles, and properties to screen readers.</p>
    </DetailLayout>
  )
}

/** Source: pageData['a11y-features']. */
export function AccessibilityFeaturesPage() {
  return (
    <DetailLayout parent="Accessibility" current="Features" title="Accessibility — Features" description="Built-in accessibility features.">
      <h2>Accessibility Features</h2>
      <ul>
        <li>
          <b>Keyboard Navigation:</b> Every feature is fully operable using keyboard alone. Tab order follows logical
          reading sequence.
        </li>
        <li>
          <b>Screen Reader Support:</b> Tested with NVDA, JAWS, and VoiceOver. All images have descriptive alt text.
        </li>
        <li>
          <b>Color Contrast:</b> All text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text).
        </li>
        <li>
          <b>Focus Indicators:</b> Visible focus rings on all interactive elements with a 3px blue outline.
        </li>
        <li>
          <b>Text Scaling:</b> Interface supports browser zoom up to 200% without loss of content or functionality.
        </li>
        <li>
          <b>Reduced Motion:</b> Animations respect the <code>prefers-reduced-motion</code> media query.
        </li>
        <li>
          <b>Error Identification:</b> Form errors are announced to screen readers and highlighted visually with color
          and icon.
        </li>
      </ul>
    </DetailLayout>
  )
}

/** Source: pageData['a11y-report']. */
export function AccessibilityReportPage() {
  return (
    <DetailLayout
      parent="Accessibility"
      current="Report Issues"
      title="Accessibility — Report Issues"
      description="How to report accessibility barriers."
    >
      <h2>Report an Accessibility Issue</h2>
      <p>If you encounter a barrier while using SAP, we want to know about it. Your reports help us improve the platform for everyone.</p>
      <h3>What to Include</h3>
      <ul>
        <li>Description of the barrier and which page or feature is affected.</li>
        <li>The assistive technology you were using (e.g., screen reader, voice control).</li>
        <li>Your browser and operating system.</li>
        <li>Steps to reproduce the issue.</li>
      </ul>
      <h3>Response Time</h3>
      <p>We acknowledge all accessibility reports within 2 business days and aim to resolve critical barriers within 10 business days.</p>
      <p>
        Email: <a href="#">accessibility@sap-platform.com</a>
      </p>
    </DetailLayout>
  )
}
