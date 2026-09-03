import { useEffect, useState } from 'react'
import { getEvents, EVENTS_CHANGED_EVENT } from '../lib/sanityEvents'

// Returns null while loading, then the events array (live from Sanity, or
// the static fallback — see src/lib/sanityEvents.js). Refetches whenever
// the toolbar reports a write, so an already-mounted Events section/page
// picks up an add/edit/delete without needing a manual page reload.
export function useEvents() {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    let cancelled = false

    function load() {
      getEvents().then(result => {
        if (!cancelled) setEvents(result)
      })
    }

    load()
    window.addEventListener(EVENTS_CHANGED_EVENT, load)
    return () => {
      cancelled = true
      window.removeEventListener(EVENTS_CHANGED_EVENT, load)
    }
  }, [])

  return events
}
