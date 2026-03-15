'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const POINTS = [
  {
    stat: '93%',
    statLabel: 'des acheteurs B2B',
    titre: 'Le cerveau traite le visuel 60 000× plus vite que le texte.',
    corps: 'Si votre produit ne se comprend pas visuellement, vous perdez avant que le visiteur lise une ligne.',
  },
  {
    stat: '85%',
    statLabel: 'se disent convaincus d\'acheter',
    titre: 'Une vidéo de 90 secondes fait ce que 10 pages de docs ne font pas.',
    corps: 'Disponible 24h/24, sans commercial, sans démo imposée. (Wyzowl 2024)',
  },
  {
    stat: '−40%',
    statLabel: 'de churn à l\'activation',
    titre: 'L\'utilisateur qui comprend votre produit en J+1 ne part pas en J+7.',
    corps: 'L\'onboarding sans vidéo génère un churn silencieux — l\'utilisateur bloque, n\'ose pas demander, désactive.',
  },
]

export default function Mecanique() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo('.meca-header > *',
      { opacity: 0, y: reduced ? 0 : 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.meca-header', start: 'top 87%', toggleActions: 'play none none reverse' },
      }
    )

    const cards = sectionRef.current?.querySelectorAll('.meca-card')
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: reduced ? 0 : 36 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 89%', toggleActions: 'play none none reverse' },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="mecanique"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="meca-header" style={{ marginBottom: '56px', maxWidth: '680px' }}>
          <p className="section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            Pourquoi ça change tout
          </p>
          <h2 style={{
            opacity: 0,
            fontWeight: 700, fontSize: 'clamp(26px, 4vw, 42px)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '16px',
          }}>
            Un montage vidéo de 90 secondes fait ce que 10 pages de docs ne font pas.
          </h2>
          <p style={{
            opacity: 0,
            fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65,
          }}>
            Votre SaaS résout un vrai problème. Personne ne le comprend assez vite pour rester.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '20px',
        }}>
          {POINTS.map((p, i) => (
            <div
              key={i}
              className="meca-card"
              style={{
                opacity: 0,
                padding: '32px 28px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {/* Stat */}
              <div>
                <p style={{
                  fontWeight: 800,
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  letterSpacing: '-0.04em',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {p.stat}
                </p>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                }}>
                  {p.statLabel}
                </p>
              </div>

              {/* Titre + corps */}
              <div>
                <p style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#fff',
                  lineHeight: 1.45,
                  letterSpacing: '-0.01em',
                  marginBottom: '10px',
                }}>
                  {p.titre}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                }}>
                  {p.corps}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Source note */}
        <p style={{
          marginTop: '24px',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.05em',
        }}>
          Sources : Wyzowl Video Marketing Statistics 2024 · Nielsen Norman Group
        </p>

        {/* CTA vers contact */}
        <div style={{ marginTop: '36px' }}>
          <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
            Lancer ma vidéo SaaS →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #mecanique { padding: 72px 20px 80px !important; }
        }
      `}</style>
    </section>
  )
}
