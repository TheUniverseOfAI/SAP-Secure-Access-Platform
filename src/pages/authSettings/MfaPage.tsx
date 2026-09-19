import AuthMethodsPageLayout from '../../components/AuthMethodsPageLayout'

export default function MfaPage() {
  return (
    <AuthMethodsPageLayout
      section="mfa"
      title="Multi-Factor & OTP Methods"
      description="Second-factor verification — something you have or something you are."
    />
  )
}
