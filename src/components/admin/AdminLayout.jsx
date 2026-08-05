import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';

function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: '📊' },
    { name: 'General Settings', path: '/admin/general', icon: '⚙️' },
    { name: 'Hero & Bio', path: '/admin/hero', icon: '👋' },
    { name: 'Experience', path: '/admin/experience', icon: '💼' },
    { name: 'Projects', path: '/admin/projects', icon: '🚀' },
    { name: 'Skills & Tools', path: '/admin/skills', icon: '🛠️' },
    { name: 'Education & Certs', path: '/admin/education', icon: '🎓' },
    { name: 'Blog Posts', path: '/admin/blog', icon: '📝' },
  ];

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out border-r ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-slate-200'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 pb-4">
            <h2 className="text-xl font-bold gradient-text">
              Portfolio Admin
            </h2>
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>
              Content Management
            </p>
          </div>
          
          {/* Gradient divider */}
          <div className="section-divider mx-4" />
          
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? theme === 'dark'
                      ? 'bg-indigo-500/15 text-indigo-400 shadow-sm shadow-indigo-500/10'
                      : 'bg-indigo-50 text-indigo-600 shadow-sm'
                    : theme === 'dark' 
                      ? 'hover:bg-neutral-900 text-zinc-400 hover:text-white' 
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className={`p-3 border-t ${theme === 'dark' ? 'border-neutral-800' : 'border-slate-200'}`}>
            <button 
              onClick={() => navigate('/')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-zinc-400 hover:bg-neutral-900 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <span className="text-base">🌐</span> View Portfolio
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-all text-sm font-medium"
            >
              <span className="text-base">🚪</span> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Header */}
        <header className={`h-14 flex items-center justify-between px-6 border-b ${
          theme === 'dark' ? 'bg-black/90 border-neutral-800' : 'bg-white/90 border-slate-200'
        } backdrop-blur-xl sticky top-0 z-40`}>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-neutral-900 text-zinc-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all hover:scale-105 ${
                theme === 'dark' ? 'hover:bg-neutral-900 text-zinc-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className={`px-3 py-1.5 rounded-lg text-xs font-medium border truncate max-w-[140px] sm:max-w-xs ${
              theme === 'dark' ? 'bg-neutral-900 border-neutral-800 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              {currentUser?.email}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminLayout;
