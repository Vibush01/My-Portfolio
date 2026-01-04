import useTheme from '../../hooks/useTheme'
import { experience } from '../../data/experience'

function Experience() {
  const { theme } = useTheme()

  return (
    <section 
      id="experience" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}
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
          <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
          }`} />

          {experience.map((exp, index) => (
            <div 
              key={index}
              className={`relative pl-8 md:pl-0 pb-12 last:pb-0 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-0 md:mr-auto md:w-1/2' : 'md:pl-8 md:ml-auto md:w-1/2'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-0 md:left-1/2 top-1 w-4 h-4 rounded-full -translate-x-1/2 border-4 ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-indigo-500' 
                  : 'bg-white border-indigo-500'
              }`} />

              {/* Card */}
              <div className={`p-6 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white border border-slate-200 shadow-sm'
              }`}>
                <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    theme === 'dark' 
                      ? 'bg-indigo-500/20 text-indigo-400' 
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {exp.type}
                  </span>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {exp.dates}
                  </span>
                </div>

                <h3 className={`text-lg font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {exp.role}
                </h3>
                <p className="text-indigo-500 font-medium mb-3">{exp.company}</p>

                <ul className={`space-y-2 text-sm ${index % 2 === 0 ? 'md:text-right' : ''} ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="leading-relaxed">• {resp}</li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className={`flex flex-wrap gap-1.5 mt-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        theme === 'dark' 
                          ? 'bg-slate-700 text-slate-300' 
                          : 'bg-slate-100 text-slate-600'
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
