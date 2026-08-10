export interface TeamMember {
  initials: string
  color: string
  name: string
  role: string
}

/** Source: the team-card list in sap-portal_v2.html's #page-leadership block. */
export const leadershipTeam: TeamMember[] = [
  { initials: 'SK', color: 'linear-gradient(135deg,#1d5cbf,#3b82f6)', name: 'Sarah Kim', role: 'Chief Executive Officer' },
  { initials: 'JM', color: 'linear-gradient(135deg,#0d9488,#14b8a6)', name: 'James Martinez', role: 'Chief Technology Officer' },
  { initials: 'AP', color: 'linear-gradient(135deg,#9333ea,#a855f7)', name: 'Aisha Patel', role: 'VP of Engineering' },
  { initials: 'DL', color: 'linear-gradient(135deg,#ea580c,#f97316)', name: 'David Liu', role: 'Chief Security Officer' },
  { initials: 'RN', color: 'linear-gradient(135deg,#db2777,#ec4899)', name: 'Rachel Nakamura', role: 'VP of Product' },
  { initials: 'TW', color: 'linear-gradient(135deg,#4b5563,#6b7280)', name: 'Thomas Weber', role: 'Head of Compliance' },
  { initials: 'KR', color: 'linear-gradient(135deg,#0891b2,#06b6d4)', name: 'Kevin Rodriguez', role: 'VP of Sales & Partnerships' },
  { initials: 'FH', color: 'linear-gradient(135deg,#16a34a,#22c55e)', name: 'Fatima Hassan', role: 'Head of AI/ML Engineering' },
]
