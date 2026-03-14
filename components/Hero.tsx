'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import MagneticWrap from './MagneticWrap'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  // ── Parallax: aurora + text at different speeds ──
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const section = sectionRef.current
    if (!section) return
    const auroraEl = section.querySelector<HTMLElement>('.aurora-bg')
    const textEl = section.querySelector<HTMLElement>('.hero-parallax-text')
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        if (auroraEl) auroraEl.style.transform = `translateY(${y * 0.15}px)`
        if (textEl) textEl.style.transform = `translateY(${y * -0.05}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  // ── Spotlight: mouse → CSS var ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        section.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
        section.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      gsap.set(['.hero-eyebrow', '.hero-line-1', '.hero-line-2', '.hero-tag', '.hero-video', '.hero-ctas', '.hero-scroll'], { opacity: 1, y: 0, scale: 1 })
      return
    }
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.hero-eyebrow', { opacity: 0, y: 14 },              { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.hero-line-1',  { opacity: 0, y: 36 },              { opacity: 1, y: 0, duration: 0.8 }, '-=0.2')
      .fromTo('.hero-line-2',  { opacity: 0, y: 36 },              { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
      .fromTo('.hero-tag',     { opacity: 0, y: 20 },              { opacity: 1, y: 0, duration: 0.65 }, '-=0.4')
      .fromTo('.hero-video',   { opacity: 0, scale: 0.97, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: 1.0 }, '-=0.35')
      .fromTo('.hero-ctas',    { opacity: 0, y: 16 },              { opacity: 1, y: 0, duration: 0.55 }, '-=0.45')
      .fromTo('.hero-scroll',  { opacity: 0 },                     { opacity: 1, duration: 0.4 }, '-=0.1')
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
        ['--spot-x' as string]: '-9999px',
        ['--spot-y' as string]: '-9999px',
      }}
    >
      {/* Aurora Background */}
      <div className="aurora-bg" aria-hidden>
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
        <div className="aurora-blob-3" />
      </div>

      {/* Spotlight overlay */}
      <div className="spotlight-overlay" aria-hidden />

      <div className="hero-parallax-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, willChange: 'transform' }}>
      {/* ── Eyebrow label ── */}
      <p
        className="hero-eyebrow section-label"
        style={{ opacity: 0, marginBottom: '28px', textAlign: 'center' }}
      >
        Montage vidéo · Motion Design · SaaS B2B
      </p>

      <div style={{ textAlign: 'center', maxWidth: '860px' }}>
        <h1 style={{
          fontWeight: 800,
          fontSize: 'clamp(28px, 5.2vw, 64px)',
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
        }}>
          <span
            className="hero-line-1"
            style={{ display: 'block', opacity: 0, color: 'rgba(255,255,255,0.38)' }}
          >
            Votre produit est solide.
          </span>
          <span
            className="hero-line-2"
            style={{ display: 'block', opacity: 0, color: '#fff' }}
          >
            La vidéo qui transforme un visiteur en utilisateur.
          </span>
        </h1>

        <p
          className="hero-tag"
          style={{
            opacity: 0,
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '-0.01em',
            marginBottom: '40px',
          }}
        >
          +34% de clics sur le CTA hero en 6 semaines.{' '}
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Montage vidéo et motion design pour SaaS B2B.</span>
        </p>
      </div>
      </div>{/* end hero-parallax-text */}

      {/* ── Showreel video ── */}
      <div
        className="hero-video"
        style={{
          opacity: 0,
          width: '100%',
          maxWidth: '840px',
          borderRadius: '14px',
          overflow: 'hidden',
          aspectRatio: '16/9',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(62,207,142,0.1)',
          boxShadow: '0 0 80px rgba(62,207,142,0.05), 0 40px 100px rgba(0,0,0,0.5)',
          marginBottom: '36px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <video
          autoPlay muted loop playsInline preload="auto"
          poster="/showreel-poster.webp"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/showreel.webm" type="video/webm" />
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        {/* Placeholder tant que showreel.mp4 n'existe pas */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px',
          background: 'rgba(14,14,14,0.93)',
        }}>
          <div style={{
            width: '58px', height: '58px', borderRadius: '50%',
            border: '1.5px solid rgba(62,207,142,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M8 5l11 7-11 7V5z" fill="rgba(62,207,142,0.75)" />
            </svg>
          </div>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Showreel 2025
          </span>
        </div>
      </div>

      {/* ── CTA unique ── */}
      <div
        className="hero-ctas"
        style={{
          opacity: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          position: 'relative', zIndex: 2,
        }}
      >
        <MagneticWrap strength={0.4}>
          <div className="moving-border-wrap">
            <div className="moving-border-spinner" aria-hidden />
            <a href="#contact" className="btn-primary">
              Lancer ma vidéo SaaS →
            </a>
          </div>
        </MagneticWrap>
        <p style={{
          fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.6,
        }}>
          Réponse sous 24h · Sans engagement · Pas de Calendly imposé
        </p>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll" style={{
        position: 'absolute', bottom: '28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        opacity: 0, zIndex: 2,
      }}>
        <div style={{ width: '1px', height: '36px', overflow: 'hidden', background: 'rgba(255,255,255,0.07)' }}>
          <div className="animate-scroll-bar" style={{
            width: '100%', height: '14px',
            background: 'linear-gradient(to bottom, transparent, rgba(62,207,142,0.5), transparent)',
          }} />
        </div>
      </div>
    </section>
  )
}
