import { useCallback, useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from '../../../shared/hooks/useSmoothScroll.js'
import Preloader from '../components/Preloader.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import Cursor from '../components/Cursor.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import Journey from '../components/Journey.jsx'
import TopPosts from '../components/TopPosts.jsx'
import Reviews from '../components/Reviews.jsx'
import Portfolio from '../components/Portfolio.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/home.css'

export default function HomePage() {
  const [ready, setReady] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  useSmoothScroll()

  const onReveal = useCallback(() => setReady(true), [])
  const onDone = useCallback(() => {
    setShowLoader(false)
    ScrollTrigger.refresh()
  }, [])

  // Un único refresh cuando las fuentes terminan de cargar (los pins dependen de las medidas).
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
      {showLoader && <Preloader onReveal={onReveal} onDone={onDone} />}
      <ProgressBar />
      <Cursor />
      <Navbar />
      <main id="contenido">
        <Hero ready={ready} />
        <Marquee />
        <Journey />
        <TopPosts />
        <Reviews />
        <Portfolio />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
