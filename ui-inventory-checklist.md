# SAP UI Inventory — Every Element, Every Tier

A full file-by-file inventory of `sap-web`, cross-checked against the router and the two prior completeness audits (content audit → PR #23, responsive audit → PR #25). Everything below is ✅ built and verified — this is the "did we cover it all" checklist, not a gap list.

**Route count check:** `src/router.tsx` declares **51 route entries** (49 real pages + 2 redirects: `/profile` → `/profile/personal`, `/auth-settings` → `/auth-settings/intro`). Every page listed below has a matching route.

---

## Tier 1 — Shell (2 files)

| File | Role |
|---|---|
| `src/main.tsx` | Mounts the app — imports `global.css`, renders `<RouterProvider>`. No separate `App.tsx` exists; there's no provider stack yet (auth/theme context is wiring-phase work), so `main.tsx` *is* the whole shell for now. |
| `src/router.tsx` | `createBrowserRouter` — every route in the app, in one place. |

## Tier 2 — Layouts (12 files)

| File | Covers |
|---|---|
| `AuthLayout.tsx` | Wraps Login/Signup/Forgot-Password |
| `AuthHeader.tsx` | Pre-login header |
| `AuthFooter.tsx` | Pre-login footer |
| `PortalLayout.tsx` | Wraps all post-login portal pages |
| `AppHeader.tsx` | Post-login header (search, notifications, avatar, sidebar toggle) |
| `Sidebar.tsx` | Main post-login nav tree |
| `Breadcrumb.tsx` | Used by the 26 detail sub-pages |
| `MainFooter.tsx` | Post-login footer |
| `ExternalLayout.tsx` | Wraps Profile + Auth Settings |
| `ExternalHeader.tsx` | Shared header for both ExternalLayout sections |
| `ExternalSidebar.tsx` | Profile section sidebar |
| `AuthSettingsSidebar.tsx` | Auth Settings section sidebar |

*(12 files — corrected count; listed above under one Layout tier since they're all shell-level chrome.)*

## Tier 3 — Pages (49 page components across 21 files)

**Top-level (8):** `LoginPage` · `SignupPage` · `ForgotPasswordPage` · `PortalHomePage` · `PortalsPage` · `LeadershipPage` · `AboutPage` · `NotFoundPage`

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

## Tier 4 — Components (39 files, `src/components/`)

Rough split by role (all live in the same folder — this is a conceptual grouping, not a physical one):

**Containers / shells** (page-specific composition, not reused elsewhere): `AuthCard` · `DetailLayout` · `Modal` · `FormModal` · `AddCardModal` · `EditEmploymentModal` · `MagicLinkModal` · `OtpCodeModal`

**Composite components** (reusable, built from primitives): `NavGroup` · `NavItem` · `SbNavItem` · `StatCard` · `QuickCard` · `ActivityItem` · `DocItem` · `PortalCard` · `TeamCard` · `AuthMethodCard` · `VerifyCard` · `StatusRow` · `WizardHeader` · `WizardProgress` · `OtpInputGroup` · `PasswordStrengthMeter` · `PortalFilter` · `ConsentBanner` · `DocDropzone`

**Primitives** (smallest reusable units): `Button` · `Input` · `PasswordField` · `Select` · `Textarea` · `Checkbox` · `Toggle` · `Card` · `Divider` · `InfoTip` · `PageHeader` · `Tabs`

## Tier 5 — Static data (5 files, `src/data/`)

`navigation.ts`* · `portals.ts` · `leadership.ts` · `employmentHistory.ts` · `financialAccounts.ts` · `authSettings.ts`

*(\* `navigation.ts` was in the original plan but the nav tree ended up hardcoded directly in `Sidebar.tsx` instead — confirmed intentional, not a missing file.)*

## Tier 6 — Hooks (1 file, `src/hooks/`)

`useMediaQuery.ts`

## Tier 7 — Design tokens & global styles (5 files, `src/styles/`)

`tokens.css` · `reset.css` · `a11y.css` · `global.css` · `legacy-sap.css` (the original unsplit merged stylesheet — still backs a handful of components/pages via global class names, being incrementally replaced)

---

## Coverage verdict

Everything above matches the router (51 entries) and both prior audits found no missing *visible* UI. The only things confirmed **intentionally** absent, not missing:
- `sap-design-system_v2.html` — a dev reference sheet, not an app screen
- 2 unreachable modals in Auth Settings (first-login wizard, security alert) — no trigger exists in the default DOM
- Post-action success/error banners (login, profile save) — require a real form submission event that doesn't exist yet
- A dedicated `App.tsx` / context providers — no state to provide yet (wiring phase)

If you want, next step could be turning this list into a literal checklist you tick off page-by-page in the browser, rather than trusting the file inventory alone.
