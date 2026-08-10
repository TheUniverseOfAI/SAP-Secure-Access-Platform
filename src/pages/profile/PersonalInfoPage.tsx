import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import styles from './ProfileForm.module.css'

/**
 * Real Personal Info tab — full visual parity with sap-user-profile_v2.html's
 * #tab-personal panel. Static/inert per the UI-first rule: fields hold
 * their source default values/placeholders but there's no form state,
 * Cancel/Save do nothing. No Breadcrumb here — the source profile pages
 * don't have one (only PortalLayout pages do).
 */
export default function PersonalInfoPage() {
  return (
    <>
      <PageHeader title="Personal Information" description="Legal name, demographics, and personal details. Fields marked with * are required." />
      <Card
        title="Legal Identity"
        badge={{ label: 'Required', color: 'blue' }}
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
          </svg>
        }
      >
        <div className={styles.grid}>
          <Input id="legalFirstName" label="Legal First Name" required defaultValue="Muhanned" />
          <Input id="legalLastName" label="Legal Last Name" required placeholder="Enter your last name" />
          <Input id="middleName" label="Middle Name" placeholder="—" />
          <Input id="preferredName" label="Preferred Name / Nickname" placeholder="How you'd like to be addressed" />
          <Select id="prefix" label="Prefix / Title" options={['— Select —', 'Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']} />
          <Select id="suffix" label="Suffix" options={['— None —', 'Jr.', 'Sr.', 'II', 'III', 'Esq.', 'PhD', 'MD']} />
          <Input id="dob" label="Date of Birth" required type="date" />
          <Select id="gender" label="Gender" options={['— Select —', 'Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other']} />
          <Select
            id="maritalStatus"
            label="Marital Status"
            options={['— Select —', 'Single', 'Married', 'Divorced', 'Widowed', 'Domestic Partnership', 'Separated']}
          />
          <Input id="nationality" label="Nationality" required placeholder="Primary nationality" />
          <Input id="citizenship" label="Citizenship" placeholder="Country of citizenship" />
          <Input id="countryOfBirth" label="Country of Birth" placeholder="Country where you were born" />
          <Input id="primaryLanguage" label="Primary Language" defaultValue="English" />
          <Input id="additionalLanguages" label="Additional Languages" placeholder="e.g., Arabic, French, Spanish" />
          <Select
            id="ethnicity"
            label="Ethnicity"
            optional
            options={[
              'Prefer not to disclose',
              'Asian',
              'Black or African American',
              'Hispanic or Latino',
              'Middle Eastern or North African',
              'Native American',
              'Pacific Islander',
              'White',
              'Two or More Races',
              'Other',
            ]}
          />
          <Select
            id="veteranStatus"
            label="Veteran Status"
            optional
            options={['Prefer not to disclose', 'Not a veteran', 'Active duty', 'Veteran', 'Reserve/National Guard']}
          />
          <Select
            id="disabilityStatus"
            label="Disability Status"
            optional
            options={['Prefer not to disclose', 'No disability', 'Yes, I have a disability']}
          />
          <Input id="religion" label="Religion" optional placeholder="Optional" />
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
