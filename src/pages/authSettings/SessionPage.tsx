import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { methodsBySection } from '../../data/authSettings'

export default function SessionPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Session & Access Control" description="Session lifecycle, timeout policies, and network-level restrictions." />
      <AuthMethodList methods={methodsBySection('session')} />
    </div>
  )
}
