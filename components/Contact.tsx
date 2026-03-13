'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECT_TYPES = [
  'Vidéo Conversion (hero landing page)',
  'Vidéo Onboarding (post-signup)',
  'Vidéo Ads (LinkedIn / YouTube / TikTok)',
  'Package Boost',
  'Package Scale',
  'Package Growth',
  'Autre / Je ne sais pas encore',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({
    prenom: '',
    email: '',
    type: '',
    message: '',
  })

  useGSAP(() => {
    const els = sectionRef.current?.querySelectorAll('.ct-animate')
    els?.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.75, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      )
    })
  }, { scope: sectionRef })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
      if (!res.ok) throw new Error('Server error')
      setFormState('success')
      setFields({ prenom: '', email: '', type: '', message: '' })
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
        position: 'relative',
        zIndex: 10,
        padding: '96px 40px 100px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '600px', height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

        {/* Left: copy */}
        <div>
          <p className="ct-animate section-label" style={{ opacity: 0, marginBottom: '16px' }}>
            05 — Contact
          </p>
          <h2
            className="ct-animate"
            style={{
              opacity: 0,
              fontWeight: 800,
              fontSize: 'clamp(26px, 4vw, 40px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Un projet SaaS à mettre en mouvement ?
          </h2>
          <p
            className="ct-animate"
            style={{
              opacity: 0,
              fontSize: '15px',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '40px',
              maxWidth: '360px',
            }}
          >
            Décrivez votre contexte, je reviens sous 48h pour voir si on peut travailler ensemble.
          </p>

          {/* Email direct */}
          <div className="ct-animate" style={{ opacity: 0, marginBottom: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>
              Email direct
            </p>
            <a
              href="mailto:motuspocus.lab@gmail.com"
              style={{
                fontSize: '14px',
                color: 'var(--accent)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              motuspocus.lab@gmail.com
            </a>
          </div>

          {/* LinkedIn */}
          <div className="ct-animate" style={{ opacity: 0 }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>
              LinkedIn
            </p>
            <a
              href="https://linkedin.com/in/motuspocus"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              Voir le profil
              <span style={{ fontSize: '12px' }}>↗</span>
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="ct-animate" style={{ opacity: 0 }}>
          {formState === 'success' ? (
            <div
              style={{
                padding: '48px 32px',
                borderRadius: '16px',
                background: 'rgba(62,207,142,0.06)',
                border: '1px solid rgba(62,207,142,0.2)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>
                Message envoyé !
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Je reviendrai vers vous sous 48h pour qualifier votre projet.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                padding: '32px 28px',
              }}
            >
              {/* Row: prenom + email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: 500 }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    required
                    value={fields.prenom}
                    onChange={handleChange}
                    placeholder="Thomas"
                    className="form-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: 500 }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="thomas@monsaas.io"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Type de projet */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: 500 }}>
                  Type de projet *
                </label>
                <select
                  name="type"
                  required
                  value={fields.type}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Choisissez une option…</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px', fontWeight: 500 }}>
                  Contexte du projet *
                </label>
                <textarea
                  name="message"
                  required
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre SaaS, votre problème actuel et ce que vous cherchez à obtenir…"
                  rows={5}
                  className="form-input"
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              {/* Error */}
              {formState === 'error' && (
                <p style={{ fontSize: '13px', color: '#ff6b6b' }}>
                  Une erreur s'est produite. Écrivez-moi directement à motuspocus.lab@gmail.com
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="btn-primary"
                style={{
                  width: '100%',
                  opacity: formState === 'loading' ? 0.6 : 1,
                  cursor: formState === 'loading' ? 'not-allowed' : 'pointer',
                }}
              >
                {formState === 'loading' ? 'Envoi en cours…' : 'Envoyer le message →'}
              </button>

              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                Pas de spam. Réponse sous 48h.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #contact { padding: 72px 20px 80px !important; }
        }
        @media (max-width: 400px) {
          #contact form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
