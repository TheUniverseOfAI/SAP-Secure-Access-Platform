import { useState } from 'react'
import AddCardModal from '../../components/AddCardModal'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import { bankAccounts, storeAccounts, taxRecords } from '../../data/financialAccounts'
import formStyles from './ProfileForm.module.css'
import styles from './FinancialPage.module.css'

const NETWORK_CLASS: Record<string, string> = {
  Visa: 'visa',
  Mastercard: 'mc',
  'American Express': 'amex',
  Discover: 'disc',
}

/**
 * Real Financial tab — full visual parity with sap-user-profile_v2.html's
 * #tab-financial panel. Bank accounts / store credit / tax records are
 * seeded from src/data/financialAccounts.ts (transcribed from the
 * source's own unconditionally-rendered arrays) — an earlier pass of this
 * page incorrectly rendered only empty states, which an audit against the
 * source caught. Because the bank account list is populated, the "Add
 * Card" modal (previously skipped as "unreachable") is now wired to its
 * real trigger, the per-account "Add card" button.
 */
export default function FinancialPage() {
  const [addCardAccountId, setAddCardAccountId] = useState<number | null>(null)
  const addCardAccount = bankAccounts.find((a) => a.id === addCardAccountId) ?? null

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
          <span className={styles.count}>
            {bankAccounts.length} account{bankAccounts.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className={styles.acctGrid}>
          {bankAccounts.map((a) => (
            <div className={styles.acctCard} key={a.id}>
              <div className={styles.acctCardHead}>
                <div className={styles.acctLogo}>{a.name.slice(0, 2)}</div>
                <div className={styles.acctInfo}>
                  <div className={styles.acctName}>{a.name}</div>
                  <div className={styles.acctMeta}>
                    <span>
                      <span className={[styles.acctBadge, styles[a.type.toLowerCase()]].filter(Boolean).join(' ')}>{a.type}</span>
                    </span>
                    <span>•••• {a.acctLast4}</span>
                    <span>Routing: {a.routing}</span>
                    {a.primary && (
                      <span>
                        <span className={[styles.acctBadge, styles.primary].join(' ')}>Primary</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.acctActions}>
                  <button title="Add card" onClick={() => setAddCardAccountId(a.id)}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  <button className={styles.del} title="Remove account">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79" />
                    </svg>
                  </button>
                </div>
              </div>
              {a.cards.length > 0 && (
                <div className={styles.acctCardBody}>
                  <div className={styles.acctCardBodyLabel}>Linked Cards ({a.cards.length})</div>
                  <div className={styles.cardsRow}>
                    {a.cards.map((c) => (
                      <div className={styles.cardChip} key={c.id}>
                        <span className={[styles.chipType, styles[c.kind === 'Debit' ? 'debit' : NETWORK_CLASS[c.network] || 'visa']].join(' ')}>
                          {c.kind === 'Debit' ? 'Debit' : c.network}
                        </span>
                        <span className={styles.chipNum}>•••• {c.last4}</span>
                        <span className={styles.chipExp}>{c.exp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {addCardAccount && <AddCardModal accountName={addCardAccount.name} onClose={() => setAddCardAccountId(null)} />}

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
          <span className={styles.count}>{storeAccounts.length}</span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Type</th>
                <th>Last 4</th>
                <th>Limit</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Notes</th>
                <th style={{ width: 70 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeAccounts.map((s) => (
                <tr key={s.id}>
                  <td>
                    <b style={{ color: 'var(--gray-800)' }}>{s.name}</b>
                  </td>
                  <td>{s.type}</td>
                  <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.last4 ? `••••${s.last4}` : '—'}</td>
                  <td>{s.limit || '—'}</td>
                  <td>{s.exp || '—'}</td>
                  <td>
                    <span className={[styles.statusPill, s.status === 'Active' ? styles.current : styles.past].join(' ')}>{s.status}</span>
                  </td>
                  <td>
                    <span className={styles.notesText}>{s.notes || '—'}</span>
                  </td>
                  <td>
                    <div className={styles.actionBtns}>
                      <button className={styles.del} title="Remove">
                        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                <th>Status</th>
                <th>Gross Income</th>
                <th>AGI</th>
                <th>Tax Paid</th>
                <th>Refund / Owed</th>
                <th>State</th>
                <th>Notes</th>
                <th style={{ width: 50 }} />
              </tr>
            </thead>
            <tbody>
              {taxRecords.map((t) => {
                const isRefund = t.refund.startsWith('+')
                return (
                  <tr key={t.id}>
                    <td>
                      <b>{t.year}</b>
                    </td>
                    <td>{t.status}</td>
                    <td className={styles.amount}>{t.gross}</td>
                    <td className={styles.amount}>{t.agi || '—'}</td>
                    <td className={styles.amount}>{t.paid || '—'}</td>
                    <td className={[styles.amount, isRefund ? styles.refund : styles.owed].join(' ')}>{t.refund || '—'}</td>
                    <td>{t.state || '—'}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--gray-500)' }}>{t.notes || '—'}</td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button className={styles.del} title="Remove">
                          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
