import { useEffect, useState, useRef } from 'react'
import heroImg from '../../assets/hero/El Paso_Juarez_2024_PacoIbarra.jpg'

export default function FullStatement() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setScrollY(rect.top)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const parallax = scrollY * 0.15

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-44 overflow-hidden"
    >
      {/* Parallax background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="w-full h-[140%] object-cover"
          style={{ transform: `translateY(${parallax}px)` }}
        />
        <div className="absolute inset-0 bg-creo-dark/70" />
      </div>

      {/* Statement */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading font-500 text-2xl sm:text-3xl lg:text-5xl text-white leading-[1.3]">
          &ldquo;We don&rsquo;t just translate messages&thinsp;&mdash;&thinsp;we build the systems
          that make marketing work across borders, languages, and cultures.&rdquo;
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="w-10 h-px bg-white/30" />
          <span className="font-accent text-xs uppercase tracking-[0.3em] text-white/50">Creo & Co.</span>
          <div className="w-10 h-px bg-white/30" />
        </div>
      </div>
    </section>
  )
}
