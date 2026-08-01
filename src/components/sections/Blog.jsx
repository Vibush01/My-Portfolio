import { Link } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import SectionTitle from '../SectionTitle'
import BlogCard from '../BlogCard'
import { blogPosts } from '../../data/blog'

function Blog() {
  const { theme } = useTheme()
  const featuredPosts = blogPosts.filter(p => p.featured).slice(0, 3)

  return (
    <section 
      id="blog" 
      className={`py-20 ${theme === 'dark' ? 'bg-neutral-950' : 'bg-slate-50'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle title="Blog" subtitle="Thoughts, tutorials, and insights" />

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post) => (
            <div key={post.id} className="h-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link 
            to="/blog"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border transition-all hover:-translate-y-0.5 ${
              theme === 'dark' 
                ? 'border-neutral-800 text-white hover:bg-neutral-900' 
                : 'border-slate-300 text-slate-900 hover:bg-white'
            }`}
          >
            See All Articles
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blog
