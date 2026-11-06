import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from '../../../shared/hooks/useSmoothScroll.js'
import Preloader from '../components/Preloader.jsx'
import Cursor from '../components/Cursor.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Manifesto from '../components/Manifesto.jsx'
import ServicesFolder from '../components/ServicesFolder.jsx'
import Process from '../components/Process.jsx'
import TopPosts from '../components/TopPosts.jsx'
import Portfolio from '../components/Portfolio.jsx'
import CalendarCta from '../components/CalendarCta.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/home.css'

export default function HomePage() {
  const [ready, setReady] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  useSmoothScroll()

  const onLoaded = useCallback(() => {
    setReady(true)
    setShowLoader(false)
  }, [])

  // recalcula pins cuando terminan de cargar fuentes e imágenes
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      {showLoader && <Preloader onDone={onLoaded} />}
      <Cursor />
      <Navbar />
      <main id="contenido">
        <Hero ready={ready} />
        <Marquee />
        <Manifesto />
        <ServicesFolder />
        <Process />
        <TopPosts />
        <Marquee tone="rosa" tilt={2} words={['Guardalo', '📌', 'Compartilo', '🔁', 'Comentá', '💬', 'Frená el scroll', '🔥']} />
        <Portfolio />
        <CalendarCta />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
