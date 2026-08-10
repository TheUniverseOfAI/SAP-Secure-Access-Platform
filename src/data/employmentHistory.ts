export interface EmploymentHistoryRecord {
  id: number
  title: string
  company: string
  dept: string
  type: string
  startDisplay: string
  endDisplay: string | null
  location: string
  manager: string
  reason: string
  notes: string
}

/**
 * Static seed data, transcribed verbatim from sap-user-profile_v2.html's
 * `empHistory` array (rendered unconditionally on page load in the
 * source, not behind any button — so the default-rendered DOM shows a
 * populated table, not an empty state).
 */
export const employmentHistory: EmploymentHistoryRecord[] = [
  {
    id: 1,
    title: 'ML Engineer',
    company: 'DataFlow Inc.',
    dept: 'AI Research',
    type: 'Full-time',
    startDisplay: 'Jun 2021',
    endDisplay: 'Mar 2023',
    location: 'Arlington, VA',
    manager: 'Dr. Lisa Park',
    reason: 'Career Growth',
    notes:
      'Led a team of 4 building production ML pipelines. Implemented RAG systems, deployed models to Kubernetes, reduced inference latency by 40%. Technologies: Python, PyTorch, Kubeflow, AWS SageMaker.',
  },
  {
    id: 2,
    title: 'Software Developer',
    company: 'TechNova Solutions',
    dept: 'Backend Engineering',
    type: 'Full-time',
    startDisplay: 'Jan 2019',
    endDisplay: 'May 2021',
    location: 'Reston, VA',
    manager: 'Ahmed Khalil',
    reason: 'Better Compensation',
    notes:
      'Full-stack development with focus on REST APIs and microservices. Built CI/CD pipelines, PostgreSQL optimization, and containerized deployments. Stack: Node.js, Python, Docker, Jenkins.',
  },
  {
    id: 3,
    title: 'Junior Developer (Intern)',
    company: 'CloudBridge Corp',
    dept: 'Engineering',
    type: 'Intern',
    startDisplay: 'Jun 2018',
    endDisplay: 'Dec 2018',
    location: 'Washington, DC',
    manager: 'Sarah Mitchell',
    reason: 'Contract Ended',
    notes:
      'Summer internship extended to 6 months. Contributed to internal tooling dashboard, wrote unit tests, participated in code reviews. Technologies: React, Express.js, MongoDB.',
  },
]
