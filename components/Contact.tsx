'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const calRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
    gsap.fromTo(
      calRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '100px 20px 120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Big background glow */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1000px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <h2
        ref={titleRef}
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(28px, 6vw, 56px)',
          textAlign: 'center',
          color: '#fff',
          marginBottom: '50px',
          position: 'relative',
          zIndex: 2,
          opacity: 0,
        }}
      >
        Un projet ? Contactez moi !
      </h2>

      {/* Calendly embed placeholder */}
      <div
        ref={calRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '600px',
          background: '#fff',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 80px rgba(124, 58, 237, 0.2)',
          opacity: 0,
        }}
      >
        {/* Replace the div below with an iframe when you have a Calendly link */}
        {/* <iframe src="https://calendly.com/motuspocus/30min" width="100%" height="650" frameBorder="0"></iframe> */}
        <div
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#7C3AED',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: '18px',
                color: '#1a1a1a',
              }}
            >
              30 Minute Meeting
            </span>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: '#666',
              textAlign: 'center',
              fontFamily: 'var(--font-dm-sans)',
            }}
          >
            Discutons de votre projet vidéo, motion design ou sound design.
          </p>
          <a
            href="mailto:contact@motuspocus.fr"
            className="btn-glow"
            style={{
              background: '#7C3AED',
              color: '#fff',
              padding: '14px 40px',
              fontSize: '14px',
            }}
          >
            Prendre rendez-vous
          </a>
        </div>
      </div>
    </section>
  )
}
