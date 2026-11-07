import { MARQUEE_WORDS } from '../data/content.js'

/** Cinta infinita 100% CSS (corre en el compositor, sin JS). */
export default function Marquee({ words = MARQUEE_WORDS }) {
  const row = [...words, ...words]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((w, i) => (
          <span className={/\p{Extended_Pictographic}/u.test(w) ? 'marquee__emoji' : 'marquee__word'} key={i}>
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}
