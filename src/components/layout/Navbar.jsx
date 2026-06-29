import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { useData } from '../../context/DataContext'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { theme, toggleTheme } = useTheme()
  const { data } = useData()
  const location = useLocation()
  const navigate = useNavigate()

  // Active section tracker
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -79% 0px', threshold: 0 } // Triggers when section is in top 20%
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [location.pathname])

  // Check scroll position for back to top button
  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Tools', href: '/#tools' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMenuOpen(false)
    
    const sectionId = href.replace('/#', '')
    
    // If not on homepage, navigate first then scroll
    if (location.pathname !== '/') {
      navigate('/')
      // Wait for navigation then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      // Already on homepage, just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLogoClick = () => {
    setShowProfileModal(true)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${
          theme === 'dark' 
            ? 'bg-slate-900/80 border-slate-700' 
            : 'bg-slate-50/80 border-slate-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Profile Image (only opens modal) */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2"
            >
              <img 
                src={data?.hero?.profileImageUrl || "/profile.webp"} 
                alt="Vivek Kumar"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 hover:scale-110 transition-transform cursor-pointer"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('/#', '')
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-medium transition-all ${
                      isActive
                        ? 'text-indigo-500 scale-105'
                        : theme === 'dark' 
                          ? 'text-slate-300 hover:text-indigo-400' 
                          : 'text-slate-600 hover:text-indigo-600'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className="h-0.5 w-full bg-indigo-500 mt-1 rounded-full animate-fadeInUp"></div>
                    )}
                  </a>
                )
              })}
              
              <Link
                to="/admin/login"
                className={`text-sm font-medium px-4 py-2 rounded-lg border transition-all ${
                  theme === 'dark'
                    ? 'border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10'
                    : 'border-indigo-500/30 text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Admin Login
              </Link>
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'bg-slate-800 text-white hover:bg-slate-700' 
                    : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                className={`md:hidden p-2 rounded-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className={`md:hidden py-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('/#', '')
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block py-3 px-4 text-sm font-medium transition-all rounded-lg mb-1 ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-indigo-50 text-indigo-600'
                        : theme === 'dark' 
                          ? 'text-slate-300 hover:bg-slate-800' 
                          : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              })}
              
              <Link
                to="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 px-4 mt-2 text-sm font-medium transition-all rounded-lg border text-center ${
                  theme === 'dark'
                    ? 'border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10'
                    : 'border-indigo-500/30 text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowProfileModal(false)}
        >
          <div 
            className="relative max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={data?.hero?.profileImageUrl || "/profile.webp"} 
              alt="Vivek Kumar"
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-2xl shadow-indigo-500/30"
            />
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold text-white">Vivek Kumar</h3>
              <p className="text-slate-400">Full Stack Developer</p>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl ${
            theme === 'dark' 
              ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
              : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}

export default Navbar
