import useTheme from '../../hooks/useTheme'
import { toolsWithIcons } from '../../data/skills'
import { 
  SiFigma, 
  SiFramer, 
  SiNotion, 
  SiCanva,
  SiJira,
  SiClickup,
  SiSlack,
  SiZoho,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiExpress,
  SiFirebase,
  SiVercel,
  SiGithub,
  SiOpenai,
  SiGoogleanalytics
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { FaAws, FaBolt, FaRobot, FaStar } from 'react-icons/fa'

function Tools() {
  const { theme } = useTheme()

  // Map all tools to their real icons
  const iconComponents = {
    'Figma': SiFigma,
    'Framer': SiFramer,
    'Notion': SiNotion,
    'Canva': SiCanva,
    'Jira': SiJira,
    'ClickUp': SiClickup,
    'Slack': SiSlack,
    'Zoho': SiZoho,
    'VS Code': VscVscode,
    'React': SiReact,
    'Node.js': SiNodedotjs,
    'MongoDB': SiMongodb,
    'TailwindCSS': SiTailwindcss,
    'Hono': FaBolt,
    'TypeScript': SiTypescript,
    'Express': SiExpress,
    'Firebase': SiFirebase,
    'AWS': FaAws,
    'Vercel': SiVercel,
    'GitHub': SiGithub,
    'Claude AI': FaRobot,
    'Gemini': FaStar,
    'ChatGPT': SiOpenai,
    'Google Analytics': SiGoogleanalytics
  }

  const getIcon = (tool) => {
    const IconComponent = iconComponents[tool.name]
    if (IconComponent) {
      return <IconComponent className="w-10 h-10" style={{ color: tool.color }} />
    }
    return <span className="text-4xl">{tool.icon}</span>
  }

  return (
    <section 
      id="tools" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
          <div>
            <p className={`text-sm font-medium uppercase tracking-widest mb-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Tools
            </p>
            <h2 className={`text-3xl md:text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              THE KEY DESIGN AND<br />
              DEVELOPMENT TOOLS I USE
            </h2>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-12">
          {Object.entries(toolsWithIcons).map(([category, tools]) => (
            <div key={category}>
              {/* Category Title */}
              <h3 className={`text-sm font-medium uppercase tracking-widest mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {category}
              </h3>
              
              {/* Tools Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className={`group relative p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border-slate-700 hover:border-slate-600' 
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                      {getIcon(tool)}
                    </div>
                    
                    {/* Tool Name */}
                    <p className={`text-sm font-medium text-center ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {tool.name}
                    </p>
                    
                    {/* Hover accent bar */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: tool.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tools
