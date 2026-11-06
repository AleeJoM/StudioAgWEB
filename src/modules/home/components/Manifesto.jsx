import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

const TEXT =
  'La gente entra a tu perfil y en segundos decide si se queda o no 👀 Por eso creamos contenido con intención: el que habla de vos, de tu esencia y de todo lo que querés transmitir.'

const HIGHLIGHT = new Set(['segundos', 'intención:', 'vos,', 'esencia'])

export default function Manifesto() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.manifesto__w',
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: '.manifesto__text', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        },
      )
      gsap.from('.manifesto__heart', {
        scale: 0,
        rotate: -30,
        ease: 'back.out(3)',
        duration: 1,
        scrollTrigger: { trigger: '.manifesto__sign', start: 'top 85%' },
      })
      gsap.to('.manifesto__orb', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="manifesto" id="manifiesto" ref={root}>
      <span className="manifesto__orb manifesto__orb--a" aria-hidden="true" />
      <span className="manifesto__orb manifesto__orb--b" aria-hidden="true" />
      <p className="kicker kicker--rosa">Manifiesto</p>
      <p className="manifesto__text" aria-label={TEXT}>
        {TEXT.split(' ').map((w, i) => (
          <span aria-hidden="true" className={`manifesto__w ${HIGHLIGHT.has(w) ? 'is-hl' : ''}`} key={i}>
            {w}{' '}
          </span>
        ))}
      </p>
      <p className="manifesto__sign">
        Tu marca merece mucho más que likes <span className="manifesto__heart">🤎</span>
      </p>
    </section>
  )
}
