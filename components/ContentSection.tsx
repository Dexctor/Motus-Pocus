'use client'

// Pure GSAP — Framer Motion removed (reduces bundle + runtime overhead)
import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Video {
  type: 'youtube' | 'local'
  id?: string
  src?: string
}

interface ContentSectionProps {
  text: string
  videos: Video[]
  delay?: number
  animation?: 'slideUp' | 'blurIn'
}

export default function ContentSection({
  text,
  videos,
  delay = 0,
  animation = 'slideUp',
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const words = text.split(' ')

  // ── Lazy-load iframes: set src only when card enters viewport ──
  const [loadedVideos, setLoadedVideos] = useState<boolean[]>(() => videos.map(() => false))

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.cs-video')
    if (!cards) return
    const observers: IntersectionObserver[] = []

    cards.forEach((card, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoadedVideos((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
            obs.disconnect()
          }
        },
        { rootMargin: '300px' }
      )
      obs.observe(card)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useGSAP(() => {
    // ── Text animation (GSAP only, no Framer Motion) ──
    if (animation === 'slideUp') {
      const wordEls = textRef.current?.querySelectorAll('.cs-word')
      if (wordEls?.length) {
        gsap.set(Array.from(wordEls), { y: '110%', opacity: 0 })
        gsap.to(Array.from(wordEls), {
          y: '0%',
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.07,
          delay,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }

    if (animation === 'blurIn') {
      const blurEl = textRef.current?.querySelector('.cs-blur')
      if (blurEl) {
        gsap.set(blurEl, { opacity: 0, filter: 'blur(18px)', scale: 0.9, y: 10 })
        gsap.to(blurEl, {
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }

    // ── Video cards ──
    const cards = sectionRef.current?.querySelectorAll('.cs-video')
    if (!cards) return
    // Set initial state via GSAP (not in JSX) so React re-renders don't reset opacity
    gsap.set(Array.from(cards), { opacity: 0, y: 60, scale: 0.94 })
    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        delay: i * 0.15,
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="content-section-pad"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        gap: '50px',
      }}
    >
      {/* Text */}
      <div
        ref={textRef}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.35em' }}
      >
        {animation === 'slideUp' &&
          words.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.25 }}
            >
              <span
                className="cs-word"
                style={{
                  display: 'inline-block',
                  fontWeight: 700,
                  fontSize: 'clamp(26px, 4.5vw, 48px)',
                  color: '#fff',
                  lineHeight: 1.25,
                }}
              >
                {word}
              </span>
            </span>
          ))}

        {animation === 'blurIn' && (
          <span
            className="cs-blur"
            style={{
              display: 'inline-block',
              fontWeight: 700,
              fontSize: 'clamp(26px, 4.5vw, 48px)',
              color: '#fff',
              lineHeight: 1.25,
              textAlign: 'center',
            }}
          >
            {text}
          </span>
        )}
      </div>

      {/* Videos */}
      <div
        className="cs-video-grid"
      >
        {videos.map((video, i) => (
          <div
            key={i}
            className="cs-video"
            style={{
              position: 'relative',
              borderRadius: '14px',
              overflow: 'hidden',
              aspectRatio: '16/9',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              // No opacity:0 here — managed by gsap.set to avoid React re-render conflict
            }}
          >
            {/* YouTube: iframe injected only when near viewport */}
            {video.type === 'youtube' && video.id && loadedVideos[i] && (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`Video ${i + 1}`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              />
            )}
            {video.type === 'local' && video.src && (
              <video
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
