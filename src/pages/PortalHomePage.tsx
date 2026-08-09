import { ActivityItem, ActivityList } from '../components/ActivityItem'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { QuickCard, QuickGrid } from '../components/QuickCard'
import { StatCard, StatGrid } from '../components/StatCard'
import Breadcrumb from '../layouts/Breadcrumb'
import styles from './PortalHomePage.module.css'

/**
 * Real portal home page UI — static/placeholder per the UI-first build
 * order: stat cards, quick-nav cards, and activity items are clickable
 * but inert (no onClick beyond what's shown), since their target pages
 * (privacy, security, status, etc.) don't exist yet. Full visual parity
 * with sap-portal_v2.html's #page-home block.
 */
export default function PortalHomePage() {
  return (
    <>
      <Breadcrumb current="Dashboard" />
      <div className={styles.page}>
        <PageHeader
          title="Welcome to SAP"
          description="Your centralized hub for secure access management, compliance monitoring, and system health. Navigate sections from the sidebar or use the quick actions below."
        />

        <StatGrid>
          <StatCard
            color="green"
            value="99.98%"
            label="Uptime (30 days)"
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            color="blue"
            value="A+"
            label="Security Score"
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751" />
              </svg>
            }
          />
          <StatCard
            color="purple"
            value="SOC 2"
            label="Compliance Level"
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            }
          />
          <StatCard
            color="amber"
            value="2,847"
            label="Active Users"
            icon={
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            }
          />
        </StatGrid>

        <Card title="Quick Navigation">
          <QuickGrid>
            <QuickCard
              label="Privacy Policy"
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751" />
                </svg>
              }
            />
            <QuickCard
              label="Accessibility"
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952" />
                </svg>
              }
            />
            <QuickCard
              label="Terms of Use"
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12" />
                </svg>
              }
            />
            <QuickCard
              label="System Status"
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                </svg>
              }
            />
            <QuickCard
              label="Security"
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              }
            />
            <QuickCard
              label="About SAP"
              icon={
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </QuickGrid>
        </Card>

        <Card title="Recent Activity">
          <ActivityList>
            <ActivityItem color="green" time="2 hours ago" text={<><b>Security audit</b> completed — all 47 controls passed.</>} />
            <ActivityItem
              color="blue"
              time="Yesterday at 3:14 PM"
              text={<><b>Privacy Policy</b> updated to reflect GDPR Article 28 amendments.</>}
            />
            <ActivityItem
              color="amber"
              time="2 days ago"
              text={<><b>Scheduled maintenance</b> window confirmed: April 19, 2:00–4:00 AM EST.</>}
            />
            <ActivityItem color="green" time="1 week ago" text={<><b>SOC 2 Type II</b> certification renewed through March 2027.</>} />
            <ActivityItem
              color="gray"
              time="2 weeks ago"
              text={<><b>Accessibility</b> — WCAG 2.2 AA conformance report published.</>}
            />
          </ActivityList>
        </Card>
      </div>
    </>
  )
}
