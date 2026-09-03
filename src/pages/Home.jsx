import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import Services from '../components/sections/Services'
import Industries from '../components/sections/Industries'
import FullStatement from '../components/sections/FullStatement'
import CaseStudies from '../components/sections/CaseStudies'
import Borderplex from '../components/sections/Borderplex'
import Gallery from '../components/sections/Gallery'
// PENDING: Unhide when client provides testimonials
// import Testimonials from '../components/sections/Testimonials'
import Events from '../components/sections/Events'
import CTASection from '../components/sections/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <Industries />
      <FullStatement />
      <CaseStudies />
      <Borderplex />
      <Gallery />
      {/* PENDING: Unhide when client provides testimonials */}
      {/* <Testimonials /> */}
      <Events limit={3} />
      <CTASection />
    </main>
  )
}
