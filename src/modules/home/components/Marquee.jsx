import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MARQUEE_WORDS } from '../data/content.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

/** Cinta infinita; acelera y cambia de sentido según la velocidad del scroll. */
export default function Marquee({ words = MARQUEE_WORDS, tone = 'vino', tilt = -2.5 }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      const track = root.current.querySelector('.marquee__track')
      const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 28, repeat: -1 })
      let dir = 1
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity()
          if (v !== 0) dir = v > 0 ? 1 : -1
          const boost = Math.min(Math.abs(v) / 300, 6)
          gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true })
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false })
        },
      })
      return () => st.kill()
    }, root)
    return () => ctx.revert()
  }, [])

  const row = [...words, ...words]
  return (
    <div className={`marquee marquee--${tone}`} ref={root} style={{ '--tilt': `${tilt}deg` }} aria-hidden="true">
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
