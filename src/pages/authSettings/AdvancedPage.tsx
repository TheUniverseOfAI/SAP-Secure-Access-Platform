import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { methodsBySection } from '../../data/authSettings'

export default function AdvancedPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Advanced & Adaptive Security" description="Context-aware, risk-based, and policy-driven access controls." />
      <AuthMethodList methods={methodsBySection('advanced')} />
    </div>
  )
}
