import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Suspense, lazy, useMemo } from 'react'
import { blogPosts } from '../data/blog'

// MDX Components for styling
const mdxComponents = {
  h1: (props) => (
    <h1 
      className="text-4xl font-bold mb-6 mt-8"
      style={{ color: 'var(--color-text)' }}
      {...props} 
    />
  ),
  h2: (props) => (
    <h2 
      className="text-2xl font-bold mb-4 mt-8"
      style={{ color: 'var(--color-text)' }}
      {...props} 
    />
  ),
  h3: (props) => (
    <h3 
      className="text-xl font-bold mb-3 mt-6"
      style={{ color: 'var(--color-text)' }}
      {...props} 
    />
  ),
  p: (props) => (
    <p 
      className="mb-4 leading-relaxed"
      style={{ color: 'var(--color-text-secondary)' }}
      {...props} 
    />
  ),
  ul: (props) => (
    <ul 
      className="list-disc list-inside mb-4 space-y-2"
      style={{ color: 'var(--color-text-secondary)' }}
      {...props} 
    />
  ),
  ol: (props) => (
    <ol 
      className="list-decimal list-inside mb-4 space-y-2"
      style={{ color: 'var(--color-text-secondary)' }}
      {...props} 
    />
  ),
  li: (props) => (
    <li className="ml-4" {...props} />
  ),
  code: (props) => {
    // Inline code
    if (!props.className) {
      return (
        <code 
          className="px-2 py-1 rounded text-sm font-mono"
          style={{ 
            backgroundColor: 'var(--color-surface-hover)',
            color: 'var(--color-primary)'
          }}
          {...props} 
        />
      )
    }
    return <code {...props} />
  },
  pre: (props) => (
    <pre 
      className="p-4 rounded-lg overflow-x-auto mb-6 text-sm"
      style={{ 
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)'
      }}
      {...props} 
    />
  ),
  blockquote: (props) => (
    <blockquote 
      className="border-l-4 pl-4 italic mb-4"
      style={{ 
        borderColor: 'var(--color-primary)',
        color: 'var(--color-text-muted)'
      }}
      {...props} 
    />
  ),
  a: (props) => (
    <a 
      className="underline hover:no-underline"
      style={{ color: 'var(--color-primary)' }}
      {...props} 
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-6">
      <table 
        className="w-full border-collapse"
        style={{ border: '1px solid var(--color-border)' }}
        {...props} 
      />
    </div>
  ),
  th: (props) => (
    <th 
      className="p-3 text-left font-semibold"
      style={{ 
        backgroundColor: 'var(--color-surface-hover)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)'
      }}
      {...props} 
    />
  ),
  td: (props) => (
    <td 
      className="p-3"
      style={{ 
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-secondary)'
      }}
      {...props} 
    />
  ),
  strong: (props) => (
    <strong style={{ color: 'var(--color-text)' }} {...props} />
  ),
  hr: () => (
    <hr 
      className="my-8" 
      style={{ borderColor: 'var(--color-border)' }} 
    />
  ),
}

// Dynamic import for MDX files
const blogModules = import.meta.glob('../content/blog/*.mdx')

function BlogPost() {
  const { slug } = useParams()
  
  // Find the post metadata
  const post = blogPosts.find(p => p.slug === slug)
  
  // Dynamically load the MDX component
  const MDXContent = useMemo(() => {
    const modulePath = `../content/blog/${slug}.mdx`
    if (blogModules[modulePath]) {
      return lazy(blogModules[modulePath])
    }
    return null
  }, [slug])

  if (!post) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            Post Not Found
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link 
            to="/blog" 
            className="btn btn-primary mt-6 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        
        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="text-4xl"
            >
              {post.emoji}
            </span>
            <span 
              className="tag"
              style={{ 
                backgroundColor: post.color,
                color: 'white'
              }}
            >
              {post.category}
            </span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            {post.title}
          </h1>
          
          <div 
            className="flex items-center gap-4 text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>
        
        {/* Post Content */}
        <article className="prose-custom">
          <MDXProvider components={mdxComponents}>
            <Suspense 
              fallback={
                <div 
                  className="animate-pulse space-y-4"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <div className="h-4 bg-current opacity-20 rounded w-3/4"></div>
                  <div className="h-4 bg-current opacity-20 rounded w-full"></div>
                  <div className="h-4 bg-current opacity-20 rounded w-5/6"></div>
                </div>
              }
            >
              {MDXContent ? (
                <MDXContent />
              ) : (
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Content coming soon...
                </p>
              )}
            </Suspense>
          </MDXProvider>
        </article>

        {/* Post Footer */}
        <footer 
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Written by
              </p>
              <p 
                className="font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                Vivek Kumar
              </p>
            </div>
            <Link to="/blog" className="btn btn-secondary">
              More Articles
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default BlogPost
