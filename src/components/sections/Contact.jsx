import { useState } from 'react'
import useTheme from '../../hooks/useTheme'

function Contact() {
  const { theme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '16f6357b-f2f2-4c33-ac7b-3241fe825235',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Contact Form Submission',
          message: formData.message,
          from_name: 'Portfolio Contact Form'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(''), 5000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section 
      id="contact" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
          <div className="lg:pr-8">
            <p className={`text-sm font-medium uppercase tracking-widest mb-2 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              Get In Touch
            </p>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              LET'S CONNECT &<br />
              BUILD TOGETHER
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              I'm actively looking for full-time opportunities where I can contribute,
              learn, and grow. If you think I'd be a good fit for your team, I'd love to hear from you!
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:+917018235639"
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' 
                    : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="/profile.webp" 
                    alt="Vivek Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className={`text-xs uppercase tracking-wide ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Schedule a Call
                  </p>
                  <p className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    +91 7018235639
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:vibush01@gmail.com"
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:-translate-y-0.5 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border border-slate-700 hover:border-slate-600' 
                    : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-white border border-slate-200'
                }`}>
                  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div >
                  <p className={`text-xs uppercase tracking-wide ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    Email Me
                  </p>
                  <p className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    vibush01@gmail.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className={`p-8 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-slate-50 border border-slate-200'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className={`w-full px-5 py-4 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
                }`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className={`w-full px-5 py-4 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
                }`}
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject (Optional)"
                className={`w-full px-5 py-4 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
                }`}
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your Message"
                className={`w-full px-5 py-4 rounded-xl border outline-none transition-all resize-none focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500' 
                    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
                }`}
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-xl font-semibold uppercase tracking-wide transition-all disabled:opacity-50 ${
                  status === 'success'
                    ? 'bg-green-500 text-white'
                    : status === 'error'
                    ? 'bg-red-500 text-white'
                    : theme === 'dark' 
                    ? 'bg-white text-slate-900 hover:bg-slate-100' 
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : status === 'error' ? 'Failed - Try Again' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
