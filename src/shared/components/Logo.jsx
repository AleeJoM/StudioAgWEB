import './Logo.css'

/** Wordmark de studioag mkt. reconstruido en tipografía (nítido en cualquier tamaño). */
export default function Logo({ size = 'md', tone = 'vino', className = '', splitLetters = false }) {
  const word = 'studioag'
  return (
    <span className={`logo logo--${size} logo--${tone} ${className}`} aria-label="studioag mkt.">
      <span className="logo__word" aria-hidden="true">
        {splitLetters
          ? word.split('').map((ch, i) => (
              <span className="logo__char" key={i}>
                {ch}
              </span>
            ))
          : word}
      </span>
      <span className="logo__rule" aria-hidden="true" />
      <span className="logo__mkt" aria-hidden="true">
        m k t<b>.</b>
      </span>
    </span>
  )
}
