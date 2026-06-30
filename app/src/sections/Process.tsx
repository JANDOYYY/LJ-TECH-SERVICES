import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hand, Search, Wrench, CheckCircle, Smile } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Bring Your Device',
    description: 'Drop off your laptop or desktop at our shop or book a home service appointment.',
    icon: Hand,
  },
  {
    number: '02',
    title: 'Free Diagnosis',
    description: 'We perform a thorough inspection and provide a free quote with no obligation.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Repair & Replace',
    description: 'Our experts fix the issue using quality parts. We keep you updated throughout.',
    icon: Wrench,
  },
  {
    number: '04',
    title: 'Testing & QC',
    description: 'Rigorous quality checks ensure your device is fully functional before handover.',
    icon: CheckCircle,
  },
  {
    number: '05',
    title: 'Pick-Up & Enjoy',
    description: 'Collect your repaired device with warranty. Your satisfaction is guaranteed!',
    icon: Smile,
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !progressRef.current) return

    // Animate progress line
    gsap.fromTo(
      progressRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: 1,
        },
      }
    )

    // Animate each step
    const stepEls = sectionRef.current.querySelectorAll('.process-step')
    stepEls.forEach((step, i) => {
      gsap.fromTo(
        step,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Animate icon
      const icon = step.querySelector('.step-icon')
      gsap.fromTo(
        icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.2 + i * 0.1,
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section id="process" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0D7DFE]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Wrench size={14} className="text-[#0D7DFE]" />
            <span className="text-[#F0F0F0] text-sm">How It Works</span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">
            Our Repair <span className="text-gradient">Process</span>
          </h2>
          <p className="reveal text-[#F0F0F0]/70 max-w-xl mx-auto">
            Simple, transparent, and hassle-free from start to finish
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Steps */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 hidden lg:block">
              <div
                ref={progressRef}
                className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#0D7DFE] to-[#0D7DFE]/50 origin-top"
                style={{ height: '100%' }}
              />
            </div>

            <div className="space-y-12">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="process-step relative flex gap-6 lg:pl-20"
                >
                  {/* Icon */}
                  <div className="step-icon relative z-10 w-16 h-16 shrink-0 bg-[#0D7DFE] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0D7DFE]/20">
                    <step.icon size={28} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <span className="text-6xl font-bold text-white/5 absolute top-0 right-0 font-['Space_Grotesk'] select-none">
                      {step.number}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2 font-['Space_Grotesk']">
                      {step.title}
                    </h3>
                    <p className="text-[#F0F0F0]/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Image */}
          <div className="hidden lg:block">
            <div className="process-right">
              <div className="relative h-full rounded-3xl overflow-hidden">
                <img
                  src="/images/process-1.jpg"
                  alt="Repair Process"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 image-overlay-gradient" />
                
                {/* Overlay text */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass p-6 rounded-2xl">
                    <p className="text-[#0D7DFE] text-sm font-medium mb-1">Quality Guaranteed</p>
                    <p className="text-white text-lg font-semibold font-['Space_Grotesk']">
                      Every repair comes with our satisfaction warranty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
