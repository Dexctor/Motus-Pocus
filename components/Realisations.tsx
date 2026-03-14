'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Count-up hook using IntersectionObserver ──
function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const startTime = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          if (el) el.textContent = String(Math.round(eased * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { rootMargin: '-60px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return ref
}

const PROJECTS = [
  {
    id: 1,
    type: 'Vidéo Conversion',
    title: 'Vidéo hero — FinTech SaaS B2B',
    fictif: true,
    resultNumber: 34,
    resultPrefix: '+',
    resultSuffix: '%',
    resultLabel: 'de taux de clic sur le CTA hero',
    resultDetail: 'en 6 semaines · mesure Google Analytics',
    context:  'SaaS de gestion de trésorerie pour PME. Taux de clic sur le CTA hero < 1,2%.',
    problem:  'Le produit était perçu comme complexe dès la landing page. Les visiteurs ne comprenaient pas en quoi il résolvait leur problème de cash-flow.',
    solution: 'Vidéo de conversion 75 sec : animation du dashboard en motion design, narration voix-off, illustration du bénéfice concret avant/après.',
    tools:    ['After Effects', 'Premiere Pro', 'Illustrator'],
    duration: '75 sec · 16:9',
    videoSrc: null,
  },
  {
    id: 2,
    type: 'Vidéo Onboarding',
    title: 'Séquence onboarding — RH SaaS',
    fictif: true,
    resultNumber: 19,
    resultPrefix: '+',
    resultSuffix: ' pts',
    resultLabel: "d'activation utilisateur J+7",
    resultDetail: 'volume support -31% en 2 mois',
    context:  "Logiciel RH B2B, taux d'activation J+7 à 28%. Support client submergé de questions récurrentes.",
    problem:  "Les nouveaux utilisateurs abandonnaient avant de configurer leur premier workflow. Le produit manquait d'un guide visuel post-inscription.",
    solution: '3 vidéos courtes de 90 sec, intégrées dans l\'email post-signup et le dashboard. Animations du produit réel, étape par étape.',
    tools:    ['After Effects', 'Premiere Pro'],
    duration: '3 × 90 sec · 16:9',
    videoSrc: null,
  },
  {
    id: 3,
    type: 'Vidéo Ads',
    title: 'Campagne LinkedIn — CRM vertical',
    fictif: true,
    resultNumber: 40,
    resultPrefix: '-',
    resultSuffix: '%',
    resultLabel: 'de coût par lead LinkedIn',
    resultDetail: 'CTR 1,8% vs 0,6% avec les statics',
    context:  'CRM spécialisé secteur immobilier. CPL LinkedIn > 90€, visuels statiques peu engageants.',
    problem:  "Les publicités statiques ne stoppaient pas le scroll. Le message ne résonnait pas avec la douleur des agents immobiliers cibles.",
    solution: 'Pack 4 vidéos 15–30 sec (16:9 + 9:16). Hook fort dès la 1ère seconde, motion typographique, CTA direct.',
    tools:    ['After Effects', 'Illustrator', 'Photoshop'],
    duration: '15–30 sec · 16:9 + 9:16',
    videoSrc: null,
  },
]

// ── 3D Card hover effect (Aceternity 3D Card) ──
function Card3D({ children, className, style }: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotX = (y - 0.5) * -9
    const rotY = (x - 0.5) * 10
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`
    // Sheen position
    el.style.setProperty('--sheen-x', `${x * 100}%`)
    el.style.setProperty('--sheen-y', `${y * 100}%`)
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={cardRef}
      className={`card-3d${className ? ` ${className}` : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [expanded, setExpanded] = useState(false)
  const countRef = useCountUp(project.resultNumber)

  return (
    <Card3D
      className="cs-card"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        overflow: 'hidden',
        opacity: 0,
      }}
    >
      {/* Sheen overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(255,255,255,0.03), transparent 60%)',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Video slot */}
      <div style={{
        aspectRatio: '16/9', background: 'rgba(0,0,0,0.45)',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {project.videoSrc ? (
          <video
            src={project.videoSrc} autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              border: '1px solid rgba(62,207,142,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M8 5l11 7-11 7V5z" fill="rgba(62,207,142,0.65)" />
              </svg>
            </div>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.1em' }}>Vidéo à venir</span>
          </div>
        )}

        {/* Type + fictif badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '7px' }}>
          <span style={{
            fontSize: '10px', fontWeight: 600, padding: '4px 9px', borderRadius: '6px',
            background: 'rgba(62,207,142,0.12)', color: 'var(--accent)', letterSpacing: '0.04em',
          }}>
            {project.type}
          </span>
          {project.fictif && <span className="badge-fictif">fictif</span>}
        </div>

        <span style={{
          position: 'absolute', bottom: '10px', right: '12px',
          fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em',
        }}>
          {project.duration}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 26px 26px', position: 'relative', zIndex: 2 }}>
        <h3 style={{
          fontWeight: 700, fontSize: 'clamp(16px, 1.8vw, 19px)', color: '#fff',
          marginBottom: '18px', lineHeight: 1.25, letterSpacing: '-0.02em',
        }}>
          {project.title}
        </h3>

        {/* ── RÉSULTAT EN PREMIER (StoryBrand: bénéfice avant features) ── */}
        <div style={{
          padding: '16px 18px', borderRadius: '10px',
          background: 'rgba(62,207,142,0.07)', border: '1px solid rgba(62,207,142,0.14)',
          marginBottom: '18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span
              className="tabnum"
              style={{
                fontWeight: 700, fontSize: 'clamp(28px, 4vw, 38px)',
                letterSpacing: '-0.04em', color: 'var(--accent)', lineHeight: 1,
              }}
            >
              {project.resultPrefix}
              <span ref={countRef}>{project.resultNumber}</span>
              {project.resultSuffix}
            </span>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            {project.resultLabel}
          </p>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>
            {project.resultDetail}
          </p>
        </div>

        {/* Context + Problème */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
          {[
            { label: 'Contexte', text: project.context },
            { label: 'Problème', text: project.problem },
            ...(expanded ? [{ label: 'Solution', text: project.solution }] : []),
          ].map(({ label, text }) => (
            <div key={label} style={{ display: 'flex', gap: '10px' }}>
              <span style={{
                flexShrink: 0, width: '64px', fontSize: '10px', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)', paddingTop: '2px',
              }}>
                {label}
              </span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Tools + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.tools.map((t) => <span key={t} className="tool-badge">{t}</span>)}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', color: 'rgba(255,255,255,0.32)', padding: 0,
              fontFamily: 'inherit', transition: 'color 0.2s',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')}
          >
            {expanded ? 'Réduire ↑' : 'Voir la solution ↓'}
          </button>
        </div>
      </div>
    </Card3D>
  )
}

export default function Realisations() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Header cascade
    gsap.fromTo('.cs-header-inner > *',
      { opacity: 0, y: reduced ? 0 : 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: {
          trigger: '.cs-header-inner',
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Cards stagger — set initial GSAP state, not in JSX
    const cards = sectionRef.current?.querySelectorAll('.cs-card')
    cards?.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: reduced ? 0 : 55 })
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 89%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="realisations"
      className="section-pad"
      style={{ position: 'relative', zIndex: 10, padding: '96px 40px 100px' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="cs-header-inner" style={{ marginBottom: '56px' }}>
          <p className="section-label" style={{ opacity: 0 }}>02 — Réalisations</p>
          <h2 style={{
            opacity: 0,
            fontWeight: 700,
            fontSize: 'clamp(26px, 4vw, 40px)',
            letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff',
            maxWidth: '540px', marginBottom: '12px',
          }}>
            3 projets. 3 problèmes résolus. Des chiffres.
          </h2>
          <p style={{
            opacity: 0,
            fontSize: '14px', color: 'var(--text-muted)', maxWidth: '420px', lineHeight: 1.65,
          }}>
            Le contexte vient après. Le résultat vient toujours en premier.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
          gap: '24px',
        }}>
          {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>

        <p style={{
          marginTop: '32px', fontSize: '12px',
          color: 'rgba(255,255,255,0.18)', textAlign: 'center', fontStyle: 'italic',
        }}>
          Projets marqués « fictif » : concepts réalisés pour illustrer des problématiques SaaS réelles.
        </p>

        {/* CTA post-proof */}
        <div style={{
          marginTop: '56px',
          padding: '40px 32px',
          borderRadius: '16px',
          background: 'rgba(62,207,142,0.03)',
          border: '1px solid rgba(62,207,142,0.1)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}>
            Votre produit mérite le même traitement.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
            Un brief de 15 minutes suffit pour savoir si je peux vous aider.
          </p>
          <a href="#contact" className="btn-primary" style={{ display: 'inline-flex' }}>
            Obtenir le même résultat →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #realisations { padding: 72px 20px 80px !important; }
        }
      `}</style>
    </section>
  )
}
