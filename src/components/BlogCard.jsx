import { Link } from 'react-router-dom'

function BlogCard({ post }) {
  return (
    <div className="card group overflow-hidden" style={{ padding: 0 }}>
      {/* Blog Image Placeholder */}
      <div 
        className="h-48 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${post.color || 'var(--color-primary)'}, ${post.colorEnd || 'var(--color-accent)'})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{post.emoji || '📝'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-3">
          <span 
            className="tag"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            {post.category}
          </span>
          <span 
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h3 
          className="text-xl font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors"
          style={{ color: 'var(--color-text)' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p 
          className="text-sm mb-4 line-clamp-2"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {post.excerpt}
        </p>

        {/* Read More */}
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'var(--color-primary)' }}
        >
          Read More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
