import { createBrowserRouter, Navigate } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import AuthLayout from './layouts/AuthLayout'
import IndexRedirect from './pages/IndexRedirect'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PortalLayout from './layouts/PortalLayout'
import HomePage from './pages/HomePage'
import PortalHomePage from './pages/PortalHomePage'
import PortalsPage from './pages/PortalsPage'
import LeadershipPage from './pages/LeadershipPage'
import AboutPage from './pages/AboutPage'
import { PrivacyOverviewPage, PrivacyCollectionPage, PrivacySharingPage, PrivacyRightsPage } from './pages/detail/PrivacyPages'
import {
  AccessibilityStatementPage,
  AccessibilityStandardsPage,
  AccessibilityFeaturesPage,
  AccessibilityReportPage,
} from './pages/detail/AccessibilityPages'
import { TermsAgreementPage, TermsUsagePage, TermsLimitsPage } from './pages/detail/TermsPages'
import { StatusCurrentPage, StatusIncidentsPage, StatusMaintenancePage, StatusUptimePage } from './pages/detail/StatusPages'
import { SecurityOverviewPage, SecurityCompliancePage, SecurityVulnPage, SecurityIncidentPage } from './pages/detail/SecurityPages'
import { HelpFaqPage, HelpKbPage, HelpGuidesPage, HelpTicketPage } from './pages/detail/HelpPages'
import { ContactGeneralPage, ContactSupportPage, ContactSalesPage } from './pages/detail/ContactPages'
import ExternalLayout from './layouts/ExternalLayout'
import ExternalHeader from './layouts/ExternalHeader'
import ExternalSidebar from './layouts/ExternalSidebar'
import AuthSettingsSidebar from './layouts/AuthSettingsSidebar'
import PersonalInfoPage from './pages/profile/PersonalInfoPage'
import ContactPage from './pages/profile/ContactPage'
import EmploymentPage from './pages/profile/EmploymentPage'
import IdentityPage from './pages/profile/IdentityPage'
import FinancialPage from './pages/profile/FinancialPage'
import HealthPage from './pages/profile/HealthPage'
import EducationPage from './pages/profile/EducationPage'
import DocumentsPage from './pages/profile/DocumentsPage'
import DangerZonePage from './pages/profile/DangerZonePage'
import IntroPage from './pages/authSettings/IntroPage'
import PasswordsPage from './pages/authSettings/PasswordsPage'
import MfaPage from './pages/authSettings/MfaPage'
import PasswordlessPage from './pages/authSettings/PasswordlessPage'
import AdvancedPage from './pages/authSettings/AdvancedPage'
import SessionPage from './pages/authSettings/SessionPage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * Data mode (createBrowserRouter), per the approved plan — SAP is an
 * internal SPA behind login, no SSR needed.
 *
 * "/" now resolves via IndexRedirect: /home if logged in, /login
 * otherwise (real auth-gated routing, per the wiring phase). The
 * PortalLayout and both ExternalLayout route groups are wrapped in
 * RequireAuth, which bounces an unauthenticated visitor to /login before
 * any of those pages render. Portal routes stay nested under /home
 * rather than / — moving them to / would collide with the index
 * redirect's own path.
 */
const routes = [
  { index: true, element: <IndexRedirect /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <PortalLayout />,
        children: [
          { path: '/home', element: <HomePage /> },
          { path: '/dashboard', element: <PortalHomePage /> },
          { path: '/portals', element: <PortalsPage /> },
          { path: '/leadership', element: <LeadershipPage /> },
          { path: '/about', element: <AboutPage /> },

          { path: '/privacy/overview', element: <PrivacyOverviewPage /> },
          { path: '/privacy/data-collection', element: <PrivacyCollectionPage /> },
          { path: '/privacy/data-sharing', element: <PrivacySharingPage /> },
          { path: '/privacy/your-rights', element: <PrivacyRightsPage /> },

          { path: '/accessibility/statement', element: <AccessibilityStatementPage /> },
          { path: '/accessibility/standards', element: <AccessibilityStandardsPage /> },
          { path: '/accessibility/features', element: <AccessibilityFeaturesPage /> },
          { path: '/accessibility/report', element: <AccessibilityReportPage /> },

          { path: '/terms/agreement', element: <TermsAgreementPage /> },
          { path: '/terms/acceptable-use', element: <TermsUsagePage /> },
          { path: '/terms/limitations', element: <TermsLimitsPage /> },

          { path: '/status/current', element: <StatusCurrentPage /> },
          { path: '/status/incidents', element: <StatusIncidentsPage /> },
          { path: '/status/maintenance', element: <StatusMaintenancePage /> },
          { path: '/status/uptime', element: <StatusUptimePage /> },

          { path: '/security/overview', element: <SecurityOverviewPage /> },
          { path: '/security/compliance', element: <SecurityCompliancePage /> },
          { path: '/security/vulnerability', element: <SecurityVulnPage /> },
          { path: '/security/incident-response', element: <SecurityIncidentPage /> },

          { path: '/help/faq', element: <HelpFaqPage /> },
          { path: '/help/knowledge-base', element: <HelpKbPage /> },
          { path: '/help/guides', element: <HelpGuidesPage /> },
          { path: '/help/ticket', element: <HelpTicketPage /> },

          { path: '/contact/general', element: <ContactGeneralPage /> },
          { path: '/contact/support', element: <ContactSupportPage /> },
          { path: '/contact/sales', element: <ContactSalesPage /> },
        ],
      },
      {
        element: <ExternalLayout header={<ExternalHeader />} sidebar={<ExternalSidebar />} />,
        children: [
          { path: '/profile', element: <Navigate to="/profile/personal" replace /> },
          { path: '/profile/personal', element: <PersonalInfoPage /> },
          { path: '/profile/contact', element: <ContactPage /> },
          { path: '/profile/employment', element: <EmploymentPage /> },
          { path: '/profile/identity', element: <IdentityPage /> },
          { path: '/profile/financial', element: <FinancialPage /> },
          { path: '/profile/health', element: <HealthPage /> },
          { path: '/profile/education', element: <EducationPage /> },
          { path: '/profile/documents', element: <DocumentsPage /> },
          { path: '/profile/danger', element: <DangerZonePage /> },
        ],
      },
      {
        element: (
          <ExternalLayout
            header={<ExternalHeader subtitle="Authentication & Authorization" showAvatar={false} />}
            sidebar={<AuthSettingsSidebar />}
          />
        ),
        children: [
          { path: '/auth-settings', element: <Navigate to="/auth-settings/intro" replace /> },
          { path: '/auth-settings/intro', element: <IntroPage /> },
          { path: '/auth-settings/passwords', element: <PasswordsPage /> },
          { path: '/auth-settings/mfa', element: <MfaPage /> },
          { path: '/auth-settings/passwordless', element: <PasswordlessPage /> },
          { path: '/auth-settings/advanced', element: <AdvancedPage /> },
          { path: '/auth-settings/session', element: <SessionPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]

// import.meta.env.BASE_URL reflects vite.config.ts's `base` — "/" locally,
// "/SAP-Secure-Access-Platform/" in the GitHub Pages build. Strip the
// trailing slash since React Router expects a bare basename (or "").
export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
})
