import useTheme from '../../hooks/useTheme';

function AdminDashboard() {
  const { theme } = useTheme();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
          Welcome to your portfolio admin panel. Manage all your content from here.
        </p>
      </div>

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
