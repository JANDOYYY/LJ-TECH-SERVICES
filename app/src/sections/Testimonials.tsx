import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    text: "LJ Tech Solutions saved my laptop! I thought I lost all my thesis files, but they recovered everything and fixed my screen in just one day. Highly recommended!",
    author: 'Rhyvyn Singco',
    role: 'College Student - Midsayap',
    rating: 5,
  },
  {
    text: "Very professional service! My desktop was running so slow, and they upgraded my SSD and RAM. Now it runs like brand new. Fair pricing too!",
    author: 'Cozem Bomes',
    role: 'Laptop Owner - Midsayap',
    rating: 5,
  },
  {
    text: "I availed of their home service because I couldn't bring my PC. The technician arrived on time, was very courteous, and fixed the virus issue quickly.",
    author: 'Kerlsey Chen Lira',
    role: 'Salon Owner- Midsayap, North Cotabato',
    rating: 5,
  },
  {
    text: "They built a custom gaming PC for me within my budget. The cable management is perfect, and the performance is amazing. Best computer shop in Midsayap!",
    author: 'Ian Jeff Buco',
    role: 'Gamer - Midsayap',
    rating: 5,
  },
  {
    text: "Honest diagnosis and transparent pricing. They could have charged me for a new motherboard but found a simpler fix instead. Very trustworthy!",
    author: 'Jundi DS',
    role: 'Motorboy Employee - Midsayap',
    rating: 4,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeRef2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current || !marqueeRef2.current) return

    // Marquee animation
    const tl1 = gsap.to(marqueeRef.current, {
      x: '-50%',
      duration: 30,
      ease: 'none',
      repeat: -1,
    })

    const tl2 = gsap.to(marqueeRef2.current, {
      x: '0%',
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
    gsap.set(marqueeRef2.current, { x: '-50%' })

    // Velocity-based skew
    let lastScroll = 0
    const handleScroll = () => {
      const velocity = window.scrollY - lastScroll
      lastScroll = window.scrollY
      const skew = Math.max(-8, Math.min(8, velocity * 0.15))
      gsap.to([marqueeRef.current, marqueeRef2.current], {
        skewX: skew,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      tl1.kill()
      tl2.kill()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  const marqueeText = 'FAST \u2022 RELIABLE \u2022 PROFESSIONAL \u2022 TRUSTED \u2022 '
  const repeatedText = marqueeText.repeat(8)

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0D7DFE]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Marquee Top */}
      <div className="overflow-hidden mb-16">
        <div ref={marqueeRef} className="marquee-track">
          <div className="marquee-content">
            <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white/5 font-['Space_Grotesk'] uppercase whitespace-nowrap">
              {repeatedText}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Quote size={14} className="text-[#0D7DFE]" />
            <span className="text-[#F0F0F0] text-sm">Testimonials</span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">
            What Our <span className="text-gradient">Customers Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="reveal relative">
          <div className="glass rounded-3xl p-8 sm:p-12">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < testimonials[current].rating
                      ? 'text-[#0D7DFE] fill-[#0D7DFE]'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Quote */}
            <p className="text-lg sm:text-xl text-[#F0F0F0]/90 italic leading-relaxed mb-8 transition-opacity duration-500">
              "{testimonials[current].text}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold font-['Space_Grotesk']">
                  {testimonials[current].author}
                </p>
                <p className="text-[#F0F0F0]/50 text-sm">
                  {testimonials[current].role}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[#0D7DFE] hover:border-[#0D7DFE] transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-[#0D7DFE] hover:border-[#0D7DFE] transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-[#0D7DFE]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Bottom */}
      <div className="overflow-hidden mt-16">
        <div ref={marqueeRef2} className="marquee-track">
          <div className="marquee-content">
            <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white/5 font-['Space_Grotesk'] uppercase whitespace-nowrap">
              {repeatedText}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
