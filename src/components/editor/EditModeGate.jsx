import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useEditMode } from '../../contexts/EditModeContext'
import AuthPanel from './AuthPanel'
import FloatingToolbar from './FloatingToolbar'

// Mounted globally in App.jsx. Renders nothing for a normal visitor.
// The sign-in panel opens either via a visible trigger elsewhere on the
// site (see the icon on EventsPage) or by visiting /edit directly.
export default function EditModeGate() {
  const { pathname } = useLocation()
  const { checking, authed, signInOpen, openSignIn, closeSignIn, markSignedIn, signOut } = useEditMode()

  useEffect(() => {
    if (pathname === '/edit') openSignIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  if (checking) return null
  if (authed) return <FloatingToolbar onSignOut={signOut} />
  if (signInOpen) return <AuthPanel onSignedIn={markSignedIn} onClose={closeSignIn} />
  return null
}
