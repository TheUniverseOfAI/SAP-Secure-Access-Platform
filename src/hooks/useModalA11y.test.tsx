import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useModalA11y } from './useModalA11y'

/** Minimal stand-in for Modal/FormModal — just enough markup to exercise the hook's real behavior. */
function TestModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useModalA11y(onClose)
  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Test dialog">
      <button>First</button>
      <button>Last</button>
    </div>
  )
}

function Harness({ onClose }: { onClose: () => void }) {
  const triggerRef = useRef<HTMLButtonElement>(null)
  return (
    <div>
      <button ref={triggerRef}>Open modal</button>
      <TestModal onClose={onClose} />
    </div>
  )
}

afterEach(() => {
  document.body.style.overflow = ''
})

describe('useModalA11y', () => {
  it('moves focus to the first focusable element inside the dialog on mount', () => {
    render(<Harness onClose={() => {}} />)
    expect(screen.getByText('First')).toHaveFocus()
  })

  it('closes on Escape even when focus is on the first field (document-level listener, not overlay onKeyDown)', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<Harness onClose={onClose} />)

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('traps Tab so it cycles from the last focusable element back to the first', async () => {
    const user = userEvent.setup()
    render(<Harness onClose={() => {}} />)

    screen.getByText('Last').focus()
    await user.tab()

    expect(screen.getByText('First')).toHaveFocus()
  })

  it('traps Shift+Tab so it cycles from the first focusable element to the last', async () => {
    const user = userEvent.setup()
    render(<Harness onClose={() => {}} />)

    screen.getByText('First').focus()
    await user.tab({ shift: true })

    expect(screen.getByText('Last')).toHaveFocus()
  })

  it('locks body scroll while mounted', () => {
    const { unmount } = render(<Harness onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('restores focus to whatever was focused before the modal mounted, once it unmounts', () => {
    render(<button>Open modal</button>)
    const trigger = screen.getByText('Open modal')
    trigger.focus()
    expect(trigger).toHaveFocus()

    // Mounting the modal (as a sibling in the DOM, same as it would be conditionally
    // rendered alongside the trigger in a real page) steals focus into the dialog.
    const { unmount } = render(<TestModal onClose={() => {}} />)
    expect(trigger).not.toHaveFocus()

    unmount()
    expect(trigger).toHaveFocus()
  })
})
