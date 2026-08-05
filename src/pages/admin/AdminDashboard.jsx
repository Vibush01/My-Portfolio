import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import { useData } from '../../context/DataContext';

function AdminDashboard() {
  const { theme } = useTheme();
  const { data } = useData();
  
  const projectsCount = data?.projects?.length || 0;
  const blogCount = data?.blog?.length || 0;
  
  const experienceYears = data?.experience?.length ? 
    Math.max(1, Math.ceil(data.experience.reduce((acc) => {
      return acc + 1;
    }, 0))) : 0;
    
  const profileViews = data?.stats?.views ?? 1248;

  const stats = [
    { label: 'Profile Views', value: profileViews.toLocaleString(), icon: '👁️', color: 'from-indigo-500 to-violet-500' },
    { label: 'Total Projects', value: projectsCount, icon: '🚀', color: 'from-cyan-500 to-blue-500' },
    { label: 'Blog Posts', value: blogCount, icon: '📝', color: 'from-emerald-500 to-green-500' },
    { label: 'Experience', value: `${experienceYears} ${experienceYears === 1 ? 'entry' : 'entries'}`, icon: '💼', color: 'from-amber-500 to-orange-500' },
  ];

  const quickLinks = [
    { name: 'Hero & Bio', desc: 'Edit main landing content', path: '/admin/hero', icon: '👋' },
    { name: 'Experience', desc: 'Manage work history', path: '/admin/experience', icon: '💼' },
    { name: 'Projects', desc: 'Manage portfolio projects', path: '/admin/projects', icon: '🚀' },
    { name: 'Blog Posts', desc: 'Manage technical articles', path: '/admin/blog', icon: '📝' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className={theme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}>
          Welcome to your portfolio admin panel. Manage all your content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-5 rounded-2xl border relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
              theme === 'dark' ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Gradient accent bar at top */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
            
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${
                  theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'
                }`}>
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                theme === 'dark' ? 'bg-neutral-900' : 'bg-slate-100'
              }`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Management */}
      <h2 className="text-xl font-bold mb-5">Quick Management</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {quickLinks.map((link) => (
          <Link 
            key={link.name}
            to={link.path} 
            className={`group p-5 rounded-2xl border block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              theme === 'dark' ? 'bg-neutral-950 border-neutral-800 hover:border-indigo-500/50' : 'bg-white border-slate-200 hover:border-indigo-400/50'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-slate-100'
            }`}>
              {link.icon}
            </div>
            <h3 className="text-base font-semibold mb-1">{link.name}</h3>
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>{link.desc}</p>
            <span className="text-indigo-500 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              Manage 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
