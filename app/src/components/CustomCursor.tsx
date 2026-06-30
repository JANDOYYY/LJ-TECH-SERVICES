import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches)
    }
    checkTouch()
    window.addEventListener('resize', checkTouch)

    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!visible) setVisible(true)

      gsap.to(dotRef.current, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.08,
        ease: 'power2.out',
      })

      gsap.to(ringRef.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => setVisible(true)
    const handleMouseLeave = () => setVisible(false)

    // Detect hoverable elements
    const handleElementHover = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, select, [role="button"]')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          ringRef.current?.classList.add('expanded')
          gsap.to(dotRef.current, { scale: 0, duration: 0.2 })
        })
        el.addEventListener('mouseleave', () => {
          ringRef.current?.classList.remove('expanded')
          gsap.to(dotRef.current, { scale: 1, duration: 0.2 })
        })
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Set up hover detection after a short delay to ensure DOM is ready
    const timeout = setTimeout(handleElementHover, 1000)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', checkTouch)
      clearTimeout(timeout)
    }
  }, [isTouch, visible])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden lg:block"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden lg:block"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      />
    </>
  )
}
