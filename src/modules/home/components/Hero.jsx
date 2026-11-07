import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { BRAND, LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion, scrollToTarget } from '../../../shared/hooks/useSmoothScroll.js'
import fechasClave from '../../../assets/images/top-fechas-clave.webp'
import abogada from '../../../assets/images/tarjetas-abogada.webp'
import identidad from '../../../assets/images/identidad-logo.webp'

const CARDS = [
  { img: fechasClave, cls: 'hero-card--a', depth: 1.4 },
  { img: abogada, cls: 'hero-card--b', depth: 0.8 },
  { img: identidad, cls: 'hero-card--c', depth: 1.1 },
]

const STICKERS = ['🚀', '💡', '🤎', '✨', '💌']

const FONT_WAIT_MS = 1200

/** Espera a las fuentes (con tope) para que la intro no se dispare sobre texto que luego se reacomoda. */
const fontsReady = () =>
  Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
  ])

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    let cancelled = false
    const ctx = gsap.context(() => {
      // Se arma pausada: los from() fijan el estado inicial antes del primer paint (sin flash ni segundo arranque).
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      tl.from('.hero__eyebrow', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero__title .sw-word', { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.06 }, '-=0.5')
        .from('.hero__brush', { scaleX: 0, duration: 0.9, ease: 'power4.inOut' }, '-=0.7')
        .from('.hero__lead, .hero__ctas', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.7')
        .from('.hero-card', { y: 120, opacity: 0, rotate: (i) => [-18, 14, -6][i], duration: 1.2, stagger: 0.1 }, '-=1')
        .from('.hero-sticker', { scale: 0, rotate: -60, duration: 0.7, stagger: 0.06, ease: 'back.out(2.4)' }, '-=0.8')

      fontsReady().then(() => {
        if (!cancelled) tl.play()
      })

      // Parallax con el mouse (solo desktop)
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const els = gsap.utils.toArray('.hero-card, .hero-sticker')
        const movers = els.map((el) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
          d: Number(el.dataset.depth || 1),
        }))
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          movers.forEach((m) => {
            m.x(nx * 36 * m.d)
            m.y(ny * 26 * m.d)
          })
        }
        const node = root.current
        node.addEventListener('pointermove', onMove)
        return () => node.removeEventListener('pointermove', onMove)
      }
      return undefined
    }, root)
    return () => {
      cancelled = true
      ctx.revert()
    }
  }, [])

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span className="pill pill--rosa">{BRAND.bio}</span>
          <span className="hero__formats">{BRAND.formats.join(' · ')}</span>
        </p>

        <h1 className="hero__title" aria-label="Hacemos que tu marca se vea y se recuerde">
          <span className="sw-line" aria-hidden="true">
            {['Hacemos', 'que', 'tu', 'marca'].map((w) => (
              <span key={w}>
                <span className="sw-mask">
                  <span className="sw-word">{w}</span>
                </span>{' '}
              </span>
            ))}
          </span>
          <span className="sw-line" aria-hidden="true">
            <span className="sw-mask">
              <span className="sw-word">
                <em>se vea</em>
              </span>
            </span>{' '}
            <span className="sw-mask">
              <span className="sw-word">y</span>
            </span>
          </span>
          <span className="sw-line hero__highlight" aria-hidden="true">
            <span className="hero__brush" />
            <span className="sw-mask">
              <span className="sw-word">
                <em>se recuerde.</em>
              </span>
            </span>
          </span>
        </h1>

        <p className="hero__lead">Estrategia, contenido y diseño con intención. Tu marca merece mucho más que likes. 🤎</p>

        <div className="hero__ctas">
          <a className="btn btn--vino" href={LINKS.dm} target="_blank" rel="noreferrer" data-cursor="hover">
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
      </div>

      <div className="hero__stage" aria-hidden="true">
        {CARDS.map((c) => (
          <figure className={`hero-card ${c.cls}`} key={c.cls} data-depth={c.depth}>
            <span className="tape" />
            <img src={c.img} alt="" width="660" height="860" fetchPriority={c.cls === 'hero-card--a' ? 'high' : 'auto'} />
          </figure>
        ))}
        {STICKERS.map((e, i) => (
          <span className={`hero-sticker hero-sticker--s${i + 1}`} key={e} data-depth={0.5 + i * 0.35}>
            {e}
          </span>
        ))}
        <span className="hero__note">¡guardalo para planificar! 📌</span>
      </div>
    </section>
  )
}
