import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component that resets scroll position on every route change.
 * Uses smooth scrolling animation so the user sees the page glide to the top.
 * 
 * Placed inside the Router but outside Routes so it fires on every navigation.
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Use smooth scroll for a polished transition feel
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export default ScrollToTop
