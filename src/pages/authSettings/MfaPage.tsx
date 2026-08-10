import { AuthMethodList } from '../../components/AuthMethodCard'
import PageHeader from '../../components/PageHeader'
import { methodsBySection } from '../../data/authSettings'

export default function MfaPage() {
  return (
    <div style={{ padding: 32 }}>
      <PageHeader title="Multi-Factor & OTP Methods" description="Second-factor verification — something you have or something you are." />
      <AuthMethodList methods={methodsBySection('mfa')} />
    </div>
  )
}
