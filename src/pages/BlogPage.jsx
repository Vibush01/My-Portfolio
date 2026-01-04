import { Link } from 'react-router-dom'

function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link 
          to="/#blog" 
          className="inline-flex items-center gap-2 mb-8 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Blog</span>
        </h1>
        <p 
          className="text-lg mb-12"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Thoughts, tutorials, and insights
        </p>

        <p style={{ color: 'var(--color-text-muted)' }}>Blog posts will be displayed here...</p>
      </div>
    </div>
  )
}

export default BlogPage
