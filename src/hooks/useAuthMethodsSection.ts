import { useEffect } from 'react'
import type { AuthMethodSection } from '../data/authSettings'
import { useAuthSettingsStore } from '../stores/useAuthSettingsStore'

/** Loads the auth-methods store on first use (any of the 5 section pages, whichever loads first) and returns just one section's methods. */
export function useAuthMethodsSection(section: AuthMethodSection) {
  const methods = useAuthSettingsStore((s) => s.methods)
  const loading = useAuthSettingsStore((s) => s.loading)
  const error = useAuthSettingsStore((s) => s.error)
  const fetchMethods = useAuthSettingsStore((s) => s.fetchMethods)
  const toggleMethod = useAuthSettingsStore((s) => s.toggleMethod)

  useEffect(() => {
    if (methods.length === 0 && !loading) fetchMethods()
  }, [methods.length, loading, fetchMethods])

  return {
    methods: methods.filter((m) => m.section === section),
    loading: loading && methods.length === 0,
    error,
    toggleMethod,
  }
}
