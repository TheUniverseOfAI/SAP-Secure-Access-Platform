import Breadcrumb from '../layouts/Breadcrumb'

/**
 * Placeholder — real portal home content (stat cards, quick actions,
 * activity feed, etc. from sap-portal_v2.html) is a separate future
 * round, same pattern as AuthLayout getting a placeholder before
 * LoginPage's real content was built.
 */
export default function PortalHomePage() {
  return (
    <>
      <Breadcrumb current="Dashboard" />
      <p style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--gray-400)' }}>
        Portal home content — built in a future round.
      </p>
    </>
  )
}
