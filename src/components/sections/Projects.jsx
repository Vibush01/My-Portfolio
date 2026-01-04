import { Link } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import ProjectCard from '../ProjectCard'
import { projects } from '../../data/projects'

function Projects() {
  const { theme } = useTheme()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)

  return (
    <section 
      id="projects" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Projects
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            A selection of my recent work
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link 
            to="/projects"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border transition-all hover:-translate-y-0.5 ${
              theme === 'dark' 
                ? 'border-slate-700 text-white hover:bg-slate-800' 
                : 'border-slate-300 text-slate-900 hover:bg-slate-50'
            }`}
          >
            See All Projects
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
