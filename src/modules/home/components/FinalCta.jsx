import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { LINKS } from '../../../shared/constants/brand.js'
import { prefersReducedMotion } from '../../../shared/hooks/useSmoothScroll.js'

const EMOJIS = ['🚀', '💡', '🤎', '✨', '💌', '📌', '💅', '🥐', '🔥', '🫶🏻']

export default function FinalCta() {
  const root = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.from('.final__folder', {
        scale: 0.7,
        rotate: -6,
        y: 120,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top 25%', scrub: 0.8 },
      })
      gsap.from('.final__tab', {
        x: -40,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 30%', scrub: 0.8 },
      })
      gsap.utils.toArray('.final__float').forEach((el, i) => {
        gsap.to(el, {
          y: () => -120 - i * 30,
          rotate: i % 2 ? 25 : -25,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      // botón magnético
      const btn = root.current.querySelector('.final__btn')
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (!btn || !fine) return undefined
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
      const move = (e) => {
        const r = btn.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35)
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      btn.addEventListener('pointermove', move)
      btn.addEventListener('pointerleave', leave)
      return () => {
        btn.removeEventListener('pointermove', move)
        btn.removeEventListener('pointerleave', leave)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="final" id="contacto" ref={root}>
      {EMOJIS.map((e, i) => (
        <span className={`final__float final__float--${i}`} key={i} aria-hidden="true">
          {e}
        </span>
      ))}
      <div className="final__folder">
        <div className="final__tabs" aria-hidden="true">
          <span className="final__tab final__tab--vino">Marketing</span>
          <span className="final__tab final__tab--naranja">Community</span>
          <span className="final__tab final__tab--verde">Diseño</span>
        </div>
        <p className="final__handle">
          @studioag.mkt <span aria-hidden="true">❤️</span>
        </p>
        <h2 className="final__title">¿Listo/a para trabajar tu marca?</h2>
        <p className="final__lead">¿Querés que tu marca sea la próxima? Escribinos y hablemos ✨</p>
        <a className="btn btn--crema btn--xl final__btn" href={LINKS.dm} target="_blank" rel="noreferrer" data-cursor="hover">
          ¡Contactanos! 💌
        </a>
      </div>
    </section>
  )
}
