import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginPage from './LoginPage'

const navigateMock = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => navigateMock }
})

const loginMock = vi.fn()
vi.mock('../context/useAuth', () => ({
  useAuth: () => ({ isLoggedIn: false, login: loginMock, logout: vi.fn() }),
}))

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  navigateMock.mockClear()
  loginMock.mockClear()
})

/** Accepting consent is itself async (goes through authApi.acceptConsent) — wait for it to actually land before relying on consentAccepted, or every other control is still disabled. */
async function acceptConsent(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /i understand & agree/i }))
  await waitFor(() => expect(screen.getByRole('button', { name: /acknowledged/i })).toBeInTheDocument())
}

/**
 * Every alternate sign-in path (OTP, social/SSO, Magic Link's demo
 * simulation) used to dead-end at a success message with no real effect.
 * These tests confirm each one now actually completes the login job —
 * calling login() and navigating to /home — the same as the password path.
 */
describe('LoginPage alternate sign-in completion', () => {
  it(
    'completes login via the OTP Code modal',
    async () => {
      const user = userEvent.setup()
      renderLoginPage()

      await acceptConsent(user)
      await user.click(screen.getByRole('button', { name: /^otp code$/i }))
      await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
      await user.click(screen.getByRole('button', { name: /send code/i }))
      await user.click(screen.getByRole('button', { name: /verify & sign in/i }))

      await waitFor(() => expect(loginMock).toHaveBeenCalledTimes(1), { timeout: 5000 })
      expect(navigateMock).toHaveBeenCalledWith('/home')
    },
    10000,
  )

  it(
    'completes login via a social provider (SSO)',
    async () => {
      const user = userEvent.setup()
      renderLoginPage()

      await acceptConsent(user)
      await user.click(screen.getByRole('button', { name: /^sso$/i }))

      await waitFor(() => expect(loginMock).toHaveBeenCalledTimes(1), { timeout: 5000 })
      expect(navigateMock).toHaveBeenCalledWith('/home')
    },
    10000,
  )

  it(
    'completes login via Magic Link’s demo "simulate opening the link" button',
    async () => {
      const user = userEvent.setup()
      renderLoginPage()

      await acceptConsent(user)
      await user.click(screen.getByRole('button', { name: /^magic link$/i }))
      await user.type(screen.getByLabelText(/your email address/i), 'jane@example.com')
      await user.click(screen.getByRole('button', { name: /send magic link/i }))
      await user.click(screen.getByRole('button', { name: /simulate opening the link/i }))

      await waitFor(() => expect(loginMock).toHaveBeenCalledTimes(1), { timeout: 5000 })
      expect(navigateMock).toHaveBeenCalledWith('/home')
    },
    10000,
  )

  it(
    'does not log in if consent has not been accepted',
    async () => {
      const user = userEvent.setup()
      renderLoginPage()

      await user.click(screen.getByRole('button', { name: /^sso$/i }))

      expect(loginMock).not.toHaveBeenCalled()
      expect(navigateMock).not.toHaveBeenCalled()
    },
    10000,
  )
})
