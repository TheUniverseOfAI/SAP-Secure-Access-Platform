/**
 * The single mock "logged-in user" identity — no real auth/user data exists
 * yet (see AuthContext), so this stands in wherever the UI needs to show
 * who's signed in. Previously hardcoded independently in 4 different files
 * (AppHeader, ExternalHeader, ExternalSidebar, PersonalInfoPage) with no
 * single source of truth; consolidated here during the Round 2 review.
 */
export const currentUser = {
  fullName: 'Muhanned Alogaidi',
  firstName: 'Muhanned',
  initials: 'MA',
}
