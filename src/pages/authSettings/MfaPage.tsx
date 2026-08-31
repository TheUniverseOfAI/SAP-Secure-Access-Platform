import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { useAuthMethodsSection } from '../../hooks/useAuthMethodsSection'

export default function MfaPage() {
  const { methods, loading, toggleMethod } = useAuthMethodsSection('mfa')
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Multi-Factor & OTP Methods" description="Second-factor verification — something you have or something you are." />
      {loading ? (
        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)' }}>Loading authentication methods…</p>
      ) : (
        <AuthMethodList methods={methods} onToggle={toggleMethod} />
      )}
    </div>
  )
}
