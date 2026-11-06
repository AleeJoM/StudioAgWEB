import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { WORKS } from '../data/content.js'
import { LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

/** Galería horizontal: se pinnea y avanza con el scroll en desktop; swipe nativo en mobile. */
export default function Portfolio() {
  const root = useRef(null)
  const track = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px)', () => {
        const dist = () => track.current.scrollWidth - window.innerWidth
        const tween = gsap.to(track.current, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        gsap.utils.toArray('.work').forEach((card, i) => {
          gsap.fromTo(
            card.querySelector('img'),
            { scale: 1.18 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
          gsap.fromTo(
            card,
            { rotate: i % 2 ? 3 : -3 },
            {
              rotate: i % 2 ? -2 : 2,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
        gsap.to('.portfolio__progress-fill', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: true },
        })
      })
      mm.add('(max-width: 899px)', () => {
        gsap.from('.work', {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: track.current, start: 'top 85%' },
        })
      })
      return () => mm.revert()
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="portfolio" id="trabajos" ref={root}>
      <div className="portfolio__track" ref={track}>
        <div className="portfolio__intro">
          <p className="kicker">Proyectos 📁</p>
          <h2 className="h2">
            Lo que <em>hicimos</em>
          </h2>
          <p>
            Tarjetas, identidad, calendarios y contenido que frena el scroll. Cada detalle suma :)
          </p>
          <span className="portfolio__hint" aria-hidden="true">
            seguí bajando →
          </span>
        </div>

        {WORKS.map((w, i) => (
          <a
            className="work"
            key={w.title}
            href={LINKS.post(w.path)}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="ver"
            style={{ '--i': i }}
          >
            <span className="work__img">
              <img src={w.img} alt="" loading="lazy" width="660" height="860" />
            </span>
            <span className="work__tag">{w.tag}</span>
            <h3 className="work__title">{w.title}</h3>
            <p className="work__text">{w.text}</p>
          </a>
        ))}

        <div className="portfolio__end">
          <p className="hand">¿Qué negocio hacemos después? 👇🏻</p>
          <a className="btn btn--vino" href={LINKS.dm} target="_blank" rel="noreferrer" data-cursor="hover">
            Que sea el tuyo ✨
          </a>
        </div>
      </div>
      <div className="portfolio__progress" aria-hidden="true">
        <span className="portfolio__progress-fill" />
      </div>
    </section>
  )
}
