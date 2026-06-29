import { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { uploadToCloudinary } from '../../utils/uploadFile';

function ManageBlog() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  const { data, updateData } = useData();
  
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (data && data.blog) setBlogs(data.blog);
  }, [data]);
  
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', category: '', 
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read', image: '', emoji: '📝', 
    color: '#3b82f6', colorEnd: '#2563eb', featured: false, content: ''
  });

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      ...blog,
      content: blog.content || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '', slug: '', excerpt: '', category: '', 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read', image: '', emoji: '📝', 
      color: '#3b82f6', colorEnd: '#2563eb', featured: false, content: ''
    });
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

  const handleMove = async (index, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === blogs.length - 1)
    ) return;
    
    setStatus({ type: 'loading', message: 'Reordering...' });
    const newBlogs = [...blogs];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlogs[index], newBlogs[targetIndex]] = [newBlogs[targetIndex], newBlogs[index]];
    
    setBlogs(newBlogs); // Optimistic UI update
    
    const result = await updateData('blog', newBlogs);
    if (result.success) {
      setStatus({ type: 'success', message: 'Blogs reordered!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleDelete = async (id) => {
    if (isGuest) {
      setStatus({ type: 'error', message: 'Guest Mode: You cannot delete entries.' });
      return;
    }
    
    setStatus({ type: 'loading', message: 'Deleting...' });
    const newBlogs = blogs.filter(b => b.id !== id);
    
    const result = await updateData('blog', newBlogs);
    if (result.success) {
      setStatus({ type: 'success', message: 'Blog deleted successfully!' });
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
    
    const finalData = {
      ...formData,
      image: uploadedImageUrl,
      id: editingId === 'new' || !editingId ? Date.now() : editingId
    };

    let newBlogs;
    if (editingId && editingId !== 'new') {
      newBlogs = blogs.map(b => b.id === editingId ? finalData : b);
    } else {
      newBlogs = [finalData, ...blogs];
    }

    // Sort by date descending
    newBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    const result = await updateData('blog', newBlogs);
    
    if (result.success) {
      setStatus({ type: 'success', message: 'Blog post saved successfully!' });
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
          <h1 className="text-3xl font-bold mb-2">Manage Blog Posts</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Write, edit, and organize your technical articles.
          </p>
        </div>
        {!editingId && (
          <button 
            onClick={() => setEditingId('new')}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all"
          >
            + Create New Post
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
          <h2 className="text-xl font-bold mb-6">{editingId === 'new' ? 'Create New Post' : 'Edit Post'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">URL Slug (e.g. my-first-post)</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. React" required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">
                  Featured Image
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
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Date</label>
                <input type="text" name="date" value={formData.date} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 opacity-80">Read Time</label>
                <input type="text" name="readTime" value={formData.readTime} onChange={handleChange} required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Short Excerpt</label>
              <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="2" required className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-24">
                  <label className="block text-sm font-medium mb-2 opacity-80">Emoji</label>
                  <input type="text" name="emoji" value={formData.emoji} onChange={handleChange} className={`w-full px-4 py-3 text-center rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 opacity-80">Gradient Start</label>
                  <input type="color" name="color" value={formData.color} onChange={handleChange} className={`w-full h-[50px] px-2 rounded-xl border outline-none cursor-pointer ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 opacity-80">Gradient End</label>
                  <input type="color" name="colorEnd" value={formData.colorEnd} onChange={handleChange} className={`w-full h-[50px] px-2 rounded-xl border outline-none cursor-pointer ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-slate-50 border-slate-200'}`} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 opacity-80">Markdown Content (Placeholder for MDX editor)</label>
              <textarea name="content" value={formData.content} onChange={handleChange} rows="8" placeholder="## Write your markdown here..." className={`w-full px-4 py-3 rounded-xl border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600 font-mono text-sm' : 'bg-slate-50 border-slate-200 font-mono text-sm'}`} />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="w-5 h-5 accent-indigo-500" />
              <label htmlFor="featured" className="font-medium cursor-pointer">Featured Post (Displays on Homepage)</label>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={handleCancel} className={`px-6 py-2.5 rounded-xl font-medium border ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}>
                Cancel
              </button>
              <button type="submit" disabled={isGuest} className={`px-8 py-2.5 rounded-xl font-semibold text-white transition-all ${isGuest ? 'bg-slate-500 cursor-not-allowed opacity-50' : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30'}`}>
                {status.type === 'loading' ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
      <div className="flex flex-col gap-4">
        {blogs.map((blog, index) => (
          <div key={blog.id} className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 justify-between items-start md:items-center ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            
            <div className="flex gap-4 items-center">
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => handleMove(index, 'up')} 
                  disabled={index === 0}
                  className={`p-1 rounded border flex items-center justify-center transition-colors ${index === 0 ? 'opacity-30 cursor-not-allowed' : theme === 'dark' ? 'hover:bg-slate-700 border-slate-700' : 'hover:bg-slate-100 border-slate-200'}`}
                >
                  ↑
                </button>
                <button 
                  onClick={() => handleMove(index, 'down')} 
                  disabled={index === blogs.length - 1}
                  className={`p-1 rounded border flex items-center justify-center transition-colors ${index === blogs.length - 1 ? 'opacity-30 cursor-not-allowed' : theme === 'dark' ? 'hover:bg-slate-700 border-slate-700' : 'hover:bg-slate-100 border-slate-200'}`}
                >
                  ↓
                </button>
              </div>

              <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0" style={{ background: `linear-gradient(135deg, ${blog.color}20, ${blog.colorEnd}20)` }}>
                {blog.emoji}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold">{blog.title}</h3>
                  {blog.featured && <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-500 rounded border border-indigo-500/20">Featured</span>}
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {blog.category} • {blog.date} • {blog.readTime}
                </p>
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => handleEdit(blog)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-medium border transition-colors ${theme === 'dark' ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'}`}
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(blog.id)}
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

export default ManageBlog;
