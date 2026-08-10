import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import styles from './ProfileForm.module.css'

/** Real Identity & IDs tab — full visual parity with sap-user-profile_v2.html's #tab-identity panel. Static/inert per the UI-first rule. */
export default function IdentityPage() {
  return (
    <>
      <PageHeader title="Identity & Government IDs" description="SSN, passport, driver's license, visa, clearance. All data is AES-256 encrypted at rest." />
      <Card
        title="Government & Official IDs"
        badge={{ label: 'Sensitive', color: 'amber' }}
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
          </svg>
        }
      >
        <div className={styles.grid}>
          <Input id="ssn" label="Social Security Number (SSN)" type="password" placeholder="XXX-XX-XXXX" />
          <Input id="nationalId" label="National ID Number" placeholder="National ID or equivalent" />
          <Input id="passportNumber" label="Passport Number" placeholder="Passport number" />
          <Input id="passportCountry" label="Passport Country" placeholder="Issuing country" />
          <Input id="passportIssue" label="Passport Issue Date" type="date" />
          <Input id="passportExpiry" label="Passport Expiry" type="date" />
          <Input id="dlNumber" label="Driver's License Number" placeholder="License number" />
          <Input id="dlState" label="DL State / Country" placeholder="Issuing state" />
          <Input id="dlExpiry" label="DL Expiry Date" type="date" />
          <Input id="taxId" label="Tax ID (TIN)" placeholder="TIN / EIN" />
          <Select id="visaType" label="Visa Type" options={['— N/A (citizen) —', 'H-1B', 'L-1', 'O-1', 'TN', 'E-2', 'F-1 OPT', 'Green Card', 'Other']} />
          <Input id="visaExpiry" label="Visa Expiry" type="date" />
          <Select id="workAuth" label="Work Authorization" options={['US Citizen', 'Permanent Resident', 'Work Visa', 'Pending', 'EAD Card']} />
          <Input id="pivCac" label="PIV / CAC Card" placeholder="Smart card ID" />
          <Select id="clearance" label="Security Clearance" options={['None', 'Public Trust', 'Confidential', 'Secret', 'Top Secret', 'TS/SCI']} />
          <Input id="clearanceExpiry" label="Clearance Expiry" type="date" />
        </div>
        <div className={styles.btnRow}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Save Changes
          </Button>
        </div>
      </Card>
    </>
  )
}
