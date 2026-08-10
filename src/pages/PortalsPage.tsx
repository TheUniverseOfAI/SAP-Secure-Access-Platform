import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import PortalCard from '../components/PortalCard'
import PortalFilter, { type PortalFilterValue } from '../components/PortalFilter'
import { portals } from '../data/portals'
import Breadcrumb from '../layouts/Breadcrumb'
import styles from './PortalsPage.module.css'

/**
 * Real portals hub page — full visual parity with sap-portal_v2.html's
 * #page-portals block. Category filtering works for real (local state),
 * same "structural UI, not business logic" reasoning already applied to
 * routing/tabs/wizard steps elsewhere. Each card's "Launch" link goes
 * nowhere — portal apps are external systems, out of scope for this
 * project entirely, not just deferred to a later phase.
 */
export default function PortalsPage() {
  const [filter, setFilter] = useState<PortalFilterValue>('all')
  const filtered = filter === 'all' ? portals : portals.filter((p) => p.cat === filter)

  return (
    <>
      <Breadcrumb current="Portals" />
      <div className={styles.page}>
        <PageHeader
          title="Application Portals"
          description="Your single sign-on gateway to all SAP-authenticated applications. You've been identified and verified — choose a portal to launch."
        />

        <PortalFilter active={filter} onChange={setFilter} />

        <div className={styles.grid}>
          {filtered.map((portal) => (
            <PortalCard key={portal.name} portal={portal} />
          ))}
        </div>
      </div>
    </>
  )
}
