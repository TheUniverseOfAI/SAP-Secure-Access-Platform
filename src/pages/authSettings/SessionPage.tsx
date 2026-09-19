import AuthMethodsPageLayout from '../../components/AuthMethodsPageLayout'

export default function SessionPage() {
  return (
    <AuthMethodsPageLayout
      section="session"
      title="Session & Access Control"
      description="Session lifecycle, timeout policies, and network-level restrictions."
    />
  )
}
