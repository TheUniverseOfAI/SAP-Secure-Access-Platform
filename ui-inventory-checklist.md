# SAP UI Inventory — Every Element, Every Tier

A full file-by-file inventory of `sap-web`, refreshed for the current state of the codebase — the previous version (Aug 29) predates the entire wiring phase (mock API layer, Zustand stores, auth context, real login/signup behavior, the document uploader, and the unit test suite), so counts below were re-verified directly against the filesystem and router rather than carried over.

**Route count check:** `src/router.tsx` declares **52 route entries**, resolving to **51 exported page components** across **32 page files** (some files, like the 7 `detail/*Pages.tsx` files, export multiple named page components — e.g. `PrivacyPages.tsx` exports all 4 Privacy sub-pages). Every page listed below has a matching route.

---

## Tier 1 — Shell (2 files)

| File | Role |
|---|---|
| `src/main.tsx` | Mounts the app — imports `global.css`, wraps `<RouterProvider>` in `<AuthProvider>`. Still no separate `App.tsx`; `AuthProvider` is the one piece of provider-stack state the app needs, so `main.tsx` stays the whole shell. |
| `src/router.tsx` | `createBrowserRouter` — every route in the app, in one place. |

## Tier 2 — Layouts (11 files)

| File | Covers |
|---|---|
| `AuthLayout.tsx` | Wraps Login/Signup/Forgot-Password |
| `AuthHeader.tsx` | Pre-login header |
| `AuthFooter.tsx` | Pre-login footer |
| `PortalLayout.tsx` | Wraps all post-login portal pages |
| `AppHeader.tsx` | Post-login header — real search (filters the Portals catalog), a real notifications dropdown (fetched via `notificationsApi`), settings, avatar, sidebar toggle |
| `Sidebar.tsx` | Main post-login nav tree |
| `MainFooter.tsx` | Post-login footer |
| `ExternalLayout.tsx` | Wraps Profile + Auth Settings |
| `ExternalHeader.tsx` | Shared header for both ExternalLayout sections |
| `ExternalSidebar.tsx` | Profile section sidebar |
| `AuthSettingsSidebar.tsx` | Auth Settings section sidebar |

*(`Breadcrumb.tsx` moved to `src/components/` during the Round 2 structure review — it doesn't render an `<Outlet/>` or provide section chrome the way the 11 files above do; it's a reusable nav aid consumed by `DetailLayout`, a Container, which made it the odd one out in this folder.)*

## Tier 2.5 — Route guard (1 file, `src/components/RequireAuth.tsx`)

Redirects to `/login` when `AuthContext`'s `isLoggedIn` is false; wraps the `PortalLayout`/`ExternalLayout` route groups in `router.tsx`. Not a Layout itself — sits between the Router and Layout tiers.

## Tier 3 — Pages (51 page components across 32 files)

**Top-level (10):** `LoginPage` · `SignupPage` · `ForgotPasswordPage` · `HomePage` · `PortalHomePage` · `PortalsPage` · `LeadershipPage` · `AboutPage` · `IndexRedirect` · `NotFoundPage`

**Detail sub-pages (26, across 7 files):**
- Privacy (4): Overview, Data Collection, Data Sharing, Your Rights
- Accessibility (4): Statement, Standards, Features, Report
- Terms (3): Agreement, Acceptable Use, Limitations
- Status (4): Current, Incidents, Maintenance, Uptime
- Security (4): Overview, Compliance, Vulnerability, Incident Response
- Help (4): FAQ, Knowledge Base, Guides, Ticket
- Contact (3): General, Support, Sales

**Profile tabs (9):** Personal Info · Contact · Employment · Identity · Financial · Health · Education · Documents · Danger Zone

**Auth Settings (6):** Intro · Passwords · MFA · Passwordless · Advanced · Session

New since the last inventory: `HomePage` (news + weather landing page, `/home`) — `PortalHomePage` (the original dashboard) moved to `/dashboard`.

## Tier 4 — Components (51 files, `src/components/`)

Rough split by role (all live in the same folder — this is a conceptual grouping, not a physical one):

**Containers / shells** (page-specific composition, not reused elsewhere): `AuthCard` · `DetailLayout` · `Modal` · `FormModal` · `AddCardModal` · `EditEmploymentModal` · `MagicLinkModal` · `OtpCodeModal`

**Composite components** (reusable, built from primitives): `NavGroup` · `NavItem` · `SbNavItem` · `StatCard` · `QuickCard` · `ActivityItem` · `DocItem` · `PortalCard` · `TeamCard` · `AuthMethodCard` · `VerifyCard` · `ThreatCard` · `StatusRow` · `WizardHeader` · `WizardProgress` · `OtpInputGroup` · `PasswordStrengthMeter` · `PortalFilter` · `ConsentBanner` · `DocDropzone` · `UploadQueueItem` · `NotificationsPanel` · `NewsCard` · `WeatherWidget` · `ButtonRow` · `ResendRow` · `SuccessVisual` · `FormAlert` · `AlertBanner` · `Breadcrumb`

**Primitives** (smallest reusable units): `Button` · `Input` · `PasswordField` · `Select` · `Textarea` · `Checkbox` · `Toggle` · `Card` · `Divider` · `InfoTip` · `PageHeader` · `Tabs`

New since the last inventory: `UploadQueueItem` (upload progress/error row), `FormAlert` (now with error/warning/success types), `NotificationsPanel`, `NewsCard`, `WeatherWidget`, `ThreatCard`, `AlertBanner`.

## Tier 5 — Mock API layer (7 files, `src/api/`)

| File | Backs |
|---|---|
| `client.ts` | Shared `request<T>(data, latencyMs)` — every function below funnels through this to simulate real network latency |
| `authApi.ts` | Login (demo credentials, invalid/lockout handling), signup (duplicate-email handling), consent, social/PIV login, redirect-delay helpers |
| `authSettingsApi.ts` | The 23 toggleable auth methods |
| `documentsApi.ts` | Documents tab CRUD |
| `activityApi.ts` | Dashboard's Recent Activity feed |
| `notificationsApi.ts` | Header notifications dropdown |
| `portalsApi.ts` | Portals catalog + header search |

Each is an in-memory mock "database" seeded from a matching `src/data/*.ts` file, mutated in place by its own `get*`/`add*`/`update*`/`delete*` functions — this is the layer a real backend integration would replace, without any caller needing to change.

## Tier 6 — Zustand stores (2 files, `src/stores/`)

`useAuthSettingsStore` (wraps `authSettingsApi`) · `useDocumentsStore` (wraps `documentsApi`) — the two domains with client-side state complex enough to warrant a store rather than a page calling the API layer directly.

## Tier 7 — Context (3 files, `src/context/`)

`AuthContext.tsx` (the `AuthProvider` component) · `authContextInstance.ts` (the bare context object) · `useAuth.ts` (the consumer hook) — split across three files specifically to satisfy `react-refresh/only-export-components`, since mixing a component export with plain-value/hook exports in one file breaks Fast Refresh for it.

## Tier 8 — Static data (10 files, `src/data/`)

`activity.ts` · `authSettings.ts` · `documents.ts` · `employmentHistory.ts` · `financialAccounts.ts` · `leadership.ts` · `news.ts` · `notifications.ts` · `portals.ts` · `weather.ts`

*(`navigation.ts` still doesn't exist — the nav tree is hardcoded directly in `Sidebar.tsx`, confirmed intentional, not a missing file.)*

## Tier 9 — Hooks (4 files, `src/hooks/`)

`useMediaQuery.ts` · `useAuthMethodsSection.ts` (Auth Settings toggle state, wraps `useAuthSettingsStore`) · `useFileUpload.ts` (validation + simulated per-file upload progress) · `useModalA11y.ts` (focus trap, Escape, scroll lock, focus restore for `Modal`/`FormModal`)

## Tier 10 — Design tokens & global styles (6 files, `src/styles/`)

`tokens.css` · `reset.css` · `a11y.css` · `global.css` · `legacy-sap.css` (the original unsplit merged stylesheet — still backs a handful of components/pages via global class names, being incrementally replaced) · `ProfileForm.module.css` (the one CSS Module here rather than global CSS — shared grid/divider/button-row layout reused by all 7 profile tab pages plus `AddCardModal`/`EditEmploymentModal`; moved here during the Round 2 review since it isn't tied to any single component)

## Tests (10 files, 60 tests)

`src/api/authApi.test.ts` (13) · `src/pages/LoginPage.test.tsx` (4 — every alternate sign-in path actually completes login+navigate, not just the password path) · `src/hooks/useFileUpload.test.ts` (6) · `src/hooks/useModalA11y.test.tsx` (6) · `src/components/Input.test.tsx` (7) · `src/components/FormAlert.test.tsx` (4) · `src/components/Toggle.test.tsx` · `src/stores/useAuthSettingsStore.test.ts` · `src/stores/useDocumentsStore.test.ts` · `src/utils/passwordRules.test.ts`

---

## Coverage verdict

Everything above matches the router (52 entries) and every prior audit round. Confirmed **intentionally** absent or inert, not missing:
- `sap-design-system_v2.html` — a dev reference sheet, not an app screen
- 2 unreachable modals in Auth Settings (first-login wizard, security alert) — no trigger exists in the default DOM
- `DocItem`'s Download button — mock documents have no real file content behind them, so there's nothing to download
- `PortalCard`'s Launch link — portal apps are external systems, out of scope for this project entirely
- The PIV/CAC sign-in button on Login — built and functional, hidden behind a `SHOW_PIV` flag pending a decision on when to surface it

What changed since the last inventory (the wiring phase, PRs #27–#41): real mock auth with route gating, a full mock API layer, two Zustand stores, real document upload with validation/progress/error states, real login/signup success/failure/lockout handling, and a growing unit test suite. No real backend exists yet — every "wired" behavior above is backed by the mock API layer, by design.

**Latest round**: every alternate sign-in path on Login now completes the real mocked job (calls `login()` and navigates to `/home`), not just the password path — OTP Code's step 3, every social/PIV button, and Magic Link's demo-only "simulate opening the link" button (a real magic link can't complete without an actual emailed link, so that one button is explicitly a testing convenience, not part of the real flow). Covered by `src/pages/LoginPage.test.tsx`.
