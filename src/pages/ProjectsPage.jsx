import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function ProjectsPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/#projects" 
          className={`inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all ${
            theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        {/* Title */}
        <div className="mb-12">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            All Projects
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            A complete collection of my work
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
