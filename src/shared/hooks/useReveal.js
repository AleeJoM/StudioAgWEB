import { useEffect } from 'react'

/**
 * Reveal liviano: marca con .is-in los [data-reveal] al entrar en pantalla.
 * Sin GSAP ni ScrollTrigger; con reduced-motion o sin IntersectionObserver todo queda visible.
 */
export function useReveal(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const items = root.querySelectorAll('[data-reveal]')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'))
      return undefined
    }
    root.classList.add('reveal-armed')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}
