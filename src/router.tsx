import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PortalLayout from './layouts/PortalLayout'
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
import PersonalInfoPage from './pages/profile/PersonalInfoPage'
import ContactPage from './pages/profile/ContactPage'
import EmploymentPage from './pages/profile/EmploymentPage'
import IdentityPage from './pages/profile/IdentityPage'
import FinancialPage from './pages/profile/FinancialPage'
import HealthPage from './pages/profile/HealthPage'
import EducationPage from './pages/profile/EducationPage'
import DocumentsPage from './pages/profile/DocumentsPage'
import DangerZonePage from './pages/profile/DangerZonePage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * Data mode (createBrowserRouter), per the approved plan — SAP is an
 * internal SPA behind login, no SSR needed.
 *
 * The index route ("/") still redirects to /login rather than to the
 * portal — there's no real auth state yet to decide which one a visitor
 * should land on, so this defaults to the pre-login experience. Portal
 * routes are temporarily nested under /home instead of / to avoid
 * colliding with that redirect; once real auth-gated routing exists
 * (wiring phase), "/" should become "portal home if logged in, else
 * /login" and /home can likely just become / at that point.
 */
export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <PortalLayout />,
    children: [
      { path: '/home', element: <PortalHomePage /> },
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
    element: <ExternalLayout />,
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
  { path: '*', element: <NotFoundPage /> },
])
