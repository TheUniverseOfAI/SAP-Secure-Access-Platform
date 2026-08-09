import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * Data mode (createBrowserRouter), per the approved plan — SAP is an
 * internal SPA behind login, no SSR needed. Only the AuthLayout route
 * group exists so far; PortalLayout/ExternalLayout routes get added once
 * those layouts are built.
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
  { path: '*', element: <NotFoundPage /> },
])
