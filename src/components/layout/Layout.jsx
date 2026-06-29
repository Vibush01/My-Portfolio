import Navbar from './Navbar'
import Footer from './Footer'
import EndBanner from '../sections/EndBanner'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <EndBanner />
    </div>
  )
}

export default Layout
