import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import logoDeepGreen from '../../assets/logos/Creo&Co_Logo_Deep Green_01_Subtitle.svg'
import logoWhite from '../../assets/logos/Creo&Co_Logo_White_01_Subtitle.svg'

const NAV_LINKS = [
  { key: 'services',    href: '/#services' },
  { key: 'industries',  href: '/#industries' },
  { key: 'caseStudies', href: '/#case-studies' },
  { key: 'borderplex',  href: '/#borderplex' },
  { key: 'events',      href: '/events' },
  { key: 'about',       href: '/about' },
]

export default function Navbar() {
  const { t, lang, toggle } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [prevLocation, setPrevLocation] = useState(location)
  if (location !== prevLocation) {
    setPrevLocation(location)
    setOpen(false)
  }

  const handleHashLink = (e, href) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault()
      const id = href.replace('/#', '')
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20 pt-2 sm:pt-0 lg:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center cursor-pointer"
            aria-label="Creo & Co home"
          >
            <img
              src={scrolled ? logoDeepGreen : logoWhite}
              alt="Creo & Co."
              className="h-10 lg:h-12 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  to={href}
                  onClick={(e) => handleHashLink(e, href)}
                  className={`font-body text-xs uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${
                    scrolled
                      ? 'text-creo-charcoal hover:text-creo-primary'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggle}
              className={`flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${
                scrolled
                  ? 'text-creo-muted hover:text-creo-primary'
                  : 'text-white/60 hover:text-white'
              }`}
              aria-label={`Switch to ${lang === 'en' ? 'Spanish' : 'English'}`}
            >
              <Globe size={14} aria-hidden="true" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>

            <a
              href="https://links.mylayerone.com/widget/bookings/creoconadriana"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-heading text-xs uppercase tracking-[0.15em] px-6 py-3 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                scrolled
                  ? 'bg-creo-dark text-white hover:bg-creo-primary'
                  : 'bg-white text-creo-dark hover:bg-creo-khaki'
              }`}
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile: language + hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={toggle}
              className={`transition-colors cursor-pointer ${scrolled ? 'text-creo-muted' : 'text-white/70'}`}
              aria-label="Toggle language"
            >
              <Globe size={18} aria-hidden="true" />
            </button>
            <button
              onClick={() => setOpen(prev => !prev)}
              className={`transition-colors cursor-pointer p-1 ${scrolled ? 'text-creo-dark' : 'text-white'}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-screen bg-white shadow-lg' : 'max-h-0'
        }`}
        aria-hidden={!open}
      >
        <ul className="px-4 pb-4 pt-2 flex flex-col gap-1" role="list">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <Link
                to={href}
                onClick={(e) => { handleHashLink(e, href); setOpen(false) }}
                className="block py-2.5 font-body font-600 text-creo-dark hover:text-creo-primary transition-colors cursor-pointer"
              >
                {t.nav[key]}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="https://links.mylayerone.com/widget/bookings/creoconadriana"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-creo-primary text-white font-body font-600 text-sm px-5 py-3 rounded-full hover:bg-creo-primary/90 transition-colors cursor-pointer"
            >
              {t.nav.cta}
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
