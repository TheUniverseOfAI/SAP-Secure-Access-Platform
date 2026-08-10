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
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
