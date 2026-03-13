'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ETAPES = [
  {
    num: '01',
    titre: 'Brief stratégique',
    duree: '2–3 jours',
    corps: 'On aligne l\'angle avant d\'écrire une ligne de script.',
    livrable: 'Angle validé + script approuvé',
  },
  {
    num: '02',
    titre: 'Production',
    duree: 'Selon le package',
    corps: 'Vous recevez une V1 complète — pas un brouillon.',
    livrable: 'V1 livrée via lien de revue privé',
  },
  {
    num: '03',
    titre: 'Livraison',
    duree: 'J livraison',
    corps: 'Fichiers finaux dans tous les formats utiles. Vous publiez le jour J.',
    livrable: 'Fichiers + guide d\'intégration',
  },
]

export default function Methode() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo('.methode-header > *',
      { opacity: 0, y: reduced ? 0 : 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.methode-header', start: 'top 87%', toggleActions: 'play none none reverse' },
      }
    )

    const steps = sectionRef.current?.querySelectorAll('.methode-step')
    steps?.forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: reduced ? 0 : 28 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.12,
          scrollTrigger: { trigger: step, start: 'top 89%', toggleActions: 'play none none reverse' },
        }
      )
    })

    gsap.fromTo('.methode-garantie',
      { opacity: 0, y: reduced ? 0 : 16 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: '.methode-garantie', start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="methode"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="methode-header" style={{ marginBottom: '60px', maxWidth: '680px' }}>
          <p className="section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            03 — Méthode
          </p>
          <h2 style={{
            opacity: 0,
            fontWeight: 800, fontSize: 'clamp(26px, 4vw, 42px)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '16px',
          }}>
            Comment ça se passe, concrètement.
          </h2>
          <p style={{
            opacity: 0,
            fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65,
          }}>
            Trois étapes. Un périmètre défini dès le départ. Pas de relances, pas de surprises.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ETAPES.map((e, i) => (
            <div
              key={e.num}
              className="methode-step"
              style={{
                opacity: 0,
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '32px',
                alignItems: 'start',
                padding: '36px 0',
                borderBottom: i < ETAPES.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              {/* Numéro + ligne */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '50%',
                  border: '1px solid rgba(62,207,142,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: '12px', fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.05em',
                  }}>
                    {e.num}
                  </span>
                </div>
                {i < ETAPES.length - 1 && (
                  <div style={{
                    width: '1px',
                    height: '100%',
                    minHeight: '40px',
                    background: 'linear-gradient(to bottom, rgba(62,207,142,0.2), transparent)',
                  }} />
                )}
              </div>

              {/* Contenu */}
              <div style={{ paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <h3 style={{
                    fontWeight: 700,
                    fontSize: 'clamp(17px, 2.2vw, 20px)',
                    color: '#fff',
                    letterSpacing: '-0.02em',
                  }}>
                    {e.titre}
                  </h3>
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {e.duree}
                  </span>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  maxWidth: '560px',
                }}>
                  {e.corps}
                </p>
                {/* Livrable */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'rgba(62,207,142,0.06)',
                  border: '1px solid rgba(62,207,142,0.15)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{
                    fontSize: '12px', fontWeight: 500,
                    color: 'rgba(62,207,142,0.8)',
                    letterSpacing: '0.02em',
                  }}>
                    {e.livrable}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Garantie */}
        <div
          className="methode-garantie"
          style={{
            opacity: 0,
            marginTop: '48px',
            padding: '20px 24px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-subtle)',
            maxWidth: '600px',
          }}
        >
          <p style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
          }}>
            <strong style={{ color: 'rgba(255,255,255,0.65)' }}>Le périmètre est défini avant le démarrage.</strong>{' '}
            Pas de surprise.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #methode { padding: 72px 20px 80px !important; }
          .methode-step { grid-template-columns: 56px 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
