import { Link, useParams } from 'react-router-dom'

function BlogPost() {
  const { slug } = useParams()

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 mb-8 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        
        <article>
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            Blog Post: {slug}
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Blog content will be rendered here...
          </p>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
