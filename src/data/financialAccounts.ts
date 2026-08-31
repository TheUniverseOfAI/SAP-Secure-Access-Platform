export interface LinkedCard {
  id: number
  kind: 'Debit' | 'Credit'
  network: 'Visa' | 'Mastercard' | 'American Express' | 'Discover'
  last4: string
  exp: string
}

export interface BankAccount {
  id: number
  name: string
  type: string
  routing: string
  acctLast4: string
  branch: string
  primary: boolean
  cards: LinkedCard[]
}

export interface StoreAccount {
  id: number
  name: string
  type: string
  last4: string
  exp: string
  limit: string
  status: string
  notes: string
}

export interface TaxRecord {
  id: number
  year: string
  status: string
  gross: string
  agi: string
  paid: string
  refund: string
  state: string
  notes: string
}

/**
 * Static seed data, transcribed verbatim from sap-user-profile_v2.html's
 * `bankAccounts` / `storeAccts` / `taxRecords` arrays, all rendered
 * unconditionally on page load in the source — the default-rendered DOM
 * shows populated lists, not empty states.
 */
export const bankAccounts: BankAccount[] = [
  {
    id: 1,
    name: 'Chase Bank',
    type: 'Checking',
    routing: '021000021',
    acctLast4: '6742',
    branch: 'Reston Town Center',
    primary: true,
    cards: [
      { id: 101, kind: 'Debit', network: 'Visa', last4: '6742', exp: '11/27' },
      { id: 102, kind: 'Credit', network: 'Visa', last4: '3391', exp: '03/28' },
    ],
  },
  {
    id: 2,
    name: 'Wells Fargo',
    type: 'Savings',
    routing: '121000248',
    acctLast4: '8510',
    branch: 'Herndon Branch',
    primary: false,
    cards: [{ id: 201, kind: 'Debit', network: 'Mastercard', last4: '8510', exp: '06/29' }],
  },
]

export const storeAccounts: StoreAccount[] = [
  {
    id: 1,
    name: "Macy's",
    type: 'Store Credit Card',
    last4: '7724',
    exp: '12/27',
    limit: '$3,500',
    status: 'Active',
    notes: 'Employee discount card',
  },
  { id: 2, name: 'PayPal', type: 'Digital Wallet', last4: '', exp: 'N/A', limit: '—', status: 'Active', notes: 'Linked to Chase checking' },
  {
    id: 3,
    name: 'Apple Card',
    type: 'Store Credit Card',
    last4: '0092',
    exp: '08/28',
    limit: '$10,000',
    status: 'Active',
    notes: 'Daily Cash rewards, used for Apple purchases',
  },
]

export const taxRecords: TaxRecord[] = [
  {
    id: 1,
    year: '2025',
    status: 'Single',
    gross: '$142,000',
    agi: '$128,500',
    paid: '$31,200',
    refund: '+$2,840',
    state: 'Virginia',
    notes: 'Standard deduction',
  },
  {
    id: 2,
    year: '2024',
    status: 'Single',
    gross: '$128,000',
    agi: '$115,000',
    paid: '$27,600',
    refund: '+$1,950',
    state: 'Virginia',
    notes: '',
  },
  {
    id: 3,
    year: '2023',
    status: 'Single',
    gross: '$105,000',
    agi: '$96,200',
    paid: '$22,100',
    refund: '-$420',
    state: 'Virginia',
    notes: '1099 freelance income included',
  },
]
