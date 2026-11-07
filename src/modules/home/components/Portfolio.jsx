import { useRef } from 'react'
import { WORKS } from '../data/content.js'
import { LINKS } from '../../../shared/constants/brand.js'
import { useReveal } from '../../../shared/hooks/useReveal.js'
import abogada from '../../../assets/images/tarjetas-abogada.webp'
import szero from '../../../assets/images/tarjetas-szero.webp'
import identidad from '../../../assets/images/identidad-logo.webp'
import feed from '../../../assets/images/reel-cambiar-instagram.webp'

const IMAGES = { abogada, szero, identidad, feed }

export default function Portfolio() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section className="portfolio" id="trabajos" ref={root}>
      <div className="portfolio__head" data-reveal>
        <p className="kicker">Proyectos 📁</p>
        <h2 className="h2">
          Lo que <em>hicimos</em>
        </h2>
      </div>

      <div className="portfolio__grid">
        {WORKS.map((w, i) => (
          <a
            className="work"
            key={w.key}
            href={LINKS.post(w.path)}
            target="_blank"
            rel="noreferrer"
            data-reveal
            data-cursor-label="ver"
            style={{ '--i': i }}
          >
            <span className="work__img">
              <img src={IMAGES[w.key]} alt="" loading="lazy" decoding="async" width="660" height="860" />
            </span>
            <span className="work__tag">{w.tag}</span>
            <h3 className="work__title">{w.title}</h3>
            <p className="work__text">{w.text}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
