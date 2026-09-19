export type DashboardStatColor = 'green' | 'blue' | 'purple' | 'amber'

export interface DashboardStat {
  id: string
  color: DashboardStatColor
  value: string
  label: string
  /** Route to navigate to on click — omitted for stats with no real destination (e.g. Active Users). */
  to?: string
}

/**
 * Mock KPI values shown on the dashboard's stat cards. Previously hardcoded
 * as JSX literals directly in PortalHomePage.tsx — moved here to match how
 * every other page in the app sources its content, and so a single value
 * only ever needs updating in one place.
 */
export const dashboardStats: DashboardStat[] = [
  { id: 'uptime', color: 'green', value: '99.98%', label: 'Uptime (30 days)', to: '/status/current' },
  { id: 'security', color: 'blue', value: 'A+', label: 'Security Score', to: '/security/overview' },
  { id: 'compliance', color: 'purple', value: 'SOC 2', label: 'Compliance Level', to: '/security/compliance' },
  { id: 'activeUsers', color: 'amber', value: '2,847', label: 'Active Users' },
]
