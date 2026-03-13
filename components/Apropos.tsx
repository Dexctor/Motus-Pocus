'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Apropos() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const els = sectionRef.current?.querySelectorAll('.ap-item')
    els?.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: reduced ? 0 : 28 },
        {
          opacity: 1, y: 0,
          duration: 0.75, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="apropos"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Portrait */}
        <div className="ap-item" style={{ opacity: 0, flexShrink: 0 }}>
          <div
            style={{
              width: '160px', height: '160px', borderRadius: '14px', overflow: 'hidden',
              border: '1px solid rgba(62,207,142,0.15)',
              boxShadow: '0 0 40px rgba(62,207,142,0.06)',
              position: 'relative',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 60px rgba(62,207,142,0.12)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
              ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 40px rgba(62,207,142,0.06)'
            }}
          >
            <Image
              src="/portrait.png"
              alt="Gaël — Motion designer SaaS B2B"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="ap-item section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            À propos
          </p>

          {/* Positionnement — fait, pas bio */}
          <h2
            className="ap-item"
            style={{
              opacity: 0,
              fontWeight: 800,
              fontSize: 'clamp(22px, 3.5vw, 34px)',
              letterSpacing: '-0.03em', lineHeight: 1.12, color: '#fff',
              marginBottom: '20px',
            }}
          >
            Je transforme des produits SaaS complexes en vidéos que les décideurs comprennent{' '}
            <span style={{ color: 'var(--accent)' }}>en 90 secondes.</span>
          </h2>

          {/* Pourquoi humain — 2 phrases */}
          <p
            className="ap-item"
            style={{
              opacity: 0,
              fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.7,
              marginBottom: '28px', maxWidth: '500px',
            }}
          >
            J'ai vu trop de bons produits disparaître parce qu'ils n'arrivaient pas à se montrer.
            Ce métier, je le fais pour que ça ne soit plus une raison d'échouer.
          </p>

          {/* Signal de crédibilité */}
          <div className="ap-item" style={{ opacity: 0, marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid var(--border-subtle)',
            }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Montage & Motion Design</strong>
                {' '}— chaque seconde sert la compréhension, pas le spectacle.
              </span>
            </div>
          </div>

          {/* CTA discret */}
          <div className="ap-item" style={{ opacity: 0 }}>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Vous voulez voir comment je travaille concrètement ?
            </p>
            <a
              href="#realisations"
              className="btn-ghost"
              style={{ padding: '9px 20px', fontSize: '13px' }}
            >
              Voir les réalisations
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #apropos > div {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          #apropos { padding: 72px 20px 80px !important; }
        }
      `}</style>
    </section>
  )
}
