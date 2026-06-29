import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${
        theme === 'dark' 
          ? 'bg-slate-800 border border-slate-700' 
          : 'bg-white border border-slate-200'
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Admin Login
          </h2>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
            Secure access to portfolio management
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
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
                  ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
              }`}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
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
                  ? 'bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
              }`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-semibold uppercase tracking-wide text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className={`text-sm font-medium hover:underline ${
              theme === 'dark' ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
