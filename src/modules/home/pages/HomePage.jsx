import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from '../../../shared/hooks/useSmoothScroll.js'
import Cursor from '../components/Cursor.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import ServicesFolder from '../components/ServicesFolder.jsx'
import TopPosts from '../components/TopPosts.jsx'
import Reviews from '../components/Reviews.jsx'
import Portfolio from '../components/Portfolio.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/home.css'

export default function HomePage() {
  useSmoothScroll()

  // Un único refresh cuando las fuentes terminan de cargar (los triggers de contadores dependen de la posición).
  useEffect(() => {
    let alive = true
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh())
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Cursor />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Marquee />
        <ServicesFolder />
        <TopPosts />
        <Reviews />
        <Portfolio />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
