import { Link } from 'react-router-dom'
import { useLang } from '../../contexts/LanguageContext'
import logoDeepGreen from '../../assets/logos/Creo&Co_Logo_Deep Green_01_Subtitle.svg'

const COMPANY_LINKS = [
  { label: 'About',        href: '/about' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Events',       href: '/events' },
  { label: 'Contact',      href: '/contact' },
]

const SERVICE_LINKS = [
  'Marketing Strategy',
  'Brand Management',
  'Content Creation',
  'Social Media',
  'Event Marketing',
]

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="bg-white border-t border-creo-dark/5 text-creo-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4 cursor-pointer">
              <img src={logoDeepGreen} alt="Creo & Co." className="h-12 w-auto" />
            </Link>
            <p className="font-body text-sm text-creo-charcoal/60 leading-relaxed mb-6 max-w-xs">
              {t.footer.tagline}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                {
                  href: 'https://www.instagram.com/creoandcompany/',
                  label: 'Instagram',
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  href: 'https://www.linkedin.com/company/creo-and-co-marketing/posts/?viewAsMember=true',
                  label: 'LinkedIn',
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                },
                {
                  href: 'https://www.facebook.com/profile.php?id=61587959126440',
                  label: 'Facebook',
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                },
              ].map(({ href, label, svg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-creo-dark/5 flex items-center justify-center hover:bg-creo-primary hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-accent font-600 text-sm uppercase tracking-wider text-creo-charcoal/70 mb-4">
              {t.footer.links.company}
            </h3>
            <ul className="space-y-2.5" role="list">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="font-body text-sm text-creo-charcoal/70 hover:text-creo-primary transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-accent font-600 text-sm uppercase tracking-wider text-creo-charcoal/70 mb-4">
              {t.footer.links.services}
            </h3>
            <ul className="space-y-2.5" role="list">
              {SERVICE_LINKS.map(name => (
                <li key={name}>
                  <span className="font-body text-sm text-creo-charcoal/70">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-accent font-600 text-sm uppercase tracking-wider text-creo-charcoal/70 mb-4">
              {t.footer.links.connect}
            </h3>
            <ul className="space-y-2.5 font-body text-sm text-creo-charcoal/70" role="list">
              <li>El Paso, TX &amp; Ciudad Juárez, Chih.</li>
              <li>
                <a href="mailto:hello@creoandco.com" className="hover:text-creo-primary transition-colors duration-200 cursor-pointer">
                  hello@creoandco.com
                </a>
              </li>
              <li>
                <a href="tel:+19159959818" className="hover:text-creo-primary transition-colors duration-200 cursor-pointer">
                  (915) 995 9818
                </a>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="https://links.mylayerone.com/widget/bookings/creoconadriana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-creo-primary text-white font-body font-600 text-sm px-6 py-3 rounded-full hover:bg-creo-primary/90 transition-colors duration-200 cursor-pointer"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-creo-dark/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-creo-charcoal/70">{t.footer.legal}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="font-body text-xs text-creo-charcoal/70 hover:text-creo-charcoal/80 transition-colors cursor-pointer">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
