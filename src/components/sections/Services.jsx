import { ArrowRight } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import ScrollReveal from '../ui/ScrollReveal'

export default function Services() {
  const { t } = useLang()

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <ScrollReveal>
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">Services</p>
            <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal tracking-tight">
              {t.services.heading}
            </h2>
            <p className="font-body text-lg sm:text-xl text-creo-charcoal/70 mt-6 max-w-xl leading-relaxed">
              {t.services.sub}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <a
              href="https://links.mylayerone.com/widget/bookings/creoconadriana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-600 text-xs uppercase tracking-[0.15em] text-creo-primary hover:gap-3 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              {t.nav.cta} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-creo-border rounded-2xl overflow-hidden">
          {t.services.items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 60}>
              <div className="bg-white p-8 h-full hover:bg-creo-light transition-colors duration-200 group">
                <span className="block font-accent text-3xl text-creo-border mb-4 group-hover:text-creo-primary/20 transition-colors duration-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading font-600 text-xl text-creo-charcoal mb-3 group-hover:text-creo-primary transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-body text-base text-creo-charcoal/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
