import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import Breadcrumb from '../layouts/Breadcrumb'
import styles from './AboutPage.module.css'

/**
 * Real About page — source content ("about-company") from
 * sap-portal_v2.html's aboutContent object. That object also has
 * 'about-contact' and 'about-changelog' entries, but neither is linked
 * from anywhere reachable in the app (not in Sidebar, not in the home
 * quick-nav) — only 'about-company' is the actual default/target of
 * every About link, so that's the only one built here. Same "don't build
 * unreachable states" reasoning already applied to the forgot-password
 * wizard's steps.
 */
export default function AboutPage() {
  return (
    <>
      <Breadcrumb current="About" />
      <div className={styles.page}>
        <PageHeader title="About SAP" description="The company, team, and mission behind the Secure Access Platform." />
        <Card>
          <div className={styles.content}>
            <h2>Our Mission</h2>
            <p>
              SAP was founded on a simple principle: access security should be invisible when it works and impenetrable when tested. We
              build tools that protect organizations without slowing them down.
            </p>
            <h3>What We Do</h3>
            <p>
              SAP provides a unified identity platform that authenticates you once and grants secure access to all your organization&apos;s
              application portals — from AI/ML tools to productivity suites to health trackers. One identity, many destinations.
            </p>
            <h3>Our Values</h3>
            <ul>
              <li>
                <b>Security First:</b> Every decision starts with &quot;how does this protect the user?&quot;
              </li>
              <li>
                <b>Transparency:</b> Open communication about incidents, changes, and data practices.
              </li>
              <li>
                <b>Simplicity:</b> Complex security made accessible through intuitive design.
              </li>
              <li>
                <b>Resilience:</b> Systems that recover gracefully — like a honey badger, we don&apos;t back down.
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </>
  )
}
