import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  MapPin,
  Phone,
  Facebook,
  Clock,
  Send,
  User,
  Mail,
  MessageSquare,
  Wrench,
  CheckCircle,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Midsayap, North Cotabato, Philippines',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '0926 095 6619',
    href: 'tel:09260956619',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'LJ Tech Solutions',
    href: 'https://www.facebook.com/profile.php?id=100089293312305',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Saturday: 8:00 AM - 12:00 PM',
  },
]

const serviceOptions = [
  'Laptop Repair',
  'Desktop Repair',
  'Windows Installation',
  'OS Reformat',
  'Virus Removal',
  'Data Backup',
  'SSD Upgrade',
  'RAM Upgrade',
  'PC Cleaning',
  'Network Setup',
  'Custom PC Build',
  'Home Service',
  'Other',
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  useEffect(() => {
    if (!sectionRef.current) return
    const items = sectionRef.current.querySelectorAll('.contact-reveal')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })
    }, 3000)

  } catch (error) {
    console.error(error)
    alert('Failed to send message.')
  }
}

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0D7DFE]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <MessageSquare size={14} className="text-[#0D7DFE]" />
            <span className="text-[#F0F0F0] text-sm">Contact Us</span>
          </div>
          <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="reveal text-[#F0F0F0]/70 max-w-xl mx-auto">
            We're here to help. Reach out to us for any computer-related concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div>
            <div className="contact-reveal glass rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6 font-['Space_Grotesk']">
                Contact Information
              </h3>

              <div className="space-y-5">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0D7DFE]/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-[#0D7DFE]" />
                    </div>
                    <div>
                      <p className="text-[#F0F0F0]/50 text-sm">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-[#0D7DFE] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="flex gap-3 mt-8">
                <a
                  href="tel:09260956619"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#0D7DFE] text-white font-medium rounded-full hover:bg-[#0A5FCC] transition-colors"
                >
                  <Phone size={16} />
                  Call Now
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100089293312305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 text-white font-medium rounded-full hover:border-[#0D7DFE] hover:text-[#0D7DFE] transition-all"
                >
                  <Facebook size={16} />
                  Messenger
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="contact-reveal rounded-2xl overflow-hidden h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15854.084769866!2d124.5297!3d7.1908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f88153cffffff1%3A0xa5e5e9dd6!2sMidsayap%2C%20North%20Cotabato!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LJ Tech Solutions Location"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-reveal glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-2 font-['Space_Grotesk']">
              Send Us a Message
            </h3>
            <p className="text-[#F0F0F0]/60 mb-6">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-[#0D7DFE] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2 font-['Space_Grotesk']">
                  Message Sent!
                </h4>
                <p className="text-[#F0F0F0]/60">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#F0F0F0]/70 mb-2">
                    <User size={14} className="text-[#0D7DFE]" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Juan Dela Cruz"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0D7DFE] transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-[#F0F0F0]/70 mb-2">
                    <Mail size={14} className="text-[#0D7DFE]" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0D7DFE] transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-[#F0F0F0]/70 mb-2">
                    <Phone size={14} className="text-[#0D7DFE]" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="09XX XXX XXXX"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0D7DFE] transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-[#F0F0F0]/70 mb-2">
                    <Wrench size={14} className="text-[#0D7DFE]" />
                    Service Needed
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#0D7DFE] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-[#080808]">
                      Select a service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#080808]">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-[#F0F0F0]/70 mb-2">
                    <MessageSquare size={14} className="text-[#0D7DFE]" />
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your computer issue or inquiry..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0D7DFE] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#0D7DFE] text-white font-medium rounded-full hover:bg-white hover:text-[#0D7DFE] transition-all duration-500"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0D7DFE] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-['Space_Grotesk']">LJ</span>
                </div>
                <span className="text-white font-semibold text-lg font-['Space_Grotesk']">
                  TECH SOLUTIONS
                </span>
              </div>
              <p className="text-[#F0F0F0]/60 max-w-sm mb-4">
                Your trusted partner for professional computer repair and IT solutions in Midsayap, North Cotabato. Fast, reliable, and affordable service guaranteed.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100089293312305"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-[#0D7DFE] hover:border-[#0D7DFE] transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="tel:09260956619"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-[#0D7DFE] hover:border-[#0D7DFE] transition-all"
                  aria-label="Phone"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 font-['Space_Grotesk']">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'Process', 'Reviews', 'FAQ', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-[#F0F0F0]/60 hover:text-[#0D7DFE] transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 font-['Space_Grotesk']">Services</h4>
              <ul className="space-y-2">
                {['Laptop Repair', 'Desktop Repair', 'Windows Installation', 'Virus Removal', 'Hardware Upgrades', 'Home Service'].map(
                  (service) => (
                    <li key={service}>
                      <a
                        href="#services"
                        className="text-[#F0F0F0]/60 hover:text-[#0D7DFE] transition-colors text-sm"
                      >
                        {service}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#F0F0F0]/40 text-sm">
              &copy; {new Date().getFullYear()} LJ Tech Solutions. All Rights Reserved.
            </p>
            <p className="text-[#0D7DFE] text-sm font-medium">
              Fast. Reliable. Affordable.
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
