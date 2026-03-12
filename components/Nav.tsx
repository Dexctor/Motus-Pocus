'use client'

import { useState, useEffect, useRef } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: scrolled ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          letterSpacing: '-0.01em',
          color: '#fff',
        }}
      >
        Motus Pocus
      </span>

      <a
        href="#contact"
        className="btn-glow"
        style={{
          padding: '8px 20px',
          fontSize: '12px',
        }}
      >
        Contactez moi
      </a>
    </nav>
  )
}
