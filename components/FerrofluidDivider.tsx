'use client'

import { useEffect, useRef } from 'react'

// ── SVG coordinate space ──────────────────────────────────────────────────
const VW = 1000
const VH = 160
const CY = VH / 2   // vertical center

// Base fluid: row of overlapping circles forming a horizontal mass
const BASE_COUNT = 16
const BASE_BLOBS = Array.from({ length: BASE_COUNT }, (_, i) => ({
  cx: (i / (BASE_COUNT - 1)) * VW,
  r:  27,
}))

// Spike positions evenly distributed along X
const SPIKE_COUNT = 12
const SPIKE_XS    = Array.from({ length: SPIKE_COUNT }, (_, i) =>
  ((i + 0.5) / SPIKE_COUNT) * VW
)

// ── Component ─────────────────────────────────────────────────────────────
export default function FerrofluidDivider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spikeEls     = useRef<(SVGCircleElement | null)[]>([])
  const spikeY       = useRef(new Float32Array(SPIKE_COUNT).fill(CY))
  const spikeTarget  = useRef(new Float32Array(SPIKE_COUNT).fill(CY))
  const mouse        = useRef({ x: -1, active: false })
  const raf          = useRef(0)
  const frame        = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const MAX_LIFT = 58      // max rise above center (px, in SVG user units)
    const SIGMA    = 0.13    // Gaussian half-width (normalised 0-1)
    const g = (d: number) => Math.exp(-(d * d) / (2 * SIGMA * SIGMA))

    const loop = () => {
      frame.current++
      const { x: mx, active } = mouse.current

      for (let i = 0; i < SPIKE_COUNT; i++) {
        const nx = SPIKE_XS[i] / VW   // normalised position 0-1
        if (active && mx >= 0) {
          spikeTarget.current[i] = CY - MAX_LIFT * g(nx - mx)
        } else {
          // Idle: slow standing wave
          const wave = Math.sin(frame.current * 0.016 + i * 0.88)
          spikeTarget.current[i] = CY - 6 - 5 * Math.abs(wave)
        }
        // Smooth lerp
        spikeY.current[i] += (spikeTarget.current[i] - spikeY.current[i]) * 0.1
      }

      // Push new positions into the DOM
      for (let i = 0; i < SPIKE_COUNT; i++) {
        const el = spikeEls.current[i]
        if (!el) continue
        const lift = CY - spikeY.current[i]
        el.setAttribute('cy', String(spikeY.current[i]))
        el.setAttribute('r',  String(Math.max(7, 11 + lift * 0.15)))
      }

      raf.current = requestAnimationFrame(loop)
    }

    raf.current = requestAnimationFrame(loop)

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.current.x      = (e.clientX - rect.left) / rect.width
      mouse.current.active = true
    }
    const onLeave = () => { mouse.current.active = false }

    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf.current)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '160px',
        background: '#000',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'crosshair',
      }}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: '100%',
          height: '100%',
          // Purple glow: stronger upward where spikes emerge
          filter: 'drop-shadow(0 -6px 16px rgba(124,58,237,0.55)) drop-shadow(0 4px 8px rgba(124,58,237,0.18))',
        }}
      >
        <defs>
          {/* Metaball filter: blur → alpha threshold → crisp liquid edges */}
          <filter id="ferrofluid" x="-5%" y="-50%" width="110%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -9"
            />
          </filter>

          {/* Vertical gradient: bright silver-lavender tips → deep violet base */}
          <linearGradient id="ferro-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgb(225, 215, 250)" />
            <stop offset="45%"  stopColor="rgb(170, 148, 218)" />
            <stop offset="100%" stopColor="rgb(88,  65, 145)"  />
          </linearGradient>
        </defs>

        <g filter="url(#ferrofluid)">
          {/* Base fluid mass */}
          {BASE_BLOBS.map((b, i) => (
            <circle
              key={`b${i}`}
              cx={b.cx}
              cy={CY}
              r={b.r}
              fill="url(#ferro-fill)"
            />
          ))}

          {/* Spike blobs — positions driven by JS */}
          {SPIKE_XS.map((sx, i) => (
            <circle
              key={`s${i}`}
              ref={el => { spikeEls.current[i] = el }}
              cx={sx}
              cy={CY}
              r={11}
              fill="url(#ferro-fill)"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
