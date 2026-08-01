import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import useTheme from '../hooks/useTheme'
import { useData } from '../context/DataContext'
import BlogCard from '../components/BlogCard'

function BlogPage() {
  const { theme } = useTheme()
  const { data } = useData()
  const blogPosts = data?.blog || []
  
  // Separate featured post from the rest
  const featuredPost = blogPosts.find(p => p.featured)
  const remainingPosts = blogPosts.filter(p => p !== featuredPost)

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <Helmet>
        <title>Blog | Vivek Kumar</title>
        <meta name="description" content="Articles about web development, engineering, and technology." />
      </Helmet>
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/#blog" 
          className={`inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all ${
            theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
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
          <p className={`text-lg ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>
            Thoughts, tutorials, and insights from my journey as a developer
          </p>
        </div>

        {/* Featured Post — Hero Card */}
        {featuredPost && (
          <Link to={`/blog/${featuredPost.slug}`} className="block mb-12 group">
            <div className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              theme === 'dark' 
                ? 'bg-neutral-950 border-neutral-800 hover:border-indigo-500' 
                : 'bg-white border-slate-200 hover:border-indigo-400 shadow-sm'
            }`}>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div 
                  className="h-56 md:h-full min-h-[240px] flex items-center justify-center"
                  style={{ 
                    background: featuredPost.image ? 'transparent' : `linear-gradient(135deg, ${featuredPost.color || '#6366f1'}, ${featuredPost.colorEnd || '#22d3ee'})`
                  }}
                >
                  {featuredPost.image ? (
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-8xl">{featuredPost.emoji}</span>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-indigo-500 rounded-full">
                      Featured
                    </span>
                    <span 
                      className="px-2.5 py-1 text-xs font-medium rounded-full text-white"
                      style={{ backgroundColor: featuredPost.color }}
                    >
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h2 className={`text-2xl md:text-3xl font-bold mb-3 group-hover:text-indigo-500 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {featuredPost.title}
                  </h2>
                  
                  <p className={`mb-4 leading-relaxed line-clamp-3 ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'
                  }`}>
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className={`flex items-center gap-4 text-sm ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'
                  }`}>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-500 group-hover:gap-3 transition-all">
                    Read Article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Remaining Blog Posts Grid */}
        {remainingPosts.length > 0 && (
          <>
            <h2 className={`text-xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              All Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BlogPage
