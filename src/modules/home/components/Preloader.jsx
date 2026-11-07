import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Logo from '../../../shared/components/Logo.jsx'
import { prefersReducedMotion, setScrollLocked } from '../../../shared/hooks/useSmoothScroll.js'

const FONT_WAIT_MS = 1500

const fontsReady = () =>
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS))])

/**
 * Pantalla de carga con el logo.
 * `onReveal` se llama cuando la cortina empieza a subir (ahí arranca la intro del hero, que ya está
 * oculta debajo: no hay flash ni segundo arranque). `onDone` retira el componente.
 */
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      onReveal()
      onDone()
      return undefined
    }
    setScrollLocked(true)
    let cancelled = false
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          setScrollLocked(false)
          onDone()
        },
      })
      tl.from('.logo__char', { yPercent: 120, rotate: 8, opacity: 0, stagger: 0.06, duration: 1 })
        .from('.logo__rule', { scaleX: 0, duration: 0.9 }, '-=0.6')
        .from('.logo__mkt', { opacity: 0, letterSpacing: '1em', duration: 0.9 }, '-=0.7')
        .from('.preloader__emoji', { scale: 0, rotate: -40, stagger: 0.08, duration: 0.6, ease: 'back.out(3)' }, '-=0.8')
        .to('.preloader__inner', { yPercent: -18, opacity: 0, duration: 0.5, ease: 'power3.in' }, '+=0.2')
        .add(() => onReveal(), '<0.1')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '<0.1')

      fontsReady().then(() => {
        if (!cancelled) tl.play()
      })
    }, root)
    return () => {
      cancelled = true
      ctx.revert()
      setScrollLocked(false)
    }
  }, [onReveal, onDone])

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__inner">
        <Logo size="lg" tone="crema" splitLetters />
        <div className="preloader__emojis">
          <span className="preloader__emoji">🚀</span>
          <span className="preloader__emoji">💡</span>
          <span className="preloader__emoji">🤎</span>
        </div>
      </div>
    </div>
  )
}
