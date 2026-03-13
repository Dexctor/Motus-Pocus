import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SectionMiroir from '@/components/SectionMiroir'
import Mecanique from '@/components/Mecanique'
import Realisations from '@/components/Realisations'
import Methode from '@/components/Methode'
import Apropos from '@/components/Apropos'
import Offres from '@/components/Offres'
import FiltreClient from '@/components/FiltreClient'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <SectionMiroir />
        <Mecanique />
        <Realisations />
        <Methode />
        <Apropos />
        <Offres />
        <FiltreClient />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
