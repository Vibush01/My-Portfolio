import { Link } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'
import ProjectCard from '../ProjectCard'
import Button from '../ui/Button'
import { projects } from '../../data/projects'

function Projects() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6)

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Projects" 
          subtitle="A selection of my recent work"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link to="/projects">
            <Button variant="secondary" size="lg">
              See All Projects
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
