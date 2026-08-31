export interface Notification {
  id: string
  text: string
  time: string
  read: boolean
}

/** Mock notification feed for AppHeader's Notifications dropdown — no real notification system exists yet. */
export const notifications: Notification[] = [
  { id: 'n1', text: 'Security audit completed — all 47 controls passed.', time: '2 hours ago', read: false },
  { id: 'n2', text: 'Your password expires in 14 days.', time: 'Yesterday', read: false },
  { id: 'n3', text: 'New device signed in from Reston, VA.', time: '2 days ago', read: true },
  { id: 'n4', text: 'Scheduled maintenance window confirmed for April 19.', time: '2 days ago', read: true },
]
