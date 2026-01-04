import { Link } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'
import BlogCard from '../BlogCard'
import Button from '../ui/Button'
import { blogPosts } from '../../data/blog'

function Blog() {
  // Show only 3 featured/recent posts on homepage
  const featuredPosts = blogPosts.filter(p => p.featured).slice(0, 3)

  return (
    <section id="blog" className="section">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Blog" 
          subtitle="Thoughts, tutorials, and insights"
        />

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link to="/blog">
            <Button variant="secondary" size="lg">
              See All Articles
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blog
