import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Experience from '../components/sections/Experience'
import Tools from '../components/sections/Tools'
import Projects from '../components/sections/Projects'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'

function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <About />
      <Experience />
      <Tools />
      <Projects />
      <Blog />
      <Contact />
    </div>
  )
}

export default Home
