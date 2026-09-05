import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('renders a labeled, non-required field with no error/hint by default', () => {
    render(<Input id="name" label="Name" />)
    const input = screen.getByLabelText('Name')
    expect(input).toBeInTheDocument()
    expect(input).not.toBeDisabled()
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('shows the required marker and sets aria-required', () => {
    render(<Input id="email" label="Email" required />)
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('aria-required', 'true')
  })

  it('renders an error message with role="alert" and marks the field invalid', () => {
    render(<Input id="pw" label="Password" errorMessage="Password is required" />)
    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'pw-error')
    expect(screen.getByRole('alert')).toHaveTextContent('Password is required')
  })

  it('renders a hint when there is no error, and hides it once an error appears', () => {
    const { rerender } = render(<Input id="u" label="Username" hint="Demo: demo / Password123!" />)
    expect(screen.getByText('Demo: demo / Password123!')).toBeInTheDocument()

    rerender(<Input id="u" label="Username" hint="Demo: demo / Password123!" errorMessage="Required" />)
    expect(screen.queryByText('Demo: demo / Password123!')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('errorMessage takes precedence over success styling', () => {
    render(<Input id="e" label="Email" success errorMessage="Invalid" />)
    const input = screen.getByLabelText('Email')
    expect(input.className).toContain('inputError')
    expect(input.className).not.toContain('inputSuccess')
  })

  it('applies the success class when success is set and there is no error', () => {
    render(<Input id="e2" label="Email" success />)
    expect(screen.getByLabelText('Email').className).toContain('inputSuccess')
  })

  it('disables the field and does not fire onChange when disabled', () => {
    render(<Input id="d" label="Disabled field" disabled value="" onChange={() => {}} />)
    expect(screen.getByLabelText('Disabled field')).toBeDisabled()
  })
})
