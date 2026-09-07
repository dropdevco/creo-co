import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { EditModeProvider } from './contexts/EditModeContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import NotFoundPage from './pages/NotFoundPage'
import EditModeGate from './components/editor/EditModeGate'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <EditModeProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/"         element={<Home />} />
                <Route path="/about"    element={<AboutPage />} />
                <Route path="/events"   element={<EventsPage />} />
                <Route path="/contact"  element={<ContactPage />} />
                <Route path="/privacy"  element={<PrivacyPage />} />
                <Route path="*"         element={<NotFoundPage />} />
              </Routes>
            </div>
            <Footer />
            <EditModeGate />
          </div>
        </EditModeProvider>
      </BrowserRouter>
    </LanguageProvider>
  )
}
