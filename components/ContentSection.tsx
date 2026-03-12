'use client'

import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
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
  const isInView = useInView(textRef, { once: false, margin: '-20% 0px -20% 0px' })

  const words = text.split(' ')

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.cs-video')
    if (!cards) return
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
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
      {/* Text with chosen animation */}
      <div
        ref={textRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 0.35em',
        }}
      >
        {animation === 'slideUp' &&
          words.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
              }}
            >
              <motion.span
                style={{
                  display: 'inline-block',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 4.5vw, 44px)',
                  color: '#fff',
                  lineHeight: 1.2,
                }}
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: delay + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}

        {animation === 'blurIn' && (
          <motion.span
            style={{
              display: 'inline-block',
              fontWeight: 700,
              fontSize: 'clamp(24px, 4.5vw, 44px)',
              color: '#fff',
              lineHeight: 1.2,
              textAlign: 'center',
            }}
            initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.95 }}
            animate={
              isInView
                ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
                : { opacity: 0, filter: 'blur(12px)', scale: 0.95 }
            }
            transition={{
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {text}
          </motion.span>
        )}
      </div>

      {/* 2 Videos side by side */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          width: '100%',
          maxWidth: '1100px',
        }}
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
              opacity: 0,
            }}
          >
            {video.type === 'youtube' && video.id && (
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                title={`Video ${i + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            )}
            {video.type === 'local' && video.src && (
              <video
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
