import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { experience as initialData } from '../../data/experience';

function ManageExperience() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  
  // Local state for mocking data until Firebase is connected
  const [experiences, setExperiences] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [formData, setFormData] = useState({
    role: '', company: '', companyUrl: '', location: '', type: '', 
    startDate: '', endDate: '', description: '', responsibilities: [''], technologies: ''
  });

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({
      ...exp,
      responsibilities: exp.responsibilities.length ? [...exp.responsibilities] : [''],
      technologies: exp.technologies.join(', ')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      role: '', company: '', companyUrl: '', location: '', type: '', 
      startDate: '', endDate: '', description: '', responsibilities: [''], technologies: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResp = [...formData.responsibilities];
    newResp[index] = value;
    setFormData(prev => ({ ...prev, responsibilities: newResp }));
  };

  const addResponsibility = () => {
    setFormData(prev => ({ ...prev, responsibilities: [...prev.responsibilities, ''] }));
  };

  const removeResponsibility = (index) => {
    const newResp = formData.responsibilities.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, responsibilities: newResp.length ? newResp : [''] }));
  };

  const handleDelete = (id) => {
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot delete entries.' });
      return;
    }
    setExperiences(experiences.filter(exp => exp.id !== id));
    setStatus({ type: 'success', message: 'Experience deleted successfully!' });
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot save changes.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Saving changes...' });
    
    setTimeout(() => {
      const techArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
      const respArray = formData.responsibilities.filter(r => r.trim());

      const finalData = {
        ...formData,
        technologies: techArray,
        responsibilities: respArray,
        id: editingId || Date.now()
      };

      if (editingId) {
        setExperiences(experiences.map(exp => exp.id === editingId ? finalData : exp));
      } else {
        setExperiences([finalData, ...experiences]);
      }

      setStatus({ type: 'success', message: 'Experience saved successfully!' });
      handleCancel();
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Experience</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Add, edit, or remove your work history.
          </p>
        </div>
        {!editingId && (
          <button 
            onClick={() => setEditingId('new')}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all"
          >
            + Add New
          </button>
        )}
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

      {/* Editor Form */}
      {editingId && (
        <div className={`p-6 rounded-2xl border mb-8 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-6">{editingId === 'new' ? 'Add New Experience' : 'Edit Experience'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Job Role / Title</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Company Name</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Company URL</label>
                <input type="url" name="companyUrl" value={formData.companyUrl} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 opacity-80">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote" className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 opacity-80">Type</label>
                  <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Internship" className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Start Date</label>
                <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="e.g. Sep 2023" required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">End Date</label>
                <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="e.g. Present" required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Short Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80 flex justify-between items-center">
                <span>Responsibilities</span>
                <button type="button" onClick={addResponsibility} className="text-indigo-500 hover:underline text-xs">+ Add Bullet Point</button>
              </label>
              <div className="space-y-3">
                {formData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={resp} 
                      onChange={(e) => handleResponsibilityChange(index, e.target.value)} 
                      placeholder="Bullet point description..."
                      className={`flex-1 px-4 py-2.5 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} 
                    />
                    <button type="button" onClick={() => removeResponsibility(index)} className="p-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10">🗑️</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Technologies (Comma separated)</label>
              <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="React, Node.js, MongoDB..." className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={handleCancel} className={`px-6 py-2.5 rounded-xl font-medium border ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}>
                Cancel
              </button>
              <button type="submit" disabled={isGuest} className={`px-8 py-2.5 rounded-xl font-semibold text-white transition-all ${isGuest ? 'bg-slate-500 cursor-not-allowed opacity-50' : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30'}`}>
                {status.type === 'loading' ? 'Saving...' : 'Save Experience'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className={`p-5 rounded-xl border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div>
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                {exp.company} • {exp.startDate} - {exp.endDate}
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => handleEdit(exp)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium border transition-colors ${theme === 'dark' ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(exp.id)}
                className="px-4 py-2 rounded-lg font-medium border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageExperience;
