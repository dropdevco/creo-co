import { CheckCircle, ArrowRight } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import ScrollReveal from '../ui/ScrollReveal'
import heroImg2 from '../../assets/hero/elpaso2023_andyaustin-5613.jpg'

export default function Borderplex() {
  const { t } = useLang()

  return (
    <section id="borderplex" className="py-28 sm:py-36 bg-creo-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: large image with overlay text */}
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden mb-20">
            <img
              src={heroImg2}
              alt="El Paso skyline at dusk"
              className="w-full h-[350px] sm:h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-creo-dark via-creo-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <p className="font-heading font-bold text-5xl sm:text-6xl text-white">2.7M+</p>
                  <p className="font-body text-base font-semibold text-white/70 mt-2">Binational Population</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-5xl sm:text-6xl text-white">2</p>
                  <p className="font-body text-base font-semibold text-white/70 mt-2">Countries</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-5xl sm:text-6xl text-white">3</p>
                  <p className="font-body text-base font-semibold text-white/70 mt-2">States</p>
                </div>
                <div>
                  <p className="font-heading font-bold text-5xl sm:text-6xl text-white">EN/ES</p>
                  <p className="font-body text-base font-semibold text-white/70 mt-2">Bilingual</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom: text content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <ScrollReveal>
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-teal mb-6">
              Borderplex Advantage
            </p>
            <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-white mb-4 tracking-tight leading-[0.95]">
              {t.borderplex.heading}
            </h2>
            <p className="font-body text-lg sm:text-xl text-creo-khaki mb-8">
              {t.borderplex.sub}
            </p>
            <p className="font-body text-base text-white/60 leading-relaxed">
              {t.borderplex.body}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <ul className="space-y-4 mb-10" role="list">
              {t.borderplex.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-creo-teal shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-body text-base text-white/80">{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://links.mylayerone.com/widget/bookings/creoconadriana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-creo-dark font-body font-600 text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-creo-khaki hover:gap-3 transition-all duration-200 cursor-pointer"
            >
              {t.borderplex.cta} <ArrowRight size={18} aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
