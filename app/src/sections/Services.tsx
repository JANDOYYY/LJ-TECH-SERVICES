import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Monitor,
  Cpu,
  Disc,
  ShieldCheck,
  HardDrive,
  Sparkles,
  Gamepad2,
  Wifi,
  Home,
  Store,
  ArrowRight,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Monitor,
    title: 'Laptop Repair',
    description: 'Screen replacement, keyboard fixes, motherboard repair, charging port issues for all brands.',
    image: `${import.meta.env.BASE_URL}images/service-1.jpg`,
  },
  {
    icon: Cpu,
    title: 'Desktop Repair',
    description: 'Power supply fixes, motherboard troubleshooting, GPU issues, boot problems, and complete diagnostics.',
    image: `${import.meta.env.BASE_URL}images/service-2.jpg`,
  },
  {
    icon: Disc,
    title: 'Windows Installation',
    description: 'Fresh Windows 10/11 installation, driver setup, software configuration, and system optimization.',
    image: `${import.meta.env.BASE_URL}images/service-3.jpg`,
  },
  {
    icon: ShieldCheck,
    title: 'Virus Removal',
    description: 'Complete malware, spyware, and virus removal. Antivirus installation and security hardening.',
    image: `${import.meta.env.BASE_URL}images/service-4.jpg`,
  },
  {
    icon: HardDrive,
    title: 'Hardware Upgrades',
    description: 'SSD upgrades for speed, RAM expansion, GPU installation, CPU upgrades, and storage solutions.',
    image: `${import.meta.env.BASE_URL}images/service-1.jpg`,
  },
  {
    icon: Sparkles,
    title: 'PC Cleaning',
    description: 'Deep internal cleaning, thermal paste replacement, fan maintenance, and dust removal.',
    image: `${import.meta.env.BASE_URL}images/service-2.jpg`,
  },
  {
    icon: Gamepad2,
    title: 'Custom PC Build',
    description: 'Gaming rigs, workstation builds, budget-friendly setups, RGB lighting, and cable management.',
    image: `${import.meta.env.BASE_URL}images/service-3.jpg`,
  },
  {
    icon: Wifi,
    title: 'Network Setup',
    description: 'WiFi configuration, router setup, network troubleshooting, LAN installation, and speed optimization.',
    image: `${import.meta.env.BASE_URL}images/service-4.jpg`,
  },
  {
    icon: Home,
    title: 'Home Service',
    description: "Can't bring your device? We'll come to you! On-site repair at your location.",
    image: `${import.meta.env.BASE_URL}images/service-1.jpg`,
  },
  {
    icon: Store,
    title: 'Drop-off Service',
    description: 'Convenient drop-off at our shop. Free initial diagnosis and fair pricing on all repairs.',
    image: `${import.meta.env.BASE_URL}images/service-2.jpg`,
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('.service-card')

    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0D7DFE]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Sparkles size={14} className="text-[#0D7DFE]" />
            <span className="text-[#F0F0F0] text-sm">Our Services</span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">
            What We <span className="text-gradient">Offer</span>
          </h2>
          <p className="reveal text-[#F0F0F0]/70 max-w-xl mx-auto">
            Comprehensive computer repair and IT solutions tailored to your needs
          </p>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group relative glass rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 -mt-8">
                <div className="w-12 h-12 bg-[#0D7DFE] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#0D7DFE]/20 group-hover:shadow-[#0D7DFE]/40 transition-shadow duration-300">
                  <service.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#0D7DFE] transition-colors duration-300 font-['Space_Grotesk']">
                  {service.title}
                </h3>
                <p className="text-sm text-[#F0F0F0]/60 leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-[#0D7DFE] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Get Service <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
