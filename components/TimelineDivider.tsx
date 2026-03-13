'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Deterministic RNG so clip layout is stable on every render ────────────
function lcg(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

const CLIP_COLORS = [
  '#4ADE80', // green
  '#2DD4BF', // teal
  '#FB923C', // orange
  '#F472B6', // pink
  '#60A5FA', // blue
  '#FACC15', // yellow
  '#A78BFA', // purple
  '#34D399', // emerald
]

function buildTracks() {
  return [0, 1, 2].map((t) => {
    const rnd  = lcg(137 + t * 53)
    const clips: { left: number; width: number; color: string }[] = []
    let pos    = rnd() * 2
    let iter   = 0
    while (pos < 96 && iter < 40) {
      const w    = 5 + rnd() * 16
      const gap  = 0.5 + rnd() * 2
      const cidx = Math.floor(rnd() * CLIP_COLORS.length)
      if (pos + w <= 97) clips.push({ left: pos, width: w, color: CLIP_COLORS[cidx] })
      pos += w + gap
      iter++
    }
    return clips
  })
}

const TRACKS     = buildTracks()
const TRACK_LBLS = ['V2', 'V1', 'A1']

// ── Component ─────────────────────────────────────────────────────────────
export default function TimelineDivider() {
  const wrapRef     = useRef<HTMLDivElement>(null)
  const playheadRef = useRef<HTMLDivElement>(null)
  const tcRef       = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    if (!playheadRef.current) return
    gsap.fromTo(
      playheadRef.current,
      { left: '1%' },
      {
        left: '93%',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top 75%',
          end:   'bottom 25%',
          scrub: 1.5,
          onUpdate(self) {
            if (!tcRef.current) return
            // Convert progress → timecode  (15 s @ 30 fps)
            const totalF = Math.floor(self.progress * 450)
            const ss     = Math.floor(totalF / 30) % 60
            const ff     = totalF % 30
            tcRef.current.textContent =
              `01:00:${String(ss).padStart(2, '0')}:${String(ff).padStart(2, '0')}`
          },
        },
      }
    )
  }, { scope: wrapRef })

  return (
    <div
      ref={wrapRef}
      style={{
        width: '100%',
        background: 'rgba(6, 6, 8, 0.98)',
        borderTop:    '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* ── Timecode bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '4px 8px 4px 52px',
        background: 'rgba(255,255,255,0.015)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <span style={{
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '9px', color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
        }}>TC</span>
        <span
          ref={tcRef}
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '9px', color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.14em',
          }}
        >01:00:00:00</span>
      </div>

      {/* ── Track rows ── */}
      <div style={{ position: 'relative' }}>
        {TRACKS.map((clips, t) => (
          <div
            key={t}
            style={{
              display: 'flex', alignItems: 'center', height: '24px',
              borderBottom: t < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            }}
          >
            {/* Track label */}
            <div style={{
              width: '44px', flexShrink: 0, height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span style={{
                fontSize: '9px', fontWeight: 700,
                color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em',
              }}>
                {TRACK_LBLS[t]}
              </span>
            </div>

            {/* Clips */}
            <div style={{ flex: 1, position: 'relative', height: '100%' }}>
              {clips.map((c, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '2px', bottom: '2px',
                    left: `${c.left}%`, width: `${c.width}%`,
                    borderRadius: '2px',
                    borderLeft: `2px solid ${
                      t === 2 ? 'rgba(180,140,255,0.8)' : c.color
                    }`,
                    background: t === 2
                      ? 'rgba(124, 58, 237, 0.42)'
                      : c.color,
                    opacity: t === 2 ? 1 : 0.78,
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)',
                    backgroundImage: t === 2
                      ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 4px)'
                      : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* ── Playhead ── */}
        <div
          ref={playheadRef}
          style={{
            position: 'absolute', top: 0, bottom: 0,
            left: '1%', width: '1px',
            pointerEvents: 'none', zIndex: 10,
            background: 'rgba(255,255,255,0.92)',
            boxShadow: '0 0 6px rgba(139,92,246,0.9), 0 0 14px rgba(139,92,246,0.4)',
          }}
        >
          {/* Handle */}
          <div style={{
            position: 'absolute', top: 0,
            left: '50%', transform: 'translateX(-50%)',
            width: '7px', height: '7px',
            background: '#fff',
            borderRadius: '0 0 3px 3px',
            boxShadow: '0 0 8px rgba(139,92,246,1)',
          }} />
        </div>
      </div>
    </div>
  )
}
