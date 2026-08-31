import DetailLayout from '../../components/DetailLayout'
import StatusRow from '../../components/StatusRow'

/** Source: pageData['status-current']. */
export function StatusCurrentPage() {
  return (
    <DetailLayout
      parent="System Status"
      current="Current Status"
      title="System Status — Current"
      description="Live status of all SAP services."
    >
      <h2>Current Status</h2>
      <p style={{ color: '#15803d', fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px' }}>All Systems Operational</p>
      <StatusRow name="Authentication Gateway" status="operational" />
      <StatusRow name="User Management API" status="operational" />
      <StatusRow name="SSO / SAML Provider" status="operational" />
      <StatusRow name="MFA Service" status="operational" />
      <StatusRow name="Audit Log Pipeline" status="degraded" />
      <StatusRow name="Email Delivery" status="operational" />
      <StatusRow name="Database Cluster" status="operational" />
      <StatusRow name="CDN & Static Assets" status="operational" />
    </DetailLayout>
  )
}

/** Source: pageData['status-incidents']. */
export function StatusIncidentsPage() {
  return (
    <DetailLayout
      parent="System Status"
      current="Incident History"
      title="System Status — Incident History"
      description="Past incidents and resolutions."
    >
      <h2>Incident History</h2>
      <h3>April 12, 2026 — Audit Log Delay</h3>
      <p>
        Audit log ingestion experienced a 45-minute delay due to a Kafka partition rebalance. No data was lost. Resolved by scaling consumer
        group.
      </p>
      <h3>March 28, 2026 — SSO Intermittent Failures</h3>
      <p>
        SAML assertion validation failed for ~2% of requests over a 20-minute window. Root cause: expired intermediate certificate.
        Hot-fixed within 18 minutes of detection.
      </p>
      <h3>February 14, 2026 — Scheduled Maintenance</h3>
      <p>
        Planned 2-hour maintenance window for database migration to PostgreSQL 16. Zero-downtime deployment achieved using blue-green
        strategy.
      </p>
    </DetailLayout>
  )
}

/** Source: pageData['status-maintenance']. */
export function StatusMaintenancePage() {
  return (
    <DetailLayout
      parent="System Status"
      current="Maintenance"
      title="System Status — Maintenance"
      description="Upcoming and past maintenance windows."
    >
      <h2>Maintenance Schedule</h2>
      <h3>Upcoming</h3>
      <p>
        <b>April 19, 2026 — 2:00 AM to 4:00 AM EST</b>
        <br />
        Infrastructure upgrade: Redis cluster migration to Redis 7.4. Expected impact: brief MFA token regeneration (~30 seconds). Users
        will not need to re-authenticate.
      </p>
      <h3>Maintenance Policy</h3>
      <ul>
        <li>Maintenance windows are scheduled during lowest-traffic periods (Saturday 2–4 AM EST).</li>
        <li>Notifications are sent 72 hours, 24 hours, and 1 hour before the window.</li>
        <li>Emergency patches may be applied outside the window with best-effort notification.</li>
        <li>Zero-downtime deployments are used whenever possible.</li>
      </ul>
    </DetailLayout>
  )
}

/** Source: pageData['status-uptime']. */
export function StatusUptimePage() {
  return (
    <DetailLayout
      parent="System Status"
      current="Uptime Report"
      title="System Status — Uptime Report"
      description="Historical uptime metrics."
    >
      <h2>Uptime Report</h2>
      <h3>30-Day Summary</h3>
      <p>
        <b>Overall Uptime:</b> 99.98% (Downtime: 8 minutes 38 seconds)
      </p>
      <p>
        <b>Authentication Gateway:</b> 100%
      </p>
      <p>
        <b>User Management API:</b> 99.99%
      </p>
      <p>
        <b>SSO / SAML:</b> 99.97%
      </p>
      <p>
        <b>MFA Service:</b> 100%
      </p>
      <p>
        <b>Database Cluster:</b> 100%
      </p>
      <h3>SLA Commitment</h3>
      <p>
        SAP guarantees 99.9% monthly uptime for all Tier 1 services. If uptime falls below the SLA threshold, affected customers are
        eligible for service credits as defined in the Enterprise Agreement.
      </p>
    </DetailLayout>
  )
}
