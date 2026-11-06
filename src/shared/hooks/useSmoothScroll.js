import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Smooth scroll con Lenis, sincronizado con el ticker de GSAP/ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.2 })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

/** Scroll suave a un ancla; cae a scroll nativo si Lenis no está activo. */
export function scrollToTarget(selector) {
  const el = document.querySelector(selector)
  if (!el) return
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: -20, duration: 1.4 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function setScrollLocked(locked) {
  if (!lenisInstance) {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    return
  }
  if (locked) lenisInstance.stop()
  else lenisInstance.start()
}
