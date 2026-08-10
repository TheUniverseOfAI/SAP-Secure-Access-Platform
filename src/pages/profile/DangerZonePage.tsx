import Button from '../../components/Button'
import Card from '../../components/Card'
import styles from './DangerZonePage.module.css'

/**
 * Real Danger Zone tab — full visual parity with sap-user-profile_v2.html's
 * #tab-danger panel. "Permanently Delete My Account" renders but does
 * nothing — no confirmation modal, no real deletion logic. Simplest tab
 * in the whole profile section: a single destructive action.
 */
export default function DangerZonePage() {
  return (
    <>
      <div className="page-header">
        <h1 className={styles.title}>Danger Zone</h1>
        <p>Irreversible account actions. Proceed with extreme caution.</p>
      </div>
      <Card
        className={styles.dangerCard}
        title="Delete Account"
        icon={
          <svg fill="none" stroke="var(--red-500)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
          </svg>
        }
      >
        <p className={styles.text}>
          Permanently delete your account and all associated data including uploaded documents, employment records,
          and personal information. This action is irreversible and cannot be recovered.
        </p>
        <Button variant="danger">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79" />
          </svg>
          Permanently Delete My Account
        </Button>
      </Card>
    </>
  )
}
