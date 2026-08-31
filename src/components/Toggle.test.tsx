import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Toggle from './Toggle'

describe('Toggle', () => {
  it('reflects the checked prop in the accessible switch state and label text', () => {
    render(<Toggle id="t1" label="Test method" checked={true} onChange={() => {}} />)
    expect(screen.getByRole('switch')).toBeChecked()
    expect(screen.getByText('Enabled')).toBeInTheDocument()
  })

  it('shows "Disabled" and an unchecked switch when checked is false', () => {
    render(<Toggle id="t2" label="Test method" checked={false} onChange={() => {}} />)
    expect(screen.getByRole('switch')).not.toBeChecked()
    expect(screen.getByText('Disabled')).toBeInTheDocument()
  })

  it('calls onChange with the new value when clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Toggle id="t3" label="Test method" checked={false} onChange={onChange} />)

    await user.click(screen.getByRole('switch'))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Toggle id="t4" label="Test method" checked={true} onChange={onChange} disabled />)

    await user.click(screen.getByRole('switch'))

    expect(onChange).not.toHaveBeenCalled()
  })
})
