import { Link } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'

function Footer() {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Tools', href: '/#tools' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/vibush01',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Vibush01',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Twitter / X',
      href: 'https://twitter.com/vibush01',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/917876408738',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      )
    },
  ]

  return (
    <footer className={`py-16 border-t ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Vivek Kumar
            </h3>
            <p className={`text-sm leading-relaxed mb-6 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Full Stack Developer with expertise in React, TypeScript, and the MERN stack. 
              I build scalable web applications with a focus on performance and user experience.
            </p>
            <div className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 7876408738
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                vibushkumar99@gmail.com
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors hover:text-indigo-500 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Connect
            </h4>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:-translate-y-0.5 ${
                    theme === 'dark' 
                      ? 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-600' 
                      : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {link.icon}
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t text-center ${
          theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
            © {currentYear} Vivek Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
