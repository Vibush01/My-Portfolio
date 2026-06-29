import { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

function ManageEducation() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  const { data, updateData } = useData();
  
  const [education, setEducation] = useState([]);
  const [certs, setCerts] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (data) {
      if (data.education) setEducation(data.education);
      if (data.certifications) setCerts(data.certifications);
    }
  }, [data]);

  // Generic Reorder Function
  const handleMove = async (list, type, index, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === list.length - 1)
    ) return;
    
    setStatus({ type: 'loading', message: 'Reordering...' });
    const newList = [...list];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    
    const result = await updateData(type, newList);
    if (result.success) {
      if (type === 'education') setEducation(newList);
      else setCerts(newList);
      setStatus({ type: 'success', message: 'Reordered successfully!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleDelete = async (list, type, index) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    
    setStatus({ type: 'loading', message: 'Deleting...' });
    const newList = list.filter((_, i) => i !== index);
    
    const result = await updateData(type, newList);
    if (result.success) {
      if (type === 'education') setEducation(newList);
      else setCerts(newList);
      setStatus({ type: 'success', message: 'Deleted successfully!' });
    } else {
      setStatus({ type: 'error', message: result.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const handleAddEdu = async (e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    
    const degree = e.target.degree.value.trim();
    const school = e.target.school.value.trim();
    const year = e.target.year.value.trim();
    
    if (degree && school && year) {
      setStatus({ type: 'loading', message: 'Adding...' });
      const newList = [{ degree, school, year }, ...education];
      
      const result = await updateData('education', newList);
      if (result.success) {
        setEducation(newList);
        setStatus({ type: 'success', message: 'Education added!' });
        e.target.reset();
      } else {
        setStatus({ type: 'error', message: result.error });
      }
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }
  };

  const handleAddCert = async (e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    
    const name = e.target.name.value.trim();
    const source = e.target.source.value.trim();
    const icon = e.target.icon.value.trim();
    
    if (name && source && icon) {
      setStatus({ type: 'loading', message: 'Adding...' });
      const newList = [{ id: Date.now(), name, source, icon }, ...certs];
      
      const result = await updateData('certifications', newList);
      if (result.success) {
        setCerts(newList);
        setStatus({ type: 'success', message: 'Certification added!' });
        e.target.reset();
      } else {
        setStatus({ type: 'error', message: result.error });
      }
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Manage Education & Certifications</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
          Update your academic background and professional certificates.
        </p>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${status.type === 'error' ? 'bg-red-500/10 text-red-500' : status.type === 'loading' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-green-500/10 text-green-500'}`}>
          {status.message}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Education Section */}
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-6">Education</h2>
          
          <form onSubmit={handleAddEdu} className="flex flex-col gap-3 mb-6 p-4 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5">
            <input type="text" name="degree" placeholder="Degree / Course" required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <input type="text" name="school" placeholder="School / University" required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <input type="text" name="year" placeholder="Year (e.g. 2022 - 2026)" required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <button type="submit" disabled={isGuest} className="mt-1 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50">+ Add Education</button>
          </form>

          <div className="flex flex-col gap-4">
            {education.map((edu, index) => (
              <div key={index} className={`p-4 rounded-xl border flex gap-4 ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex flex-col gap-1">
                  <button onClick={() => handleMove(education, 'education', index, 'up')} disabled={index === 0} className="text-xs hover:text-indigo-500 disabled:opacity-30">▲</button>
                  <button onClick={() => handleMove(education, 'education', index, 'down')} disabled={index === education.length - 1} className="text-xs hover:text-indigo-500 disabled:opacity-30">▼</button>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{edu.school} • {edu.year}</p>
                </div>
                <button onClick={() => handleDelete(education, 'education', index)} className="text-red-500 hover:text-red-600 text-sm font-medium">Delete</button>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <h2 className="text-xl font-bold mb-6">Certifications</h2>
          
          <form onSubmit={handleAddCert} className="flex flex-col gap-3 mb-6 p-4 rounded-xl border border-dashed border-indigo-500/30 bg-indigo-500/5">
            <input type="text" name="name" placeholder="Certificate Name" required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <input type="text" name="source" placeholder="Issuer (e.g. Meta)" required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <input type="text" name="icon" placeholder="Emoji Icon (e.g. ♾️)" required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <button type="submit" disabled={isGuest} className="mt-1 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50">+ Add Certification</button>
          </form>

          <div className="flex flex-col gap-4">
            {certs.map((cert, index) => (
              <div key={cert.id || index} className={`p-4 rounded-xl border flex gap-4 items-center ${theme === 'dark' ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex flex-col gap-1">
                  <button onClick={() => handleMove(certs, 'certifications', index, 'up')} disabled={index === 0} className="text-xs hover:text-indigo-500 disabled:opacity-30">▲</button>
                  <button onClick={() => handleMove(certs, 'certifications', index, 'down')} disabled={index === certs.length - 1} className="text-xs hover:text-indigo-500 disabled:opacity-30">▼</button>
                </div>
                <div className="text-2xl">{cert.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{cert.source}</p>
                </div>
                <button onClick={() => handleDelete(certs, 'certifications', index)} className="text-red-500 hover:text-red-600 text-sm font-medium">Delete</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManageEducation;
