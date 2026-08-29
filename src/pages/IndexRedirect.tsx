import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** "/" — sends a visitor to the dashboard if already logged in, otherwise to the login page. */
export default function IndexRedirect() {
  const { isLoggedIn } = useAuth()
  return <Navigate to={isLoggedIn ? '/home' : '/login'} replace />
}
