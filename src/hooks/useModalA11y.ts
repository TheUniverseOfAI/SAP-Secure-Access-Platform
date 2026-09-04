import { useEffect, useRef } from 'react'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Full modal accessibility contract for a JS-driven dialog (not a native
 * <dialog>): focus moves into the dialog on mount, Tab/Shift+Tab is
 * trapped inside it, Escape closes it via a document-level listener (an
 * onKeyDown on the overlay div doesn't work — it only fires if something
 * inside that div already has focus, which never happens without this
 * hook), focus returns to whatever triggered the dialog on unmount, and
 * background scroll is locked while it's open.
 *
 * The setup effect deliberately has an empty dependency array and reads
 * `onClose` through a ref — re-renders (e.g. typing into a field inside
 * the modal, which recreates an inline `onClose={() => ...}` every
 * render) must not re-run mount logic and steal focus back to the first
 * field.
 */
export function useModalA11y(onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const container = containerRef.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const getFocusable = () => (container ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [])

    if (container) container.tabIndex = -1
    const focusable = getFocusable()
    ;(focusable[0] ?? container)?.focus()

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return

      const els = getFocusable()
      if (els.length === 0) return
      const first = els[0]!
      const last = els[els.length - 1]!

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      previouslyFocused?.focus()
    }
  }, [])

  return containerRef
}
