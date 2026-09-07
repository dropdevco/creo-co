import { useLang } from '../../contexts/LanguageContext'

import logoBordeplexCapital from '../../assets/partners/Borderplex Community Capital.png'
import logoDestinationEP from '../../assets/partners/Destination El Paso.png'
import logoWarEagles from '../../assets/partners/War Eagles Air Museum (2) (6).png'
import logoWorkforce from '../../assets/partners/Workforce Solutions Borderplex.png'
import logoUnitedWay from '../../assets/partners/United Way El Paso County.png'
import logoProjectVida from '../../assets/partners/Project Vida Logo.png'
import logoMikeLoya from '../../assets/partners/Mike Loya Center For Innovation.png'
import logoDropDev from '../../assets/partners/DropDev.png'
import logoWomenWings from '../../assets/partners/Women With Wings.png'
import logoAirsho from '../../assets/partners/MTST&AirSho-Final (1).jpg'
import logoGhostlight from '../../assets/partners/Ghostlight Creative.png'
import logoBodega from '../../assets/partners/Bodega Loya Logo (1).png'
import logoTBG from '../../assets/partners/TBG-Logo-Full Color-Small (1) (2).png'

const PARTNERS = [
  { name: 'Borderplex Community Capital', src: logoBordeplexCapital },
  { name: 'Destination El Paso', src: logoDestinationEP },
  { name: 'War Eagles Air Museum', src: logoWarEagles },
  { name: 'Workforce Solutions Borderplex', src: logoWorkforce },
  { name: 'United Way El Paso County', src: logoUnitedWay },
  { name: 'Project Vida', src: logoProjectVida },
  { name: 'Mike Loya Center For Innovation', src: logoMikeLoya },
  { name: 'DropDev', src: logoDropDev },
  { name: 'Women With Wings', src: logoWomenWings },
  { name: 'Amigo Airsho', src: logoAirsho },
  { name: 'Ghostlight Creative', src: logoGhostlight },
  { name: 'Bodega Loya', src: logoBodega },
  { name: 'TBG', src: logoTBG },
]

export default function TrustBar() {
  const { t } = useLang()
  const repeated = [...PARTNERS, ...PARTNERS]

  return (
    <section id="trust-bar" className="bg-white border-y border-creo-border py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="font-accent text-xs text-creo-charcoal/70 uppercase tracking-[0.3em]">
          {t.trust.heading}
        </p>
      </div>

      <div className="relative" aria-hidden="true">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-ticker whitespace-nowrap">
          {repeated.map((partner, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-8 shrink-0"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-12 sm:h-14 w-auto max-w-[160px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
