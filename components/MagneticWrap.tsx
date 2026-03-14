'use client'

import { useRef, useCallback } from 'react'
import gsap from 'gsap'

export default function MagneticWrap({
  children,
  strength = 0.38,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const qx = useRef<ReturnType<typeof gsap.quickTo>>(null)
  const qy = useRef<ReturnType<typeof gsap.quickTo>>(null)

  const onEnter = useCallback(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    qx.current = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    qy.current = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })
  }, [])

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!qx.current || !qy.current) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    qx.current((e.clientX - cx) * strength)
    qy.current((e.clientY - cy) * strength)
  }, [strength])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' })
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  )
}
