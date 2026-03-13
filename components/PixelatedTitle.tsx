'use client'

import { useEffect, useRef, useState } from 'react'

interface PixelatedTitleProps {
  text?: string
  fontSize?: number
  cellSize?: number
  color?: string
  orbitRadius?: number
  gravity?: number
}

// Velocity → tint palette (white → purple). Plain array, zero allocation in hot path.
const SPEED_TINTS = [
  0xffffff, // static
  0xe9d5ff, // barely moving
  0xc4b5fd, // slow
  0xa78bfa, // medium
  0x7c3aed, // fast
  0x5b21b6, // very fast
]
const N_BUCKETS = SPEED_TINTS.length - 1

// Texture size for soft particle (canvas-drawn radial gradient, power-of-two)
const TSIZ = 16

export default function PixelatedTitle({
  text = 'Motus Pocus',
  fontSize = 120,
  cellSize = 4,
  color = '#ffffff',
  orbitRadius = 130,
  gravity = 0.55,
}: PixelatedTitleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  // Store PIXI app instance. Typed as `any` to avoid importing PIXI types at
  // module level (which would execute in SSR and reference window/WebGL).
  const appRef    = useRef<any>(null)
  const spritesRef = useRef<any[]>([])

  // Physics typed arrays — zero GC in the animation hot path
  const pRef = useRef<{
    ox: Float32Array; oy: Float32Array
    x:  Float32Array; y:  Float32Array
    vx: Float32Array; vy: Float32Array
    a:  Float32Array
    spin: Int8Array
    count: number
  } | null>(null)

  const mouseRef  = useRef({ x: -9999, y: -9999, inside: false })
  const activeRef = useRef(false)

  // Natural text dimensions (without orbit padding) — drive the layout wrapper
  // so the PIXI canvas can overflow on every side without shifting layout.
  const [wrapSize, setWrapSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      // ── Wait for fonts ────────────────────────────────────────────────────
      if (document.fonts?.ready) await document.fonts.ready
      await new Promise<void>(r => setTimeout(r, 50))
      if (cancelled) return

      // ── Dynamic import: keeps PIXI out of the SSR bundle entirely ─────────
      const PIXI = await import('pixi.js')
      if (cancelled) return

      // ── Measure text & compute canvas dimensions ───────────────────────────
      const tmp  = document.createElement('canvas')
      const tctx = tmp.getContext('2d')
      if (!tctx || cancelled) return

      const fontStr = `800 ${fontSize}px Inter, Helvetica, Arial, sans-serif`
      tctx.font = fontStr
      const m = tctx.measureText(text)

      const pad      = 40
      const orbitPad = orbitRadius

      const natW  = Math.ceil(m.width + pad * 2)     // layout size (no orbit room)
      const natH  = Math.ceil(fontSize * 1.4 + pad)
      const fullW = natW + orbitPad * 2               // canvas size (includes orbit)
      const fullH = natH + orbitPad * 2

      // ── Render text offscreen → extract pixel positions ───────────────────
      tmp.width  = fullW
      tmp.height = fullH
      tctx.font          = fontStr
      tctx.fillStyle     = color
      tctx.textAlign     = 'center'
      tctx.textBaseline  = 'middle'
      tctx.fillText(text, fullW / 2, fullH / 2)

      const imgData = tctx.getImageData(0, 0, fullW, fullH).data
      const step    = cellSize

      // Two-pass: count → exact allocation, no dynamic growth
      let count = 0
      for (let py = 0; py < fullH; py += step)
        for (let px = 0; px < fullW; px += step)
          if (imgData[(py * fullW + px) * 4 + 3] > 30) count++

      const ox   = new Float32Array(count), oy   = new Float32Array(count)
      const x    = new Float32Array(count), y    = new Float32Array(count)
      const vx   = new Float32Array(count), vy   = new Float32Array(count)
      const a    = new Float32Array(count)
      const spin = new Int8Array(count)

      const midX = fullW / 2
      let idx = 0
      for (let py = 0; py < fullH; py += step) {
        for (let px = 0; px < fullW; px += step) {
          const alpha = imgData[(py * fullW + px) * 4 + 3]
          if (alpha > 30) {
            ox[idx] = px; oy[idx] = py
            x[idx]  = px; y[idx]  = py
            a[idx]  = alpha / 255
            // Left half → CW (+1), right half → CCW (-1): dual-galaxy vortex
            spin[idx] = px < midX ? 1 : -1
            idx++
          }
        }
      }

      pRef.current = { ox, oy, x, y, vx, vy, a, spin, count }
      if (cancelled) return

      // ── Tear down previous PIXI instance (resize / dep change) ────────────
      if (appRef.current) {
        ;(appRef.current.canvas as HTMLElement).remove()
        appRef.current.destroy(true, { children: true, texture: true })
        appRef.current = null
      }

      // ── Create PIXI Application (WebGL renderer, transparent bg) ─────────
      const app = new PIXI.Application()
      await app.init({
        width:           fullW,
        height:          fullH,
        backgroundAlpha: 0,
        antialias:       true,
        resolution:      window.devicePixelRatio || 1,
        autoDensity:     true,
      })

      if (cancelled) {
        app.destroy(true, { children: true, texture: true })
        return
      }

      appRef.current = app

      // ── Position & attach the WebGL canvas ────────────────────────────────
      // Absolutely centred inside the layout wrapper; overflows by orbitPad on
      // every side — particles can orbit freely without being clipped.
      const canvasEl = app.canvas as HTMLCanvasElement
      Object.assign(canvasEl.style, {
        position:  'absolute',
        top:       '50%',
        left:      '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth:  'calc(100vw - 40px)',
        height:    'auto',
        cursor:    'default',
      })

      if (!wrapperRef.current || cancelled) {
        app.destroy(true, { children: true, texture: true })
        return
      }
      wrapperRef.current.appendChild(canvasEl)

      // ── Soft circular particle texture (radial gradient → crisp glow) ─────
      const texCanvas = document.createElement('canvas')
      texCanvas.width = texCanvas.height = TSIZ
      const tc   = texCanvas.getContext('2d')!
      const half = TSIZ / 2
      const grad = tc.createRadialGradient(half, half, 0, half, half, half)
      grad.addColorStop(0,    'rgba(255,255,255,1.0)')
      grad.addColorStop(0.35, 'rgba(255,255,255,0.75)')
      grad.addColorStop(1,    'rgba(255,255,255,0.0)')
      tc.fillStyle = grad
      tc.fillRect(0, 0, TSIZ, TSIZ)
      const texture = PIXI.Texture.from(texCanvas)

      // ── Particle container — additive blending ────────────────────────────
      // ADD blend: particles contribute light additively. Where many fast
      // (purple-tinted) particles overlap while orbiting, they bloom into a
      // bright violet halo — no external filter needed.
      const spriteScale = (cellSize * 2.2) / TSIZ  // visual size = ~2× cellSize
      const container   = new PIXI.Container()
      container.blendMode = 'add' as any
      app.stage.addChild(container)

      const sprites: any[] = new Array(count)
      for (let i = 0; i < count; i++) {
        const s = new PIXI.Sprite(texture)
        s.anchor.set(0.5)
        s.scale.set(spriteScale)
        s.x     = ox[i] + cellSize * 0.5
        s.y     = oy[i] + cellSize * 0.5
        s.tint  = 0xffffff
        s.alpha = a[i] * 0.6
        container.addChild(s)
        sprites[i] = s
      }
      spritesRef.current = sprites

      // ── Physics constants ─────────────────────────────────────────────────
      const RADIUS    = orbitRadius
      const RADIUS_SQ = RADIUS * RADIUS
      const SPRING    = 0.025
      const DAMPING   = 0.93
      const SETTLE_KE = 1e-5
      let   idleFrames = 0

      // ── Static render: particles at origins, pure white ───────────────────
      const drawStatic = () => {
        const { ox, oy, a, count } = pRef.current!
        for (let i = 0; i < count; i++) {
          sprites[i].x     = ox[i] + cellSize * 0.5
          sprites[i].y     = oy[i] + cellSize * 0.5
          sprites[i].tint  = 0xffffff
          sprites[i].alpha = a[i] * 0.6
        }
        app.renderer.render(app.stage)
      }

      const stopLoop = () => {
        activeRef.current = false
        app.ticker.stop()
        const { ox, oy, x, y, vx, vy, count } = pRef.current!
        for (let i = 0; i < count; i++) {
          x[i] = ox[i]; y[i] = oy[i]; vx[i] = 0; vy[i] = 0
        }
        drawStatic()
      }

      // ── Physics + PIXI ticker ─────────────────────────────────────────────
      app.ticker.add(() => {
        if (!activeRef.current) return

        const { ox, oy, x, y, vx, vy, a, spin, count } = pRef.current!
        const mx     = mouseRef.current.x
        const my     = mouseRef.current.y
        const inside = mouseRef.current.inside

        let totalKE = 0

        for (let i = 0; i < count; i++) {
          const px = x[i], py = y[i]
          let ax = 0, ay = 0

          if (inside) {
            const dx  = mx - px
            const dy  = my - py
            const dSq = dx * dx + dy * dy

            if (dSq < RADIUS_SQ && dSq > 0.01) {
              // ── Orbital gravity ─────────────────────────────────────────
              const dist  = Math.sqrt(dSq)
              const t     = 1 - dist / RADIUS
              const force = t * gravity                        // linear falloff

              const nx = dx / dist,  ny = dy / dist            // toward cursor
              const tx = -ny * spin[i], ty = nx * spin[i]      // tangent ± spin

              // tRatio: far = 40% tangential (pulled in), near = 95% orbital
              const tRatio = 0.4 + 0.55 * t
              const rRatio = 1   - tRatio

              ax = (nx * rRatio + tx * tRatio) * force
              ay = (ny * rRatio + ty * tRatio) * force
            } else {
              ax = (ox[i] - px) * SPRING
              ay = (oy[i] - py) * SPRING
            }
          } else {
            ax = (ox[i] - px) * SPRING
            ay = (oy[i] - py) * SPRING
          }

          // Correct Euler: accelerate then damp
          vx[i] += ax;  vx[i] *= DAMPING
          vy[i] += ay;  vy[i] *= DAMPING
          x[i] = px + vx[i]
          y[i] = py + vy[i]

          const ke = vx[i] * vx[i] + vy[i] * vy[i]
          totalKE += ke

          // ── Update sprite ──────────────────────────────────────────────
          sprites[i].x = x[i] + cellSize * 0.5
          sprites[i].y = y[i] + cellSize * 0.5

          // Tint by speed bucket (pre-computed palette, no string alloc)
          const bucket = ke < 0.01 ? 0 : Math.min(N_BUCKETS, (Math.sqrt(ke) * 2.2) | 0)
          sprites[i].tint = SPEED_TINTS[bucket]

          // Alpha brightens with speed: fast particles glow more intensely
          sprites[i].alpha = a[i] * (0.55 + Math.min(Math.sqrt(ke) * 0.15, 0.35))
        }

        // ── Settle detection: stop ticker when all particles are at rest ───
        if (!inside) {
          if (totalKE / count < SETTLE_KE) {
            if (++idleFrames > 50) { stopLoop(); return }
          } else { idleFrames = 0 }
        } else { idleFrames = 0 }
      })

      // Ticker starts stopped; begins only on first mousemove → zero idle cost
      app.ticker.stop()
      drawStatic()

      // ── Mouse event handlers ───────────────────────────────────────────────
      const onMove = (e: MouseEvent) => {
        // With autoDensity=true, PIXI positions are in logical (CSS) pixels.
        // getBoundingClientRect gives CSS pixels; divide to get logical coords.
        const rect = canvasEl.getBoundingClientRect()
        const sx   = fullW / rect.width
        const sy   = fullH / rect.height
        mouseRef.current.x      = (e.clientX - rect.left) * sx
        mouseRef.current.y      = (e.clientY - rect.top)  * sy
        mouseRef.current.inside = true
        if (!activeRef.current) {
          activeRef.current = true
          idleFrames = 0
          app.ticker.start()
        }
      }
      const onLeave = () => { mouseRef.current.inside = false }

      if (cancelled) return
      canvasEl.addEventListener('mousemove', onMove)
      canvasEl.addEventListener('mouseleave', onLeave)

      setWrapSize({ w: natW, h: natH })
    }

    run()

    return () => {
      cancelled = true
      activeRef.current = false
      if (appRef.current) {
        ;(appRef.current.canvas as HTMLElement).remove()
        appRef.current.destroy(true, { children: true, texture: true })
        appRef.current = null
      }
    }
  }, [text, fontSize, cellSize, color, orbitRadius, gravity])

  // ── Layout ────────────────────────────────────────────────────────────────
  // Wrapper div = natural text dimensions → controls layout spacing.
  // PIXI canvas is absolutely centred and overflows by orbitRadius on every
  // side (overflow: visible) so particles orbit without clipping.
  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width:    wrapSize.w > 0 ? `min(${wrapSize.w}px, 100%)` : 'auto',
        height:   wrapSize.h > 0 ? `${wrapSize.h}px`            : 'auto',
        margin:   '0 auto',
        overflow: 'visible',
      }}
    />
  )
}
