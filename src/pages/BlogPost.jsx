import { Link, useParams } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { Suspense, lazy, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import useTheme from '../hooks/useTheme'
import { useData } from '../context/DataContext'
import BlogCard from '../components/BlogCard'

// MDX Components for styling — optimized for readability
const createMdxComponents = (theme) => ({
  // Hide h1 since we render the title from metadata
  h1: () => null,
  h2: (props) => (
    <h2 
      className={`text-2xl md:text-3xl font-bold mb-4 mt-12 pb-3 border-b ${
        theme === 'dark' ? 'text-white border-neutral-800' : 'text-slate-900 border-slate-200'
      }`}
      {...props} 
    />
  ),
  h3: (props) => (
    <h3 
      className={`text-xl md:text-2xl font-bold mb-3 mt-10 ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      }`}
      {...props} 
    />
  ),
  h4: (props) => (
    <h4 
      className={`text-lg font-bold mb-2 mt-8 ${
        theme === 'dark' ? 'text-neutral-200' : 'text-slate-800'
      }`}
      {...props} 
    />
  ),
  p: (props) => (
    <p 
      className={`mb-6 text-lg leading-[1.85] ${
        theme === 'dark' ? 'text-neutral-300' : 'text-slate-700'
      }`}
      {...props} 
    />
  ),
  ul: (props) => (
    <ul 
      className={`list-disc pl-6 mb-6 space-y-2.5 text-lg leading-relaxed ${
        theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
      }`}
      {...props} 
    />
  ),
  ol: (props) => (
    <ol 
      className={`list-decimal pl-6 mb-6 space-y-2.5 text-lg leading-relaxed ${
        theme === 'dark' ? 'text-neutral-300' : 'text-slate-600'
      }`}
      {...props} 
    />
  ),
  li: (props) => (
    <li className="leading-relaxed pl-1" {...props} />
  ),
  code: (props) => {
    // Inline code
    if (!props.className) {
      return (
        <code 
          className={`px-2 py-1 rounded-md text-[0.9em] font-mono ${
            theme === 'dark' 
              ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20' 
              : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
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
      className={`p-6 rounded-2xl overflow-x-auto mb-8 text-sm font-mono leading-relaxed ${
        theme === 'dark' 
          ? 'bg-neutral-950 border border-neutral-800 text-neutral-200' 
          : 'bg-slate-50 border border-slate-200'
      }`}
      {...props} 
    />
  ),
  blockquote: (props) => (
    <blockquote 
      className={`border-l-4 pl-5 py-3 italic mb-8 rounded-r-lg border-indigo-500 ${
        theme === 'dark' ? 'text-zinc-400 bg-neutral-900/50' : 'text-slate-500 bg-indigo-50/50'
      }`}
      {...props} 
    />
  ),
  a: (props) => (
    <a 
      className="underline decoration-indigo-500/40 underline-offset-4 hover:decoration-indigo-500 font-medium text-indigo-500 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props} 
    />
  ),
  img: (props) => (
    <figure className="mb-8">
      <img 
        className="w-full rounded-2xl shadow-lg"
        loading="lazy"
        {...props} 
      />
      {props.alt && (
        <figcaption className={`text-center text-sm mt-3 ${
          theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'
        }`}>
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  table: (props) => (
    <div className={`overflow-x-auto mb-8 rounded-xl border ${
      theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'
    }`}>
      <table className="w-full border-collapse min-w-full" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className={theme === 'dark' ? 'bg-neutral-900' : 'bg-slate-50'} {...props} />
  ),
  tbody: (props) => (
    <tbody {...props} />
  ),
  tr: (props) => (
    <tr className={`border-b ${
      theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'
    }`} {...props} />
  ),
  th: (props) => (
    <th className={`p-4 text-left font-semibold text-sm ${
      theme === 'dark' ? 'text-white' : 'text-slate-900'
    }`} {...props} />
  ),
  td: (props) => (
    <td className={`p-4 text-sm ${
      theme === 'dark' ? 'text-neutral-200' : 'text-slate-600'
    }`} {...props} />
  ),
  strong: (props) => (
    <strong className={`font-semibold ${
      theme === 'dark' ? 'text-white' : 'text-slate-900'
    }`} {...props} />
  ),
  em: (props) => (
    <em className={theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'} {...props} />
  ),
  hr: () => (
    <hr className={`my-12 ${
      theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'
    }`} />
  ),
})

// Dynamic import for MDX files
const blogModules = import.meta.glob('../content/blog/*.mdx')

// Pre-create lazy components outside render
const lazyBlogPosts = {}
for (const path in blogModules) {
  lazyBlogPosts[path] = lazy(blogModules[path])
}

function BlogPost() {
  const { slug } = useParams()
  const { theme } = useTheme()
  const { data } = useData()
  
  const allBlogPosts = data?.blog || []
  
  // Find the post metadata
  const post = allBlogPosts.find(p => p.slug === slug)
  
  // Get related posts (same category, excluding current, fallback to any)
  const relatedPosts = post
    ? allBlogPosts
        .filter(p => p.slug !== post.slug)
        .map(p => ({
          ...p,
          relevance: p.category === post.category ? 2 : 0
        }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 3)
    : []
  
  // Create themed MDX components
  const mdxComponents = useMemo(() => createMdxComponents(theme), [theme])
  
  // Get the pre-created lazy component for this slug
  const modulePath = `../content/blog/${slug}.mdx`
  const MDXContent = lazyBlogPosts[modulePath] || null

  if (!post) {
    return (
      <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-6 text-center py-20">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Post Not Found
          </h1>
          <p className={`mb-8 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>
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
    <div className={`min-h-screen pt-24 pb-16 ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`}>
      <Helmet>
        <title>{post.title} | Vivek Kumar Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Article Header — Full width hero area */}
      <div className={`pb-12 mb-8 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`}>
        <div className="max-w-3xl mx-auto px-6">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className={`inline-flex items-center gap-2 mb-8 text-sm hover:gap-3 transition-all ${
              theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          {/* Category & Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{post.emoji}</span>
            <span 
              className="px-3 py-1 text-sm font-medium rounded-full text-white"
              style={{ backgroundColor: post.color }}
            >
              {post.category}
            </span>
          </div>
          
          {/* Title */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className={`text-xl leading-relaxed mb-6 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'
          }`}>
            {post.excerpt}
          </p>
          
          {/* Author & Date */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img 
                src={data?.hero?.profileImageUrl || "/profile.webp"} 
                alt="Vivek Kumar"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
              />
              <div>
                <p className={`text-sm font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Vivek Kumar
                </p>
                <div className={`flex items-center gap-3 text-xs ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'
                }`}>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content — Better readability with max-w-3xl and blog-prose */}
      <div className="max-w-3xl mx-auto px-6">
        <article className="blog-prose">
          <MDXProvider components={mdxComponents}>
            <Suspense 
              fallback={
                <div className="animate-pulse space-y-6">
                  <div className={`h-4 rounded w-3/4 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-full ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-5/6 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
                  <div className={`h-32 rounded-2xl w-full ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-full ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
                  <div className={`h-4 rounded w-2/3 ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
                </div>
              }
            >
              {MDXContent ? (
                <MDXContent />
              ) : (
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}>
                  Content coming soon...
                </p>
              )}
            </Suspense>
          </MDXProvider>
        </article>

        {/* Article Footer — Share & Author */}
        <footer className={`mt-16 pt-8 border-t ${
          theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'
        }`}>
          {/* Author Card */}
          <div className={`p-6 rounded-2xl flex items-center gap-5 ${
            theme === 'dark' 
              ? 'bg-neutral-950 border border-neutral-800' 
              : 'bg-white border border-slate-200 shadow-sm'
          }`}>
            <img 
              src={data?.hero?.profileImageUrl || "/profile.webp"} 
              alt="Vivek Kumar"
              className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 flex-shrink-0"
            />
            <div>
              <p className={`font-bold text-lg ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Written by Vivek Kumar
              </p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'
              }`}>
                Full Stack Developer passionate about React, TypeScript, and building scalable web applications.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Related Articles — Full width section */}
      {relatedPosts.length > 0 && (
        <div className={`mt-16 pt-12 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className={`text-2xl font-bold mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id || relatedPost.slug}>
                  <BlogCard post={relatedPost} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogPost
