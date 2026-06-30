import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'

interface HeroProps {
  loaded: boolean
}

export default function Hero({ loaded }: HeroProps) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (loaded) {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(
        leftRef.current?.querySelectorAll('.hero-anim') || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: 'power4.out' }
      )

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
      )
    }
  }, [loaded])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 15
      const y = (e.clientY / window.innerHeight - 0.5) * 15
      gsap.to(imageRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center pt-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#0D7DFE]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0D7DFE]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Left: Content */}
      <div ref={leftRef} className="relative z-10 px-6 lg:px-12 xl:px-20 py-12 lg:py-0">
        <div className="hero-anim inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8">
          <span className="w-2 h-2 bg-[#0D7DFE] rounded-full animate-pulse" />
          <span className="text-[#F0F0F0] text-sm">Fast. Reliable. Affordable.</span>
        </div>

        <h1 className="hero-anim text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6 font-['Space_Grotesk']">
          Professional{' '}
          <span className="text-gradient">Computer Repair</span>{' '}
          &amp; IT Solutions
        </h1>

        <p className="hero-anim text-lg text-[#F0F0F0]/80 max-w-md mb-10 leading-relaxed">
          Fast, reliable &amp; affordable computer services in Midsayap, North Cotabato. We bring your devices back to life with expert care and quality parts.
        </p>

        <div className="hero-anim flex flex-wrap gap-4 mb-12">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0D7DFE] text-white font-medium rounded-full hover:bg-[#0A5FCC] transition-all duration-300 hover:shadow-lg hover:shadow-[#0D7DFE]/30"
          >
            Book a Service
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100089293312305"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-[#0D7DFE] hover:text-[#0D7DFE] transition-all duration-300"
          >
            <MessageCircle size={18} />
            Message Us
          </a>
        </div>

        <div className="hero-anim flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#0D7DFE]/10 flex items-center justify-center">
              <Phone size={16} className="text-[#0D7DFE]" />
            </div>
            <div>
              <p className="text-xs text-[#F0F0F0]/50">Call us</p>
              <p className="text-sm text-white font-medium">0926 095 6619</p>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div>
            <p className="text-xs text-[#F0F0F0]/50">Happy Customers</p>
            <p className="text-sm text-white font-medium">30+ Repairs</p>
          </div>
        </div>
      </div>

      {/* Right: Cover Photo */}
      <div ref={rightRef} className="relative z-10 hidden lg:flex items-center justify-center px-8">
        <div className="relative w-full max-w-lg">
          {/* Glow behind image */}
          <div className="absolute inset-0 bg-[#0D7DFE]/20 rounded-3xl blur-[60px] scale-90" />
          
          <img
            ref={imageRef}
             src={`${import.meta.env.BASE_URL}images/cover-photo.jpg`}
            alt="LJ Tech Solutions - Professional Computer Services"
            className="relative w-full rounded-2xl shadow-2xl shadow-black/50"
            style={{ willChange: 'transform' }}
          />
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -left-4 glass px-5 py-3 rounded-xl">
            <p className="text-[#0D7DFE] font-bold text-lg font-['Space_Grotesk']">3+ Years</p>
            <p className="text-[#F0F0F0]/70 text-xs">of Experience</p>
          </div>
          
          {/* Floating badge 2 */}
          <div className="absolute -top-4 -right-4 glass px-4 py-2 rounded-xl">
            <p className="text-white text-xs font-medium">Home Service</p>
            <p className="text-[#0D7DFE] text-[10px]">Available</p>
          </div>
        </div>
      </div>

      {/* Mobile: show cover photo below text */}
      <div className="lg:hidden relative z-10 px-6 pb-12">
        <img
           src={`${import.meta.env.BASE_URL}images/cover-photo.jpg`}
          alt="LJ Tech Solutions"
          className="w-full rounded-2xl shadow-xl"
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  )
}
