import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { useAuthMethodsSection } from '../../hooks/useAuthMethodsSection'

export default function PasswordsPage() {
  const { methods, loading, toggleMethod } = useAuthMethodsSection('passwords')
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Password & Credential Methods" description="Core identity verification through something you know." />
      {loading ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading authentication methods…</p>
      ) : (
        <AuthMethodList methods={methods} onToggle={toggleMethod} />
      )}
    </div>
  )
}
