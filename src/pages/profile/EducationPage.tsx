import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import styles from './ProfileForm.module.css'

/** Real Education & Certifications tab — full visual parity with sap-user-profile_v2.html's #tab-education panel. Static/inert per the UI-first rule. */
export default function EducationPage() {
  return (
    <>
      <PageHeader title="Education & Certifications" description="Academic history, professional certifications, and social links." />
      <Card
        title="Education"
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347" />
          </svg>
        }
      >
        <div className={styles.grid}>
          <Select
            id="degree"
            label="Highest Degree"
            required
            options={[
              '— Select —',
              'High School / GED',
              "Associate's",
              "Bachelor's",
              "Master's",
              'Doctorate (PhD)',
              'Professional (MD, JD)',
              'Trade / Vocational',
            ]}
          />
          <Input id="fieldOfStudy" label="Field of Study" placeholder="e.g., Computer Science" />
          <Input id="university" label="University / Institution" placeholder="School name" />
          <Input id="gradYear" label="Graduation Year" type="number" min={1950} max={2030} />
          <Input id="gpa" label="GPA" optional placeholder="e.g., 3.8 / 4.0" />
          <Input id="honors" label="Honors / Awards" placeholder="e.g., Cum Laude" />
        </div>

        <hr className={styles.divider} />
        <h2>Professional Certifications</h2>
        <div className={styles.grid}>
          <Input id="cert1Name" label="Cert 1 — Name" placeholder="e.g., AWS Solutions Architect" />
          <Input id="cert1Org" label="Issuing Org" placeholder="e.g., Amazon Web Services" />
          <Input id="cert1Obtained" label="Date Obtained" type="date" />
          <Input id="cert1Expiry" label="Expiry Date" type="date" />
          <Input id="cert2Name" label="Cert 2 — Name" placeholder="e.g., CISSP, PMP, CKA" />
          <Input id="cert2Org" label="Issuing Org" />
          <Input id="cert2Obtained" label="Date Obtained" type="date" />
          <Input id="cert2Expiry" label="Expiry Date" type="date" />
        </div>

        <hr className={styles.divider} />
        <h2>Professional Links</h2>
        <div className={styles.grid}>
          <Input id="linkedin" label="LinkedIn" placeholder="https://linkedin.com/in/..." />
          <Input id="github" label="GitHub" placeholder="https://github.com/..." />
          <Input id="portfolio" label="Portfolio / Website" placeholder="https://..." />
          <Input id="twitter" label="Twitter / X" placeholder="@handle" />
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
