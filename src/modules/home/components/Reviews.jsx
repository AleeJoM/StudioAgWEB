import { useRef } from 'react'
import { REVIEWS } from '../data/content.js'
import { useReveal } from '../../../shared/hooks/useReveal.js'

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
          <li className="review" key={i} data-reveal style={{ '--i': i }}>
            <span className="review__tape" aria-hidden="true" />
            <blockquote>
              <p>{r.text}</p>
            </blockquote>
            <footer>
              <span>Cliente de studioag · WhatsApp</span>
              <span className="review__react" aria-hidden="true">
                {r.reaction}
              </span>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  )
}
