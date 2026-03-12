'use client'

import { useEffect, useRef } from 'react'

interface Blob {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  r: number
  g: number
  b: number
  alpha: number
  phase: number
  phaseSpeed: number
}

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    // Purple-focused palette
    const palette = [
      { r: 124, g: 58, b: 237 },   // violet
      { r: 139, g: 92, b: 246 },   // purple
      { r: 59, g: 130, b: 246 },   // blue
      { r: 168, g: 85, b: 247 },   // light purple
      { r: 79, g: 70, b: 229 },    // indigo
    ]

    const blobs: Blob[] = palette.map(({ r, g, b }) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 300 + Math.random() * 250,
      r, g, b,
      alpha: 0.06 + Math.random() * 0.06,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.003 + Math.random() * 0.005,
    }))

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      blobs.forEach((blob) => {
        blob.phase += blob.phaseSpeed
        blob.x += blob.vx + Math.sin(blob.phase) * 0.25
        blob.y += blob.vy + Math.cos(blob.phase * 0.8) * 0.25

        const dx = mouseRef.current.x - blob.x
        const dy = mouseRef.current.y - blob.y
        blob.vx += dx * 0.000012
        blob.vy += dy * 0.000012

        const speed = Math.sqrt(blob.vx ** 2 + blob.vy ** 2)
        if (speed > 0.5) {
          blob.vx = (blob.vx / speed) * 0.5
          blob.vy = (blob.vy / speed) * 0.5
        }
        blob.vx *= 0.997
        blob.vy *= 0.997

        const m = blob.radius
        if (blob.x < -m) blob.x = canvas.width + m
        else if (blob.x > canvas.width + m) blob.x = -m
        if (blob.y < -m) blob.y = canvas.height + m
        else if (blob.y > canvas.height + m) blob.y = -m

        const a = blob.alpha + Math.sin(blob.phase * 1.3) * 0.02
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
        grad.addColorStop(0, `rgba(${blob.r},${blob.g},${blob.b},${a})`)
        grad.addColorStop(0.5, `rgba(${blob.r},${blob.g},${blob.b},${a * 0.3})`)
        grad.addColorStop(1, `rgba(${blob.r},${blob.g},${blob.b},0)`)

        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      frameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
