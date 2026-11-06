import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { SERVICE_TABS } from '../data/content.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

/**
 * La carpeta con solapas Marketing / Community / Diseño, tomada de la
 * pieza "¿Listo/a para trabajar tu marca?" de la marca. Es un tablist accesible.
 */
export default function ServicesFolder() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const tab = SERVICE_TABS[active]

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.folder', {
        rotateX: 28,
        rotateZ: -4,
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.folder', start: 'top 85%' },
      })
      gsap.from('.services__head > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.services__head', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.folder__body > *',
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out' },
      )
    }, root)
    return () => ctx.revert()
  }, [active])

  const onKey = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
    e.preventDefault()
    const n = SERVICE_TABS.length
    let next = active
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (active + 1) % n
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (active - 1 + n) % n
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = n - 1
    setActive(next)
    root.current.querySelector(`#tab-${SERVICE_TABS[next].id}`)?.focus()
  }

  return (
    <section className="services" id="servicios" ref={root}>
      <div className="services__head">
        <p className="kicker">Qué hacemos</p>
        <h2 className="h2">
          Potenciar tu marca es <em>el primer paso</em>
        </h2>
        <p className="services__sub">Abrí cada solapa de la carpeta 👉</p>
      </div>

      <div className="folder" style={{ '--folder': tab.color, '--folder-ink': tab.ink }}>
        <div className="folder__tabs" role="tablist" aria-label="Servicios" aria-orientation="vertical" onKeyDown={onKey}>
          {SERVICE_TABS.map((t, i) => (
            <button
              key={t.id}
              id={`tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className={`folder__tab ${i === active ? 'is-active' : ''}`}
              style={{ '--tab': t.color, '--tab-ink': t.ink }}
              onClick={() => setActive(i)}
              data-cursor="hover"
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div
          className="folder__sheet"
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          tabIndex={0}
        >
          <div className="folder__body" key={tab.id}>
            <p className="folder__handle">
              @studioag.mkt <span aria-hidden="true">❤️</span>
            </p>
            <h3 className="folder__title">
              <span className="folder__emoji" aria-hidden="true">
                {tab.emoji}
              </span>
              {tab.title}
            </h3>
            <ul className="folder__list">
              {tab.items.map((it, i) => (
                <li key={it.name} style={{ '--i': i }}>
                  <span className="folder__num">0{i + 1}</span>
                  <div>
                    <h4>{it.name}</h4>
                    <p>{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
