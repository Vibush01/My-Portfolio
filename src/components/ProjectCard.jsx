import useTheme from '../hooks/useTheme'

function ProjectCard({ project }) {
  const { theme } = useTheme()

  return (
    <div 
      className={`rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
        theme === 'dark' 
          ? 'bg-slate-800 border border-slate-700 hover:border-indigo-500' 
          : 'bg-white border border-slate-200 hover:border-indigo-400 shadow-sm'
      }`}
    >
      {/* Project Image with gradient */}
      <div 
        className="h-44 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${project.gradient?.[0] || '#6366f1'}, ${project.gradient?.[1] || '#22d3ee'})`
        }}
      >
        {/* Letter Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold text-white/20 select-none">
            {project.title.charAt(0)}
          </span>
        </div>
        
        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/20 hover:bg-white/40 hover:scale-110 transition-all duration-200"
              title="View Source Code"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          {project.live && project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/20 hover:bg-white/40 hover:scale-110 transition-all duration-200"
              title="View Live Demo"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`text-lg font-bold mb-1 group-hover:text-indigo-500 transition-colors ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {project.title}
        </h3>
        <p className="text-xs font-medium mb-2 uppercase tracking-wide text-cyan-500">
          {project.subtitle}
        </p>
        <p className={`text-sm mb-4 leading-relaxed line-clamp-2 ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, index) => (
            <span 
              key={index} 
              className={`px-2 py-0.5 text-xs rounded-full ${
                theme === 'dark' 
                  ? 'bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-500 text-white">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
