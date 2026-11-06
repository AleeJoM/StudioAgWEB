import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { IMAGES } from '../data/content.js'
import { BRAND, LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion, scrollToTarget } from '../../../shared/hooks/useSmoothScroll.js'

const CARDS = [
  { img: IMAGES.fechasClave, alt: 'Post “Fechas clave para vender más”', cls: 'hero-card--a', depth: 1.4 },
  { img: IMAGES.abogada, alt: 'Diseño de tarjetas personales para abogada', cls: 'hero-card--b', depth: 0.8 },
  { img: IMAGES.panaderia, alt: 'Post “Lo que subiría si tuviera una panadería”', cls: 'hero-card--c', depth: 1.1 },
]

const STICKERS = [
  { e: '🚀', cls: 's1' },
  { e: '💡', cls: 's2' },
  { e: '🤎', cls: 's3' },
  { e: '✨', cls: 's4' },
  { e: '💌', cls: 's5' },
]

export default function Hero({ ready }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (!ready) return undefined
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) return
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero__title .sw-word', { yPercent: 110, rotate: 4, duration: 1.2, stagger: 0.06 }, '-=0.5')
        .from('.hero__brush', { scaleX: 0, duration: 1, ease: 'power4.inOut' }, '-=0.7')
        .from('.hero__lead, .hero__ctas, .hero__meta', { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, '-=0.8')
        .from(
          '.hero-card',
          { y: 160, opacity: 0, rotate: (i) => [-18, 14, -6][i], duration: 1.4, stagger: 0.12 },
          '-=1.2',
        )
        .from('.hero-sticker', { scale: 0, rotate: -60, duration: 0.8, stagger: 0.07, ease: 'back.out(2.6)' }, '-=0.9')

      // parallax al scrollear
      gsap.to('.hero__stage', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__copy', {
        yPercent: 18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      // parallax con el mouse (desktop)
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (fine) {
        const cards = gsap.utils.toArray('.hero-card, .hero-sticker')
        const setters = cards.map((el) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
          d: Number(el.dataset.depth || 1),
        }))
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          setters.forEach((s) => {
            s.x(nx * 36 * s.d)
            s.y(ny * 26 * s.d)
          })
        }
        root.current.addEventListener('pointermove', onMove)
        return () => root.current?.removeEventListener('pointermove', onMove)
      }
      return undefined
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span className="pill pill--rosa">{BRAND.bio}</span>
          <span className="hero__formats">{BRAND.formats.join(' · ')}</span>
        </p>

        <h1 className="hero__title" aria-label="Hacemos que tu marca se vea y se recuerde">
          <span className="sw-line" aria-hidden="true">
            <span className="sw-mask"><span className="sw-word">Hacemos</span></span>{' '}
            <span className="sw-mask"><span className="sw-word">que</span></span>{' '}
            <span className="sw-mask"><span className="sw-word">tu</span></span>{' '}
            <span className="sw-mask"><span className="sw-word">marca</span></span>
          </span>
          <span className="sw-line" aria-hidden="true">
            <span className="sw-mask"><span className="sw-word"><em>se vea</em></span></span>{' '}
            <span className="sw-mask"><span className="sw-word">y</span></span>
          </span>
          <span className="sw-line hero__highlight" aria-hidden="true">
            <span className="hero__brush" />
            <span className="sw-mask"><span className="sw-word"><em>se recuerde.</em></span></span>
          </span>
        </h1>

        <p className="hero__lead">
          Estrategia, contenido y diseño con intención: el que habla de vos, de tu esencia y de todo lo que
          querés transmitir. Porque tu marca merece mucho más que likes. 🤎
        </p>

        <div className="hero__ctas">
          <a className="btn btn--vino magnetic" href={LINKS.dm} target="_blank" rel="noreferrer" data-cursor="hover">
            <span>Quiero potenciar mi marca</span> <span aria-hidden="true">→</span>
          </a>
          <a
            className="btn btn--ghost"
            href="#trabajos"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('#trabajos')
            }}
            data-cursor="hover"
          >
            Ver lo que hicimos 📁
          </a>
        </div>

        <ul className="hero__meta" aria-label="Pilares">
          {BRAND.pillars.map((p, i) => (
            <li key={p}>
              <span className={`dot dot--${i}`} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__stage" aria-hidden="true">
        {CARDS.map((c) => (
          <figure className={`hero-card ${c.cls}`} key={c.cls} data-depth={c.depth}>
            <span className="tape" />
            <img src={c.img} alt="" width="660" height="860" fetchPriority={c.cls === 'hero-card--a' ? 'high' : 'auto'} />
          </figure>
        ))}
        {STICKERS.map((s, i) => (
          <span className={`hero-sticker hero-sticker--${s.cls}`} key={s.cls} data-depth={0.5 + i * 0.35}>
            {s.e}
          </span>
        ))}
        <span className="hero__note">¡guardalo para planificar! 📌</span>
      </div>

      <button
        type="button"
        className="hero__scroll"
        onClick={() => scrollToTarget('#manifiesto')}
        aria-label="Bajar a la siguiente sección"
      >
        <span className="hero__scroll-line" />
        scroll
      </button>
    </section>
  )
}
