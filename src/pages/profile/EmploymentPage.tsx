import { useState } from 'react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import EditEmploymentModal from '../../components/EditEmploymentModal'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import { employmentHistory } from '../../data/employmentHistory'
import formStyles from './ProfileForm.module.css'
import styles from './EmploymentPage.module.css'

/**
 * Real Employment tab — full visual parity with sap-user-profile_v2.html's
 * #tab-employment panel. The employment history table is seeded from
 * src/data/employmentHistory.ts (transcribed from the source's own
 * unconditionally-rendered `empHistory` array) — an earlier pass of this
 * page incorrectly rendered only the empty state, which an audit against
 * the source caught. "Edit in modal" opens EditEmploymentModal (structural
 * — just showing the record).
 *
 * "Edit in form" and "Delete" are intentionally still inert: both the
 * "Current Position" and "Add Employment History" forms above are fully
 * uncontrolled (no useState backing any field, per the UI-first rule),
 * so wiring Delete alone would let a row disappear with no way to add it
 * back through the form — a worse, half-wired state than leaving both
 * inert together. Real CRUD here needs those forms made controlled
 * first, which is a larger change than this row's action buttons.
 */
export default function EmploymentPage() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const editingRecord = employmentHistory.find((h) => h.id === editingId) ?? null

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
          <span className={styles.historyCount}>
            {employmentHistory.length} record{employmentHistory.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Company</th>
                <th>Department</th>
                <th>Period</th>
                <th>Type</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employmentHistory.map((h, i) => {
                const isCurrent = !h.endDisplay
                const notes = h.notes.length > 80 ? `${h.notes.slice(0, 80)}…` : h.notes
                return (
                  <tr key={h.id}>
                    <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{i + 1}</td>
                    <td>
                      <span className={styles.jobTitle}>{h.title}</span>
                    </td>
                    <td>
                      <span className={styles.companyName}>{h.company}</span>
                    </td>
                    <td>{h.dept || '—'}</td>
                    <td>
                      <span className={styles.dateRange}>
                        {h.startDisplay} → {isCurrent ? 'Present' : h.endDisplay}
                      </span>
                    </td>
                    <td>{h.type}</td>
                    <td>
                      <span className={[styles.statusPill, isCurrent ? styles.current : styles.past].join(' ')}>
                        {isCurrent ? 'Current' : 'Past'}
                      </span>
                    </td>
                    <td>
                      <span className={styles.notesText} title={h.notes}>
                        {notes}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionBtns}>
                        <button title="Edit in form">
                          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                          </svg>
                        </button>
                        <button title="Edit in modal" onClick={() => setEditingId(h.id)}>
                          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                        </button>
                        <button className={styles.del} title="Delete">
                          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79" />
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

      {editingRecord && <EditEmploymentModal record={editingRecord} onClose={() => setEditingId(null)} />}
    </>
  )
}
