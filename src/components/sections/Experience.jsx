import SectionTitle from '../ui/SectionTitle'
import { experience } from '../../data/experience'

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Experience" 
          subtitle="My professional journey so far"
        />

        <div className="max-w-3xl mx-auto">
          {experience.map((exp, index) => (
            <div 
              key={exp.id}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Timeline line */}
              {index !== experience.length - 1 && (
                <div 
                  className="absolute left-[11px] top-8 bottom-0 w-0.5"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
              )}

              {/* Timeline dot */}
              <div 
                className="absolute left-0 top-2 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-bg)' }}
                />
              </div>

              {/* Content */}
              <div 
                className="card ml-4"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {exp.role}
                    </h3>
                    <a 
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium hover:underline"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {exp.company}
                    </a>
                  </div>
                  <div className="text-right">
                    <p 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {exp.location} • {exp.type}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p 
                  className="mb-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <ul className="space-y-2 mb-4">
                  {exp.responsibilities.map((resp, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      <svg 
                        className="w-4 h-4 flex-shrink-0 mt-1" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tag">
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
