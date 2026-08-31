import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { useAuthMethodsSection } from '../../hooks/useAuthMethodsSection'

export default function AdvancedPage() {
  const { methods, loading, toggleMethod } = useAuthMethodsSection('advanced')
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Advanced & Adaptive Security" description="Context-aware, risk-based, and policy-driven access controls." />
      {loading ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading authentication methods…</p>
      ) : (
        <AuthMethodList methods={methods} onToggle={toggleMethod} />
      )}
    </div>
  )
}
