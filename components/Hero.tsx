'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import GlitchTitle from './GlitchTitle'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ─── Entrance timeline ───
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      portraitRef.current,
      { opacity: 0, scale: 0.82, y: 28 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.55'
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.35'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        '-=0.25'
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.1'
      )

    // ─── Portrait idle float ───
    tl.to(
      portraitRef.current,
      { y: -10, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      '+=0.2'
    )

    // ─── Scroll parallax (portrait + title + tagline) ───
    ;[
      { el: portraitRef.current, yPercent: -15 },
      { el: titleRef.current, yPercent: -8 },
      { el: taglineRef.current, yPercent: -5 },
    ].forEach(({ el, yPercent }) => {
      gsap.to(el, {
        yPercent,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '100px 20px 60px',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Portrait */}
      <div
        ref={portraitRef}
        className="portrait-glow"
        style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '28px',
          opacity: 0,
        }}
      >
        <Image
          src="/portrait.png"
          alt="Motus Pocus — Monteur Vidéo"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Pixelated Canvas Title */}
      <div ref={titleRef} style={{ opacity: 0, marginBottom: '14px' }}>
        <GlitchTitle text="Motus Pocus" fontSize={100} />
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        style={{
          fontWeight: 400,
          fontSize: 'clamp(13px, 2vw, 16px)',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '28px',
          opacity: 0,
        }}
      >
        Montage vidéo et motion design
        <br />
        pour que vos vidéos convertissent
      </p>

      {/* CTA */}
      <a
        ref={ctaRef}
        href="#contact"
        className="btn-glow"
        style={{ opacity: 0 }}
      >
        Contactez moi
      </a>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        style={{
          position: 'absolute',
          bottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="animate-scroll-bar"
            style={{
              width: '100%',
              height: '16px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
            }}
          />
        </div>
        <span
          style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '8px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
      </div>

      <div className="section-fade-bottom" />
    </section>
  )
}
