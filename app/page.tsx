import AuroraCanvas from '@/components/AuroraCanvas'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ContentSection from '@/components/ContentSection'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <AuroraCanvas />
      <Nav />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />

        {/* Section 1: Text + 2 GIFs/demo videos side by side — full screen */}
        <ContentSection
          text="Apportez de la valeur à vos vidéos"
          videos={[
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
          ]}
        />

        {/* Section 2: Text + 2 YouTube videos side by side — full screen */}
        <ContentSection
          text="Apportez du rythme à vos vidéos"
          videos={[
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
            { type: 'youtube', id: 'dQw4w9WgXcQ' },
          ]}
          delay={0.1}
          animation="blurIn"
        />

        <Contact />
        <Footer />
      </main>
    </>
  )
}
