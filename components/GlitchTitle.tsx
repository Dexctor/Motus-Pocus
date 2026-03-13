'use client'

import { useEffect, useRef } from 'react'

interface GlitchTitleProps {
  text?: string
  fontSize?: number
}

export default function GlitchTitle({
  text = 'Motus Pocus',
  fontSize = 100,
}: GlitchTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    intensity:       0,
    targetIntensity: 0,
    entrance:        1.0,   // decays from 1→0 over ~1.5 s (entrance glitch)
    rafId:           0,
    active:          false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cancelled = false
    let removeListeners: (() => void) | null = null

    const run = async () => {
      // Wait for fonts so text measurement is accurate
      if (document.fonts?.ready) await document.fonts.ready
      await new Promise<void>(r => setTimeout(r, 30))
      if (cancelled) return

      const dpr      = window.devicePixelRatio || 1
      const fontStr  = `800 ${fontSize}px Inter, Helvetica, Arial, sans-serif`

      // ── Measure ──────────────────────────────────────────────────────────
      const mc = document.createElement('canvas').getContext('2d')!
      mc.font  = fontStr
      const m  = mc.measureText(text)
      const pad = 28
      const W  = Math.ceil(m.width + pad * 2)   // logical px
      const H  = Math.ceil(fontSize * 1.35 + pad)

      // ── Size canvas ───────────────────────────────────────────────────────
      canvas.width  = W * dpr
      canvas.height = H * dpr
      Object.assign(canvas.style, {
        display:     'block',
        margin:      '0 auto',
        width:       `${W}px`,
        maxWidth:    'calc(100vw - 40px)',
        aspectRatio: `${W} / ${H}`,
        cursor:      'default',
        filter:      'drop-shadow(0 0 14px rgba(124,58,237,0.38))',
      })

      // ── Pre-render white text for glitch-slab source ──────────────────────
      const textCv    = document.createElement('canvas')
      textCv.width    = W * dpr
      textCv.height   = H * dpr
      const tc        = textCv.getContext('2d')!
      tc.scale(dpr, dpr)
      tc.font          = fontStr
      tc.fillStyle     = '#ffffff'
      tc.textAlign     = 'center'
      tc.textBaseline  = 'middle'
      tc.fillText(text, W / 2, H / 2)

      if (cancelled) return

      const s  = stateRef.current
      s.entrance        = 1.0
      s.intensity       = 0
      s.targetIntensity = 0
      s.active          = true

      const cx = W / 2
      const cy = H / 2
      const n  = () => (Math.random() - 0.5) * 2   // −1 … +1

      // ── Draw one frame at glitch intensity I (0 = clean, 1 = full glitch) ─
      const draw = (I: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.scale(dpr, dpr)
        ctx.font         = fontStr
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'

        if (I < 0.008) {
          // ── Clean static frame ──────────────────────────────────────────
          ctx.fillStyle = '#ffffff'
          ctx.fillText(text, cx, cy)
        } else {
          // ── Chromatic aberration: additive RGB split ────────────────────
          const rX = (4 + n() * 3) * I
          const rY = n() * 2       * I
          const gX = n() * 1.5     * I
          const gY = n() * 1.5     * I
          const bX = -(4 + n() * 3) * I
          const bY = n() * 2        * I

          ctx.globalCompositeOperation = 'lighter'
          ctx.fillStyle = 'rgba(255, 0, 0, 1)'
          ctx.fillText(text, cx + rX, cy + rY)
          ctx.fillStyle = 'rgba(0, 255, 0, 1)'
          ctx.fillText(text, cx + gX, cy + gY)
          ctx.fillStyle = 'rgba(0, 0, 255, 1)'
          ctx.fillText(text, cx + bX, cy + bY)

          // ── Glitch horizontal slabs ────────────────────────────────────
          if (I > 0.07) {
            ctx.globalCompositeOperation = 'source-over'
            const slabs = Math.ceil(I * 3 + Math.random() * 4 * I)
            for (let b = 0; b < slabs; b++) {
              if (Math.random() > I * 0.75) continue
              const sy = Math.random() * H
              const sh = (2 + Math.random() * 10) * I
              const dx = n() * 20 * I
              // textCv is at physical size; ctx is scaled by dpr → dest in logical px
              ctx.drawImage(textCv, 0, sy * dpr, W * dpr, sh * dpr, dx, sy, W, sh)
            }
          }

          // ── Scanlines ─────────────────────────────────────────────────
          if (I > 0.18) {
            ctx.globalCompositeOperation = 'source-over'
            ctx.fillStyle = `rgba(0, 0, 0, ${(0.14 * I).toFixed(3)})`
            for (let y = 0; y < H; y += 4) {
              ctx.fillRect(-pad, y, W + pad * 2, 1)
            }
          }
        }

        ctx.restore()

        // Dynamic purple glow via CSS filter — no Canvas ops needed
        canvas.style.filter = I > 0.01
          ? `drop-shadow(0 0 ${(12 + 20 * I).toFixed(1)}px rgba(124,58,237,${(0.38 + 0.45 * I).toFixed(2)}))`
          : 'drop-shadow(0 0 14px rgba(124,58,237,0.38))'
      }

      // ── Animation loop ───────────────────────────────────────────────────
      const loop = () => {
        if (!s.active || cancelled) return

        s.intensity += (s.targetIntensity - s.intensity) * 0.1
        s.entrance  *= 0.962                              // ~1.5 s decay at 60 fps
        const I = Math.max(s.intensity, s.entrance)

        draw(I)

        const delta = Math.abs(s.targetIntensity - s.intensity)
        if (delta > 0.004 || s.entrance > 0.004 || s.targetIntensity > 0) {
          s.rafId = requestAnimationFrame(loop)
        } else {
          draw(0)    // settle to clean white
          s.rafId = 0
        }
      }

      s.rafId = requestAnimationFrame(loop)

      // ── Mouse handlers ───────────────────────────────────────────────────
      const onEnter = () => {
        s.targetIntensity = 1
        if (!s.rafId && s.active) s.rafId = requestAnimationFrame(loop)
      }
      const onLeave = () => {
        s.targetIntensity = 0
        if (!s.rafId && s.active) s.rafId = requestAnimationFrame(loop)
      }

      canvas.addEventListener('mouseenter', onEnter)
      canvas.addEventListener('mouseleave', onLeave)

      removeListeners = () => {
        canvas.removeEventListener('mouseenter', onEnter)
        canvas.removeEventListener('mouseleave', onLeave)
      }
    }

    run()

    return () => {
      cancelled = true
      const s = stateRef.current
      s.active = false
      cancelAnimationFrame(s.rafId)
      s.rafId = 0
      removeListeners?.()
    }
  }, [text, fontSize])

  return <canvas ref={canvasRef} />
}
