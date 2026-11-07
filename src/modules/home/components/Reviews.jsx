import { useRef } from 'react'
import { REVIEWS } from '../data/content.js'
import { useReveal } from '../../../shared/hooks/useReveal.js'
import resultados from '../../../assets/images/wpp-resultados.webp'
import gracias from '../../../assets/images/wpp-gracias.webp'
import hermoso from '../../../assets/images/wpp-hermoso.webp'

const IMAGES = { resultados, gracias, hermoso }

/** Capturas reales de WhatsApp, recortadas a la burbuja. */
export default function Reviews() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section className="reviews" id="resenas" ref={root}>
      <div className="reviews__head" data-reveal>
        <p className="kicker">Reseñas</p>
        <h2 className="h2">
          Mensajes que nos <em>alegran el día</em> 💌
        </h2>
      </div>

      <ul className="reviews__list">
        {REVIEWS.map((r, i) => (
          <li className={`review review--${r.key}`} key={r.key} data-reveal style={{ '--i': i }}>
            <span className="review__tape" aria-hidden="true" />
            <img src={IMAGES[r.key]} alt={r.alt} loading="lazy" decoding="async" />
            <span className="review__react" aria-hidden="true">
              {r.reaction}
            </span>
          </li>
        ))}
      </ul>
      <p className="reviews__note" data-reveal>
        Mensajes reales de clientes.
      </p>
    </section>
  )
}
