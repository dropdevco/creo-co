import { createClient } from '@sanity/client'
import { SAMPLE_EVENTS } from '../data/sampleEvents'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Public, read-only client — safe to expose in the browser bundle.
// useCdn: false — events change rarely and traffic here is low, so it's not
// worth trading "the client just added an event and expects to see it" for
// the CDN's ~30-60s staleness window.
const sanityRead = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false })
  : null

// Fired after any write from the toolbar, so any mounted useEvents() —
// including on a totally different component tree, like the public Events
// section still showing the page from before the edit — knows to refetch.
export const EVENTS_CHANGED_EVENT = 'creo:events-changed'

export function notifyEventsChanged() {
  window.dispatchEvent(new Event(EVENTS_CHANGED_EVENT))
}

// Falls back to the static sample events until a Sanity project is wired up
// (VITE_SANITY_PROJECT_ID unset), and again if the live fetch ever fails,
// so the public Events section never breaks.
export async function getEvents() {
  if (!sanityRead) return SAMPLE_EVENTS

  try {
    const events = await sanityRead.fetch(`*[_type == "event"] | order(date asc){
      "id": _id, title, date, endDate, location, category, description, registerUrl,
      "imageUrl": image.asset->url
    }`)
    return events
  } catch (err) {
    console.error('Failed to fetch events from Sanity, falling back to sample events', err)
    return SAMPLE_EVENTS
  }
}
