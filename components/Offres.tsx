'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PACKAGES = [
  {
    id: 'boost',
    name: 'Boost',
    price: '1 500 – 2 000 €',
    tagline: 'Pour démarrer fort.',
    popular: false,
    features: [
      { label: 'Vidéo Conversion (60–90 sec)', included: true },
      { label: 'Vidéo Onboarding', included: false },
      { label: 'Vidéo Ads (16:9 + 9:16)', included: false },
      { label: 'Écriture script / copy', included: false },
      { label: 'Voix off coordonnée', included: false },
      { label: 'Fichiers sources After Effects', included: false },
      { label: '2 révisions incluses', included: true },
    ],
    delay: '12 – 15 jours',
    saving: '',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '2 800 – 3 500 €',
    tagline: 'Acquisition + rétention.',
    popular: true,
    features: [
      { label: 'Vidéo Conversion (60–90 sec)', included: true },
      { label: 'Vidéo Onboarding (60–120 sec)', included: true },
      { label: 'Vidéo Ads (16:9 + 9:16)', included: false },
      { label: 'Écriture script / copy', included: true },
      { label: 'Voix off coordonnée', included: true },
      { label: 'Fichiers sources After Effects', included: false },
      { label: '3 révisions incluses', included: true },
    ],
    delay: '20 – 25 jours',
    saving: '~20 % vs unité',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '4 500 – 6 500 €',
    tagline: 'Le pack complet.',
    popular: false,
    features: [
      { label: 'Vidéo Conversion (60–90 sec)', included: true },
      { label: 'Vidéo Onboarding (60–120 sec)', included: true },
      { label: 'Vidéo Ads (16:9 + 9:16)', included: true },
      { label: 'Écriture script / copy', included: true },
      { label: 'Séance découverte 1h', included: true },
      { label: 'Voix off coordonnée', included: true },
      { label: 'Fichiers sources After Effects', included: true },
      { label: '4 révisions incluses', included: true },
    ],
    delay: '35 – 45 jours',
    saving: '~30 % vs unité',
  },
]

const FAQ = [
  {
    q: 'Combien de révisions sont incluses ?',
    a: 'Selon le package : 2 (Boost), 3 (Scale) ou 4 (Growth). Une révision = une liste de retours consolidés envoyée en une seule fois. Les modifications au fil de l\'eau ne sont pas incluses dans ce décompte.',
  },
  {
    q: 'Sous quel délai vais-je recevoir ma vidéo ?',
    a: 'Boost : 12–15 jours. Scale : 20–25 jours. Growth : 35–45 jours. Le délai démarre à réception du brief complet et du premier versement. Aucune estimation avant d\'avoir tous les éléments.',
  },
  {
    q: 'Comment démarre-t-on concrètement ?',
    a: 'Vous m\'envoyez un message via le formulaire de contact avec le contexte de votre projet. Je reviens sous 48h pour qualifier le besoin. Si la collaboration est alignée, on signe et je démarre.',
  },
]

function CheckIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
        <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
      <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function FaqItem({ item }: { item: typeof FAQ[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq-item" style={{ padding: '0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
          {item.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            fontSize: '18px',
            color: 'var(--text-muted)',
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '200px' : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease, opacity 0.25s ease',
          paddingBottom: open ? '20px' : '0',
        }}
      >
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function Offres() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.offres-header', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.offres-header', start: 'top 85%', toggleActions: 'play none none reverse' },
    })

    const cards = sectionRef.current?.querySelectorAll('.pricing-card')
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.85, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      )
    })

    gsap.fromTo('.faq-block', { opacity: 0, y: 24 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.faq-block', start: 'top 88%', toggleActions: 'play none none reverse' },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="offres"
      className="section-pad"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="offres-header" style={{ opacity: 0, marginBottom: '56px' }}>
          <p className="section-label">04 — Offres</p>
          <h2 style={{
            fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 40px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: '12px',
          }}>
            Lisibles en 30 secondes.
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '380px', lineHeight: 1.6 }}>
            Trois packages. Des tarifs transparents. Vous savez exactement ce que vous achetez.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '20px',
            marginBottom: '72px',
          }}
        >
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`pricing-card ${pkg.popular ? 'pricing-card-popular' : ''}`}
              style={{
                opacity: 0,
                background: pkg.popular ? 'rgba(62,207,142,0.04)' : 'rgba(255,255,255,0.025)',
                border: pkg.popular ? '1px solid rgba(62,207,142,0.3)' : '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '32px 28px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {pkg.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent)',
                    color: '#0a0a0a',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '4px 14px',
                    borderRadius: '0 0 8px 8px',
                  }}
                >
                  Recommandé
                </div>
              )}

              {/* Name & price */}
              <div style={{ marginBottom: '24px', paddingTop: pkg.popular ? '12px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '20px', color: '#fff' }}>
                    {pkg.name}
                  </h3>
                  {pkg.saving && (
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '99px',
                      background: 'rgba(62,207,142,0.1)',
                      color: 'var(--accent)',
                    }}>
                      {pkg.saving}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  {pkg.tagline}
                </p>
                <p style={{
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 3vw, 28px)',
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  lineHeight: 1,
                }}>
                  {pkg.price}
                  <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '4px' }}>HT</span>
                </p>
              </div>

              {/* Features list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', marginBottom: '28px', flex: 1 }}>
                {pkg.features.map((f) => (
                  <div key={f.label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <CheckIcon included={f.included} />
                    <span style={{
                      fontSize: '13px',
                      color: f.included ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.25)',
                      lineHeight: 1.4,
                    }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Délai + CTA */}
              <div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginBottom: '14px' }}>
                  Délai : {pkg.delay}
                </p>
                <a
                  href="#contact"
                  className={pkg.popular ? 'btn-primary' : 'btn-ghost'}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  Démarrer avec {pkg.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Vidéos à l'unité — note */}
        <div
          style={{
            padding: '20px 24px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '72px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <strong style={{ color: 'rgba(255,255,255,0.7)' }}>Vidéos à l'unité disponibles :</strong>{' '}
            Conversion 1 200–1 800€ · Onboarding 900–1 400€ · Ads 700–1 200€ HT.{' '}
            <a href="#contact" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Demandez un devis →</a>
          </p>
        </div>

        {/* FAQ */}
        <div className="faq-block" style={{ opacity: 0, maxWidth: '680px' }}>
          <p className="section-label" style={{ marginBottom: '28px' }}>FAQ — 3 questions</p>
          {FAQ.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          #offres { padding: 72px 20px 80px !important; }
        }
      `}</style>
    </section>
  )
}
