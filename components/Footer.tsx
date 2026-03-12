'use client'

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a
          href="#"
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            textDecoration: 'none',
            fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, sans-serif",
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
        >
          Mentions légales
        </a>
        <a
          href="#"
          style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            textDecoration: 'none',
            fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, sans-serif",
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
        >
          Politique de confidentialité
        </a>
      </div>
      <p
        style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.15)',
          fontFamily: "var(--font-inter), 'Helvetica Neue', Helvetica, sans-serif",
        }}
      >
        © {new Date().getFullYear()} Motus Pocus. Tous droits réservés.
      </p>
    </footer>
  )
}
