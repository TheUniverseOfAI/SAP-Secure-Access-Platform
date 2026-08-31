import { createContext } from 'react'

export interface AuthContextValue {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

/**
 * The bare context object, split out from AuthContext.tsx/useAuth.ts so
 * neither of those files exports anything but one component/hook each —
 * keeps react-refresh/only-export-components happy (mixing a component
 * and a non-component export in one file breaks Fast Refresh for it).
 */
export const AuthContext = createContext<AuthContextValue | null>(null)
