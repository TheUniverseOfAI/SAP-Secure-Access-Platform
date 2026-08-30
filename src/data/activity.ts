export type ActivityColor = 'green' | 'blue' | 'amber' | 'gray'

export interface ActivityEntry {
  id: string
  color: ActivityColor
  label: string
  detail: string
  time: string
  /** Route to navigate to on click. Every entry here maps to a real, already-built page. */
  link: string
}

/**
 * Mock data backing the dashboard's "Recent Activity" feed. Transcribed
 * from sap-portal_v2.html's #page-home block. The source itself renders
 * these as plain, non-interactive divs — no onclick, no pointer cursor —
 * but per the "everything should navigate to a real destination" rule,
 * each entry is given a `link` to the page it's actually about, matching
 * the same structural-navigation treatment already used for the stat
 * cards and quick-nav cards on this page.
 */
export const activity: ActivityEntry[] = [
  {
    id: 'security-audit',
    color: 'green',
    label: 'Security audit',
    detail: 'completed — all 47 controls passed.',
    time: '2 hours ago',
    link: '/security/overview',
  },
  {
    id: 'privacy-policy-update',
    color: 'blue',
    label: 'Privacy Policy',
    detail: 'updated to reflect GDPR Article 28 amendments.',
    time: 'Yesterday at 3:14 PM',
    link: '/privacy/overview',
  },
  {
    id: 'maintenance-window',
    color: 'amber',
    label: 'Scheduled maintenance',
    detail: 'window confirmed: April 19, 2:00–4:00 AM EST.',
    time: '2 days ago',
    link: '/status/maintenance',
  },
  {
    id: 'soc2-renewal',
    color: 'green',
    label: 'SOC 2 Type II',
    detail: 'certification renewed through March 2027.',
    time: '1 week ago',
    link: '/security/compliance',
  },
  {
    id: 'accessibility-report',
    color: 'gray',
    label: 'Accessibility',
    detail: '— WCAG 2.2 AA conformance report published.',
    time: '2 weeks ago',
    link: '/accessibility/standards',
  },
]
