import useTheme from '../../hooks/useTheme'
import { useData } from '../../context/DataContext'

function Experience() {
  const { theme } = useTheme()
  const { data } = useData()
  const experience = data?.experience || []


  return (
    <section 
      id="experience" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Experience
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            My professional journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
          }`} />

          {experience.map((exp, index) => (
            <div 
              key={exp.id}
              className={`relative pl-12 md:pl-0 pb-12 last:pb-0 ${
                index % 2 === 0 ? 'md:pr-12 md:ml-0 md:mr-auto md:w-1/2' : 'md:pl-12 md:ml-auto md:w-1/2'
              }`}
            >
              {/* Timeline dot - mobile only: on left line */}
              <div 
                className={`absolute left-2.5 md:hidden w-4 h-4 rounded-full border-4 z-10 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-indigo-500' 
                    : 'bg-white border-indigo-500'
                }`} 
                style={{ top: '1.5rem' }}
              />
              {/* Desktop dot overlay - hidden on mobile, shown on md+ at the correct side */}
              <div 
                className={`absolute hidden md:block w-4 h-4 rounded-full border-4 z-10 ${
                  theme === 'dark' 
                    ? 'bg-slate-900 border-indigo-500' 
                    : 'bg-white border-indigo-500'
                }`} 
                style={{ 
                  top: '1.5rem',
                  ...(index % 2 === 0 ? { right: '-8px' } : { left: '-8px' })
                }}
              />

              {/* Card */}
              <div className={`p-6 rounded-xl text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                theme === 'dark' 
                  ? 'bg-slate-800 border border-slate-700 hover:border-indigo-500/50' 
                  : 'bg-slate-50 border border-slate-200 hover:border-indigo-400/50'
              }`}>
                {/* Type badge + Timeline dates */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-indigo-500/20 text-indigo-400' 
                        : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {exp.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      theme === 'dark'
                        ? 'bg-slate-700 text-slate-400'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {exp.location}
                    </span>
                  </div>
                  <span className={`text-xs font-medium whitespace-nowrap ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>

                {/* Role */}
                <h3 className={`text-lg font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {exp.role}
                </h3>

                {/* Company with link */}
                <a 
                  href={exp.companyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-500 font-medium mb-3 hover:text-indigo-400 transition-colors group"
                >
                  {exp.company}
                  <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                {/* Responsibilities */}
                <ul className={`space-y-2 text-sm ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="leading-relaxed flex gap-2">
                      <span className="text-indigo-500 mt-1 flex-shrink-0">▸</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        theme === 'dark' 
                          ? 'bg-slate-700 text-slate-300' 
                          : 'bg-white text-slate-600 shadow-sm'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
