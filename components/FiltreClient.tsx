'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PAS_POUR_VOUS = [
  'Vous cherchez une vidéo livrée en 48h depuis un template Canva.',
  'Vous n\'avez pas encore de product-market fit — une vidéo n\'y changera rien.',
  'Vous attendez des garanties de résultat avant d\'investir dans la clarté.',
]

const POUR_VOUS = [
  'Vous dirigez un SaaS B2B avec un produit qui tient la route mais une landing page qui ne le montre pas.',
  'Vous voulez un prestataire qui cadre le projet, pas un exécutant qui attend les instructions.',
  'Vous mesurez le ROI et vous comprenez qu\'un client signé couvre l\'investissement.',
]

export default function FiltreClient() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo('.filtre-header > *',
      { opacity: 0, y: reduced ? 0 : 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.filtre-header', start: 'top 87%', toggleActions: 'play none none reverse' },
      }
    )

    gsap.fromTo('.filtre-col-non',
      { opacity: 0, x: reduced ? 0 : -24 },
      {
        opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.filtre-col-non', start: 'top 89%', toggleActions: 'play none none reverse' },
      }
    )

    gsap.fromTo('.filtre-col-oui',
      { opacity: 0, x: reduced ? 0 : 24 },
      {
        opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.filtre-col-oui', start: 'top 89%', toggleActions: 'play none none reverse' },
      }
    )

    gsap.fromTo('.filtre-cta',
      { opacity: 0, y: reduced ? 0 : 16 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.filtre-cta', start: 'top 90%', toggleActions: 'play none none reverse' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="filtre"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="filtre-header" style={{ marginBottom: '52px', maxWidth: '620px' }}>
          <p className="section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            Pour qui ?
          </p>
          <h2 style={{
            opacity: 0,
            fontWeight: 700, fontSize: 'clamp(26px, 4vw, 42px)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff',
          }}>
            Peu de clients. Des projets sur-mesure.{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>
              Zéro compromis sur la qualité.
            </span>
          </h2>
        </div>

        {/* Deux colonnes */}
        <div className="filtre-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {/* Non */}
          <div
            className="filtre-col-non"
            style={{
              opacity: 0,
              padding: '32px 28px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <p style={{
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,100,100,0.5)',
              marginBottom: '20px',
            }}>
              Ce n'est pas pour vous si…
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PAS_POUR_VOUS.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,100,100,0.4)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.6,
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Oui */}
          <div
            className="filtre-col-oui"
            style={{
              opacity: 0,
              padding: '32px 28px',
              borderRadius: '16px',
              background: 'rgba(62,207,142,0.035)',
              border: '1px solid rgba(62,207,142,0.2)',
            }}
          >
            <p style={{
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(62,207,142,0.6)',
              marginBottom: '20px',
            }}>
              En revanche, si vous…
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {POUR_VOUS.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.72)',
                    lineHeight: 1.6,
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="filtre-cta"
          style={{
            opacity: 0,
            marginTop: '48px',
            textAlign: 'center',
          }}
        >
          <p style={{
            fontSize: '15px',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '24px',
          }}>
            Vous vous reconnaissez dans la colonne de droite ?
          </p>
          <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
            Vérifier si ça colle →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #filtre .filtre-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          #filtre { padding: 72px 20px 80px !important; }
        }
      `}</style>
    </section>
  )
}
