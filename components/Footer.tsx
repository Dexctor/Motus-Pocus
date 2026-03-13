'use client'

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '32px 40px 40px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
            Motus Pocus
          </span>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { label: 'Réalisations', href: '#realisations' },
              { label: 'Offres', href: '#offres' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.25)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>
            © {new Date().getFullYear()} Motus Pocus — Auto-entrepreneur · SIRET à venir · Tous tarifs HT
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a
              href="/mentions-legales"
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
            >
              Mentions légales
            </a>
            <a
              href="/politique-confidentialite"
              style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
            >
              Confidentialité
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer { padding: 28px 20px 32px !important; }
        }
      `}</style>
    </footer>
  )
}
