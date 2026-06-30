import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = document.querySelectorAll('section[id]')
      let current = 'home'
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 120) {
          current = section.getAttribute('id') || 'home'
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#home')
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-[#0D7DFE] rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg font-['Space_Grotesk']">LJ</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block font-['Space_Grotesk']">
              TECH SOLUTIONS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                }}
                className={`nav-link text-sm font-medium ${
                  activeSection === link.href.slice(1) ? 'active' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:09260956619"
              className="ml-4 px-6 py-2.5 bg-[#0D7DFE] text-white text-sm font-medium rounded-full hover:bg-[#0A5FCC] transition-colors duration-300"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-500 overflow-hidden ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(link.href)
              }}
              className={`text-lg font-medium ${
                activeSection === link.href.slice(1) ? 'text-[#0D7DFE]' : 'text-white/70'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:09260956619"
            className="mt-4 px-6 py-3 bg-[#0D7DFE] text-white text-center font-medium rounded-full"
          >
            Call Now
          </a>
        </div>
      </div>
    </nav>
  )
}
