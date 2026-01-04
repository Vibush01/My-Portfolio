import { Link } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'
import BlogCard from '../BlogCard'
import Button from '../ui/Button'

// Sample blog posts (will be replaced with MDX later)
const blogPosts = [
  {
    id: 1,
    slug: 'building-scalable-react-apps',
    title: 'Building Scalable React Applications with Modern Patterns',
    excerpt: 'Learn the best practices and patterns for building large-scale React applications that are maintainable and performant.',
    category: 'React',
    date: 'Dec 28, 2025',
    emoji: '⚛️',
    color: '#61dafb',
    colorEnd: '#21a1f1'
  },
  {
    id: 2,
    slug: 'hono-vs-express',
    title: 'Hono vs Express: Why I Switched to Hono for Backend APIs',
    excerpt: 'A comparison of Hono and Express.js, exploring performance, DX, and why Hono might be the better choice for modern APIs.',
    category: 'Backend',
    date: 'Dec 20, 2025',
    emoji: '🔥',
    color: '#ff6b35',
    colorEnd: '#f7931e'
  },
  {
    id: 3,
    slug: 'mastering-jwt-authentication',
    title: 'Mastering JWT Authentication in Full Stack Applications',
    excerpt: 'A comprehensive guide to implementing secure JWT authentication with refresh tokens, best practices, and common pitfalls.',
    category: 'Security',
    date: 'Dec 15, 2025',
    emoji: '🔐',
    color: '#6366f1',
    colorEnd: '#8b5cf6'
  }
]

function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container mx-auto px-6">
        <SectionTitle 
          title="Blog" 
          subtitle="Thoughts, tutorials, and insights"
        />

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post) => (
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
