import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Realisations from '@/components/Realisations'
import Apropos from '@/components/Apropos'
import Offres from '@/components/Offres'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Realisations />
        <Apropos />
        <Offres />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
