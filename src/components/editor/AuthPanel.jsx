import { useState } from 'react'
import { X } from 'lucide-react'

export default function AuthPanel({ onSignedIn, onClose }) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    })
    setSubmitting(false)
    if (res.ok) onSignedIn()
    else setError(true)
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] rounded-2xl bg-creo-dark text-white
                    px-5 py-4 shadow-xl w-[min(90vw,360px)] font-body">
      <div className="flex gap-2 items-center">
        <form onSubmit={submit} className="flex gap-2 flex-1">
          <input
            type="password"
            required
            autoFocus
            disabled={submitting}
            value={passcode}
            onChange={e => setPasscode(e.target.value)}
            placeholder="Passcode"
            className="flex-1 rounded-full px-3 py-1.5 text-creo-charcoal text-sm outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-creo-primary text-white text-sm font-600 px-4 py-1.5 hover:bg-creo-primary/90 transition-colors duration-200 disabled:opacity-60 inline-flex items-center gap-2"
          >
            {submitting && (
              <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
            )}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        {onClose && (
          <button onClick={onClose} aria-label="Close" className="text-white/50 hover:text-white transition-colors duration-200">
            <X size={18} />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-300 mt-2">Incorrect passcode.</p>}
    </div>
  )
}
