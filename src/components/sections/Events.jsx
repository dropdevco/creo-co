import { MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LanguageContext'
import { useEvents } from '../../hooks/useEvents'
import ScrollReveal from '../ui/ScrollReveal'

function formatDate(dateStr, endDateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day = d.getDate()

  if (endDateStr && endDateStr !== dateStr) {
    const end = new Date(endDateStr + 'T00:00:00')
    const endDay = end.getDate()
    const endMonth = end.toLocaleString('en-US', { month: 'short' }).toUpperCase()
    return {
      month,
      day: endMonth === month ? `${day} to ${endDay}` : `${day}`,
      full: `${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} to ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`,
    }
  }

  return {
    month,
    day,
    full: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  }
}

function getTodayStr() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const CAT_COLORS = {
  Concert: 'bg-creo-primary/10 text-creo-primary',
  Aviation: 'bg-creo-teal/10 text-creo-teal',
  Networking: 'bg-creo-accent/10 text-creo-accent',
  'Air Show': 'bg-creo-primary/10 text-creo-primary',
  'Economic Development': 'bg-creo-accent/10 text-creo-accent',
  'Car Show': 'bg-creo-teal/10 text-creo-teal',
}

export default function Events({ limit = 3 }) {
  const { t } = useLang()
  const allEvents = useEvents()
  const todayStr = getTodayStr()
  const events = (allEvents || [])
    .filter(event => (event.endDate || event.date) >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit)

  return (
    <section id="events" className="py-28 sm:py-36 bg-creo-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <ScrollReveal>
            <p className="font-accent text-xs uppercase tracking-[0.3em] text-creo-primary mb-4">Events</p>
            <h2 className="font-heading font-600 text-5xl sm:text-6xl lg:text-7xl text-creo-charcoal tracking-tight">
              {t.events.heading}
            </h2>
            <p className="font-body text-lg sm:text-xl text-creo-charcoal/70 mt-6 max-w-xl leading-relaxed">{t.events.sub}</p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 font-body font-600 text-xs uppercase tracking-[0.15em] text-creo-primary hover:gap-3 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              View all events <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </ScrollReveal>
        </div>

        {events.length === 0 ? (
          <p className="text-creo-muted font-body text-center py-12">{t.events.noEvents}</p>
        ) : (
          <div className="space-y-4">
            {events.map((event, i) => {
              const date = formatDate(event.date, event.endDate)
              const catColor = CAT_COLORS[event.category] || 'bg-creo-border text-creo-muted'

              return (
                <ScrollReveal key={event.id} delay={i * 80}>
                  <div className="group bg-white border border-creo-border rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:border-creo-primary/40 hover:shadow-md transition-all duration-300 cursor-pointer">
                    {/* Date block */}
                    <div className="flex-shrink-0 w-16 text-center bg-creo-primary/5 border border-creo-primary/20 rounded-xl py-3 px-2">
                      <span className="block font-body text-xs font-700 text-creo-primary uppercase">{date.month}</span>
                      <span className="block font-heading font-800 text-2xl text-creo-charcoal leading-none">{date.day}</span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <h3 className="font-heading font-600 text-lg text-creo-charcoal group-hover:text-creo-primary transition-colors duration-200">
                          {event.title}
                        </h3>
                        <span className={`font-body text-xs font-600 px-2.5 py-0.5 rounded-full ${catColor}`}>
                          {event.category}
                        </span>
                      </div>
                      <p className="font-body text-sm text-creo-charcoal/60 flex items-center gap-1.5">
                        <MapPin size={13} aria-hidden="true" />
                        {event.location}
                      </p>
                      <p className="font-body text-base text-creo-charcoal/70 mt-1">{event.description}</p>
                    </div>

                    {/* CTA */}
                    <a
                      href={event.registerUrl}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 bg-creo-primary text-white font-body font-600 text-sm px-5 py-2.5 rounded-full hover:bg-creo-primary/90 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                      aria-label={`Register for ${event.title}`}
                    >
                      {t.events.register}
                    </a>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
