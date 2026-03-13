'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Skip on touch devices and when user prefers reduced motion
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })
    document.body.classList.add('has-custom-cursor')

    let visible = false
    const show = () => {
      if (!visible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
        visible = true
      }
    }

    const onMove = (e: MouseEvent) => {
      show()
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0.06, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power2.out' })
    }

    // Expand ring on interactive elements
    const onHoverIn = () => {
      gsap.to(ring, { width: 52, height: 52, borderColor: 'rgba(62,207,142,0.7)', duration: 0.2 })
      gsap.to(dot,  { scale: 1.5, duration: 0.15 })
    }
    const onHoverOut = () => {
      gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(62,207,142,0.45)', duration: 0.25 })
      gsap.to(dot,  { scale: 1, duration: 0.2 })
    }

    const onDown = () => gsap.to([dot, ring], { scale: 0.82, duration: 0.1 })
    const onUp   = () => gsap.to([dot, ring], { scale: 1, duration: 0.18 })
    const onLeave = () => { gsap.to([dot, ring], { opacity: 0, duration: 0.25 }); visible = false }
    const onEnter = () => show()

    // Delegate hover via event bubbling on interactive elements
    const interactiveSelector = 'a, button, [data-hover]'
    const delegateIn  = (e: Event) => { if ((e.target as Element).closest(interactiveSelector)) onHoverIn() }
    const delegateOut = (e: Event) => { if ((e.target as Element).closest(interactiveSelector)) onHoverOut() }

    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mousedown',  onDown)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('mouseover',  delegateIn,  { passive: true })
    window.addEventListener('mouseout',   delegateOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('mouseover',  delegateIn)
      window.removeEventListener('mouseout',   delegateOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} aria-hidden className="cursor-dot" />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring"
        style={{ top: 0, left: 0 }}
      />
    </>
  )
}
