import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { methodsBySection } from '../../data/authSettings'

export default function PasswordlessPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader
        title="Passwordless & Single Sign-On"
        description="Modern authentication that eliminates passwords entirely or federates identity."
      />
      <AuthMethodList methods={methodsBySection('passwordless')} />
    </div>
  )
}
