'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo('.hero-label',  { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-h1',     { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
      .fromTo('.hero-sub',    { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo('.hero-video',  { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 1.0 }, '-=0.4')
      .fromTo('.hero-ctas',   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1')
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
        padding: '120px 20px 80px',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.07) 0%, rgba(62,207,142,0.02) 45%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <p
        className="hero-label section-label"
        style={{ opacity: 0, marginBottom: '20px', textAlign: 'center' }}
      >
        Motion Design · SaaS B2B
      </p>

      {/* H1 — pitch principal */}
      <h1
        className="hero-h1"
        style={{
          opacity: 0,
          fontWeight: 800,
          fontSize: 'clamp(30px, 5.5vw, 64px)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          maxWidth: '820px',
          color: '#fff',
          marginBottom: '20px',
        }}
      >
        Je crée des vidéos qui révèlent{' '}
        <span style={{ color: 'var(--accent)' }}>la valeur de votre SaaS</span>{' '}
        en 90 secondes.
      </h1>

      {/* Sous-titre */}
      <p
        className="hero-sub"
        style={{
          opacity: 0,
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: '480px',
          lineHeight: 1.65,
          marginBottom: '40px',
        }}
      >
        Vos prospects comprennent enfin votre produit — et passent à l'action.
      </p>

      {/* Showreel video */}
      <div
        className="hero-video"
        style={{
          opacity: 0,
          width: '100%',
          maxWidth: '820px',
          borderRadius: '14px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(62, 207, 142, 0.12)',
          boxShadow: '0 0 60px rgba(62, 207, 142, 0.06), 0 30px 80px rgba(0,0,0,0.4)',
          marginBottom: '36px',
          position: 'relative',
        }}
      >
        {/*
          Remplacer src="/showreel.mp4" par ton fichier réel dans /public
          ou par une URL Cloudflare Stream / Mux / Vimeo en autoplay muet
        */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/showreel.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Placeholder affiché quand la vidéo n'est pas encore là */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            background: 'rgba(17,17,17,0.9)',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '1.5px solid rgba(62,207,142,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M8 5l11 7-11 7V5z" fill="rgba(62,207,142,0.8)" />
            </svg>
          </div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Showreel 2025
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="hero-ctas"
        style={{
          opacity: 0,
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a href="#realisations" className="btn-primary">
          Voir mes réalisations
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
        <a href="#contact" className="btn-ghost">
          Parlons de votre projet →
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll"
        style={{
          position: 'absolute',
          bottom: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0,
        }}
      >
        <div style={{ width: '1px', height: '36px', overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="animate-scroll-bar"
            style={{
              width: '100%',
              height: '14px',
              background: 'linear-gradient(to bottom, transparent, rgba(62,207,142,0.5), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
