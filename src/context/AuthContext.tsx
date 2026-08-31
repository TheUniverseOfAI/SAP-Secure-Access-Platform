import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useAuthSettingsStore } from '../stores/useAuthSettingsStore'

const STORAGE_KEY = 'sap.auth.loggedIn'

interface AuthContextValue {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * Mock/local auth state — no backend exists yet, so this just tracks a
 * boolean in memory + localStorage (so a page refresh doesn't silently log
 * you out mid-testing). `login()`/`logout()` don't verify anything or call
 * an API; real credential checking is future backend-integration work.
 * This is the minimum needed to make Sign In/Sign Up/Logout do something
 * real and to gate the post-login routes.
 *
 * `logout()` also resets useAuthSettingsStore so a new session starts
 * from the seed auth-method defaults rather than carrying over whatever
 * the previous session toggled.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isLoggedIn))
  }, [isLoggedIn])

  const login = () => setIsLoggedIn(true)
  const logout = () => {
    setIsLoggedIn(false)
    // Reset any mock-backed state that shouldn't carry over between sessions —
    // e.g. this session's auth-method toggle changes.
    useAuthSettingsStore.getState().reset()
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
