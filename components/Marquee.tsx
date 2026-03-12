'use client'

const ITEMS = [
  'Color Grading',
  'Animation 2D',
  'Montage Vidéo',
  'Motion Design',
  'Sound Design',
  'Post Production',
]

export default function Marquee() {
  const track = [...ITEMS, ...ITEMS]

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        padding: '16px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      <div className="marquee-track">
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.9em',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-inter)',
              }}
            >
              {item}
            </span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--accent)',
                flexShrink: 0,
                opacity: 0.6,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
