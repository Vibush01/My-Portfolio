import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';

function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleLogout() {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  }

  return (
    <div className={`min-h-screen p-8 ${
      theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
              Logged in as: {currentUser?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className={`px-6 py-2.5 rounded-lg font-medium border transition-colors ${
              theme === 'dark'
                ? 'border-slate-700 hover:bg-slate-800'
                : 'border-slate-300 hover:bg-white'
            }`}
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Placeholder cards for now */}
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p className="text-sm opacity-70 mb-4">Manage your work history</p>
            <button className="text-indigo-500 font-medium text-sm hover:underline">Manage &rarr;</button>
          </div>
          
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className="text-sm opacity-70 mb-4">Manage your portfolio projects</p>
            <button className="text-indigo-500 font-medium text-sm hover:underline">Manage &rarr;</button>
          </div>
          
          <div className={`p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Blog Posts</h3>
            <p className="text-sm opacity-70 mb-4">Manage your technical articles</p>
            <button className="text-indigo-500 font-medium text-sm hover:underline">Manage &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
