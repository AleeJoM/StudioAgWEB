import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TOP_POSTS } from '../data/content.js'
import { LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

const fmt = new Intl.NumberFormat('es-AR')

export default function TopPosts() {
  const root = useRef(null)
  const [first, second] = TOP_POSTS

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      // abanico de slides del carrusel
      gsap.fromTo(
        '.deck__slide',
        { rotate: 0, xPercent: 0, yPercent: 0 },
        {
          rotate: (i) => [-9, 2, 12][i],
          xPercent: (i) => [-22, 0, 22][i],
          yPercent: (i) => [6, -4, 8][i],
          ease: 'none',
          scrollTrigger: { trigger: '.deck', start: 'top 85%', end: 'center 45%', scrub: 0.8 },
        },
      )
      // contadores
      gsap.utils.toArray('[data-count]').forEach((el) => {
        const target = Number(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'expo.out',
          onUpdate: () => (el.textContent = fmt.format(Math.round(obj.v))),
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
      gsap.from('.top__copy > *, .runner > *', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.top__grid', start: 'top 75%' },
      })
      gsap.from('.top__burst', {
        scale: 0,
        rotate: -90,
        duration: 1.2,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.deck', start: 'top 75%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="top" id="destacado" ref={root}>
      <div className="top__head">
        <p className="kicker">Lo que más alcance tuvo</p>
        <h2 className="h2">
          Cuando el contenido tiene estrategia, <em>la gente lo guarda</em> 📌
        </h2>
      </div>

      <div className="top__grid">
        <a
          className="deck"
          href={LINKS.post(first.path)}
          target="_blank"
          rel="noreferrer"
          data-cursor-label="ver post"
          aria-label={`Ver en Instagram: ${first.title}`}
        >
          {first.slides.map((s, i) => (
            <img className="deck__slide" src={s} alt="" key={i} width="668" height="875" loading="lazy" />
          ))}
          <span className="top__burst" aria-hidden="true">
            #1
            <small>más visto</small>
          </span>
        </a>

        <div className="top__copy">
          <p className="top__kicker">{first.kicker}</p>
          <h3 className="top__title">{first.title}</h3>
          <p className="top__text">{first.text}</p>
          <dl className="stats">
            {first.stats.map((s) => (
              <div className="stat" key={s.label}>
                <dt>
                  <span aria-hidden="true">{s.emoji}</span> {s.label}
                </dt>
                <dd data-count={s.value}>{fmt.format(s.value)}</dd>
              </div>
            ))}
          </dl>
          <p className="top__note">Datos públicos del post en Instagram al 5 de noviembre de 2026.</p>
        </div>
      </div>

      <a
        className="runner"
        href={LINKS.post(second.path)}
        target="_blank"
        rel="noreferrer"
        data-cursor-label="ver post"
      >
        <img src={second.slides[0]} alt="" width="656" height="875" loading="lazy" />
        <div className="runner__copy">
          <p className="top__kicker">{second.kicker}</p>
          <h3>{second.title}</h3>
          <p>{second.text}</p>
          <div className="runner__stats">
            {second.stats.map((s) => (
              <span key={s.label}>
                <span aria-hidden="true">{s.emoji}</span> <b data-count={s.value}>{s.value}</b> {s.label.toLowerCase()}
              </span>
            ))}
          </div>
        </div>
        <span className="runner__rank" aria-hidden="true">
          #2
        </span>
      </a>
    </section>
  )
}
