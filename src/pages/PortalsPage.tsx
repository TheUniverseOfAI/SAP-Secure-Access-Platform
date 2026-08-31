import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
 *
 * Also reads an optional ?q= search param, set by AppHeader's search
 * box (Enter navigates here) — the source itself never wires that input
 * to anything, but this gives it a real destination.
 */
export default function PortalsPage() {
  const [filter, setFilter] = useState<PortalFilterValue>('all')
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const filtered = portals.filter((p) => {
    const inCategory = filter === 'all' || p.cat === filter
    const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase())
    return inCategory && matchesQuery
  })

  return (
    <>
      <Breadcrumb current="Portals" />
      <div className={styles.page}>
        <PageHeader
          title="Application Portals"
          description="Your single sign-on gateway to all SAP-authenticated applications. You've been identified and verified — choose a portal to launch."
        />

        {query && (
          <p className={styles.searchNote}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo; ·{' '}
            <button type="button" className={styles.clearSearch} onClick={() => setSearchParams({})}>
              Clear search
            </button>
          </p>
        )}

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
