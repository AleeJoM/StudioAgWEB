import { useEffect, useState } from 'react'
import Logo from '../../../shared/components/Logo.jsx'
import { LINKS } from '../../../shared/constants/brand.js'
import { scrollToTarget, setScrollLocked } from '../../../shared/hooks/useSmoothScroll.js'

const NAV = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#destacado', label: 'Resultados' },
  { href: '#resenas', label: 'Reseñas' },
  { href: '#trabajos', label: 'Trabajos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 400 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // espera a que se libere el scroll del menú móvil
    requestAnimationFrame(() => scrollToTarget(href))
  }

  return (
    <header
      className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}
    >
      <div className="nav__bar">
        <a href="#inicio" className="nav__logo" onClick={(e) => go(e, '#inicio')} data-cursor="hover">
          <Logo size="sm" />
        </a>

        <nav className="nav__links" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} data-cursor="hover">
              {n.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--vino btn--sm nav__cta" href={LINKS.dm} target="_blank" rel="noreferrer" data-cursor="hover">
          Escribinos 💌
        </a>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="nav__sheet" id="menu-movil" hidden={!open}>
        <nav aria-label="Menú móvil">
          {NAV.map((n, i) => (
            <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} style={{ '--i': i }}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="btn btn--crema" href={LINKS.dm} target="_blank" rel="noreferrer">
          Escribinos por Instagram 💌
        </a>
        <p className="nav__sheet-foot">Estrategia · Contenido · Diseño</p>
      </div>
    </header>
  )
}
