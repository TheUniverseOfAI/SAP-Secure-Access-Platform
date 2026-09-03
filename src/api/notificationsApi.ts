import { notifications, type Notification } from '../data/notifications'
import { request } from './client'

/** Mock notifications feed for AppHeader's dropdown — see src/data/notifications.ts for the seed content. */
export async function getNotifications(): Promise<Notification[]> {
  return request(notifications.map((n) => ({ ...n })))
}
