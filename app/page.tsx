import AuroraCanvas from '@/components/AuroraCanvas'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import TimelineDivider from '@/components/TimelineDivider'
import Services from '@/components/Services'
import ContentSection from '@/components/ContentSection'
import FerrofluidDivider from '@/components/FerrofluidDivider'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <AuroraCanvas />
      <Nav />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Marquee />
        <TimelineDivider />
        <Services />

        {/* Section 1 */}
        <ContentSection
          text="Apportez de la valeur à vos vidéos"
          videos={[
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
          ]}
        />

        {/* Section 2 */}
        <ContentSection
          text="Apportez du rythme à vos vidéos"
          videos={[
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
          ]}
          delay={0.1}
          animation="blurIn"
        />

        <FerrofluidDivider />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
