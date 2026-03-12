'use client'

import { useEffect, useRef, useState } from 'react'

interface PixelatedTitleProps {
  text?: string
  fontSize?: number
  cellSize?: number
  color?: string
  distortionRadius?: number
  distortionStrength?: number
}

export default function PixelatedTitle({
  text = 'Motus Pocus',
  fontSize = 120,
  cellSize = 4,
  color = '#ffffff',
  distortionRadius = 100,
  distortionStrength = 4,
}: PixelatedTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const targetRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef<number>(0)
  const pixelsRef = useRef<{ x: number; y: number; a: number }[]>([])
  const sizeRef = useRef({ w: 0, h: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const tmp = document.createElement('canvas')
      const tctx = tmp.getContext('2d')
      if (!tctx) return

      const fontStr = `800 ${fontSize}px Inter, Helvetica, Arial, sans-serif`
      tctx.font = fontStr
      const m = tctx.measureText(text)

      const padding = 40
      const w = Math.ceil(m.width + padding * 2)
      const h = Math.ceil(fontSize * 1.4 + padding)

      tmp.width = w
      tmp.height = h
      tctx.font = fontStr
      tctx.fillStyle = color
      tctx.textAlign = 'center'
      tctx.textBaseline = 'middle'
      tctx.fillText(text, w / 2, h / 2)

      const imgData = tctx.getImageData(0, 0, w, h).data
      const dots: typeof pixelsRef.current = []
      const step = cellSize

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const i = (y * w + x) * 4
          const alpha = imgData[i + 3]
          if (alpha > 30) {
            dots.push({ x, y, a: alpha / 255 })
          }
        }
      }

      pixelsRef.current = dots
      sizeRef.current = { w, h }

      canvas.width = w
      canvas.height = h
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      setReady(true)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => setTimeout(init, 50))
    } else {
      setTimeout(init, 200)
    }

    window.addEventListener('resize', init)
    return () => window.removeEventListener('resize', init)
  }, [text, fontSize, cellSize, color])

  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dotRadius = cellSize * 0.45
    const useRect = cellSize <= 2  // fillRect is ~10x faster than arc for sub-pixel dots
    const dotSize = Math.max(1, cellSize)

    // ── Draw static undistorted text (no RAF needed) ──
    const drawStatic = () => {
      const { w, h } = sizeRef.current
      if (!w) return
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color
      let lastAlpha = -1
      for (const p of pixelsRef.current) {
        if (p.a !== lastAlpha) { ctx.globalAlpha = p.a; lastAlpha = p.a }
        if (useRect) {
          ctx.fillRect(p.x, p.y, dotSize, dotSize)
        } else {
          ctx.beginPath()
          ctx.arc(p.x + dotRadius, p.y + dotRadius, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    // Initial static render — no RAF needed when mouse is outside
    drawStatic()

    // ── Interactive loop — only runs while mouse is over the canvas ──
    let isActive = false
    let settleTimer = 0
    let tick = 0

    const startLoop = () => {
      if (isActive) return
      isActive = true
      tick = 0
      loop()
    }

    const stopLoop = () => {
      isActive = false
      cancelAnimationFrame(frameRef.current)
      // Lerp mouse back to off-screen target then draw final static frame
      mouseRef.current = { x: -9999, y: -9999 }
      drawStatic()
    }

    const loop = () => {
      if (!isActive) return
      tick++
      frameRef.current = requestAnimationFrame(loop)
      if (tick % 2 !== 0) return  // ~30fps

      const { w, h } = sizeRef.current
      if (!w) return

      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.35
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.35

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = color

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const r = distortionRadius
      const s = distortionStrength
      let lastAlpha = -1

      for (const p of pixelsRef.current) {
        let px = p.x
        let py = p.y

        const dx = px - mx
        const dy = py - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < r && dist > 0) {
          const t = 1 - dist / r
          const ease = t * t * (3 - 2 * t)
          const force = ease * s
          const angle = Math.atan2(dy, dx)
          const swirl = angle + force * 0.8
          px += Math.cos(swirl) * force * 6
          py += Math.sin(swirl) * force * 6
        }

        if (p.a !== lastAlpha) { ctx.globalAlpha = p.a; lastAlpha = p.a }

        if (useRect) {
          ctx.fillRect(Math.round(px), Math.round(py), dotSize, dotSize)
        } else {
          ctx.beginPath()
          ctx.arc(Math.round(px) + dotRadius, Math.round(py) + dotRadius, dotRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      clearTimeout(settleTimer)
      startLoop()
    }

    const onLeave = () => {
      targetRef.current = { x: -9999, y: -9999 }
      // Let lerp settle (~800ms at 0.35 speed), then stop the loop
      settleTimer = window.setTimeout(stopLoop, 800)
    }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      clearTimeout(settleTimer)
      cancelAnimationFrame(frameRef.current)
    }
  }, [ready, cellSize, color, distortionRadius, distortionStrength])

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        margin: '0 auto',
        cursor: 'default',
      }}
    />
  )
}
