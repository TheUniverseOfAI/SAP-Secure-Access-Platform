import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import { TeamCard, TeamGrid } from '../components/TeamCard'
import { leadershipTeam } from '../data/leadership'
import Breadcrumb from '../layouts/Breadcrumb'
import styles from './LeadershipPage.module.css'

/** Real leadership page — full visual parity with sap-portal_v2.html's #page-leadership block. */
export default function LeadershipPage() {
  return (
    <>
      <Breadcrumb current="Leadership" />
      <div className={styles.page}>
        <PageHeader title="Leadership Team" description="The people building and securing the Secure Access Platform." />
        <Card>
          <TeamGrid>
            {leadershipTeam.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </TeamGrid>
        </Card>
      </div>
    </>
  )
}
