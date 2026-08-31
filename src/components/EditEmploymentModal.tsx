import type { EmploymentHistoryRecord } from '../data/employmentHistory'
import Button from './Button'
import FormModal from './FormModal'
import Input from './Input'
import Select from './Select'
import Textarea from './Textarea'
import formStyles from '../pages/profile/ProfileForm.module.css'

/**
 * Source: #editModal in sap-user-profile_v2.html, opened by the
 * "Edit in modal" action button on each employment history row. Fields
 * are pre-filled from the clicked record (structural — just showing the
 * record's existing static data), but "Update Record" only closes the
 * modal; no actual edit is persisted, same as every other deferred
 * form-submission in this UI-first build.
 */
export default function EditEmploymentModal({ record, onClose }: { record: EmploymentHistoryRecord; onClose: () => void }) {
  return (
    <FormModal
      titleId="editModalTitle"
      title="Edit Employment Record"
      icon={
        <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        </svg>
      }
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose}>
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Update Record
          </Button>
        </>
      }
    >
      <div className={formStyles.grid}>
        <Input id="m-title" label="Job Title" required defaultValue={record.title} />
        <Input id="m-company" label="Company" required defaultValue={record.company} />
        <Input id="m-dept" label="Department" defaultValue={record.dept} />
        <Select
          id="m-type"
          label="Type"
          defaultValue={record.type}
          options={['Full-time', 'Part-time', 'Contract', 'Intern', 'Freelance']}
        />
        <Input id="m-start" label="Start Date" required type="date" />
        <Input id="m-end" label="End Date" type="date" />
        <Input id="m-location" label="Location" defaultValue={record.location} />
        <Input id="m-manager" label="Supervisor" defaultValue={record.manager} />
        <div className={formStyles.span2}>
          <Select
            id="m-reason"
            label="Reason for Leaving"
            defaultValue={record.reason}
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
          <Textarea id="m-notes" label="Notes & Responsibilities" defaultValue={record.notes} style={{ minHeight: 100 }} />
        </div>
      </div>
    </FormModal>
  )
}
