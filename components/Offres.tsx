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
    price: '1 500 – 2 000',
    tagline: 'Votre landing page perd des prospects que votre produit aurait convaincus. Un client signé couvre l\'investissement.',
    popular: false,
    features: [
      { label: 'Vidéo Conversion (60–90 sec)',    included: true  },
      { label: 'Vidéo Onboarding',                included: false },
      { label: 'Vidéo Ads (16:9 + 9:16)',         included: false },
      { label: 'Écriture script / copy',           included: false },
      { label: 'Voix off coordonnée',              included: false },
      { label: 'Fichiers sources After Effects',   included: false },
      { label: '2 révisions incluses',             included: true  },
    ],
    delay: '12 – 15 jours',
    saving: '',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '2 800 – 3 500',
    tagline: 'Vous convertissez des visiteurs mais perdez des utilisateurs à l\'activation. Le ROI se voit sur le MRR.',
    popular: true,
    features: [
      { label: 'Vidéo Conversion (60–90 sec)',    included: true  },
      { label: 'Vidéo Onboarding (60–120 sec)',   included: true  },
      { label: 'Vidéo Ads (16:9 + 9:16)',         included: false },
      { label: 'Écriture script / copy',           included: true  },
      { label: 'Voix off coordonnée',              included: true  },
      { label: 'Fichiers sources After Effects',   included: false },
      { label: '3 révisions incluses',             included: true  },
    ],
    delay: '20 – 25 jours',
    saving: '~20% vs unité',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '4 500 – 6 500',
    tagline: 'Votre produit mérite d\'être visible sur chaque canal, avec cohérence.',
    popular: false,
    features: [
      { label: 'Vidéo Conversion (60–90 sec)',    included: true },
      { label: 'Vidéo Onboarding (60–120 sec)',   included: true },
      { label: 'Vidéo Ads (16:9 + 9:16)',         included: true },
      { label: 'Écriture script / copy',           included: true },
      { label: 'Séance découverte 1h',             included: true },
      { label: 'Voix off coordonnée',              included: true },
      { label: 'Fichiers sources After Effects',   included: true },
      { label: '4 révisions incluses',             included: true },
    ],
    delay: '35 – 45 jours',
    saving: '~30% vs unité',
  },
]

const FAQ = [
  {
    q: 'Combien de révisions sont incluses ?',
    a: 'Selon le package : 2 (Boost), 3 (Scale) ou 4 (Growth). Une révision = une liste de retours consolidés envoyée en une seule fois. Pas de modifications au fil de l\'eau — ça garantit la qualité et le délai.',
  },
  {
    q: 'Sous quel délai vais-je recevoir ma vidéo ?',
    a: 'Boost : 12–15 jours. Scale : 20–25 jours. Growth : 35–45 jours. Le délai démarre à réception du brief complet et du premier versement. Je ne démarre pas sans avoir tous les éléments.',
  },
  {
    q: 'Comment démarre-t-on concrètement ?',
    a: 'Vous m\'envoyez un message via le formulaire. Je reviens sous 24h pour qualifier le besoin. Si on est alignés, on signe un devis, vous réglez 50% et on démarre. Pas de call découverte imposé.',
  },
]

const PAS_INCLUS = [
  'Templates Canva animés vendus comme du motion design.',
  'Livraisons sans brief — je ne commence pas sans comprendre votre produit.',
  'Révisions illimitées — la qualité vient du cadrage, pas des allers-retours infinis.',
]

function CheckIcon({ included }: { included: boolean }) {
  return included ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
      <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
      <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.13)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function FaqItem({ item }: { item: typeof FAQ[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: '16px', fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>
          {item.q}
        </span>
        <span style={{
          flexShrink: 0, fontSize: '20px', fontWeight: 300,
          color: open ? 'var(--accent)' : 'var(--text-muted)',
          transition: 'transform 0.3s ease, color 0.2s ease',
          display: 'inline-block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? '220px' : '0px',
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease',
        paddingBottom: open ? '20px' : '0',
      }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.a}</p>
      </div>
    </div>
  )
}

export default function Offres() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.fromTo('.offres-header > *',
      { opacity: 0, y: reduced ? 0 : 22 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.09,
        scrollTrigger: { trigger: '.offres-header', start: 'top 86%', toggleActions: 'play none none reverse' },
      }
    )

    const cards = sectionRef.current?.querySelectorAll('.pricing-card')
    cards?.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: reduced ? 0 : 48 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 89%', toggleActions: 'play none none reverse' },
        }
      )
    })

    gsap.fromTo('.offres-pas-inclus',
      { opacity: 0, y: reduced ? 0 : 20 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.offres-pas-inclus', start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )

    gsap.fromTo('.faq-block',
      { opacity: 0, y: reduced ? 0 : 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-block', start: 'top 88%', toggleActions: 'play none none reverse' },
      }
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="offres"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="offres-header" style={{ marginBottom: '56px' }}>
          <p className="section-label" style={{ opacity: 0 }}>04 — Offres</p>
          <h2 style={{
            opacity: 0,
            fontWeight: 800, fontSize: 'clamp(26px, 4vw, 40px)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '12px',
          }}>
            Lisibles en 30 secondes.
          </h2>
          <p style={{
            opacity: 0,
            fontSize: '14px', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.65,
          }}>
            Des prix affichés. Des livrables définis. Vous savez exactement ce que vous achetez avant de signer.
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={pkg.popular ? 'holo-wrap' : undefined}>
            <div
              className={`pricing-card${pkg.popular ? ' pricing-card-popular' : ''}`}
              style={{
                opacity: 0,
                background: pkg.popular ? 'rgba(10,10,10,0.97)' : 'rgba(255,255,255,0.025)',
                border: pkg.popular ? 'none' : '1px solid var(--border-subtle)',
                borderRadius: '14px',
                padding: '28px 26px 26px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                if (!pkg.popular) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)'
                }
              }}
              onMouseLeave={(e) => {
                if (!pkg.popular) {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {pkg.popular && (
                <div style={{
                  position: 'absolute', top: '-1px', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--accent)', color: '#0a0a0a',
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 14px', borderRadius: '0 0 8px 8px',
                }}>
                  Recommandé
                </div>
              )}

              <div style={{ marginBottom: '22px', paddingTop: pkg.popular ? '12px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '20px', color: '#fff', letterSpacing: '-0.02em' }}>
                    {pkg.name}
                  </h3>
                  {pkg.saving && (
                    <span style={{
                      fontSize: '10px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px',
                      background: 'rgba(62,207,142,0.1)', color: 'var(--accent)',
                    }}>
                      {pkg.saving}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.55, marginBottom: '14px' }}>
                  {pkg.tagline}
                </p>

                <p style={{
                  fontWeight: 800, fontSize: 'clamp(22px, 3vw, 28px)',
                  letterSpacing: '-0.03em', color: '#fff', lineHeight: 1,
                }}>
                  {pkg.price}
                  <span style={{ fontSize: '12px', fontWeight: 400, color: 'var(--text-muted)', marginLeft: '5px' }}>€ HT</span>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', flex: 1 }}>
                {pkg.features.map((f) => (
                  <div key={f.label} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                    <CheckIcon included={f.included} />
                    <span style={{
                      fontSize: '13px',
                      color: f.included ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.22)',
                      lineHeight: 1.4,
                    }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', marginBottom: '16px' }}>
                  Délai estimé : {pkg.delay}
                </p>
                <a
                  href="#contact"
                  className={pkg.popular ? 'btn-primary' : 'btn-ghost'}
                  style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center' }}
                >
                  Démarrer avec {pkg.name}
                </a>
              </div>
            </div>
            </div>
          ))}
        </div>

        {/* Vidéos à l'unité */}
        <div style={{
          padding: '18px 22px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
          marginBottom: '56px',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            <strong style={{ color: 'rgba(255,255,255,0.65)' }}>Vidéos à l'unité :</strong>{' '}
            Conversion 1 200–1 800€ · Onboarding 900–1 400€ · Ads 700–1 200€ HT.{' '}
            <a href="#contact" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              Demandez un devis →
            </a>
          </p>
        </div>

        {/* Ce que je ne fais pas */}
        <div
          className="offres-pas-inclus"
          style={{
            opacity: 0,
            marginBottom: '72px',
            padding: '24px 28px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.06)',
            maxWidth: '700px',
          }}
        >
          <p style={{
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '16px',
          }}>
            Ce que je ne fais pas
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PAS_INCLUS.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '3px' }}>
                  <path d="M18 6L6 18M6 6l12 12" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="faq-block" style={{ opacity: 0, maxWidth: '700px' }}>
          <p className="section-label" style={{ marginBottom: '28px' }}>FAQ — 3 questions</p>
          {FAQ.map((item) => <FaqItem key={item.q} item={item} />)}
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
