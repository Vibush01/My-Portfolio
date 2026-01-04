import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import SectionTitle from '../components/ui/SectionTitle'
import { blogPosts } from '../data/blog'

function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/#blog" 
          className="inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <SectionTitle 
          title="Blog" 
          subtitle="Thoughts, tutorials, and insights from my journey as a developer"
          centered={false}
        />

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
