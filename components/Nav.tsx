'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Réalisations', href: '#realisations' },
  { label: 'À propos',     href: '#apropos' },
  { label: 'Offres',       href: '#offres' },
  { label: 'Contact',      href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.set(navRef.current, { y: -72, autoAlpha: 0 })
    gsap.to(navRef.current, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.5 })

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: '16px',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: 'calc(100% - 40px)',
        maxWidth: '900px',
        zIndex: 100,
        padding: '10px 14px 10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(12, 12, 12, 0.88)' : 'rgba(12, 12, 12, 0.6)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '12px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.02em',
          color: '#fff',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        Motus Pocus
      </a>

      {/* Links — hidden on mobile */}
      <div className="nav-links">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="btn-primary"
        style={{ padding: '8px 18px', fontSize: '12px', flexShrink: 0 }}
      >
        Parlons-en
      </a>
    </nav>
  )
}
