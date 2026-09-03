import { useLang } from '../../contexts/LanguageContext'
import ScrollReveal from '../ui/ScrollReveal'

// Auto-import every optimized carousel photo, sorted numerically
const modules = import.meta.glob('../../assets/carousel-photos/optimized/*.webp', {
  eager: true,
  import: 'default',
})
const PHOTOS = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((k) => modules[k])

// Staggered vertical offsets + varied card sizes create the floating gallery look.
// Explicit widths are required so the layout reserves space for lazy-loaded images.
const CARDS = [
  { w: 'w-72 sm:w-80',  h: 'h-52 sm:h-60', y: 0 },
  { w: 'w-60 sm:w-64',  h: 'h-64 sm:h-72', y: 52 },
  { w: 'w-80 sm:w-96',  h: 'h-56 sm:h-64', y: 24 },
  { w: 'w-56 sm:w-64',  h: 'h-72 sm:h-80', y: 72 },
  { w: 'w-72 sm:w-80',  h: 'h-60 sm:h-64', y: 12 },
  { w: 'w-64 sm:w-72',  h: 'h-48 sm:h-56', y: 44 },
]

export default function Gallery() {
  const { t } = useLang()
  const track = [...PHOTOS, ...PHOTOS]

  return (
    <section className="py-24 sm:py-32 bg-creo-light overflow-hidden">
      <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">
          {t.gallery.label}
        </p>
        <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal tracking-tight">
          {t.gallery.heading}
        </h2>
        <p className="font-body text-lg sm:text-xl text-creo-charcoal/70 max-w-2xl mx-auto leading-relaxed mt-6">
          {t.gallery.sub}
        </p>
      </ScrollReveal>

      {/* Marquee track */}
      <div className="relative" aria-hidden="true">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-creo-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-creo-light to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-start gap-6 w-max py-12 animate-marquee hover:[animation-play-state:paused]"
          style={{ animationDuration: '90s' }}
        >
          {track.map((src, i) => {
            const card = CARDS[i % CARDS.length]
            return (
              <div
                key={i}
                className={`shrink-0 ${card.w} ${card.h} rounded-2xl overflow-hidden shadow-lg bg-creo-border/30`}
                style={{ transform: `translateY(${card.y}px)` }}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
