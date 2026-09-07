import { useEffect } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import ScrollReveal from '../ui/ScrollReveal'

export default function CTASection() {
  const { t } = useLang()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://links.mylayerone.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contact" className="py-28 sm:py-36 bg-white overflow-hidden">
      {/* Background accents */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-creo-border/20 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: headline + cal link */}
          <ScrollReveal>
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-burgundy mb-6">
              Get Started
            </p>
            <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal mb-6 tracking-tight">
              {t.cta.heading}
            </h2>
            <p className="font-body text-lg text-creo-charcoal/70 mb-10 leading-relaxed">
              {t.cta.sub}
            </p>

            <a
              href="https://links.mylayerone.com/widget/bookings/creoconadriana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-creo-dark text-white font-body font-700 text-base px-8 py-4 rounded-full hover:bg-creo-dark/90 hover:gap-3 transition-all duration-200 cursor-pointer"
            >
              {t.cta.primary} <ArrowRight size={18} aria-hidden="true" />
            </a>

            <p className="font-body text-creo-charcoal/70 text-sm mt-6 flex items-center gap-2">
              <Mail size={14} aria-hidden="true" />
              {t.cta.secondary}
            </p>
          </ScrollReveal>

          {/* Right: contact form */}
          <ScrollReveal delay={200}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-creo-border/30 p-1 min-h-[600px]">
              <iframe
                src="https://links.mylayerone.com/widget/form/Wlv7gqaZBMnoj107ATnS"
                style={{ width: '100%', height: '650px', border: 'none', borderRadius: '24px' }}
                id="inline-Wlv7gqaZBMnoj107ATnS"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact Form"
                data-height="868"
                data-layout-iframe-id="inline-Wlv7gqaZBMnoj107ATnS"
                data-form-id="Wlv7gqaZBMnoj107ATnS"
                title="Contact Form"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
