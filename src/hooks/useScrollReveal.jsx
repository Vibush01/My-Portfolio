import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal')
          // Optional: stop observing once revealed
          if (!options.persist) {
            observer.unobserve(entry.target)
          }
        } else if (options.persist) {
          entry.target.classList.remove('animate-reveal')
        }
      })
    }, defaultOptions)

    const currentRef = ref.current
    
    if (currentRef) {
      // Check if it's a list container and we want staggered children
      if (options.staggerChildren) {
        const children = currentRef.children
        Array.from(children).forEach((child, index) => {
          child.style.setProperty('--delay', `${index * 100}ms`)
          observer.observe(child)
        })
      } else {
        observer.observe(currentRef)
      }
    }

    return () => {
      if (currentRef) {
        if (options.staggerChildren) {
          const children = currentRef.children
          Array.from(children).forEach((child) => {
            observer.unobserve(child)
          })
        } else {
          observer.unobserve(currentRef)
        }
      }
    }
  }, [options.staggerChildren, options.persist, options.threshold, options.rootMargin])

  return ref
}

export default useScrollReveal
