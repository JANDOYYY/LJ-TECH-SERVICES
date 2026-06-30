import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './sections/Navigation'
import Preloader from './sections/Preloader'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import CustomCursor from './components/CustomCursor'
import FloatingButtons from './components/FloatingButtons'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loaded, setLoaded] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loaded && mainRef.current) {
      const reveals = mainRef.current.querySelectorAll('.reveal')
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    }
  }, [loaded])

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <Navigation />
      <main ref={mainRef} className="relative">
        <Hero loaded={loaded} />
        <Services />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <FloatingButtons />
    </>
  )
}

export default App
