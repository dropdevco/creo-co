import { TrendingUp, Heart, Stethoscope, MapPin, Briefcase, ShieldCheck } from 'lucide-react'
import { useLang } from '../../contexts/LanguageContext'
import ScrollReveal from '../ui/ScrollReveal'
import sunsetSkyline from '../../assets/hero/el_paso_sunset_skyline.jpg'

const ICON_MAP = { TrendingUp, Heart, Stethoscope, MapPin, Briefcase, ShieldCheck }

const COLORS = [
  { bg: 'bg-creo-primary/10', icon: 'text-creo-primary', border: 'border-creo-primary/20', hover: 'hover:border-creo-primary/60' },
  { bg: 'bg-creo-accent/10',  icon: 'text-creo-accent',  border: 'border-creo-accent/20',  hover: 'hover:border-creo-accent/60' },
  { bg: 'bg-creo-teal/10',    icon: 'text-creo-teal',    border: 'border-creo-teal/20',    hover: 'hover:border-creo-teal/60' },
  { bg: 'bg-creo-primary/10', icon: 'text-creo-primary', border: 'border-creo-primary/20', hover: 'hover:border-creo-primary/60' },
  { bg: 'bg-creo-accent/10',  icon: 'text-creo-accent',  border: 'border-creo-accent/20',  hover: 'hover:border-creo-accent/60' },
  { bg: 'bg-creo-teal/10',    icon: 'text-creo-teal',    border: 'border-creo-teal/20',    hover: 'hover:border-creo-teal/60' },
]

export default function Industries() {
  const { t } = useLang()

  return (
    <section id="industries" className="py-28 sm:py-36 bg-creo-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-20">
          <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">Industries</p>
          <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal mb-5 tracking-tight">
            {t.industries.heading}
          </h2>
          <p className="font-body text-lg sm:text-xl text-creo-charcoal/70 max-w-2xl mx-auto leading-relaxed">
            {t.industries.sub}
          </p>
        </ScrollReveal>

        {/* Banner image */}
        <ScrollReveal className="mb-16">
          <div className="rounded-2xl overflow-hidden">
            <img
              src={sunsetSkyline}
              alt="El Paso skyline at sunset with Franklin Mountains"
              className="w-full h-[220px] sm:h-[280px] lg:h-[340px] object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.industries.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon]
            const color = COLORS[i % COLORS.length]

            return (
              <ScrollReveal key={item.title} delay={i * 80}>
                <div
                  className={`group relative bg-white border ${color.border} ${color.hover} rounded-2xl p-8
                    hover:shadow-lg transition-all duration-300 cursor-pointer h-full`}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${color.bg} rounded-xl mb-5`}>
                    {Icon && <Icon size={26} className={color.icon} strokeWidth={1.8} aria-hidden="true" />}
                  </div>

                  <h3 className="font-heading font-600 text-xl text-creo-charcoal mb-3 group-hover:text-creo-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="font-body text-base text-creo-charcoal/70 leading-relaxed">{item.desc}</p>

                  {/* Hover accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${color.bg.replace('/10', '')} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </ScrollReveal>
            )
          })}

          {/* Fifth card full-width on lg when 5 items */}
        </div>
      </div>
    </section>
  )
}
