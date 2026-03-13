'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CustomSelect from './CustomSelect'

gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({ prenom: '', email: '', url: '', type: '', message: '' })

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
      setFields({ prenom: '', email: '', url: '', type: '', message: '' })
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
      {/* Soft background glow */}
      <div style={{
        position: 'absolute', top: '-80px', left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.05) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
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
              fontWeight: 800,
              fontSize: 'clamp(24px, 3.5vw, 38px)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              color: '#fff', marginBottom: '16px',
            }}
          >
            15 minutes pour savoir<br />
            <span style={{ color: 'var(--accent)' }}>si on peut travailler ensemble.</span>
          </h2>

          <p
            className="ct-item"
            style={{
              opacity: 0,
              fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.65,
              marginBottom: '36px', maxWidth: '360px',
            }}
          >
            Réponse sous <strong style={{ color: 'rgba(255,255,255,0.7)' }}>24h</strong>. Aucun engagement.
          </p>

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
            <div style={{
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
                Je vous reviens sous 24h avec une direction claire pour votre projet.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex', flexDirection: 'column', gap: '14px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px', padding: '28px 26px',
              }}
            >
              {/* Prénom + email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                    Prénom *
                  </label>
                  <input
                    type="text" name="prenom" required
                    value={fields.prenom} onChange={handleChange}
                    placeholder="Thomas"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                    Email *
                  </label>
                  <input
                    type="email" name="email" required
                    value={fields.email} onChange={handleChange}
                    placeholder="thomas@monsaas.io"
                    className="form-input"
                  />
                </div>
              </div>

              {/* URL du site */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                  URL de votre site
                </label>
                <input
                  type="url" name="url"
                  value={fields.url} onChange={handleChange}
                  placeholder="https://monsaas.io"
                  className="form-input"
                />
              </div>

              {/* Type de projet — custom dropdown */}
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

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginBottom: '6px', fontWeight: 500 }}>
                  Contexte du projet *
                </label>
                <textarea
                  name="message" required
                  value={fields.message} onChange={handleChange}
                  placeholder="Décrivez votre SaaS, ce que vos visiteurs ne comprennent pas assez vite, et ce que vous cherchez à obtenir…"
                  rows={5}
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '110px' }}
                />
              </div>

              {formState === 'error' && (
                <p style={{ fontSize: '13px', color: '#ff6b6b' }}>
                  Une erreur est survenue. Écrivez-moi directement à motuspocus.lab@gmail.com
                </p>
              )}

              {/* ── Submit (Made to Stick: action claire) ── */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn-primary"
                style={{
                  width: '100%', justifyContent: 'center',
                  opacity: formState === 'loading' ? 0.6 : 1,
                  cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {formState === 'loading' ? 'Envoi en cours…' : 'Lancer la conversation →'}
              </button>

              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>
                Réponse sous 24h · Pas de spam · Pas de Calendly imposé
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          #contact { padding: 72px 20px 80px !important; }
        }
        @media (max-width: 400px) {
          #contact form > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
