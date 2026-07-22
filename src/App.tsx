import { SelectionProvider } from './context/SelectionContext'
import { IntroSplash } from './components/layout/IntroSplash'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { WhatsAppFloatButton } from './components/layout/WhatsAppFloatButton'
import { CookieConsent } from './components/layout/CookieConsent'
import { Hero } from './components/sections/Hero'
import { Highlights } from './components/sections/Highlights'
import { About } from './components/sections/About'
import { Services } from './components/sections/Services'
import { ObjectivePicker } from './components/sections/ObjectivePicker'
import { Process } from './components/sections/Process'
import { Gallery } from './components/sections/Gallery'
import { Testimonials } from './components/sections/Testimonials'
import { Faq } from './components/sections/Faq'
import { Location } from './components/sections/Location'
import { Booking } from './components/sections/Booking'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <SelectionProvider>
      <IntroSplash />
      <Header />
      <main>
        <Hero />
        <Highlights />
        <About />
        <Services />
        <ObjectivePicker />
        <Process />
        <Gallery />
        <Testimonials />
        <Faq />
        <Location />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloatButton />
      <CookieConsent />
    </SelectionProvider>
  )
}
