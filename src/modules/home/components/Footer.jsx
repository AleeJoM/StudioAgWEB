import Logo from '../../../shared/components/Logo.jsx'
import { BRAND, LINKS } from '../../../shared/constants/brand.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Logo size="md" tone="crema" />
        <p className="footer__tag">💡 {BRAND.tagline}</p>
      </div>
      <div className="footer__grid">
        <div>
          <h3>Servicios</h3>
          <ul>
            <li>Estrategia de marketing</li>
            <li>Branding e identidad</li>
            <li>Community Manager</li>
            <li>Post · Historias · Reels</li>
            <li>Tarjetas personales</li>
          </ul>
        </div>
        <div>
          <h3>Seguinos</h3>
          <ul>
            <li>
              <a href={LINKS.instagram} target="_blank" rel="noreferrer">
                Instagram {BRAND.handle}
              </a>
            </li>
            <li>
              <a href={LINKS.dm} target="_blank" rel="noreferrer">
                Mensaje directo 💌
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer__legal">
        © {new Date().getFullYear()} studioag mkt. · Estrategia · Contenido · Diseño
      </p>
    </footer>
  )
}
