import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SERVICE_TABS } from '../data/content.js'
import { prefersReducedMotion, scrollToY } from '../../../shared/hooks/useSmoothScroll.js'
import fechasClave from '../../../assets/images/top-fechas-clave.webp'
import cyberMonday from '../../../assets/images/top-cybermonday.webp'
import blackFriday from '../../../assets/images/top-black-friday.webp'
import reel from '../../../assets/images/reel-cambiar-instagram.webp'
import abogada from '../../../assets/images/tarjetas-abogada.webp'
import szero from '../../../assets/images/tarjetas-szero.webp'
import identidad from '../../../assets/images/identidad-logo.webp'

/** Piezas reales de cada escena; `d` = profundidad (más alto = se mueve más rápido al scrollear). */
const SCENES = {
  estrategia: {
    bg: 'var(--vino)',
    shots: [
      { img: fechasClave, cls: 'fx--a', d: 1 },
      { img: cyberMonday, cls: 'fx--b', d: 1.6 },
      { img: blackFriday, cls: 'fx--c', d: 0.7 },
    ],
    chips: [
      { e: '📌', cls: 'chip--1', d: 2 },
      { e: '💡', cls: 'chip--2', d: 1.2 },
    ],
  },
  community: {
    bg: 'var(--naranja-deep)',
    shots: [
      { img: reel, cls: 'fx--phone', d: 1 },
      { img: fechasClave, cls: 'fx--b', d: 1.7 },
    ],
    chips: [
      { e: '🚀', cls: 'chip--1', d: 2 },
      { e: '💬', cls: 'chip--2', d: 1.3 },
      { e: '❤️', cls: 'chip--3', d: 1.8 },
    ],
  },
  diseno: {
    bg: 'var(--verde)',
    shots: [
      { img: abogada, cls: 'fx--a', d: 1 },
      { img: szero, cls: 'fx--wide', d: 1.5 },
      { img: identidad, cls: 'fx--c', d: 0.8 },
    ],
    chips: [
      { e: '✨', cls: 'chip--1', d: 2 },
      { e: '🤎', cls: 'chip--2', d: 1.2 },
    ],
  },
}

const N = SERVICE_TABS.length

/**
 * El viaje: una escena pineada por solapa de la carpeta. La "cámara" atraviesa cada escena
 * (zoom hacia adelante + cortina circular de color) mientras las piezas se mueven con profundidad.
 * Con reduced-motion se muestran apiladas, sin pin.
 */
export default function Journey() {
  const root = useRef(null)
  const trigger = useRef(null)
  const [active, setActive] = useState(0)
  const [flat] = useState(prefersReducedMotion)

  useLayoutEffect(() => {
    if (flat) return undefined
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray('.scene')
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root.current,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * (N * 1.05)}`,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(N - 1, Math.floor(self.progress * N + 0.0001))),
        },
      })
      trigger.current = tl.scrollTrigger

      // Estado inicial: solo la primera escena visible
      scenes.forEach((s, i) => {
        if (i > 0) gsap.set(s, { autoAlpha: 0, scale: 0.82, clipPath: 'circle(0% at 50% 62%)' })
      })

      scenes.forEach((scene, i) => {
        const start = i // cada escena ocupa 1 unidad de timeline
        const text = scene.querySelectorAll('.scene__reveal')
        const fx = scene.querySelectorAll('[data-d]')

        // entrada del texto
        if (i === 0) {
          gsap.from(text, { y: 40, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out', delay: 0.1, scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
        } else {
          tl.fromTo(text, { y: 36, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 0.2, ease: 'power2.out' }, start - 0.2)
        }

        // profundidad de las piezas mientras la escena está activa
        fx.forEach((el) => {
          const d = Number(el.dataset.d)
          tl.fromTo(el, { yPercent: 14 * d, rotate: 3 * d }, { yPercent: -14 * d, rotate: -3 * d, duration: 1.1 }, start - 0.1)
        })

        // salida: la cámara "atraviesa" la escena y entra la siguiente con cortina circular
        if (i < N - 1) {
          const next = scenes[i + 1]
          const t = start + 0.72
          tl.to(scene, { scale: 1.55, autoAlpha: 0, duration: 0.28, ease: 'power2.in' }, t)
          tl.fromTo(
            next,
            { autoAlpha: 1, scale: 0.82, clipPath: 'circle(0% at 50% 62%)' },
            { scale: 1, clipPath: 'circle(150% at 50% 62%)', duration: 0.28, ease: 'power2.out' },
            t,
          )
        }
      })

      // la timeline mide N unidades en total
      tl.to({}, { duration: 0.1 }, N - 0.1)
    }, root)
    return () => ctx.revert()
  }, [flat])

  const go = (i) => {
    const st = trigger.current
    if (!st) {
      document.querySelector(`#scene-${SERVICE_TABS[i].id}`)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    scrollToY(st.start + ((st.end - st.start) * (i + 0.35)) / N)
  }

  return (
    <section className={`journey ${flat ? 'journey--flat' : ''}`} id="servicios" ref={root} aria-label="Qué hacemos">
      {SERVICE_TABS.map((tab, i) => {
        const cfg = SCENES[tab.id]
        return (
          <article className="scene" id={`scene-${tab.id}`} key={tab.id} style={{ '--scene': cfg.bg }}>
            <span className="scene__ghost" aria-hidden="true">
              0{i + 1}
            </span>

            <div className="scene__copy">
              <p className="scene__kicker scene__reveal">
                <span aria-hidden="true">{tab.emoji}</span> 0{i + 1} / 0{N} · {tab.label}
              </p>
              <h2 className="scene__title scene__reveal">{tab.title}</h2>
              <ol className="scene__list">
                {tab.items.map((it, k) => (
                  <li className="scene__reveal" key={it.name}>
                    <span className="scene__num">0{k + 1}</span>
                    <div>
                      <h3>{it.name}</h3>
                      <p>{it.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="scene__stage" aria-hidden="true">
              {cfg.shots.map((s, k) => (
                <figure className={`fx ${s.cls}`} key={k} data-d={s.d}>
                  <img src={s.img} alt="" width="660" height="860" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                </figure>
              ))}
              {cfg.chips.map((c) => (
                <span className={`chip ${c.cls}`} key={c.e} data-d={c.d}>
                  {c.e}
                </span>
              ))}
            </div>
          </article>
        )
      })}

      <nav className="journey__rail" aria-label="Escenas">
        {SERVICE_TABS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={`journey__dot ${i === active ? 'is-active' : ''}`}
            aria-current={i === active ? 'step' : undefined}
            onClick={() => go(i)}
            data-cursor="hover"
          >
            <span className="journey__dot-label">{t.label}</span>
            <span className="journey__dot-bar" aria-hidden="true" />
          </button>
        ))}
      </nav>
      <p className="journey__hint" aria-hidden="true">
        seguí bajando ↓
      </p>
    </section>
  )
}

