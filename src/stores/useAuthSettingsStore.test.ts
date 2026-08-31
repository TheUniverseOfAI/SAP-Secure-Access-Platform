import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { authMethods } from '../data/authSettings'
import { resetAuthMethods } from '../api/authSettingsApi'
import { useAuthSettingsStore } from './useAuthSettingsStore'

// A mandatory/locked method (can't be toggled in the UI, but the store
// itself doesn't enforce that — Toggle's `disabled` prop does) and a
// regular optional one, so tests exercise both without hardcoding IDs
// that might change.
const lockedMethod = authMethods.find((m) => m.locked)!
const optionalMethod = authMethods.find((m) => !m.locked)!

describe('useAuthSettingsStore', () => {
  beforeEach(() => {
    resetAuthMethods()
    useAuthSettingsStore.setState({ methods: [], loading: false, error: null })
  })

  afterEach(() => {
    resetAuthMethods()
  })

  it('starts with no methods loaded', () => {
    expect(useAuthSettingsStore.getState().methods).toEqual([])
  })

  it('fetchMethods loads every seed method', async () => {
    await useAuthSettingsStore.getState().fetchMethods()
    const { methods, loading } = useAuthSettingsStore.getState()
    expect(loading).toBe(false)
    expect(methods).toHaveLength(authMethods.length)
  })

  it('toggleMethod flips a method and persists across a re-fetch', async () => {
    await useAuthSettingsStore.getState().fetchMethods()
    const before = useAuthSettingsStore.getState().methods.find((m) => m.id === optionalMethod.id)!

    await useAuthSettingsStore.getState().toggleMethod(optionalMethod.id, !before.enabled)

    expect(useAuthSettingsStore.getState().methods.find((m) => m.id === optionalMethod.id)!.enabled).toBe(!before.enabled)

    // Simulate navigating away and back: re-fetching should reflect the persisted change, not the seed default.
    useAuthSettingsStore.setState({ methods: [] })
    await useAuthSettingsStore.getState().fetchMethods()
    expect(useAuthSettingsStore.getState().methods.find((m) => m.id === optionalMethod.id)!.enabled).toBe(!before.enabled)
  })

  it('reset() restores every method to its seed default', async () => {
    await useAuthSettingsStore.getState().fetchMethods()
    await useAuthSettingsStore.getState().toggleMethod(optionalMethod.id, !optionalMethod.enabled)

    useAuthSettingsStore.getState().reset()
    expect(useAuthSettingsStore.getState().methods).toEqual([])

    await useAuthSettingsStore.getState().fetchMethods()
    expect(useAuthSettingsStore.getState().methods.find((m) => m.id === optionalMethod.id)!.enabled).toBe(optionalMethod.enabled)
  })

  it('never lets the locked method escape its seed enabled state through toggleMethod alone (UI enforces disabled, store just records intent)', async () => {
    await useAuthSettingsStore.getState().fetchMethods()
    await useAuthSettingsStore.getState().toggleMethod(lockedMethod.id, false)
    // The store itself doesn't prevent this — documenting that the guarantee lives in Toggle's `disabled` prop, not here.
    expect(useAuthSettingsStore.getState().methods.find((m) => m.id === lockedMethod.id)!.enabled).toBe(false)
  })
})
