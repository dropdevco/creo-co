import { Landmark, Heart, Briefcase } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import ScrollReveal from '../ui/ScrollReveal'
import bridgeImg from '../../assets/hero/paso_del_norte_bridge.jpg'

const ICONS = [Landmark, Heart, Briefcase]

export default function CaseStudies() {
  const { t } = useLang()

  return (
    <section id="case-studies" className="py-28 sm:py-36 bg-creo-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">Experience</p>
          <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal mb-6 tracking-tight">
            {t.caseStudies.heading}
          </h2>
          <p className="font-body text-lg sm:text-xl text-creo-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            {t.caseStudies.subtitle}
          </p>
          <p className="font-body text-base text-creo-charcoal/70 max-w-3xl mx-auto leading-relaxed mt-6">
            {t.caseStudies.intro}
          </p>
        </ScrollReveal>

        {/* Bridge image */}
        <ScrollReveal className="mb-16">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={bridgeImg}
              alt="Paso del Norte international bridge with US and Mexico flags"
              className="w-full h-[200px] sm:h-[260px] lg:h-[320px] object-cover object-center"
            />
          </div>
        </ScrollReveal>

        {/* Sector cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.caseStudies.sectors.map((sector, i) => {
            const Icon = ICONS[i]
            return (
              <ScrollReveal key={sector.title} delay={i * 100}>
                <div className="bg-white border border-creo-dark/10 rounded-2xl p-8 flex flex-col h-full hover:border-creo-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-creo-primary/10 flex items-center justify-center">
                      <Icon size={20} className="text-creo-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-600 text-xl text-creo-charcoal">
                      {sector.title}
                    </h3>
                  </div>
                  {sector.scope && (
                    <p className="font-body text-sm text-creo-charcoal/50 mb-5">{sector.scope}</p>
                  )}
                  {!sector.scope && <div className="mb-5" />}

                  <p className="font-accent text-xs uppercase tracking-[0.2em] text-creo-primary/70 mb-3">
                    {t.caseStudies.sharpenedLabel}
                  </p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {sector.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-creo-primary/40 shrink-0" />
                        <span className="font-body text-base text-creo-charcoal/70 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-creo-dark/5 pt-5">
                    <p className="font-accent text-xs uppercase tracking-[0.2em] text-creo-primary/70 mb-2">
                      {t.caseStudies.mattersLabel}
                    </p>
                    <p className="font-body text-base text-creo-charcoal/70 leading-relaxed">
                      {sector.why}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Throughline */}
        <ScrollReveal delay={300}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-creo-primary/30" />
              <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary">{t.caseStudies.throughlineLabel}</p>
              <div className="w-10 h-px bg-creo-primary/30" />
            </div>
            <p className="font-body text-lg sm:text-xl text-creo-charcoal/70 max-w-2xl mx-auto leading-relaxed">
              {t.caseStudies.throughline}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
