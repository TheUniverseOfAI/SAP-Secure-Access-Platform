import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest'

// RTL's auto-cleanup-after-each only self-registers when Vitest's `globals`
// option is on; this project keeps test/expect/etc. as explicit imports
// instead, so cleanup is wired up here.
afterEach(() => {
  cleanup()
})
