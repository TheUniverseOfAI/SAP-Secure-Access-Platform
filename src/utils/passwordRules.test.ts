import { describe, expect, it } from 'vitest'
import { isPasswordValid, strengthScore } from './passwordRules'

describe('isPasswordValid', () => {
  it('rejects an empty password', () => {
    expect(isPasswordValid('')).toBe(false)
  })

  it('rejects a password missing a special character', () => {
    expect(isPasswordValid('Abcdefgh1234')).toBe(false)
  })

  it('rejects a password shorter than 12 characters', () => {
    expect(isPasswordValid('Ab1!Ab1!')).toBe(false)
  })

  it('rejects a password containing spaces', () => {
    expect(isPasswordValid('Abcdefg 123!')).toBe(false)
  })

  it('accepts a password meeting every rule', () => {
    expect(isPasswordValid('Abcdefgh123!')).toBe(true)
  })
})

describe('strengthScore', () => {
  it('scores an empty password at 0', () => {
    expect(strengthScore('')).toBe(0)
  })

  it('scores a long password with mixed case, numbers, and symbols at 4 (Strong)', () => {
    expect(strengthScore('Abcdefgh123!')).toBe(4)
  })

  it('scores a short all-lowercase password low', () => {
    expect(strengthScore('abc')).toBe(0)
  })
})
