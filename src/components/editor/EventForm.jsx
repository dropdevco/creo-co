import { useState } from 'react'

const empty = { title: '', date: '', endDate: '', location: '', category: '', description: '', registerUrl: '' }

export default function EventForm({ event, onSaved, onCancel }) {
  const [form, setForm] = useState(event ? { ...empty, ...event } : empty)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set(field) {
    return e => setForm(f => ({ ...f, [field]: e.target.value }))
  }

  async function submit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const method = event ? 'PATCH' : 'POST'
      const body = event ? { id: event.id, ...form } : form
      const res = await fetch('/api/events', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('save failed')
      onSaved(await res.json())
    } catch {
      setError('Could not save this event. Try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'border border-creo-border rounded-lg px-3 py-2 font-body text-sm w-full disabled:opacity-60 disabled:bg-creo-light'

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 mt-3">
      <fieldset disabled={saving} className="contents">
        <input required placeholder="Title" value={form.title} onChange={set('title')} className={inputClass} />
        <div className="flex gap-2">
          <input required type="date" value={form.date} onChange={set('date')} className={inputClass} />
          <input type="date" placeholder="End date (optional)" value={form.endDate} onChange={set('endDate')} className={inputClass} />
        </div>
        <input placeholder="Location" value={form.location} onChange={set('location')} className={inputClass} />
        <input placeholder="Category (e.g. Concert, Networking)" value={form.category} onChange={set('category')} className={inputClass} />
        <textarea placeholder="Description" value={form.description} onChange={set('description')} className={inputClass} rows={3} />
        <input placeholder="Register / info URL" value={form.registerUrl} onChange={set('registerUrl')} className={inputClass} />
      </fieldset>

      {error && (
        <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-2 mt-1 items-center">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-creo-primary text-white font-body font-600 text-sm px-4 py-2 hover:bg-creo-primary/90 transition-colors duration-200 disabled:opacity-60 inline-flex items-center gap-2"
        >
          {saving && (
            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
          )}
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} disabled={saving} className="font-body text-sm text-creo-muted px-3 py-2 disabled:opacity-50">
          Cancel
        </button>
      </div>
    </form>
  )
}
