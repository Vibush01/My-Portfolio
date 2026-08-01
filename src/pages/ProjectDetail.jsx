import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useTheme from '../hooks/useTheme'
import { useData } from '../context/DataContext'
import ProjectCard from '../components/ProjectCard'

function ProjectDetail() {
  const { projectId } = useParams()
  const { theme } = useTheme()
  const { data } = useData()
  const projects = data?.projects || []
  
  // Find the project by ID (convert to number for comparison since IDs are numeric)
  const project = projects.find(p => String(p.id) === projectId)
  
  // Get related projects (same tags, excluding current)
  const relatedProjects = project 
    ? projects
        .filter(p => p.id !== project.id)
        .map(p => ({
          ...p,
          relevance: p.tags.filter(t => project.tags.includes(t)).length
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 3)
    : []

  if (!project) {
    return (
      <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center py-20">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Project Not Found
          </h1>
          <p className={`mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition-opacity"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <Helmet>
        <title>{project.title} | Vivek Kumar</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/projects" 
          className={`inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all ${
            theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Hero Image / Gradient */}
        <div 
          className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 relative"
          style={{ 
            background: project.image 
              ? 'transparent' 
              : `linear-gradient(135deg, ${project.gradient?.[0] || '#6366f1'}, ${project.gradient?.[1] || '#22d3ee'})`
          }}
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-bold text-white/20 select-none">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-indigo-500/80 backdrop-blur-md rounded-lg shadow border border-indigo-400/30">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-widest text-cyan-500 mb-2">
            {project.subtitle}
          </p>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {project.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className={`px-3 py-1 text-sm font-medium rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-neutral-900 text-neutral-200 border border-neutral-800' 
                    : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border transition-all hover:-translate-y-0.5 ${
                  theme === 'dark'
                    ? 'border-neutral-700 text-white hover:bg-neutral-900'
                    : 'border-slate-300 text-slate-900 hover:bg-slate-100'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className={`mb-10 ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`} />

        {/* Description */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            About This Project
          </h2>
          <p className={`text-lg leading-relaxed ${
            theme === 'dark' ? 'text-neutral-200' : 'text-slate-700'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Features List */}
        {project.features && project.features.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Key Features
            </h2>
            <div className="grid gap-4">
              {project.features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:-translate-y-0.5 ${
                    theme === 'dark' 
                      ? 'bg-neutral-950 border-neutral-800 hover:border-indigo-500/40' 
                      : 'bg-white border-slate-200 hover:border-indigo-400/40 shadow-sm'
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className={`text-base leading-relaxed pt-1 ${
                    theme === 'dark' ? 'text-neutral-200' : 'text-slate-700'
                  }`}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all hover:scale-105 ${
                  theme === 'dark' 
                    ? 'bg-neutral-950 border-neutral-800 text-indigo-400' 
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className={`mt-16 pt-12 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`}>
            <h2 className={`text-2xl font-bold mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Related Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject) => (
                <div key={relatedProject.id}>
                  <ProjectCard project={relatedProject} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
