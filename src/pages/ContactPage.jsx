import CTASection from '../components/sections/CTASection'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Us',
    description: 'Discuss your marketing needs with Creo & Co. Clear scope, transparent pricing, and a zero risk first conversation.',
  })

  return (
    <div className="pt-16">
      <CTASection />
    </div>
  )
}
