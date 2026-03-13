'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, opacity: 0 })

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.progress > 0.01) {
          gsap.to(bar, { scaleX: self.progress, opacity: 1, duration: 0.08, ease: 'none', overwrite: 'auto' })
        } else {
          gsap.to(bar, { opacity: 0, duration: 0.3, overwrite: 'auto' })
        }
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      style={{
        transformOrigin: 'left center',
        transform: 'scaleX(0)',
      }}
    />
  )
}
