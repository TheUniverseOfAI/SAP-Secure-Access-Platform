import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { methodsBySection } from '../../data/authSettings'

export default function PasswordsPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Password & Credential Methods" description="Core identity verification through something you know." />
      <AuthMethodList methods={methodsBySection('passwords')} />
    </div>
  )
}
