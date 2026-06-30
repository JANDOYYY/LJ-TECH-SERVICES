import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      logoRef.current,
      { scale: 1.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
    )
      .to(logoRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        delay: 1.2,
        ease: 'power2.in',
      })
      .to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'expo.inOut',
        onComplete,
      })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div
        ref={logoRef}
        className="font-['Space_Grotesk'] text-6xl md:text-8xl font-bold text-[#050505] tracking-[-3px]"
      >
        LJ
      </div>
    </div>
  )
}
