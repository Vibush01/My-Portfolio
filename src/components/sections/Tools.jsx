import useTheme from '../../hooks/useTheme'
import { useData } from '../../context/DataContext'
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
  SiGoogleanalytics,
  SiGooglegemini,
  SiClaude,
  SiJavascript,
  SiDocker,
  SiPostman,
  SiMysql
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { FaAws, FaBolt, FaLinux, FaGitAlt } from 'react-icons/fa'

function Tools() {
  const { theme } = useTheme()
  const { data } = useData()
  const toolsWithIcons = data?.tools || []

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
    'React.Js': SiReact,
    'Node.js': SiNodedotjs,
    'MongoDB': SiMongodb,
    'Tailwind CSS': SiTailwindcss,
    'Hono': FaBolt,
    'TypeScript': SiTypescript,
    'Express.js': SiExpress,
    'Firebase': SiFirebase,
    'AWS': FaAws,
    'Vercel': SiVercel,
    'GitHub': SiGithub,
    'Claude AI': SiClaude,
    'Gemini': SiGooglegemini,
    'ChatGPT': SiOpenai,
    'Google Analytics': SiGoogleanalytics,
    'JavaScript': SiJavascript,
    'Redux Toolkit': SiReact,
    'Docker': SiDocker,
    'Linux': FaLinux,
    'Git': FaGitAlt,
    'Postman':SiPostman,
    'MySQL' : SiMysql
  }

  // Tools that need black color in light mode (white icons)
  const whiteIcons = ['Vercel', 'GitHub', 'Notion']

  const getIcon = (tool) => {
    // 1. Check if it's a known react-icon mapping
    const IconComponent = iconComponents[tool.name]
    if (IconComponent) {
      // Use black color for white icons in light mode
      const iconColor = whiteIcons.includes(tool.name) && theme === 'light' 
        ? '#1e293b' 
        : tool.color
      return <IconComponent className="w-10 h-10" style={{ color: iconColor }} />
    }
    
    // 2. Check if the user provided an Image URL (starts with http or /)
    if (tool.icon.startsWith('http') || tool.icon.startsWith('/')) {
      return <img src={tool.icon} alt={tool.name} className="w-10 h-10 object-contain" />
    }
    
    // 3. Fallback to emoji/text
    return <span className="text-4xl">{tool.icon}</span>
  }

  return (
    <section 
      id="tools" 
      className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Tools & Tech Stack
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Software and technologies I use on a daily basis
          </p>
        </div>

        <div className="space-y-16">
          {toolsWithIcons.map((toolCategory) => (
            <div key={toolCategory.id}>
              {/* Category Title */}
              <h3 className={`text-sm font-medium uppercase tracking-widest mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {toolCategory.category}
              </h3>
              
              {/* Tools Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {toolCategory.items.map((tool, index) => (
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
