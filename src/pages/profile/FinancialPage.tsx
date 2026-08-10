import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import formStyles from './ProfileForm.module.css'
import styles from './FinancialPage.module.css'

/**
 * Real Financial tab — full visual parity with sap-user-profile_v2.html's
 * #tab-financial panel. Bank accounts / store credit / tax records all
 * start empty in the source (no seed data, populated only via JS after
 * adding) and stay that way here - only the empty states render. The
 * "Add Card" modal from the source is skipped entirely: it has no visible
 * trigger in the default DOM state (only reachable via a button rendered
 * dynamically after a bank account is added), so it's an unreachable
 * state, same reasoning already applied to the forgot-password wizard.
 */
export default function FinancialPage() {
  return (
    <>
      <PageHeader
        title="Financial Information"
        description="Bank accounts, payment cards, store credit lines, and tax history. All data is AES-256 encrypted with field-level access control."
      />

      <Card
        title="Add Bank Account"
        badge={{ label: 'Encrypted', color: 'red' }}
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
          </svg>
        }
      >
        <div className={formStyles.grid}>
          <Input id="bankName" label="Bank Name" required placeholder="e.g., Chase, Wells Fargo, Bank of America" />
          <Input id="bankHolder" label="Account Holder Name" required placeholder="Name as shown on account" />
          <Select id="bankType" label="Account Type" required options={['Checking', 'Savings', 'Money Market', 'Certificate of Deposit']} />
          <Input id="bankRouting" label="Routing Number" required placeholder="9-digit ABA routing number" maxLength={9} />
          <Input id="bankAcct" label="Account Number" required type="password" placeholder="Account number" />
          <Input id="bankAcct2" label="Confirm Account Number" type="password" placeholder="Re-enter account number" />
          <Input id="bankIban" label="IBAN" optional placeholder="For non-US accounts" />
          <Input id="bankSwift" label="SWIFT / BIC Code" placeholder="For international wire transfers" />
          <Input id="bankBranch" label="Branch Name" placeholder="e.g., Reston Town Center Branch" />
          <Select id="bankPrimary" label="Primary Account?" options={['Yes — use for direct deposit', 'No']} />
        </div>
        <div className={formStyles.btnRow}>
          <Button variant="outline">Clear</Button>
          <Button variant="primary">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Account
          </Button>
        </div>
      </Card>

      <Card>
        <div className={styles.listHeader}>
          <h2>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
            Your Accounts &amp; Cards
          </h2>
          <span className={styles.count}>0</span>
        </div>
        <div className={styles.tableEmpty}>
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21"
            />
          </svg>
          No accounts added yet. Use the form above.
        </div>
      </Card>

      <Card
        title="Store & Alternative Credit"
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72" />
          </svg>
        }
      >
        <p className={styles.note}>Add store credit cards, digital wallets, and financing accounts (PayPal, Macy&apos;s, Apple Card, Affirm, etc.)</p>
        <div className={formStyles.grid}>
          <Input id="storeName" label="Provider Name" required placeholder="e.g., Macy's, PayPal, Apple, Affirm, Klarna" />
          <Select
            id="storeType"
            label="Account Type"
            required
            options={['Store Credit Card', 'Digital Wallet', 'BNPL / Financing', 'Prepaid Card', 'Crypto Wallet', 'Other']}
          />
          <Input id="storeLast4" label="Account / Card Number (last 4)" placeholder="Last 4 digits" maxLength={4} />
          <Input id="storeExp" label="Expiry Date" placeholder="MM/YY or N/A" maxLength={5} />
          <Input id="storeLimit" label="Credit Limit" placeholder="e.g., $5,000" />
          <Select id="storeStatus" label="Status" options={['Active', 'Frozen', 'Closed', 'Pending Approval']} />
          <div className={formStyles.span2}>
            <Textarea
              id="storeNotes"
              label="Notes"
              placeholder="e.g., Used for office supplies, employee perk card, linked to PayPal business account"
              style={{ minHeight: 70 }}
            />
          </div>
        </div>
        <div className={formStyles.btnRow}>
          <Button variant="outline">Clear</Button>
          <Button variant="primary">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Account
          </Button>
        </div>
      </Card>

      <Card>
        <div className={styles.listHeader}>
          <h2>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18" />
            </svg>
            Store &amp; Alt Credit Accounts
          </h2>
          <span className={styles.count}>0</span>
        </div>
        <div className={styles.tableEmpty}>
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18" />
          </svg>
          No store or alternative credit accounts added.
        </div>
      </Card>

      <Card
        title="Tax Filing History"
        badge={{ label: 'IRS Records', color: 'amber' }}
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        }
      >
        <p className={styles.note}>Summary of past tax filings. Add or update records annually.</p>
        <div className={formStyles.grid} style={{ marginBottom: 16 }}>
          <Select id="taxYear" label="Tax Year" required options={['2025', '2024', '2023', '2022', '2021', '2020', '2019']} />
          <Select
            id="taxStatus"
            label="Filing Status"
            required
            options={['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household', 'Qualifying Surviving Spouse']}
          />
          <Input id="taxGross" label="Gross Income" required placeholder="e.g., $125,000" />
          <Input id="taxAgi" label="Adjusted Gross Income (AGI)" placeholder="e.g., $112,500" />
          <Input id="taxPaid" label="Total Tax Paid" placeholder="e.g., $28,400" />
          <Input id="taxRefund" label="Refund / Amount Owed" placeholder="e.g., +$2,340 or -$850" />
          <Input id="taxW4" label="Federal W-4 Allowances" type="number" defaultValue={1} min={0} />
          <Input id="taxState" label="State Filed" placeholder="e.g., Virginia" />
          <div className={formStyles.span2}>
            <Input id="taxNotes" label="Notes" placeholder="e.g., Filed extension, amended return, 1099 income included" />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
          <Button variant="primary">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Tax Record
          </Button>
        </div>
        <div className={styles.tableEmpty}>
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5" />
          </svg>
          No tax records added yet.
        </div>
      </Card>
    </>
  )
}
