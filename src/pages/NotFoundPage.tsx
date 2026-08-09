import { Link } from 'react-router-dom'

/** Minimal — not styled to match any specific source page yet, just a functional catch-all. */
export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem', fontFamily: 'var(--font-sans, sans-serif)' }}>
      <h1>404 — Page not found</h1>
      <p>
        <Link to="/login">Back to Sign In</Link>
      </p>
    </div>
  )
}
