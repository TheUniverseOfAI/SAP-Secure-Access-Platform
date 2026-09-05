import { beforeEach, describe, expect, it } from 'vitest'
import * as authApi from './authApi'

describe('authApi.login', () => {
  beforeEach(() => {
    authApi.resetLoginAttempts()
  })

  it('succeeds with the fixed demo credentials', async () => {
    const result = await authApi.login('demo', 'Password123!')
    expect(result).toEqual({ status: 'success' })
  })

  it('returns invalid for any other username/password combination', async () => {
    const result = await authApi.login('someone-else', 'wrong-password')
    expect(result).toEqual({ status: 'invalid' })
  })

  it('is case- and value-sensitive — a near-miss on the demo password still fails', async () => {
    const result = await authApi.login('demo', 'password123!')
    expect(result).toEqual({ status: 'invalid' })
  })

  it('locks the account after 5 consecutive failed attempts', async () => {
    for (let i = 0; i < 4; i++) {
      expect(await authApi.login('demo', 'wrong')).toEqual({ status: 'invalid' })
    }
    expect(await authApi.login('demo', 'wrong')).toEqual({ status: 'locked' })
  })

  it('stays locked even with correct credentials until the lockout window passes', async () => {
    for (let i = 0; i < 5; i++) {
      await authApi.login('demo', 'wrong')
    }
    const result = await authApi.login('demo', 'Password123!')
    expect(result).toEqual({ status: 'locked' })
  })

  it('a successful login resets the failed-attempt counter', async () => {
    await authApi.login('demo', 'wrong')
    await authApi.login('demo', 'wrong')
    await authApi.login('demo', 'Password123!')

    // 2 more failures shouldn't be enough to lock, since the counter reset on success above.
    await authApi.login('demo', 'wrong')
    const result = await authApi.login('demo', 'wrong')
    expect(result).toEqual({ status: 'invalid' })
  })

  it('resetLoginAttempts clears both the failure count and an active lockout', async () => {
    for (let i = 0; i < 5; i++) {
      await authApi.login('demo', 'wrong')
    }
    expect(await authApi.login('demo', 'Password123!')).toEqual({ status: 'locked' })

    authApi.resetLoginAttempts()

    expect(await authApi.login('demo', 'Password123!')).toEqual({ status: 'success' })
  })
})

describe('authApi.signup', () => {
  it('returns exists for the fixed already-registered email, case-insensitively', async () => {
    const result = await authApi.signup({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'Jane.Doe@SAP.gov',
      phone: '',
      password: 'Password123!',
    })
    expect(result).toEqual({ status: 'exists' })
  })

  it('succeeds for any other email', async () => {
    const result = await authApi.signup({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '',
      password: 'Password123!',
    })
    expect(result).toEqual({ status: 'success' })
  })
})

describe('authApi misc actions', () => {
  it('acceptConsent resolves accepted', async () => {
    await expect(authApi.acceptConsent()).resolves.toEqual({ accepted: true })
  })

  it('socialLogin and pivLogin resolve success regardless of input', async () => {
    await expect(authApi.socialLogin('Google')).resolves.toEqual({ success: true })
    await expect(authApi.pivLogin()).resolves.toEqual({ success: true })
  })

  it('completeLoginRedirect and completeSignupRedirect resolve', async () => {
    await expect(authApi.completeLoginRedirect()).resolves.toBeUndefined()
    await expect(authApi.completeSignupRedirect()).resolves.toBeUndefined()
  })
})
