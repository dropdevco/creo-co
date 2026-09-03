import { useEffect, useState } from 'react'
import { getEvents, notifyEventsChanged } from '../../lib/sanityEvents'
import EventForm from './EventForm'

export default function EventsPanel({ onClose }) {
  const [events, setEvents] = useState(null) // null = still loading
  const [editing, setEditing] = useState(null) // null | 'new' | event
  const [confirmingId, setConfirmingId] = useState(null) // row asking "are you sure?"
  const [deletingId, setDeletingId] = useState(null) // row whose delete is in flight
  const [error, setError] = useState('')

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setError('Could not load events. Try closing and reopening this panel.'))
  }, [])

  function upsert(saved) {
    setEvents(es => {
      const exists = es.some(e => e.id === saved.id)
      return exists ? es.map(e => (e.id === saved.id ? saved : e)) : [...es, saved]
    })
    setEditing(null)
    notifyEventsChanged()
  }

  async function remove(id) {
    setError('')
    setDeletingId(id)
    try {
      const res = await fetch('/api/events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('delete failed')
      setEvents(es => es.filter(e => e.id !== id))
      notifyEventsChanged()
    } catch {
      setError('Could not delete that event. Try again.')
    } finally {
      setDeletingId(null)
      setConfirmingId(null)
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-creo-dark/50" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl w-[min(100vw,480px)] max-h-[85vh] overflow-y-auto p-6 mb-0 sm:mb-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading font-600 text-lg text-creo-charcoal">Events</h3>
          <button onClick={onClose} className="font-body text-sm text-creo-muted">Close</button>
        </div>

        {error && (
          <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
            {error}
          </p>
        )}

        {editing ? (
          <EventForm
            event={editing === 'new' ? null : editing}
            onSaved={upsert}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <>
            <button
              onClick={() => setEditing('new')}
              className="font-body text-sm font-600 rounded-full bg-creo-primary text-white px-4 py-2 mb-4"
            >
              + Add Event
            </button>

            {events === null ? (
              <p className="font-body text-sm text-creo-muted py-4">Loading events…</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {events.map(ev => (
                  <li key={ev.id} className="flex justify-between items-center font-body text-sm border-b border-creo-border pb-2 gap-3">
                    <span className="text-creo-charcoal min-w-0 truncate">{ev.title} ({ev.date})</span>
                    <span className="flex gap-3 shrink-0 items-center">
                      {confirmingId === ev.id ? (
                        <>
                          <span className="text-creo-muted">Delete this event?</span>
                          <button
                            onClick={() => remove(ev.id)}
                            disabled={deletingId === ev.id}
                            className="text-red-600 font-600 disabled:opacity-50"
                          >
                            {deletingId === ev.id ? 'Deleting…' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setConfirmingId(null)}
                            disabled={deletingId === ev.id}
                            className="text-creo-muted disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setEditing(ev)} className="text-creo-primary">Edit</button>
                          <button onClick={() => setConfirmingId(ev.id)} className="text-red-600">Delete</button>
                        </>
                      )}
                    </span>
                  </li>
                ))}
                {events.length === 0 && <li className="font-body text-sm text-creo-muted">No events yet.</li>}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
