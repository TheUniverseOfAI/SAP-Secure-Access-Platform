import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import formStyles from './ProfileForm.module.css'
import styles from './EmploymentPage.module.css'

/**
 * Real Employment tab — full visual parity with sap-user-profile_v2.html's
 * #tab-employment panel. The employment history table starts empty in the
 * source (0 records, no seed data) and stays that way here too - only the
 * empty state is rendered, not a populated table, since there's nothing to
 * populate it with and no add/edit logic being wired here.
 */
export default function EmploymentPage() {
  return (
    <>
      <PageHeader title="Employment Details" description="Current position and employment history. Add past roles below and they'll appear in the history table." />

      <Card
        title="Current Position"
        badge={{ label: 'Active', color: 'green' }}
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25" />
          </svg>
        }
      >
        <div className={formStyles.grid}>
          <Input id="employeeId" label="Employee ID" required defaultValue="EMP-2024-00847" readOnly style={{ background: 'var(--gray-50)', color: 'var(--gray-500)' }} />
          <Input id="badgeNumber" label="Badge / Card Number" placeholder="Badge ID" />
          <Input id="jobTitle" label="Job Title" required defaultValue="AI Engineer & ML Ops Specialist" />
          <Select
            id="department"
            label="Department"
            required
            options={['Engineering', 'Product', 'Design', 'Security', 'Operations', 'HR', 'Finance', 'Legal', 'Sales', 'Marketing']}
          />
          <Input id="division" label="Division" defaultValue="AI/ML Platform" />
          <Input id="team" label="Team" placeholder="Team name" />
          <Select id="employmentType" label="Employment Type" options={['Full-time', 'Part-time', 'Contract', 'Intern', 'Temporary', 'Freelance']} />
          <Select id="employmentStatus" label="Employment Status" options={['Active', 'On Leave', 'Suspended', 'Terminated', 'Probation', 'Retired']} />
          <Input id="hireDate" label="Hire Date" required type="date" />
          <Input id="probationEnd" label="Probation End" type="date" />
          <Input id="manager" label="Manager / Supervisor" placeholder="Manager's full name" />
          <Select
            id="workLocation"
            label="Work Location"
            options={['HQ — Building A', 'HQ — Building B', 'Remote — US', 'Remote — International', 'Hybrid']}
          />
          <Select id="workSchedule" label="Work Schedule" options={['9–5 EST (Standard)', 'Flexible Hours', 'Night Shift', 'Compressed (4x10)']} />
          <Input id="costCenter" label="Cost Center" placeholder="e.g., CC-ENG-4200" />
          <Input id="payGrade" label="Pay Grade / Level" placeholder="e.g., L5, Grade 12" />
          <Select id="unionMembership" label="Union Membership" options={['Not Applicable', 'Yes', 'No']} />
        </div>
        <div className={formStyles.btnRow}>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Save Current Position
          </Button>
        </div>
      </Card>

      <Card
        title="Add Employment History"
        icon={
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      >
        <div className={formStyles.grid}>
          <Input id="histTitle" label="Job Title" required placeholder="e.g., Senior Software Engineer" />
          <Input id="histCompany" label="Company / Organization" required placeholder="e.g., Acme Corp" />
          <Input id="histDept" label="Department" placeholder="e.g., Engineering" />
          <Select id="histType" label="Employment Type" options={['Full-time', 'Part-time', 'Contract', 'Intern', 'Freelance']} />
          <Input id="histStart" label="Start Date" required type="date" />
          <Input id="histEnd" label="End Date" type="date" />
          <Input id="histLocation" label="Location" placeholder="e.g., San Francisco, CA" />
          <Input id="histManager" label="Supervisor / Manager" placeholder="Manager's name" />
          <div className={formStyles.span2}>
            <Select
              id="histReason"
              label="Reason for Leaving"
              options={[
                '— Select —',
                'Career Growth',
                'Better Compensation',
                'Relocation',
                'Laid Off',
                'Contract Ended',
                'Voluntary Resignation',
                'Retirement',
                'Company Closure',
                'Other',
              ]}
            />
          </div>
          <div className={formStyles.span2}>
            <Textarea
              id="histNotes"
              label="Notes & Responsibilities"
              placeholder="Key responsibilities, achievements, projects worked on, technologies used, team size managed, etc."
              style={{ minHeight: 100 }}
            />
          </div>
        </div>
        <div className={formStyles.btnRow}>
          <Button variant="outline">Clear</Button>
          <Button variant="primary">
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add to History
          </Button>
        </div>
      </Card>

      <Card>
        <div className={styles.historyHeader}>
          <h2>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125" />
            </svg>
            Employment History
          </h2>
          <span className={styles.historyCount}>0 records</span>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableEmpty}>
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25"
              />
            </svg>
            No employment history added yet.
            <br />
            Use the form above to add your past positions.
          </div>
        </div>
      </Card>
    </>
  )
}
