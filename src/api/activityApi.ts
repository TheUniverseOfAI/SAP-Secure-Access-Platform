import { activity, type ActivityEntry } from '../data/activity'
import { request } from './client'

/** Mock Recent Activity feed — see src/data/activity.ts for the seed content. */
export async function getActivity(): Promise<ActivityEntry[]> {
  return request(activity.map((a) => ({ ...a })))
}
