import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationsPanel from '../components/NotificationsPanel'
import { notifications } from '../data/notifications'
import styles from './AppHeader.module.css'

interface AppHeaderProps {
  /** Whether the sidebar's nav content is currently fully visible (desktop: not collapsed; mobile: overlay open) — reflected via aria-expanded. */
  navExpanded: boolean
  onToggleSidebar: () => void
}

/**
 * Header shell for post-login pages (portal home, profile, auth-settings).
 * Ported from sap-package/app-files/sap-portal_v2.html's <header class="header">.
 *
 * Deliberately richer than AuthHeader (menu toggle, search, notification/
 * settings icons, avatar) since there's an authenticated user and app
 * chrome to control. Kept as a separate component from AuthHeader rather
 * than one Header-with-a-variant-prop — see AuthHeader.tsx's comment and
 * the layout-structure discussion that led to this split.
 *
 * The menu toggle now drives real sidebar state (owned by PortalLayout —
 * see its header comment), reflected here via aria-expanded. The search
 * box really searches (Enter navigates to /portals?q=..., which filters
 * the portals grid by name/description — see PortalsPage.tsx). Notifications
 * opens a real dropdown (mock content — src/data/notifications.ts, since
 * no real notification system exists). Settings navigates to
 * /profile/personal, the closest thing this app has to an account-settings
 * destination. None of these three were wired in the source either (all
 * fully dead there too), but each has a real, sensible destination now,
 * per the "everything should navigate to a real destination" direction
 * also applied to Recent Activity. The avatar shows placeholder
 * initials with no real user data or account menu, but IS wired to
 * navigate to Leadership — source markup has no dropdown menu on it,
 * just onclick="navigateTo('leadership',...)".
 */
export default function AppHeader({ navExpanded, onToggleSidebar }: AppHeaderProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!notificationsOpen) return
    const handleClickAway = (e: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [notificationsOpen])

  const handleSearch = () => {
    const trimmed = query.trim()
    navigate(trimmed ? `/portals?q=${encodeURIComponent(trimmed)}` : '/portals')
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className={styles.header} role="banner">
      <div className={styles.left}>
        <button className={styles.menuToggle} aria-label="Toggle sidebar navigation" aria-expanded={navExpanded} onClick={onToggleSidebar}>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className={styles.brand}>
          <svg viewBox="0 0 80 80" fill="none" width="34" height="34" aria-hidden="true">
            <path d="M40 4L72 18V40C72 58 58 72 40 76C22 72 8 58 8 40V18Z" fill="#1a4080" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path d="M40 10L66 22V40C66 55 54 67 40 70C26 67 14 55 14 40V22Z" fill="rgba(59,130,246,0.15)" />
            <ellipse cx="24" cy="24" rx="5" ry="4" fill="#4b5563" opacity=".8" />
            <ellipse cx="56" cy="24" rx="5" ry="4" fill="#4b5563" opacity=".8" />
            <path d="M20 30C20 22 28 16 40 16C52 16 60 22 60 30V44C60 52 52 58 40 58C28 58 20 52 20 44Z" fill="#374151" />
            <path d="M40 14C44 14 50 16 54 20L40 28L26 20C30 16 36 14 40 14Z" fill="#e5e7eb" opacity=".92" />
            <path d="M40 16C43 16 48 17.5 51 20L40 26L29 20C32 17.5 37 16 40 16Z" fill="#f9fafb" opacity=".55" />
            <ellipse cx="32" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity=".9" />
            <ellipse cx="48" cy="34" rx="5.5" ry="5" fill="#1f2937" opacity=".9" />
            <circle cx="33" cy="33.5" r="1.8" fill="#3b82f6" opacity=".9" />
            <circle cx="47" cy="33.5" r="1.8" fill="#3b82f6" opacity=".9" />
            <circle cx="33.3" cy="33.2" r=".8" fill="#dbeafe" />
            <circle cx="47.3" cy="33.2" r=".8" fill="#dbeafe" />
            <ellipse cx="40" cy="42" rx="3.5" ry="2.5" fill="#1f2937" />
            <path d="M36 46Q40 49 44 46" stroke="#1f2937" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".6" />
            <text x="40" y="68" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="9" fontWeight="700" fill="#dbeafe" letterSpacing="2.5">
              SAP
            </text>
          </svg>
          <div className={styles.title}>
            <b>SAP</b> — Secure Access Platform
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.search} role="search">
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search…"
            aria-label="Search SAP portal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
          />
        </div>
        <div className={styles.notificationsWrap} ref={notificationsRef}>
          <button
            className={styles.iconBtn}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            onClick={() => setNotificationsOpen((prev) => !prev)}
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {unreadCount > 0 && <span className={styles.dot} aria-hidden="true" />}
          </button>
          {notificationsOpen && <NotificationsPanel notifications={notifications} />}
        </div>
        <button className={styles.iconBtn} aria-label="Settings" onClick={() => navigate('/profile/personal')}>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        <button className={styles.avatar} aria-label="Muhanned Alogaidi" onClick={() => navigate('/leadership')}>
          MA
        </button>
      </div>
    </header>
  )
}
