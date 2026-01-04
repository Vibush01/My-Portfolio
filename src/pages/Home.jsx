function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="hero" className="section min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            Hi, I'm <span className="gradient-text">Vivek Kumar</span>
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Full Stack Developer
          </p>
          <p 
            className="max-w-2xl mb-8"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Full Stack Developer with production experience building scalable browser extensions and web applications.
            Proficient in the MERN stack, React 19, and modern tooling like Hono and TypeScript.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
            <a href="/resume.pdf" className="btn btn-secondary" target="_blank">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Placeholder */}
      <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="section-title gradient-text">About Me</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Coming soon...</p>
        </div>
      </section>

      {/* Experience Section - Placeholder */}
      <section id="experience" className="section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="section-title gradient-text">Experience</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Coming soon...</p>
        </div>
      </section>

      {/* Projects Section - Placeholder */}
      <section id="projects" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="section-title gradient-text">Projects</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Coming soon...</p>
        </div>
      </section>

      {/* Blog Section - Placeholder */}
      <section id="blog" className="section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="section-title gradient-text">Blog</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Coming soon...</p>
        </div>
      </section>

      {/* Contact Section - Placeholder */}
      <section id="contact" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Coming soon...</p>
        </div>
      </section>
    </div>
  )
}

export default Home
