import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import styles from './ProfileForm.module.css'

/** Real Health & Safety tab — full visual parity with sap-user-profile_v2.html's #tab-health panel. Static/inert per the UI-first rule. */
export default function HealthPage() {
  return (
    <>
      <PageHeader title="Health & Safety" description="Medical, insurance, and dietary information. HIPAA protected." />
      <Card
        title="Health & Safety"
        badge={{ label: 'HIPAA', color: 'green' }}
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        }
      >
        <div className={styles.grid}>
          <Select id="bloodType" label="Blood Type" options={['— Unknown —', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} />
          <Input id="allergies" label="Allergies" placeholder="e.g., Penicillin, Peanuts" />
          <div className={styles.span2}>
            <Textarea
              id="medicalConditions"
              label="Medical Conditions (voluntary)"
              placeholder="Any conditions relevant to workplace safety"
            />
          </div>
          <Input id="insuranceProvider" label="Health Insurance Provider" placeholder="e.g., Blue Cross" />
          <Input id="policyNumber" label="Policy Number" placeholder="Policy / Group #" />
          <Input id="physician" label="Primary Care Physician" placeholder="Doctor's name" />
          <Input id="physicianPhone" label="Physician Phone" type="tel" placeholder="Phone number" />
          <Input id="dietary" label="Dietary Restrictions" placeholder="e.g., Halal, Kosher, Vegetarian" />
          <Select id="wheelchairAccess" label="Wheelchair Access" options={['No', 'Yes']} />
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
