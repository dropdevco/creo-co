/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'

const EditModeContext = createContext(null)

// Shared across the whole site so any page can both check "is the owner
// signed in" and offer its own trigger to open the sign-in panel — not just
// the hidden /edit route. See the sign-in icon next to the category filter
// on EventsPage for the first example of this.
export function EditModeProvider({ children }) {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)

  useEffect(() => {
    fetch('/api/session')
      .then(r => (r.ok ? r.json() : null))
      .then(data => setAuthed(Boolean(data?.ok)))
      // /api not served (plain `vite dev` — needs `vercel dev` or a real deploy),
      // or served-but-not-executed (200 with a non-JSON body) — either way,
      // anything that doesn't parse to a real {ok: true} is "not signed in."
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false))
  }, [])

  const value = {
    checking,
    authed,
    signInOpen,
    openSignIn: () => setSignInOpen(true),
    closeSignIn: () => setSignInOpen(false),
    markSignedIn: () => {
      setAuthed(true)
      setSignInOpen(false)
    },
    signOut: () => {
      document.cookie = 'session=; Max-Age=0; Path=/'
      setAuthed(false)
    },
  }

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>
}

export function useEditMode() {
  const ctx = useContext(EditModeContext)
  if (!ctx) throw new Error('useEditMode must be used within EditModeProvider')
  return ctx
}
