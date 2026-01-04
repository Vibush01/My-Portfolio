import SectionTitle from '../ui/SectionTitle'
import { skills, education, certifications } from '../../data/skills'

function About() {
  const skillCategories = [
    { title: 'Languages', items: skills.languages },
    { title: 'Frontend', items: skills.frontend },
    { title: 'Backend', items: skills.backend },
    { title: 'Database', items: skills.database },
    { title: 'Tools', items: skills.tools },
  ]

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know me better"
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Bio */}
          <div>
            <h3 
              className="text-xl font-semibold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Who I Am
            </h3>
            <div 
              className="space-y-4 leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <p>
                I'm a passionate <span style={{ color: 'var(--color-primary)' }}>Full Stack Developer</span> currently 
                pursuing B.E. in Computer Science & Engineering at Chitkara University. I love building 
                scalable web applications and solving complex problems with clean, efficient code.
              </p>
              <p>
                Currently working at <span style={{ color: 'var(--color-accent)' }}>Headstart</span>, where I'm 
                building high-performance dashboard applications with modern web technologies. I've also 
                contributed to fintech solutions at Bluestock, developing secure onboarding platforms.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies, contributing to open source, 
                and sharing my knowledge through technical writing.
              </p>
            </div>

            {/* Education */}
            <div className="mt-8">
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Education
              </h3>
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <h4 
                    className="font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {edu.degree}
                  </h4>
                  <p style={{ color: 'var(--color-primary)' }}>{edu.institution}</p>
                  <p 
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {edu.location} • {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Skills */}
          <div>
            <h3 
              className="text-xl font-semibold mb-6"
              style={{ color: 'var(--color-text)' }}
            >
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <div key={index}>
                  <h4 
                    className="text-sm font-medium mb-3"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                        style={{ 
                          backgroundColor: 'var(--color-bg)',
                          color: 'var(--color-text)',
                          border: '1px solid var(--color-border)'
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h3 
                className="text-xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Certifications
              </h3>
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    <svg 
                      className="w-5 h-5 flex-shrink-0 mt-0.5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
