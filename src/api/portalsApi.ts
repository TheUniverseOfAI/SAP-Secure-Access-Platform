import { portals, type Portal } from '../data/portals'
import { request } from './client'

/** Mock portals catalog — backs both the Portals hub page and AppHeader's search box. See src/data/portals.ts for the seed content. */
export async function getPortals(): Promise<Portal[]> {
  return request(portals.map((p) => ({ ...p })))
}
