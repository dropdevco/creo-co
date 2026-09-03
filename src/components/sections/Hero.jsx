import { useEffect, useState, useRef, useCallback } from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import heroImg from '../../assets/hero/El Paso_Juarez_2024_PacoIbarra.jpg'

export default function Hero() {
  const { t } = useLang()
  const [loaded, setLoaded] = useState(false)
  const [phase, setPhase] = useState(0) // 0 = locked, showing h1. 1 = animating. 2 = done, h2 shown, scroll unlocked
  const [scrollY, setScrollY] = useState(0)
  const phaseRef = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Lock body scroll during phase 0 and 1
  useEffect(() => {
    if (phase < 2) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [phase])

  // Parallax on scroll (only active after unlock)
  useEffect(() => {
    if (phase < 2) return
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [phase])

  const triggerSwap = useCallback(() => {
    if (phaseRef.current !== 0) return
    phaseRef.current = 1
    setPhase(1)
    setTimeout(() => {
      phaseRef.current = 2
      setPhase(2)
    }, 800)
  }, [])

  // Wheel listener (scroll down triggers swap)
  useEffect(() => {
    if (phase >= 2) return
    const onWheel = (e) => {
      if (e.deltaY > 0 && phaseRef.current === 0) {
        triggerSwap()
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [phase, triggerSwap])

  // Touch listeners (swipe up triggers swap)
  useEffect(() => {
    if (phase >= 2) return
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      const diff = touchStartY.current - e.touches[0].clientY
      if (diff > 30 && phaseRef.current === 0) {
        triggerSwap()
      }
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [phase, triggerSwap])

  const parallaxOffset = scrollY * 0.3
  const imageScale = 1 + scrollY * 0.0003

  return (
    <div>
      {/* Full-viewport hero */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-creo-dark"
        aria-label="Hero"
      >
        {/* Background image with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-[120%] object-cover"
            style={{ transform: `translateY(-${parallaxOffset}px) scale(${imageScale})` }}
          />
          <div className="absolute inset-0 bg-creo-dark/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
          <div className="max-w-5xl">
            <p
              className={`font-accent text-sm sm:text-base tracking-[0.3em] text-white/70 uppercase mb-8
                transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Bilingual Marketing &bull; Borderplex Region
            </p>

            {/* Headline swap zone */}
            <div className="relative overflow-hidden mb-12" style={{ minHeight: 'clamp(7rem, 18vw, 16rem)' }}>
              {/* Headline 1 — slides up and out */}
              <h1
                className={`transition-all duration-700 ease-in-out font-heading font-600 text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-white tracking-tight
                  ${loaded && phase === 0 ? 'opacity-100 translate-y-0' : ''}
                  ${!loaded ? 'opacity-0 translate-y-8' : ''}
                  ${phase >= 1 ? 'opacity-0 -translate-y-16' : ''}`}
              >
                {t.hero.tagline}
              </h1>

              {/* Headline 2 — slides up into place */}
              <h1
                className={`absolute top-0 left-0 right-0 transition-all duration-700 ease-in-out font-heading font-600 text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-white tracking-tight
                  ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              >
                {t.hero.tagline2}
              </h1>
            </div>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-[600ms]
                ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <a
                href="https://links.mylayerone.com/widget/bookings/creoconadriana"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-creo-dark font-heading font-600 text-sm uppercase tracking-wider px-10 py-5 rounded-full hover:bg-creo-khaki hover:text-creo-dark hover:gap-3 transition-all duration-300 cursor-pointer"
              >
                {t.hero.cta1}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('services')
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 text-white font-heading font-600 text-sm uppercase tracking-wider px-10 py-5 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 cursor-pointer"
              >
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#next"
          onClick={(e) => {
            e.preventDefault()
            if (phase < 2) {
              triggerSwap()
            } else {
              const el = document.getElementById('trust-bar')
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top, behavior: 'smooth' })
              }
            }
          }}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-all duration-500 cursor-pointer
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          aria-label="Scroll down"
        >
          <span className="font-accent text-xs uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
        </a>
      </section>
    </div>
  )
}
