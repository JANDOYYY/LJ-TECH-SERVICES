import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown, Phone, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: 'How long does a typical repair take?',
    answer: 'Most common repairs are completed within 24-48 hours. Simple issues like software installation or virus removal can often be done same-day. Complex hardware repairs may take 3-5 days depending on parts availability.',
    image: '/images/process-1.jpg',
  },
  {
    question: 'Do you offer home service?',
    answer: 'Yes! We offer home service within Midsayap and nearby areas. Our technician will come to your location to diagnose and fix the issue. Additional travel fee may apply depending on distance.',
    image: '/images/process-2.jpg',
  },
  {
    question: 'Can I upgrade my laptop RAM or SSD?',
    answer: "Absolutely! Most laptops can be upgraded with more RAM or a faster SSD. We can check your laptop's compatibility, recommend the best upgrade options, and install them for you.",
    image: '/images/process-3.jpg',
  },
  {
    question: 'How much does diagnosis cost?',
    answer: 'Initial diagnosis is FREE! We\'ll inspect your device and give you a detailed quote before any work begins. There are no obligations - if you decide not to proceed, you can pick up your device at no cost.',
    image: '/images/process-4.jpg',
  },
  {
    question: 'Do you provide warranty on repairs?',
    answer: 'Yes, all our repairs come with a warranty. Hardware repairs typically include a 30-90 day warranty depending on the service. We also provide a warranty on parts we install.',
    image: '/images/process-5.jpg',
  },
  {
    question: 'What brands do you service?',
    answer: 'We service all major brands including ASUS, Acer, Lenovo, HP, Dell, MSI, Apple MacBooks, and custom-built PCs. Whether it\'s a budget laptop or a high-end gaming rig, we have the expertise.',
    image: '/images/process-1.jpg',
  },
  {
    question: 'Is my data safe during repair?',
    answer: 'We take data privacy very seriously. Our technicians follow strict protocols to protect your data. If a repair requires accessing your files, we always ask for permission first.',
    image: '/images/process-2.jpg',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  useEffect(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.faq-row')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const toggle = (i: number) => {
    setActiveIndex(activeIndex === i ? null : i)
  }

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#0D7DFE]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <ChevronDown size={14} className="text-[#0D7DFE]" />
              <span className="text-[#F0F0F0] text-sm">FAQ</span>
            </div>
            <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">
              Frequently Asked<br />
              <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="reveal flex items-end">
            <p className="text-[#F0F0F0]/70 max-w-md">
              Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
            </p>
          </div>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Accordion */}
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-row glass rounded-xl overflow-hidden transition-all duration-300 hover:border-[#0D7DFE]/30"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className={`text-base font-medium transition-colors duration-300 font-['Space_Grotesk'] ${
                    activeIndex === i ? 'text-[#0D7DFE]' : 'text-white group-hover:text-[#0D7DFE]'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#0D7DFE] transition-transform duration-300 shrink-0 ml-4 ${
                      activeIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeIndex === i ? 'max-h-[300px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-[#F0F0F0]/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="reveal">
            <div className="glass rounded-2xl p-8 lg:sticky lg:top-32">
              <div className="w-16 h-16 bg-[#0D7DFE] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#0D7DFE]/20">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 font-['Space_Grotesk']">
                Still Have Questions?
              </h3>
              <p className="text-[#F0F0F0]/60 mb-6">
                Our friendly team is ready to help. Reach out to us anytime!
              </p>
              <a
                href="tel:09260956619"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#0D7DFE] text-white font-medium rounded-full hover:bg-[#0A5FCC] transition-colors duration-300 mb-3"
              >
                <Phone size={18} />
                Call Us Now
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100089293312305"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 border border-white/20 text-white font-medium rounded-full hover:border-[#0D7DFE] hover:text-[#0D7DFE] transition-all duration-300"
              >
                <MessageCircle size={18} />
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
