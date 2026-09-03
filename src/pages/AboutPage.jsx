import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import CTASection from '../components/sections/CTASection'
import { useLang } from '../contexts/LanguageContext'
import headshotAdriana from '../assets/team/IMG_5158-2.jpg'
import headshotRachel from '../assets/team/rachel-ortiz.jpg'
import headshotPaula from '../assets/team/paula-castro.jpg'
import heroAbout from '../assets/hero/elpaso2023_andyaustin-5613.jpg'
import poppiesImg from '../assets/hero/franklin_mountains_poppies.jpg'
import logoMonogramWhite from '../assets/logos/Creo&Co_Monogram_White.svg'

const FLIP_COLORS = [
  { bg: 'bg-creo-primary', text: 'text-white' },
  { bg: 'bg-creo-accent', text: 'text-white' },
  { bg: 'bg-creo-teal', text: 'text-white' },
]

function FlipCard({ title, description, index }) {
  const [flipped, setFlipped] = useState(false)
  const color = FLIP_COLORS[index % FLIP_COLORS.length]

  return (
    <div
      className="perspective cursor-pointer h-64 sm:h-72"
      onClick={() => setFlipped(f => !f)}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${title}. Click to ${flipped ? 'hide' : 'reveal'} definition`}
    >
      <div className={`relative w-full h-full preserve-3d transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}>
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden ${color.bg} rounded-2xl flex flex-col items-center justify-center p-8`}>
          <img src={logoMonogramWhite} alt="Creo & Co. Monogram" className="w-14 h-14 mb-6 object-contain" />
          <h3 className={`font-heading font-600 text-3xl sm:text-4xl ${color.text} text-center uppercase tracking-wider`}>
            {title}
          </h3>
          <p className={`font-accent text-sm ${color.text}/70 mt-4`}>Tap to reveal</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-creo-border rounded-2xl flex flex-col items-center justify-center p-8">
          <h3 className="font-heading font-600 text-xl text-creo-charcoal mb-4">{title}</h3>
          <p className="font-body text-base text-creo-charcoal/70 leading-relaxed text-center">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const { t } = useLang()

  return (
    <>
      {/* Header — full-bleed hero image */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroAbout} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-creo-dark/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-khaki mb-6">{t.nav.about}</p>
          <h1 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-white mb-8 max-w-4xl tracking-tight leading-[0.95]">
            {t.about.heading}
          </h1>
          <p className="font-body text-lg sm:text-xl text-white/70 max-w-2xl leading-relaxed">
            {t.about.body1}
          </p>
        </div>
      </section>

      {/* Mission — asymmetric layout */}
      <section className="py-28 sm:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal>
              <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-6">Our Approach</p>
              <h2 className="font-heading font-500 text-3xl sm:text-4xl text-creo-charcoal mb-8 leading-[1.3]">
                {t.about.body2}
              </h2>
              <div className="w-16 h-px bg-creo-primary mb-8" />
              <p className="font-body text-base text-creo-charcoal/70 leading-relaxed mb-6">
                {t.about.body3}
              </p>
              <p className="font-body text-base text-creo-charcoal/70 leading-relaxed mb-6">
                {t.about.body4}
              </p>
              <p className="font-body text-base text-creo-charcoal/70 leading-relaxed">
                {t.about.body5}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-creo-light border border-creo-border rounded-2xl p-10 h-full flex flex-col justify-center">
                <p className="font-heading font-600 text-xl text-creo-charcoal mb-8">
                  {t.borderplex.sub}
                </p>
                <div className="space-y-5">
                  {t.borderplex.points.map(point => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-creo-teal shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-body text-base text-creo-charcoal">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Full-width image break */}
      <section className="relative h-[280px] sm:h-[360px] overflow-hidden">
        <img
          src={poppiesImg}
          alt="Desert wildflowers blooming at the base of the Franklin Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-creo-dark/20" />
      </section>

      {/* Values — Interactive Flip Cards */}
      <section className="py-28 sm:py-36 bg-creo-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-20">
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">Values</p>
            <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal tracking-tight">{t.about.valuesHeading}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.about.values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <FlipCard title={v.title} description={v.desc} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 sm:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-20">
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">Our Team</p>
            <h2 className="font-heading font-600 text-5xl sm:text-6xl text-creo-charcoal tracking-tight">The People Behind Creo&nbsp;&&nbsp;Co.</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img src={headshotAdriana} alt={`${t.about.team.adriana.name}, ${t.about.team.adriana.role}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-heading font-600 text-2xl text-creo-charcoal">{t.about.team.adriana.name}</h3>
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-creo-primary mt-2">{t.about.team.adriana.role}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img src={headshotRachel} alt={`${t.about.team.rachel.name}, ${t.about.team.rachel.role}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-heading font-600 text-2xl text-creo-charcoal">{t.about.team.rachel.name}</h3>
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-creo-primary mt-2">{t.about.team.rachel.role}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <img src={headshotPaula} alt={`${t.about.team.paula.name}, ${t.about.team.paula.role}`} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-heading font-600 text-2xl text-creo-charcoal">{t.about.team.paula.name}</h3>
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-creo-primary mt-2">{t.about.team.paula.role}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
