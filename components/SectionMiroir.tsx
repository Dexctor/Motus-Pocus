'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONSTATS = [
  {
    id: '01',
    titre: 'Le visiteur arrive sur votre hero, repart en 8 secondes, et ne revient jamais.',
    cout: 'Chaque mois, des centaines de prospects qualifiés quittent votre site sans savoir ce que vous faites.',
  },
  {
    id: '02',
    titre: 'Votre équipe commerciale passe 15 minutes à expliquer le produit avant de pouvoir qualifier le besoin.',
    cout: 'Ce temps existe parce que la landing page n\'a pas fait son travail en amont.',
  },
  {
    id: '03',
    titre: 'Le taux d\'activation chute à J+1, J+3. L\'utilisateur ne sait pas par où commencer.',
    cout: 'L\'onboarding sans vidéo coûte des churns silencieux — les utilisateurs partent sans dire pourquoi.',
  },
  {
    id: '04',
    titre: 'Vos campagnes ads brûlent du budget sur des audiences qui rebondissent en 2 secondes.',
    cout: 'La vidéo n\'a pas été construite pour arrêter le scroll. Elle informe, elle ne convertit pas.',
  },
]

export default function SectionMiroir() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo('.miroir-header > *',
      { opacity: 0, y: reduced ? 0 : 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.miroir-header', start: 'top 87%', toggleActions: 'play none none reverse' },
      }
    )

    const items = sectionRef.current?.querySelectorAll('.miroir-item')
    items?.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: reduced ? 0 : -20 },
        {
          opacity: 1, x: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: item, start: 'top 89%', toggleActions: 'play none none reverse' },
        }
      )
    })

    gsap.fromTo('.miroir-conclusion',
      { opacity: 0, y: reduced ? 0 : 18 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.miroir-conclusion', start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="miroir"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="miroir-header" style={{ marginBottom: '56px', maxWidth: '680px' }}>
          <p className="section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            Ce qu'on observe
          </p>
          <h2 style={{
            opacity: 0,
            fontWeight: 800, fontSize: 'clamp(26px, 4vw, 42px)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '16px',
          }}>
            Sur la plupart des SaaS B2B.
          </h2>
          <p style={{
            opacity: 0,
            fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65,
          }}>
            Ces constats ne sont pas des jugements. Ce sont des patterns qu'on retrouve partout — et qui coûtent cher.
          </p>
        </div>

        {/* Constats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '56px' }}>
          {CONSTATS.map((c) => (
            <div
              key={c.id}
              className="miroir-item"
              style={{
                opacity: 0,
                display: 'grid',
                gridTemplateColumns: '48px 1fr',
                gap: '24px',
                alignItems: 'start',
                padding: '28px 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              {/* Numéro */}
              <span style={{
                fontSize: '11px', fontWeight: 600,
                color: 'rgba(62,207,142,0.4)',
                letterSpacing: '0.1em',
                paddingTop: '3px',
              }}>
                {c.id}
              </span>

              {/* Contenu */}
              <p style={{
                fontSize: 'clamp(15px, 2vw, 17px)',
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1.45,
                letterSpacing: '-0.015em',
              }}>
                {c.titre}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div
          className="miroir-conclusion"
          style={{
            opacity: 0,
            maxWidth: '600px',
            padding: '28px 32px',
            borderRadius: '12px',
            background: 'rgba(62,207,142,0.04)',
            border: '1px solid rgba(62,207,142,0.12)',
          }}
        >
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 600,
            color: '#fff',
            lineHeight: 1.5,
            letterSpacing: '-0.015em',
          }}>
            Pas un problème de budget.{' '}
            <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Un problème de clarté.</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #miroir { padding: 72px 20px 80px !important; }
          .miroir-item { grid-template-columns: 36px 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </section>
  )
}
