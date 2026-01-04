import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import SectionTitle from '../components/ui/SectionTitle'
import { projects } from '../data/projects'

function ProjectsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <SectionTitle 
          title="All Projects" 
          subtitle="A complete collection of my work"
          centered={false}
        />

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
