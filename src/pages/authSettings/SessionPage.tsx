import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { useAuthMethodsSection } from '../../hooks/useAuthMethodsSection'

export default function SessionPage() {
  const { methods, loading, toggleMethod } = useAuthMethodsSection('session')
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Session & Access Control" description="Session lifecycle, timeout policies, and network-level restrictions." />
      {loading ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading authentication methods…</p>
      ) : (
        <AuthMethodList methods={methods} onToggle={toggleMethod} />
      )}
    </div>
  )
}
