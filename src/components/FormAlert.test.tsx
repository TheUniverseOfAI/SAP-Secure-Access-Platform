import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import FormAlert from './FormAlert'

describe('FormAlert', () => {
  it('renders its message with an assertive live alert role', () => {
    render(<FormAlert type="error">Please fill in all required fields.</FormAlert>)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Please fill in all required fields.')
    expect(alert).toHaveAttribute('aria-live', 'assertive')
  })

  it.each([
    ['error', 'error'],
    ['warning', 'warning'],
    ['success', 'success'],
  ] as const)('applies the %s type class', (type, expectedClassFragment) => {
    render(<FormAlert type={type}>message</FormAlert>)
    expect(screen.getByRole('alert').className).toContain(expectedClassFragment)
  })
})
