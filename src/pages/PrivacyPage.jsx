import { useLang } from '../contexts/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PrivacyPage() {
  const { t } = useLang()

  usePageMeta({
    title: 'Privacy Policy',
    description: 'How Creo & Co. collects, uses, and protects the information you share with us.',
  })

  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading font-600 text-4xl sm:text-5xl text-creo-charcoal tracking-tight mb-3">
          {t.privacy.heading}
        </h1>
        <p className="font-body text-sm text-creo-charcoal/70 mb-12">{t.privacy.updated}</p>

        <div className="space-y-10">
          {t.privacy.sections.map(section => (
            <div key={section.title}>
              <h2 className="font-heading font-600 text-xl text-creo-charcoal mb-3">{section.title}</h2>
              <p className="font-body text-base text-creo-charcoal/70 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
