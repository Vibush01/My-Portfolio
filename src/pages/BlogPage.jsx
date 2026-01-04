import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data/blog'

function BlogPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/#blog" 
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
            Blog
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Thoughts, tutorials, and insights from my journey as a developer
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
