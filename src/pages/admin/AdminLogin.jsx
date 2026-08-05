import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 relative overflow-hidden ${
      theme === 'dark' ? 'bg-black' : 'bg-slate-50'
    }`}>
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-float ${
            theme === 'dark' ? 'bg-indigo-500/15' : 'bg-indigo-500/10'
          }`}
          style={{ animationDuration: '8s' }}
        />
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-float ${
            theme === 'dark' ? 'bg-cyan-500/15' : 'bg-cyan-500/10'
          }`}
          style={{ animationDuration: '6s', animationDelay: '2s' }}
        />
      </div>

      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl relative z-10 ${
        theme === 'dark' 
          ? 'bg-neutral-950/80 border border-neutral-800 backdrop-blur-xl' 
          : 'bg-white/80 border border-slate-200 backdrop-blur-xl'
      }`}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className={`text-2xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Welcome back
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>
            Sign in to manage your portfolio
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium flex items-center gap-2 justify-center">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-neutral-200' : 'text-slate-700'
            }`}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                theme === 'dark' 
                  ? 'bg-black/50 border-neutral-700 text-white placeholder:text-zinc-600 focus:border-indigo-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
              }`}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-neutral-200' : 'text-slate-700'
            }`}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                theme === 'dark' 
                  ? 'bg-black/50 border-neutral-700 text-white placeholder:text-zinc-600 focus:border-indigo-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-6 flex flex-col gap-3 text-center">
          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
            <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>or</span>
            <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-200'}`} />
          </div>

          <button
            onClick={() => {
              loginAsGuest();
              navigate('/admin/dashboard');
            }}
            className={`w-full py-3 rounded-xl font-medium border transition-all hover:-translate-y-0.5 ${
              theme === 'dark'
                ? 'border-neutral-700 text-zinc-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-900'
                : 'border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Explore as Guest
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className={`text-sm font-medium hover:underline mt-2 inline-flex items-center gap-1 justify-center ${
              theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
