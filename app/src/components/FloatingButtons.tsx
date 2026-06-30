import { useEffect, useState } from 'react'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Messenger */}
      <a
        href="https://www.facebook.com/profile.php?id=100089293312305"
        target="_blank"
        rel="noopener noreferrer"
        className="float-btn float-messenger"
        aria-label="Message us on Facebook"
        title="Chat with us"
      >
        <MessageCircle size={24} />
      </a>

      {/* Call */}
      <a
        href="tel:09260956619"
        className="float-btn float-call"
        aria-label="Call us"
        title="Call Now"
      >
        <Phone size={22} />
      </a>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`float-btn float-top ${showTop ? 'visible' : ''}`}
        aria-label="Back to top"
        title="Back to Top"
      >
        <ArrowUp size={22} />
      </button>
    </>
  )
}
