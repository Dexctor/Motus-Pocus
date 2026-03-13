'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const TOOLS = [
  'After Effects',
  'Premiere Pro',
  'Illustrator',
  'Photoshop',
]

export default function Apropos() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const els = sectionRef.current?.querySelectorAll('.ap-animate')
    els?.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
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
        position: 'relative',
        zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
      >
        {/* Portrait */}
        <div
          className="ap-animate"
          style={{
            opacity: 0,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(62,207,142,0.2)',
              boxShadow: '0 0 40px rgba(62,207,142,0.08)',
              position: 'relative',
            }}
          >
            <Image
              src="/portrait.png"
              alt="Gaël — Motus Pocus, motion designer SaaS B2B"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="ap-animate section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            03 — À propos
          </p>

          <h2
            className="ap-animate"
            style={{
              opacity: 0,
              fontWeight: 800,
              fontSize: 'clamp(22px, 3.5vw, 34px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#fff',
              marginBottom: '20px',
            }}
          >
            Je m'appelle Gaël.
          </h2>

          <div
            className="ap-animate"
            style={{
              opacity: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Je crée des vidéos motion design pour les <strong style={{ color: 'rgba(255,255,255,0.8)' }}>SaaS B2B</strong> qui veulent être compris en moins de 90 secondes.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Je travaille en solo, du script à la livraison — sans intermédiaire, avec une vraie attention au produit de mon client.
            </p>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Mon objectif : que votre visiteur comprenne votre valeur avant même de lire votre landing page.
            </p>
          </div>

          {/* Outils */}
          <div className="ap-animate" style={{ opacity: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '12px' }}>
              Outils maîtrisés
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {TOOLS.map((tool) => (
                <span key={tool} className="tool-badge">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stack portrait + text */}
      <style>{`
        @media (max-width: 640px) {
          #apropos > div {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
