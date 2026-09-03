import { useState } from 'react'
import EventsPanel from './EventsPanel'

export default function FloatingToolbar({ onSignOut }) {
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3
                      rounded-full bg-creo-dark text-white px-5 py-2.5 shadow-xl font-body text-sm">
        <span className="opacity-60 hidden sm:inline">Editing mode</span>
        <button onClick={() => setPanelOpen(true)} className="font-600 hover:text-creo-khaki transition-colors duration-200">
          Manage Events
        </button>
        <span className="opacity-30">|</span>
        <button onClick={onSignOut} className="opacity-60 hover:opacity-100 transition-opacity duration-200">
          Sign out
        </button>
      </div>
      {panelOpen && <EventsPanel onClose={() => setPanelOpen(false)} />}
    </>
  )
}
