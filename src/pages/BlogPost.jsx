import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Suspense, lazy, useMemo } from 'react'
import useTheme from '../hooks/useTheme'
import { blogPosts } from '../data/blog'

// MDX Components for styling
const createMdxComponents = (theme) => ({
  // Hide h1 since we render the title from metadata
  h1: () => null,
  h2: (props) => (
    <h2 
      className={`text-2xl font-bold mb-4 mt-10 pb-2 border-b ${
        theme === 'dark' ? 'text-white border-slate-700' : 'text-slate-900 border-slate-200'
      }`}
      {...props} 
    />
  ),
  h3: (props) => (
    <h3 
      className={`text-xl font-bold mb-3 mt-8 ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      }`}
      {...props} 
    />
  ),
  p: (props) => (
    <p 
      className={`mb-4 leading-relaxed text-base ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}
      {...props} 
    />
  ),
  ul: (props) => (
    <ul 
      className={`list-disc pl-6 mb-6 space-y-2 ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}
      {...props} 
    />
  ),
  ol: (props) => (
    <ol 
      className={`list-decimal pl-6 mb-6 space-y-2 ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}
      {...props} 
    />
  ),
  li: (props) => (
    <li className="leading-relaxed" {...props} />
  ),
  code: (props) => {
    // Inline code
    if (!props.className) {
      return (
        <code 
          className={`px-2 py-1 rounded text-sm font-mono ${
            theme === 'dark' 
              ? 'bg-indigo-500/20 text-indigo-300' 
              : 'bg-slate-100 text-indigo-600'
          }`}
          {...props} 
        />
      )
    }
    // Code inside pre blocks
    return (
      <code 
        className={`text-sm font-mono ${
          theme === 'dark' ? 'text-emerald-400' : 'text-slate-700'
        }`}
        {...props} 
      />
    )
  },
  pre: (props) => (
    <pre 
      className={`p-5 rounded-xl overflow-x-auto mb-6 text-sm font-mono leading-relaxed ${
        theme === 'dark' 
          ? 'bg-slate-950 border border-slate-800 text-slate-200' 
          : 'bg-slate-50 border border-slate-200'
      }`}
      {...props} 
    />
  ),
  blockquote: (props) => (
    <blockquote 
      className={`border-l-4 pl-4 py-2 italic mb-6 border-indigo-500 ${
        theme === 'dark' ? 'text-slate-400 bg-slate-800/50' : 'text-slate-500 bg-slate-50'
      }`}
      {...props} 
    />
  ),
  a: (props) => (
    <a 
      className="underline hover:no-underline font-medium text-indigo-500"
      target="_blank"
      rel="noopener noreferrer"
      {...props} 
    />
  ),
  table: (props) => (
    <div className={`overflow-x-auto mb-8 rounded-lg border ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    }`}>
      <table className="w-full border-collapse min-w-full" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'} {...props} />
  ),
  tbody: (props) => (
    <tbody {...props} />
  ),
  tr: (props) => (
    <tr className={`border-b ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    }`} {...props} />
  ),
  th: (props) => (
    <th className={`p-4 text-left font-semibold text-sm ${
      theme === 'dark' ? 'text-white' : 'text-slate-900'
    }`} {...props} />
  ),
  td: (props) => (
    <td className={`p-4 text-sm ${
      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
    }`} {...props} />
  ),
  strong: (props) => (
    <strong className={`font-semibold ${
      theme === 'dark' ? 'text-white' : 'text-slate-900'
    }`} {...props} />
  ),
  em: (props) => (
    <em className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} {...props} />
  ),
  hr: ({ theme }) => (
    <hr className={`my-10 ${
      theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
    }`} />
  ),
})

// Dynamic import for MDX files
const blogModules = import.meta.glob('../content/blog/*.mdx')

function BlogPost() {
  const { slug } = useParams()
  const { theme } = useTheme()
  
  // Find the post metadata
  const post = blogPosts.find(p => p.slug === slug)
  
  // Create themed MDX components
  const mdxComponents = useMemo(() => createMdxComponents(theme), [theme])
  
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
      <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Post Not Found
          </h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link 
            to="/blog" 
            className="mt-6 inline-block px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-cyan-500"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className={`inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all ${
            theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
        
        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{post.emoji}</span>
            <span 
              className="px-3 py-1 text-sm font-medium rounded-full text-white"
              style={{ backgroundColor: post.color }}
            >
              {post.category}
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {post.title}
          </h1>
          
          <div className={`flex items-center gap-4 text-sm ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>
        
        {/* Post Content */}
        <article>
          <MDXProvider components={mdxComponents}>
            <Suspense 
              fallback={
                <div className="animate-pulse space-y-4">
                  <div className={`h-4 rounded w-3/4 ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                  }`} />
                  <div className={`h-4 rounded w-full ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                  }`} />
                  <div className={`h-4 rounded w-5/6 ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                  }`} />
                </div>
              }
            >
              {MDXContent ? (
                <MDXContent />
              ) : (
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                  Content coming soon...
                </p>
              )}
            </Suspense>
          </MDXProvider>
        </article>

        {/* Post Footer */}
        <footer className={`mt-12 pt-8 border-t ${
          theme === 'dark' ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Written by
              </p>
              <p className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Vivek Kumar
              </p>
            </div>
            <Link 
              to="/blog" 
              className={`px-4 py-2 rounded-lg font-medium border transition-all ${
                theme === 'dark' 
                  ? 'border-slate-600 text-white hover:bg-slate-800' 
                  : 'border-slate-300 text-slate-900 hover:bg-slate-100'
              }`}
            >
              More Articles
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default BlogPost
