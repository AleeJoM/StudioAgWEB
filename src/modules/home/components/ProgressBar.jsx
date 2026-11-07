import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

/** Barra fina de progreso de lectura (compositor-only: scaleX). */
export default function ProgressBar() {
  const bar = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })
    })
    return () => ctx.revert()
  }, [])

  return <div className="progress" ref={bar} aria-hidden="true" />
}
