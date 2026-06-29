import { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { uploadToCloudinary } from '../../utils/uploadFile';

function ManageProjects() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  const { data, updateData } = useData();
  
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (data && data.projects) setProjects(data.projects);
  }, [data]);
  
  const [formData, setFormData] = useState({
    title: '', subtitle: '', description: '', image: '', 
    gradientStart: '#3b82f6', gradientEnd: '#2563eb',
    tags: '', features: [''], github: '', live: '', featured: false
  });

  const [imageFile, setImageFile] = useState(null);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      gradientStart: project.gradient[0],
      gradientEnd: project.gradient[1],
      tags: project.tags.join(', '),
      features: project.features?.length ? [...project.features] : ['']
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '', subtitle: '', description: '', image: '', 
      gradientStart: '#3b82f6', gradientEnd: '#2563eb',
      tags: '', features: [''], github: '', live: '', featured: false
    });
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures.length ? newFeatures : [''] }));
  };

  const handleDelete = async (id) => {
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot delete entries.' });
      return;
    }
    
    setStatus({ type: 'loading', message: 'Deleting...' });
    const newProjects = projects.filter(p => p.id !== id);
    
    const result = await updateData('projects', newProjects);
    if (result.success) {
      setStatus({ type: 'success', message: 'Project deleted successfully!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleMove = async (index, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === projects.length - 1)
    ) return;

    setStatus({ type: 'loading', message: 'Reordering...' });
    const newProjects = [...projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newProjects[index], newProjects[targetIndex]] = [newProjects[targetIndex], newProjects[index]];
    
    const result = await updateData('projects', newProjects);
    if (result.success) {
      setStatus({ type: 'success', message: 'Projects reordered!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot save changes.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Saving changes and uploading image...' });
    
    let uploadedImageUrl = formData.image;
    try {
      if (imageFile) {
        uploadedImageUrl = await uploadToCloudinary(imageFile);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Image upload failed: ' + err.message });
      return;
    }
    
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const featuresArray = formData.features.filter(f => f.trim());

    const finalData = {
      id: editingId === 'new' || !editingId ? Date.now() : editingId,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      image: uploadedImageUrl,
      gradient: [formData.gradientStart, formData.gradientEnd],
      tags: tagsArray,
      features: featuresArray,
      github: formData.github || null,
      live: formData.live,
      featured: formData.featured
    };

    let newProjects;
    if (editingId && editingId !== 'new') {
      newProjects = projects.map(p => p.id === editingId ? finalData : p);
    } else {
      newProjects = [finalData, ...projects];
    }

    const result = await updateData('projects', newProjects);
    
    if (result.success) {
      setStatus({ type: 'success', message: 'Project saved successfully!' });
      handleCancel();
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Projects</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Add, edit, or remove projects from your portfolio.
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
          <h2 className="text-xl font-bold mb-6">{editingId === 'new' ? 'Add New Project' : 'Edit Project'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Project Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Subtitle</label>
                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">
                  Project Image
                  {formData.image && !imageFile && <span className="text-green-500 ml-2 text-xs">(Uploaded)</span>}
                </label>
                <div className="space-y-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 text-sm`} 
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-60">OR</span>
                    <input 
                      type="text" 
                      name="image" 
                      value={formData.image} 
                      onChange={handleChange} 
                      placeholder="Paste Image URL" 
                      className={`flex-1 px-3 py-1.5 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 opacity-80">Gradient Start</label>
                  <input type="color" name="gradientStart" value={formData.gradientStart} onChange={handleChange} className={`w-full h-12 px-2 rounded-xl border outline-none cursor-pointer ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 opacity-80">Gradient End</label>
                  <input type="color" name="gradientEnd" value={formData.gradientEnd} onChange={handleChange} className={`w-full h-12 px-2 rounded-xl border outline-none cursor-pointer ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">GitHub Link (optional)</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Live Link</label>
                <input type="url" name="live" value={formData.live} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Tags (Comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="React, Tailwind, Node.js..." required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80 flex justify-between items-center">
                <span>Features List</span>
                <button type="button" onClick={addFeature} className="text-indigo-500 hover:underline text-xs">+ Add Feature</button>
              </label>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={feature} 
                      onChange={(e) => handleFeatureChange(index, e.target.value)} 
                      placeholder="Feature description..."
                      className={`flex-1 px-4 py-2.5 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} 
                    />
                    <button type="button" onClick={() => removeFeature(index)} className="p-2.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10">🗑️</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-indigo-500" />
              <label htmlFor="featured" className="font-medium cursor-pointer">Featured Project (Displays larger badge)</label>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={handleCancel} className={`px-6 py-2.5 rounded-xl font-medium border ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}>
                Cancel
              </button>
              <button type="submit" disabled={isGuest} className={`px-8 py-2.5 rounded-xl font-semibold text-white transition-all ${isGuest ? 'bg-slate-500 cursor-not-allowed opacity-50' : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30'}`}>
                {status.type === 'loading' ? 'Saving...' : 'Save Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className={`p-5 rounded-xl border flex flex-col justify-between ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="mb-4 flex gap-4">
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => handleMove(index, 'up')} 
                  disabled={index === 0}
                  className={`p-1.5 rounded-lg border flex items-center justify-center transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : theme === 'dark' ? 'hover:bg-slate-700 border-slate-700' : 'hover:bg-slate-100 border-slate-200'}`}
                >
                  ↑
                </button>
                <button 
                  onClick={() => handleMove(index, 'down')} 
                  disabled={index === projects.length - 1}
                  className={`p-1.5 rounded-lg border flex items-center justify-center transition-colors ${index === projects.length - 1 ? 'opacity-30 cursor-not-allowed' : theme === 'dark' ? 'hover:bg-slate-700 border-slate-700' : 'hover:bg-slate-100 border-slate-200'}`}
                >
                  ↓
                </button>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.featured && <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20">Featured</span>}
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {project.subtitle}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => handleEdit(project)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium border transition-colors ${theme === 'dark' ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(project.id)}
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

export default ManageProjects;
