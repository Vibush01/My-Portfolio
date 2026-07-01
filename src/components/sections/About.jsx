import { useState } from 'react'
import useTheme from '../../hooks/useTheme'
import { useData } from '../../context/DataContext'

function About() {
  const { theme } = useTheme()
  const { data } = useData()
  
  const skills = data?.skills || []
  const education = data?.education || []
  const certifications = data?.certifications || []
  
  const [certPage, setCertPage] = useState(0)
  const certsPerPage = 2
  const totalPages = Math.ceil(certifications.length / certsPerPage)
  const visibleCerts = certifications.slice(certPage * certsPerPage, (certPage + 1) * certsPerPage)

  return (
    <section 
      id="about" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            About Me
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Get to know me better
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Who I Am
            </h3>
            <div className={`space-y-4 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {data?.general?.bio ? (
                data.general.bio.split('\n').map((paragraph, index) => (
                  paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                ))
              ) : (
                <>
                  <p>
                    I'm a passionate Full Stack Developer with expertise in building scalable web applications 
                    using modern technologies like React 19, TypeScript, Hono, and the MERN stack.
                  </p>
                  <p>
                    With experience at HeadStart, Bluestock Fintech, and Agami Technologies, I've developed 
                    high-performance dashboards, real-time systems, secure authentication flows, and enterprise 
                    loan management systems. I love solving complex problems and creating intuitive user experiences.
                  </p>
                  <p>
                    When I'm not coding, you'll find me exploring new technologies and writing technical blog 
                    posts.
                  </p>
                </>
              )}
            </div>

            {/* Education */}
            <div className="mt-8">
              <h4 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Education
              </h4>
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-slate-900' : 'bg-white shadow-sm'
                  }`}
                >
                  <p className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {edu.degree}
                  </p>
                  <p className="text-indigo-500">{edu.school}</p>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {edu.year}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications - Paginated Carousel */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Certifications
                </h4>
                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCertPage(p => Math.max(0, p - 1))}
                    disabled={certPage === 0}
                    className={`p-1.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      theme === 'dark' 
                        ? 'hover:bg-slate-700 text-slate-400' 
                        : 'hover:bg-slate-200 text-slate-500'
                    }`}
                    aria-label="Previous certifications"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCertPage(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === certPage 
                            ? 'bg-indigo-500 w-4' 
                            : theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Page ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCertPage(p => Math.min(totalPages - 1, p + 1))}
                    disabled={certPage === totalPages - 1}
                    className={`p-1.5 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      theme === 'dark' 
                        ? 'hover:bg-slate-700 text-slate-400' 
                        : 'hover:bg-slate-200 text-slate-500'
                    }`}
                    aria-label="Next certifications"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Certification Cards */}
              <div className="space-y-3">
                {visibleCerts.map((cert, index) => (
                  <div 
                    key={certPage * certsPerPage + index}
                    className={`p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5 h-[96px] flex items-center ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border-slate-700 hover:border-indigo-500/40' 
                        : 'bg-white border-slate-200 hover:border-indigo-400/40 shadow-sm'
                    }`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div 
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontSize: '20px',
                          flexShrink: 0,
                          backgroundColor: theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(224, 231, 255, 1)'
                        }}
                      >
                        {cert.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p className="line-clamp-2" style={{ 
                          fontWeight: 600, 
                          fontSize: '14px', 
                          lineHeight: 1.4,
                          color: theme === 'dark' ? '#ffffff' : '#0f172a'
                        }}>
                          {cert.name}
                        </p>
                        <p style={{ 
                          fontSize: '12px', 
                          marginTop: '2px',
                          color: theme === 'dark' ? '#818cf8' : '#4f46e5'
                        }}>
                          {cert.source}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className={`text-xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skillCategory) => (
                <div key={skillCategory.id}>
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    {skillCategory.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                          theme === 'dark' 
                            ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
