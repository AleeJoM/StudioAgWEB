import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TOP_POST } from '../data/content.js'
import { LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'
import { useReveal } from '../../../shared/hooks/useReveal.js'
import fechasClave from '../../../assets/images/top-fechas-clave.webp'
import cyberMonday from '../../../assets/images/top-cybermonday.webp'
import blackFriday from '../../../assets/images/top-black-friday.webp'

const fmt = new Intl.NumberFormat('es-AR')
const SLIDES = [fechasClave, cyberMonday, blackFriday]

export default function TopPosts() {
  const root = useRef(null)
  useReveal(root)

  // Solo los contadores usan GSAP; el resto es CSS.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const obj = { v: 0 }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: Number(el.dataset.count),
              duration: 1.6,
              ease: 'expo.out',
              onUpdate: () => (el.textContent = fmt.format(Math.round(obj.v))),
            }),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="top" id="destacado" ref={root}>
      <a
        className="deck"
        data-reveal
        href={LINKS.post(TOP_POST.path)}
        target="_blank"
        rel="noreferrer"
        data-cursor-label="ver post"
        aria-label={`Ver en Instagram: ${TOP_POST.title}`}
      >
        {SLIDES.map((s, i) => (
          <img className="deck__slide" src={s} alt="" key={i} width="668" height="875" loading="lazy" decoding="async" />
        ))}
        <span className="top__burst" aria-hidden="true">
          #1<small>más visto</small>
        </span>
      </a>

      <div className="top__copy" data-reveal style={{ '--i': 1 }}>
        <p className="kicker">Lo que más alcance tuvo</p>
        <h2 className="h2">
          Contenido con estrategia: <em>la gente lo guarda</em> 📌
        </h2>
        <p className="top__text">
          <b>{TOP_POST.title}.</b> {TOP_POST.text}
        </p>
        <dl className="stats">
          {TOP_POST.stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt>
                <span aria-hidden="true">{s.emoji}</span> {s.label}
              </dt>
              <dd data-count={s.value}>{fmt.format(s.value)}</dd>
            </div>
          ))}
        </dl>
        <p className="top__note">Datos públicos del post en Instagram, 5 de noviembre de 2026.</p>
      </div>
    </section>
  )
}
