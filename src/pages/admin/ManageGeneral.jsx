import { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

function ManageGeneral() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  const { data, updateData } = useData();
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    bio: '',
    contactEmail: '',
    contactPhone: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
    whatsappUrl: '',
    footerText: ''
  });

  useEffect(() => {
    if (data) {
      setFormData({
        bio: data.general?.bio || "I'm a passionate Full Stack Developer with expertise in building scalable web applications \nusing modern technologies like React 19, TypeScript, Hono, and the MERN stack.\n\nWith experience at HeadStart, Bluestock Fintech, and Agami Technologies, I've developed \nhigh-performance dashboards, real-time systems, secure authentication flows, and enterprise \nloan management systems. I love solving complex problems and creating intuitive user experiences.\n\nWhen I'm not coding, you'll find me exploring new technologies and writing technical blog \nposts.",
        contactEmail: data.general?.contactEmail || 'vibush01@gmail.com',
        contactPhone: data.general?.contactPhone || '+91 7018235639',
        linkedinUrl: data.general?.linkedinUrl || 'https://linkedin.com/in/vibush01',
        githubUrl: data.general?.githubUrl || 'https://github.com/Vibush01',
        twitterUrl: data.general?.twitterUrl || 'https://twitter.com/vibush01',
        whatsappUrl: data.general?.whatsappUrl || 'https://wa.me/917018235639',
        footerText: data.general?.footerText || 'Full Stack Developer with expertise in React, TypeScript, and the MERN stack. I build scalable web applications with a focus on performance and user experience.'
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot save changes.' });
      return;
    }
    
    setStatus({ type: 'loading', message: 'Saving changes...' });

    const result = await updateData('general', formData);
    
    if (result.success) {
      setStatus({ type: 'success', message: 'General settings updated successfully!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleResetViews = async () => {
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot reset views.' });
      return;
    }
    if (confirm("Are you sure you want to reset profile views to 0?")) {
      setStatus({ type: 'loading', message: 'Resetting views...' });
      const result = await updateData('stats', { views: 0 });
      if (result.success) {
        setStatus({ type: 'success', message: 'Views reset to 0!' });
      } else {
        setStatus({ type: 'error', message: result.error });
      }
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">General Settings</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Manage your about bio, contact info, and social links.
          </p>
        </div>
        <button 
          onClick={handleResetViews}
          disabled={isGuest}
          className={`px-4 py-2 rounded-lg font-medium border border-red-500/30 text-red-500 transition-colors ${
            isGuest 
              ? 'opacity-50 cursor-not-allowed bg-slate-500/10' 
              : 'hover:bg-red-500/10'
          }`}
        >
          Reset Profile Views
        </button>
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg mb-6 ${
          status.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
          status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
          'bg-blue-500/10 text-blue-500 border border-blue-500/20'
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* About Section */}
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-4">About Me (Bio)</h2>
          <div>
            <label className="block text-sm font-medium mb-2 opacity-70">
              Who I Am (Supports multiple paragraphs, separate with double line breaks)
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="6"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
              placeholder="I am a passionate Full Stack Developer..."
            />
          </div>
        </div>

        {/* Contact Section */}
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">Contact Phone</label>
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer & Socials Section */}
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-4">Footer & Social Links</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 opacity-70">Footer Short Description</label>
              <input
                type="text"
                name="footerText"
                value={formData.footerText}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-70">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-70">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-70">Twitter/X URL</label>
                <input
                  type="url"
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-70">WhatsApp URL</label>
                <input
                  type="url"
                  name="whatsappUrl"
                  value={formData.whatsappUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isGuest}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
              isGuest 
                ? 'bg-slate-500 cursor-not-allowed opacity-50' 
                : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30'
            }`}
          >
            {isGuest ? 'Disabled (Guest)' : (status.type === 'loading' ? 'Saving...' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageGeneral;
