import { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { uploadToCloudinary } from '../../utils/uploadFile';

function ManageHero() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  const { data, updateData } = useData();
  
  const [formData, setFormData] = useState({
    name: '', roles: '', bio: '', email: '', github: '', linkedin: '', resumeUrl: '', profileImageUrl: ''
  });
  
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const [status, setStatus] = useState({ type: '', message: '' });

  // Sync with global data
  useEffect(() => {
    if (data && data.hero) {
      setFormData(prev => ({ ...prev, ...data.hero }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, setFile) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot save changes.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Saving changes and uploading files (this may take a moment)...' });
    
    let updatedData = { ...formData };

    try {
      if (resumeFile) {
        updatedData.resumeUrl = await uploadToCloudinary(resumeFile);
      }
      if (profileImageFile) {
        updatedData.profileImageUrl = await uploadToCloudinary(profileImageFile);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'File upload failed: ' + err.message });
      return;
    }
    
    const result = await updateData('hero', updatedData);
    
    if (result.success) {
      setStatus({ type: 'success', message: 'Hero & Bio updated successfully!' });
      setResumeFile(null);
      setProfileImageFile(null);
      // reset file inputs visually if needed, though they are uncontrolled.
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } else {
      setStatus({ type: 'error', message: result.error || 'Failed to save data.' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Hero & Bio</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Update your main landing page content and personal details.
          </p>
        </div>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${
          status.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
          status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
          'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Contact Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 opacity-80">Roles (Comma separated for typing effect)</label>
            <input
              type="text"
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 opacity-80">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 resize-none ${
                theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
              }`}
              required
            />
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-6">Social Links</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-6">Assets (Uploads)</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">
                Upload New Resume (PDF)
                {formData.resumeUrl && <span className="text-green-500 ml-2 text-xs">(Currently uploaded)</span>}
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileChange(e, setResumeFile)}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
              />
              <p className="text-xs mt-2 opacity-60">Leave empty to keep existing resume.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">
                Upload Profile Image (PNG/JPG/WEBP)
                {formData.profileImageUrl && <span className="text-green-500 ml-2 text-xs">(Currently uploaded)</span>}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setProfileImageFile)}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/30 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-600 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'
                } file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100`}
              />
              <p className="text-xs mt-2 opacity-60">Leave empty to keep existing image.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status.type === 'loading' || isGuest}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
              isGuest 
                ? 'bg-slate-500 cursor-not-allowed opacity-50' 
                : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30'
            }`}
          >
            {isGuest ? 'Disabled in Guest Mode' : status.type === 'loading' ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageHero;
