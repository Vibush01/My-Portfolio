import useTheme from '../../hooks/useTheme'
import { skills, education, certifications } from '../../data/skills'

function About() {
  const { theme } = useTheme()

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
              <p>
                I'm a passionate Full Stack Developer with expertise in building scalable web applications 
                using modern technologies like React 19, TypeScript, Hono, and the MERN stack.
              </p>
              <p>
                With experience at Headstart and Bluestock Fintech, I've developed high-performance 
                dashboards, real-time systems, and secure authentication flows. I love solving complex 
                problems and creating intuitive user experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies, writing technical blog 
                posts, or contributing to open-source projects.
              </p>
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

            {/* Certifications */}
            <div className="mt-6">
              <h4 className={`text-lg font-bold mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1.5 text-sm rounded-full ${
                      theme === 'dark' 
                        ? 'bg-indigo-500/20 text-indigo-400' 
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {cert}
                  </span>
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
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category}>
                  <h4 className={`text-sm font-medium uppercase tracking-wide mb-3 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <span 
                        key={index}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          theme === 'dark' 
                            ? 'bg-slate-900 text-slate-300 hover:bg-slate-700' 
                            : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
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
