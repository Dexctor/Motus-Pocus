'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Set initial hidden state via GSAP (avoids React re-render conflict with opacity:0 in JSX)
    gsap.set(navRef.current, { y: -72, autoAlpha: 0 })
    gsap.to(navRef.current, { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', delay: 0.4 })

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
        maxWidth: '860px',
        zIndex: 100,
        padding: '10px 12px 10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(5, 5, 5, 0.82)' : 'rgba(5, 5, 5, 0.55)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        border: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '14px',
        transition: 'background 0.35s ease, border-color 0.35s ease',
        // No opacity here — managed by GSAP to avoid React re-render conflicts
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          color: '#fff',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        Motus Pocus
      </a>

      {/* Center links — hidden on mobile via CSS */}
      <div
        className="nav-links"
        style={{ display: 'flex', gap: '28px' }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.48)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.48)')}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="btn-glow"
        style={{ padding: '8px 20px', fontSize: '12px', flexShrink: 0 }}
      >
        Contactez moi
      </a>
    </nav>
  )
}
