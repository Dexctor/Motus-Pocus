'use client'

import { useEffect, useState } from 'react'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero')
      const contactEl = document.getElementById('contact')

      const pastHero = heroEl
        ? window.scrollY > heroEl.offsetHeight * 0.5
        : window.scrollY > 400

      const atContact = contactEl
        ? contactEl.getBoundingClientRect().top < window.innerHeight * 0.75
        : false

      setVisible(pastHero && !atContact)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="mobile-cta-bar"
      aria-hidden={!visible}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '12px 16px',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        background: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <a
        href="#contact"
        className="btn-primary"
        style={{
          width: '100%',
          justifyContent: 'center',
          fontSize: '15px',
          padding: '15px 24px',
        }}
      >
        Lancer ma vidéo →
      </a>
    </div>
  )
}
