'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOOLS = {
  AE: 'After Effects',
  PR: 'Premiere Pro',
  AI: 'Illustrator',
  PS: 'Photoshop',
}

const PROJECTS = [
  {
    id: 1,
    type: 'Vidéo Conversion',
    title: 'Vidéo hero — FinTech SaaS B2B',
    fictif: true,
    context: 'SaaS de gestion de trésorerie pour PME. Taux de clic sur le CTA hero < 1,2 %.',
    problem: 'Le produit était perçu comme complexe dès la landing page. Les visiteurs ne comprenaient pas en quoi il résolvait leur problème de cash-flow.',
    solution: 'Vidéo de conversion 75 sec : animation du dashboard en motion design, narration voix-off, illustration du bénéfice concret avant/après.',
    result: '+34 % de taux de clic sur le CTA hero en 6 semaines.',
    tools: [TOOLS.AE, TOOLS.PR, TOOLS.AI],
    duration: '75 sec · 16:9',
    videoSrc: null, // Remplacer par l'URL de la vidéo réelle
  },
  {
    id: 2,
    type: 'Vidéo Onboarding',
    title: 'Séquence onboarding — RH SaaS',
    fictif: true,
    context: 'Logiciel RH B2B, taux d\'activation J+7 à 28 %. Support client submergé de questions récurrentes.',
    problem: 'Les nouveaux utilisateurs abandonnaient avant de configurer leur premier workflow. Le produit manquait d\'un guide visuel post-inscription.',
    solution: '3 vidéos courtes de 90 sec chacune, intégrées dans l\'email post-signup et le dashboard. Animations du produit réel, étape par étape.',
    result: 'Taux d\'activation J+7 : +19 pts. Volume support : -31 % en 2 mois.',
    tools: [TOOLS.AE, TOOLS.PR],
    duration: '3 × 90 sec · 16:9',
    videoSrc: null,
  },
  {
    id: 3,
    type: 'Vidéo Ads',
    title: 'Campagne LinkedIn — CRM vertical',
    fictif: true,
    context: 'CRM spécialisé secteur immobilier. CPL LinkedIn trop élevé (> 90€), visuels statiques peu engageants.',
    problem: 'Les publicités statiques ne stoppaient pas le scroll. Le message ne résonnait pas avec la douleur des agents immobiliers cible.',
    solution: 'Pack 4 vidéos 15–30 sec (16:9 + 9:16). Hook fort dès la 1ère seconde, motion typographique, CTA direct en fin de séquence.',
    result: 'CPL réduit à 54€ (-40 %). CTR moyen : 1,8 % vs 0,6 % avec les statics.',
    tools: [TOOLS.AE, TOOLS.AI, TOOLS.PS],
    duration: '15–30 sec · 16:9 + 9:16',
    videoSrc: null,
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`card-hover cs-card`}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        overflow: 'hidden',
        opacity: 0,
      }}
    >
      {/* Video placeholder */}
      <div
        style={{
          aspectRatio: '16/9',
          background: 'rgba(0,0,0,0.4)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {project.videoSrc ? (
          <video
            src={project.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid rgba(62,207,142,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M8 5l11 7-11 7V5z" fill="rgba(62,207,142,0.7)" />
              </svg>
            </div>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em' }}>
              Vidéo à venir
            </span>
          </div>
        )}

        {/* Type badge */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '6px',
              background: 'rgba(62,207,142,0.12)',
              color: 'var(--accent)',
              letterSpacing: '0.05em',
            }}
          >
            {project.type}
          </span>
          {project.fictif && (
            <span className="badge-fictif">fictif</span>
          )}
        </div>

        {/* Duration */}
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            fontSize: '10px',
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.05em',
          }}
        >
          {project.duration}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px 28px' }}>
        <h3
          style={{
            fontWeight: 700,
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h3>

        {/* Case study steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {[
            { label: 'Contexte', text: project.context },
            { label: 'Problème', text: project.problem },
            ...(expanded ? [{ label: 'Solution', text: project.solution }] : []),
          ].map(({ label, text }) => (
            <div key={label} style={{ display: 'flex', gap: '12px' }}>
              <span
                style={{
                  flexShrink: 0,
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  paddingTop: '2px',
                  width: '68px',
                }}
              >
                {label}
              </span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Résultat — toujours visible, mis en avant */}
        <div
          style={{
            padding: '14px 16px',
            borderRadius: '8px',
            background: 'rgba(62,207,142,0.07)',
            border: '1px solid rgba(62,207,142,0.14)',
            marginBottom: '20px',
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '14px', flexShrink: 0 }}>↑</span>
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', lineHeight: 1.5 }}>
            {project.result}
          </p>
        </div>

        {/* Tools + toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.tools.map((tool) => (
              <span key={tool} className="tool-badge">{tool}</span>
            ))}
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.35)',
              padding: 0,
              fontFamily: 'inherit',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            {expanded ? 'Réduire' : 'Voir la solution'}
            <span style={{ fontSize: '10px' }}>{expanded ? '↑' : '↓'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Realisations() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.cs-header', { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.cs-header', start: 'top 85%', toggleActions: 'play none none reverse' },
    })
    const cards = sectionRef.current?.querySelectorAll('.cs-card')
    cards?.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
      })
      gsap.set(card, { y: 50 })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="realisations"
      className="section-pad"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '96px 40px 100px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="cs-header" style={{ opacity: 0, marginBottom: '56px' }}>
          <p className="section-label">02 — Réalisations</p>
          <h2 style={{
            fontWeight: 800,
            fontSize: 'clamp(26px, 4vw, 40px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#fff',
            maxWidth: '520px',
          }}>
            Des vidéos construites pour convertir.
          </h2>
          <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: 1.6 }}>
            Chaque projet suit le même fil : comprendre le problème, construire la solution, mesurer l'impact.
          </p>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '24px',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Fictif disclaimer */}
        <p style={{
          marginTop: '32px',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.2)',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          Les projets marqués « fictif » sont des concepts réalisés pour illustrer des problématiques SaaS réelles.
        </p>
      </div>
    </section>
  )
}
