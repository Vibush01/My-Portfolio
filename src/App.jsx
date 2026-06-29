import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import BlogPage from './pages/BlogPage'
import BlogPost from './pages/BlogPost'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageHero from './pages/admin/ManageHero'
import ManageExperience from './pages/admin/ManageExperience'
import ManageProjects from './pages/admin/ManageProjects'
import ManageSkills from './pages/admin/ManageSkills'
import ManageEducation from './pages/admin/ManageEducation'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        } 
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="hero" element={<ManageHero />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="education" element={<ManageEducation />} />
        <Route path="blog" element={<div className="p-8">Blog Management Coming Soon</div>} />
      </Route>
    </Routes>
  )
}

export default App
