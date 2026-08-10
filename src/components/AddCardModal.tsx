import Button from './Button'
import FormModal from './FormModal'
import Input from './Input'
import Select from './Select'
import formStyles from '../pages/profile/ProfileForm.module.css'

/**
 * Source: #cardModal in sap-user-profile_v2.html, opened by the "Add
 * card" action button on a bank account card. Previously skipped in this
 * port under the mistaken premise that bank accounts (and this trigger)
 * were unreachable — the UI-completeness audit found the account list is
 * actually seeded/populated by default, so the trigger is one click away.
 * "Add Card" only closes the modal; no card is actually added to any
 * list, same deferred-persistence pattern as the rest of this build.
 */
export default function AddCardModal({ accountName, onClose }: { accountName: string; onClose: () => void }) {
  return (
    <FormModal
      titleId="cardModalTitle"
      title={`Add Card to ${accountName}`}
      icon={
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3" />
        </svg>
      }
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Card
          </Button>
        </>
      }
    >
      <div className={formStyles.grid}>
        <Select id="card-kind" label="Card Type" required defaultValue="Debit" options={['Debit', 'Credit']} />
        <Select id="card-network" label="Network" required defaultValue="Visa" options={['Visa', 'Mastercard', 'American Express', 'Discover']} />
        <Input id="card-last4" label="Last 4 Digits" required placeholder="e.g., 4829" maxLength={4} inputMode="numeric" />
        <Input id="card-exp" label="Expiry (MM/YY)" required placeholder="e.g., 09/28" maxLength={5} />
        <div className={formStyles.span2}>
          <Input id="card-holder" label="Cardholder Name" placeholder="Name as printed on card" />
        </div>
      </div>
    </FormModal>
  )
}
