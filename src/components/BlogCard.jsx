import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'

function BlogCard({ post }) {
  const { theme } = useTheme()

  return (
    <Link to={`/blog/${post.slug}`}>
      <div 
        className={`rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
          theme === 'dark' 
            ? 'bg-slate-800 border border-slate-700 hover:border-indigo-500' 
            : 'bg-white border border-slate-200 hover:border-indigo-400 shadow-sm'
        }`}
      >
        {/* Card Image/Emoji Header */}
        <div 
          className="h-40 relative overflow-hidden flex items-center justify-center"
          style={{ 
            background: post.image ? 'transparent' : `linear-gradient(135deg, ${post.color || '#6366f1'}, ${post.colorEnd || '#22d3ee'})`
          }}
        >
          {post.image ? (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl">{post.emoji}</span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="px-2.5 py-1 text-xs font-medium rounded-full text-white"
              style={{ backgroundColor: post.color }}
            >
              {post.category}
            </span>
            <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {post.date}
            </span>
          </div>

          <h3 className={`text-lg font-bold mb-2 group-hover:text-indigo-500 transition-colors line-clamp-2 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {post.title}
          </h3>

          <p className={`text-sm mb-4 leading-relaxed line-clamp-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {post.excerpt}
          </p>

          <span className="text-sm font-medium text-indigo-500 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
