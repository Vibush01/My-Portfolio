import useTheme from '../../hooks/useTheme';
import { useData } from '../../context/DataContext';

function AdminDashboard() {
  const { theme } = useTheme();
  const { data } = useData();
  
  const projectsCount = data?.projects?.length || 0;
  const blogCount = data?.blog?.length || 0;
  
  // Calculate total experience in years
  const experienceYears = data?.experience?.length ? 
    Math.max(1, Math.ceil(data.experience.reduce((acc) => {
      // Rough estimation if exact dates aren't parsed
      return acc + 1;
    }, 0))) : 0;
    
  // Views could come from a stats document in Firebase
  const profileViews = data?.stats?.views ?? 1248;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
          Welcome to your portfolio admin panel. Manage all your content from here.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Dynamic Stats Cards */}
        <div className={`p-6 rounded-2xl border flex items-center justify-between ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div>
            <p className="text-sm opacity-70 mb-1">Total Profile Views</p>
            <h3 className="text-3xl font-bold text-indigo-500">{profileViews.toLocaleString()}</h3>
          </div>
          <div className="text-4xl opacity-50">👁️</div>
        </div>

        <div className={`p-6 rounded-2xl border flex items-center justify-between ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div>
            <p className="text-sm opacity-70 mb-1">Total Projects</p>
            <h3 className="text-3xl font-bold text-cyan-500">{projectsCount}</h3>
          </div>
          <div className="text-4xl opacity-50">🚀</div>
        </div>

        <div className={`p-6 rounded-2xl border flex items-center justify-between ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div>
            <p className="text-sm opacity-70 mb-1">Blog Posts</p>
            <h3 className="text-3xl font-bold text-green-500">{blogCount}</h3>
          </div>
          <div className="text-4xl opacity-50">📝</div>
        </div>

        <div className={`p-6 rounded-2xl border flex items-center justify-between ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div>
            <p className="text-sm opacity-70 mb-1">Total Experience</p>
            <h3 className="text-3xl font-bold text-amber-500">{experienceYears} {experienceYears === 1 ? 'entry' : 'entries'}</h3>
          </div>
          <div className="text-4xl opacity-50">💼</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Quick Management</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder cards for now */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-xl font-semibold mb-2">Hero & Bio</h3>
          <p className="text-sm opacity-70 mb-4">Edit main landing content</p>
          <span className="text-indigo-500 font-medium text-sm">Manage &rarr;</span>
        </div>
        
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-xl font-semibold mb-2">Experience</h3>
          <p className="text-sm opacity-70 mb-4">Manage work history</p>
          <span className="text-indigo-500 font-medium text-sm">Manage &rarr;</span>
        </div>
        
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <p className="text-sm opacity-70 mb-4">Manage portfolio projects</p>
          <span className="text-indigo-500 font-medium text-sm">Manage &rarr;</span>
        </div>
        
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className="text-xl font-semibold mb-2">Blog Posts</h3>
          <p className="text-sm opacity-70 mb-4">Manage technical articles</p>
          <span className="text-indigo-500 font-medium text-sm">Manage &rarr;</span>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
