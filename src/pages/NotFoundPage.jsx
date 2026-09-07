import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../contexts/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFoundPage() {
  const { t } = useLang()

  usePageMeta({ title: 'Page Not Found' })

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-accent text-sm tracking-[0.3em] text-creo-primary uppercase mb-6">404</p>
        <h1 className="font-heading font-600 text-4xl sm:text-5xl text-creo-charcoal tracking-tight mb-6">
          {t.notFound.heading}
        </h1>
        <p className="font-body text-lg text-creo-charcoal/70 mb-10">
          {t.notFound.body}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-creo-primary text-white font-heading font-600 text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-creo-primary/90 hover:gap-3 transition-all duration-200 cursor-pointer"
        >
          {t.notFound.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
