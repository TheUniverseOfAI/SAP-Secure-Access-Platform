import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import styles from './ProfileForm.module.css'

/** Real Contact & Address tab — full visual parity with sap-user-profile_v2.html's #tab-contact panel. Static/inert per the UI-first rule. */
export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact & Address" description="Email, phone, physical address, and emergency contacts." />
      <Card
        title="Contact Details"
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75" />
          </svg>
        }
      >
        <div className={styles.grid}>
          <Input id="workEmail" label="Work Email" required type="email" placeholder="your@company.com" />
          <Input id="personalEmail" label="Personal Email" type="email" placeholder="your@personal.com" />
          <Input id="workPhone" label="Work Phone" type="tel" placeholder="+1 (XXX) XXX-XXXX" />
          <Input id="mobilePhone" label="Mobile Phone" required type="tel" placeholder="+1 (XXX) XXX-XXXX" />
          <Input id="homePhone" label="Home Phone" type="tel" placeholder="(Optional)" />
          <Input id="faxNumber" label="Fax Number" type="tel" placeholder="(Optional)" />
        </div>

        <hr className={styles.divider} />
        <h2>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          Primary Address
        </h2>
        <div className={styles.grid}>
          <div className={styles.span2}>
            <Input id="addressLine1" label="Street Address Line 1" required placeholder="Street address" />
          </div>
          <div className={styles.span2}>
            <Input id="addressLine2" label="Street Address Line 2" placeholder="Apt, Suite, Unit, Floor" />
          </div>
          <Input id="city" label="City" required placeholder="City" />
          <Input id="state" label="State / Province" required placeholder="State" />
          <Input id="zip" label="ZIP / Postal Code" required placeholder="ZIP" />
          <Input id="country" label="Country" required placeholder="Country" />
        </div>

        <hr className={styles.divider} />
        <h2>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106" />
          </svg>
          Emergency Contacts
        </h2>
        <div className={styles.grid}>
          <Input id="ec1Name" label="Contact 1 — Full Name" required placeholder="Full name" />
          <Select id="ec1Relationship" label="Relationship" required options={['— Select —', 'Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other']} />
          <Input id="ec1Phone" label="Phone" required type="tel" />
          <Input id="ec1Email" label="Email" type="email" />
          <Input id="ec2Name" label="Contact 2 — Full Name" placeholder="Optional backup" />
          <Select id="ec2Relationship" label="Relationship" options={['— Select —', 'Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other']} />
          <Input id="ec2Phone" label="Phone" type="tel" />
          <Input id="ec2Email" label="Email" type="email" />
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
