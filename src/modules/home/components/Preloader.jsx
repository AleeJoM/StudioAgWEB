import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Logo from '../../../shared/components/Logo.jsx'
import { prefersReducedMotion, setScrollLocked } from '../../../shared/hooks/useSmoothScroll.js'

export default function Preloader({ onDone }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      onDone()
      return undefined
    }
    setScrollLocked(true)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
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
        .to('.preloader__inner', { yPercent: -20, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.25')
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.25')
    }, root)
    return () => {
      ctx.revert()
      setScrollLocked(false)
    }
  }, [onDone])

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
