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
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Sidebar */}
      <aside className={`w-64 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out border-r ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Portfolio Admin
            </h2>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive 
                    ? 'bg-indigo-500/10 text-indigo-500' 
                    : theme === 'dark' ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-medium"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-6 border-b ${
          theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
        } backdrop-blur-md sticky top-0 z-40`}>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ☰
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium border truncate max-w-[120px] sm:max-w-xs ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminLayout;
