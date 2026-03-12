'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: '01',
    title: 'Montage Vidéo',
    desc: "Cuts précis, rythme dynamique et narration fluide pour des vidéos qui captivent votre audience dès les premières secondes.",
    tags: ['YouTube', 'Réseaux sociaux', 'Publicité'],
  },
  {
    number: '02',
    title: 'Motion Design',
    desc: "Animations typographiques, transitions personnalisées et éléments graphiques animés pour des contenus visuellement mémorables.",
    tags: ['After Effects', 'Titres animés', 'Intros/Outros'],
  },
  {
    number: '03',
    title: 'Sound Design',
    desc: "Habillage sonore, mixage et synchronisation audio pour amplifier l'impact émotionnel de vos productions.",
    tags: ['Mixage', 'Musique', 'SFX'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const label = sectionRef.current?.querySelector('.services-label')
    const cards = sectionRef.current?.querySelectorAll('.service-card')

    if (label) {
      gsap.fromTo(
        label,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    }

    cards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-pad"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 40px 100px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Label */}
        <p
          className="services-label"
          style={{
            opacity: 0,
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-light)',
            marginBottom: '40px',
          }}
        >
          Services
        </p>

        {/* Cards grid */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.number}
              className="service-card"
              data-cursor-expand
              style={{
                opacity: 0,
                padding: '42px 36px',
                background: '#000',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124, 58, 237, 0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000'
              }}
            >
              {/* Number */}
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: 'rgba(255,255,255,0.15)',
                  marginBottom: '22px',
                }}
              >
                {s.number}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: 'clamp(20px, 2.2vw, 26px)',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '14px',
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </h3>

              {/* Desc */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.42)',
                  marginBottom: '26px',
                }}
              >
                {s.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '11px',
                      padding: '4px 12px',
                      borderRadius: '99px',
                      border: '1px solid rgba(139, 92, 246, 0.22)',
                      color: 'rgba(139, 92, 246, 0.65)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Corner glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -60,
                  right: -60,
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
