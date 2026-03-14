'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomSelect from './CustomSelect'

gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'loading' | 'success' | 'error'

const NEXT_STEPS = [
  { num: '01', label: 'Le formulaire est rempli — 30 secondes.' },
  { num: '02', label: 'Réponse sous 24h — pas un bot.' },
  { num: '03', label: "On décide ensemble si c'est aligné." },
]

const STEP_LABELS = ['Projet', 'Contact', 'Contexte']

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [fields, setFields] = useState({
    prenom: '',
    email: '',
    url: '',
    type: '',
    message: '',
    _trap: '',
  })

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = sectionRef.current?.querySelectorAll('.ct-item')
    els?.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: reduced ? 0 : 26 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', delay: i * 0.09,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      )
    })
  }, { scope: sectionRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      if (!res.ok) throw new Error()
      setFormState('success')
      setFields({ prenom: '', email: '', url: '', type: '', message: '', _trap: '' })
      setStep(1)
    } catch {
      setFormState('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad"
      style={{
        position: 'relative', zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      {/* Stronger glow — this section is the destination */}
      <div style={{
        position: 'absolute', top: '-60px', left: '50%',
        transform: 'translateX(-50%)',
        width: '900px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 65%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', alignItems: 'start',
      }}>

        {/* ── LEFT: Copy ── */}
        <div>
          <p className="ct-item section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            05 — Contact
          </p>

          <h2
            className="ct-item"
            style={{
              opacity: 0,
              fontWeight: 700,
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              color: '#fff', marginBottom: '16px',
            }}
          >
            15 minutes pour savoir<br />
            <span style={{ color: 'var(--accent)' }}>si le projet est aligné.</span>
          </h2>

          <p
            className="ct-item"
            style={{
              opacity: 0,
              fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65,
              marginBottom: '32px', maxWidth: '360px',
            }}
          >
            Réponse sous <strong style={{ color: 'rgba(255,255,255,0.7)' }}>24h</strong>. Aucun engagement.
          </p>

          {/* Availability signal */}
          <div className="ct-item" style={{ opacity: 0, marginBottom: '32px' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', borderRadius: '8px',
              background: 'rgba(62,207,142,0.06)',
              border: '1px solid rgba(62,207,142,0.18)',
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 8px rgba(62,207,142,0.6)',
                flexShrink: 0,
                display: 'inline-block',
              }} />
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                Disponible pour un projet en avril 2026
              </span>
            </div>
          </div>

          {/* What happens next */}
          <div className="ct-item" style={{ opacity: 0, marginBottom: '36px' }}>
            <p style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '16px',
            }}>
              Ce qui se passe ensuite
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {NEXT_STEPS.map((s) => (
                <div key={s.num} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, color: 'rgba(62,207,142,0.5)',
                    letterSpacing: '0.08em', paddingTop: '2px', flexShrink: 0,
                  }}>{s.num}</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Email direct */}
          <div className="ct-item" style={{ opacity: 0, marginBottom: '22px' }}>
            <p style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '8px',
            }}>
              Email direct
            </p>
            <a
              href="mailto:motuspocus.lab@gmail.com"
              style={{
                fontSize: '14px', color: 'var(--accent)', textDecoration: 'none',
                fontWeight: 500, transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              motuspocus.lab@gmail.com
            </a>
          </div>

          {/* LinkedIn */}
          <div className="ct-item" style={{ opacity: 0 }}>
            <p style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '8px',
            }}>
              LinkedIn
            </p>
            <a
              href="https://linkedin.com/in/motuspocus"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: '14px', color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s',
                display: 'inline-flex', alignItems: 'center', gap: '5px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >
              Voir le profil ↗
            </a>
          </div>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="ct-item" style={{ opacity: 0 }}>
          {formState === 'success' ? (
            <div className="ct-success" style={{
              padding: '48px 32px', borderRadius: '16px',
              background: 'rgba(62,207,142,0.05)',
              border: '1px solid rgba(62,207,142,0.18)',
              textAlign: 'center',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%', margin: '0 auto 20px',
                background: 'rgba(62,207,142,0.12)',
                border: '1px solid rgba(62,207,142,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>
                Message envoyé.
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                Réponse sous 24h avec une direction claire pour votre projet.
              </p>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px', padding: '28px 26px',
              boxShadow: '0 0 60px rgba(0,0,0,0.3)',
            }}>
              {/* Progress indicator — 3 steps */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
                {[1, 2, 3].map((n) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      border: `1.5px solid ${step >= n ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
                      background: step > n ? 'rgba(62,207,142,0.15)' : step === n ? 'rgba(62,207,142,0.08)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}>
                      {step > n ? (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <span style={{ fontSize: '11px', fontWeight: 700, color: step === n ? 'var(--accent)' : 'rgba(255,255,255,0.2)' }}>
                          {n}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontSize: '11px', color: step === n ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.25)',
                      fontWeight: step === n ? 500 : 400,
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap',
                    }}>
                      {STEP_LABELS[n - 1]}
                    </span>
                    {n < 3 && (
                      <div style={{
                        flex: 1, height: '1px',
                        background: step > n ? 'rgba(62,207,142,0.3)' : 'rgba(255,255,255,0.1)',
                        transition: 'background 0.3s ease',
                        minWidth: '12px',
                      }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                name="_trap"
                value={fields._trap}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                autoComplete="off"
              />

              {/* Step 1 — Qualification */}
              {step === 1 && (
                <form onSubmit={handleStep1} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                      Type de projet *
                    </label>
                    <CustomSelect
                      value={fields.type}
                      onChange={(v) => setFields((p) => ({ ...p, type: v }))}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                      URL du SaaS
                    </label>
                    <input
                      type="url" name="url"
                      value={fields.url} onChange={handleChange}
                      placeholder="https://monsaas.io"
                      className="form-input"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%', justifyContent: 'center',
                      padding: '16px 24px', fontSize: '15px', fontWeight: 700,
                      marginTop: '4px',
                      boxShadow: '0 4px 24px rgba(62,207,142,0.25)',
                    }}
                  >
                    Continuer →
                  </button>

                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>
                    Aucune donnée personnelle à cette étape
                  </p>
                </form>
              )}

              {/* Step 2 — Contact */}
              {step === 2 && (
                <form onSubmit={handleStep2} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                      Prénom *
                    </label>
                    <input
                      type="text" name="prenom" required
                      value={fields.prenom} onChange={handleChange}
                      placeholder="Thomas"
                      className="form-input"
                      autoFocus
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                      Email professionnel *
                    </label>
                    <input
                      type="email" name="email" required
                      value={fields.email} onChange={handleChange}
                      placeholder="thomas@monsaas.io"
                      className="form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%', justifyContent: 'center',
                      padding: '16px 24px', fontSize: '15px', fontWeight: 700,
                      marginTop: '4px',
                      boxShadow: '0 4px 24px rgba(62,207,142,0.25)',
                    }}
                  >
                    Continuer →
                  </button>

                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>
                    Aucun spam · Réponse sous 24h
                  </p>

                  {/* Back link */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '12px', color: 'rgba(255,255,255,0.28)',
                      fontFamily: 'inherit', textAlign: 'center',
                      transition: 'color 0.2s',
                      marginTop: '-4px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                  >
                    ← Modifier le projet
                  </button>
                </form>
              )}

              {/* Step 3 — Contexte (optionnel) */}
              {step === 3 && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                      Ce que vous voulez changer
                      <span style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 400, marginLeft: '6px' }}>
                        Optionnel — mais ça aide à préparer la réponse
                      </span>
                    </label>
                    <textarea
                      name="message"
                      value={fields.message} onChange={handleChange}
                      placeholder="Décrivez ce qui ne fonctionne pas aujourd'hui, ou ce que vous aimeriez améliorer…"
                      rows={4}
                      className="form-input"
                      style={{ resize: 'vertical', minHeight: '100px' }}
                      autoFocus
                    />
                  </div>

                  {formState === 'error' && (
                    <p style={{ fontSize: '13px', color: '#ff6b6b' }}>
                      Une erreur est survenue. Écrivez-moi directement à motuspocus.lab@gmail.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="btn-primary"
                    style={{
                      width: '100%', justifyContent: 'center',
                      padding: '16px 24px', fontSize: '15px', fontWeight: 700,
                      opacity: formState === 'loading' ? 0.6 : 1,
                      cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                      boxShadow: formState !== 'loading' ? '0 4px 24px rgba(62,207,142,0.25)' : 'none',
                    }}
                  >
                    {formState === 'loading' ? 'Envoi en cours…' : 'Lancer la conversation'}
                  </button>

                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>
                    Réponse sous 24h. Sans engagement.
                  </p>

                  {/* Back link */}
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: '12px', color: 'rgba(255,255,255,0.28)',
                      fontFamily: 'inherit', textAlign: 'center',
                      transition: 'color 0.2s',
                      marginTop: '-4px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                  >
                    ← Modifier mes coordonnées
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #contact { padding: 72px 20px 80px !important; }
        }
      `}</style>
    </section>
  )
}
