import { create } from 'zustand'
import { getAuthMethods, resetAuthMethods, updateAuthMethod } from '../api/authSettingsApi'
import type { AuthMethod } from '../data/authSettings'

interface AuthSettingsState {
  methods: AuthMethod[]
  loading: boolean
  error: string | null
  fetchMethods: () => Promise<void>
  toggleMethod: (id: string, enabled: boolean) => Promise<void>
  reset: () => void
}

/**
 * First real Zustand store in the app — the reference implementation for
 * wiring a page through the new src/api/ layer. Toggling a method updates
 * optimistically (the switch flips immediately) then confirms against the
 * mock API; a real backend failure path would revert on error the same
 * way. `reset()` is called from AuthContext.logout() so a fresh login
 * doesn't inherit a previous session's toggle changes.
 */
export const useAuthSettingsStore = create<AuthSettingsState>((set, get) => ({
  methods: [],
  loading: false,
  error: null,

  fetchMethods: async () => {
    set({ loading: true, error: null })
    try {
      const methods = await getAuthMethods()
      set({ methods, loading: false })
    } catch {
      set({ loading: false, error: 'Failed to load authentication methods.' })
    }
  },

  toggleMethod: async (id, enabled) => {
    const previous = get().methods
    set({ methods: previous.map((m) => (m.id === id ? { ...m, enabled } : m)) })
    try {
      await updateAuthMethod(id, enabled)
    } catch {
      set({ methods: previous, error: 'Failed to update the method — please try again.' })
    }
  },

  reset: () => {
    resetAuthMethods()
    set({ methods: [], loading: false, error: null })
  },
}))
