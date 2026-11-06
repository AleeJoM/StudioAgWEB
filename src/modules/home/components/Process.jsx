import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { PROCESS, IMAGES } from '../data/content.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

export default function Process() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const steps = gsap.utils.toArray('.step')
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 2.2}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })
        tl.fromTo('.process__line-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: steps.length }, 0)
        steps.forEach((s, i) => {
          tl.fromTo(s, { opacity: 0.18, x: 40 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }, i)
          tl.fromTo(
            s.querySelector('.step__emoji'),
            { scale: 0.3, rotate: -30 },
            { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(3)' },
            i + 0.1,
          )
        })
        tl.fromTo('.process__phone', { rotate: -8, yPercent: 10 }, { rotate: 4, yPercent: -10, ease: 'none', duration: steps.length }, 0)
      })
      mm.add('(max-width: 899px)', () => {
        gsap.utils.toArray('.step').forEach((s) =>
          gsap.from(s, { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 88%' } }),
        )
      })
      return () => mm.revert()
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process" id="proceso" ref={root}>
      <div className="process__inner">
        <div className="process__intro">
          <p className="kicker kicker--rosa">Así trabajamos con un cliente nuevo</p>
          <h2 className="h2 h2--crema">
            No arrancamos publicando: <em>arrancamos conociéndote</em> 🤍
          </h2>
          <figure className="process__phone" aria-hidden="true">
            <img src={IMAGES.clienteNuevo} alt="" width="490" height="873" loading="lazy" />
          </figure>
        </div>

        <ol className="process__steps">
          <span className="process__line" aria-hidden="true">
            <span className="process__line-fill" />
          </span>
          {PROCESS.map((p) => (
            <li className="step" key={p.n}>
              <span className="step__emoji" aria-hidden="true">
                {p.emoji}
              </span>
              <div>
                <span className="step__n">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
