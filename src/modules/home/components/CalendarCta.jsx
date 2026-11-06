import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CALENDAR_PERKS, IMAGES } from '../data/content.js'
import { LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

export default function CalendarCta() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' } })
      tl.from('.cal__img', { rotate: -14, y: 80, opacity: 0, duration: 1.3, ease: 'expo.out' })
        .from('.cal__pin', { y: -60, opacity: 0, duration: 0.6, ease: 'bounce.out' }, '-=0.6')
        .from('.cal__copy > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out' }, '-=1')
        .from('.cal__perks li', { x: -24, opacity: 0, stagger: 0.09, duration: 0.6, ease: 'power3.out' }, '-=0.6')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cal" ref={root}>
      <figure className="cal__media">
        <span className="cal__pin" aria-hidden="true">
          📌
        </span>
        <img className="cal__img" src={IMAGES.calendario} alt="Calendario de contenidos de noviembre y diciembre" loading="lazy" width="663" height="875" />
      </figure>
      <div className="cal__copy">
        <p className="kicker">Lo nuevo</p>
        <h2 className="h2">
          Se vienen meses llenos de <em>oportunidades</em> para tu negocio
        </h2>
        <p>Pero para aprovecharlos no alcanza con publicar por publicar. Necesitás una estrategia.</p>
        <ul className="cal__perks">
          {CALENDAR_PERKS.map((p) => (
            <li key={p}>
              <span aria-hidden="true">✨</span> {p}
            </li>
          ))}
        </ul>
        <a className="btn btn--vino" href={LINKS.post('p/DfTHrIsH5Vl')} target="_blank" rel="noreferrer" data-cursor="hover">
          Comentá <b>CALENDARIO</b> y te pasamos la info
        </a>
      </div>
    </section>
  )
}
