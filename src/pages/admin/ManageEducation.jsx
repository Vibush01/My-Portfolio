import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { education as initialEducation } from '../../data/skills';
import { certifications as initialCerts } from '../../data/certifications';

function ManageEducation() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  
  const [education, setEducation] = useState(initialEducation);
  const [certs, setCerts] = useState(initialCerts);
  
  const [editingEdu, setEditingEdu] = useState(null);
  const [editingCert, setEditingCert] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const [eduForm, setEduForm] = useState({ degree: '', school: '', year: '' });
  const [certForm, setCertForm] = useState({ name: '', source: '', icon: '' });

  // Handle Education
  const handleEditEdu = (edu, index) => {
    setEditingEdu(index);
    setEduForm(edu);
  };
  const handleCancelEdu = () => {
    setEditingEdu(null);
    setEduForm({ degree: '', school: '', year: '' });
  };
  const handleDeleteEdu = (index) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    setEducation(education.filter((_, i) => i !== index));
  };
  const handleSubmitEdu = (e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    
    if (editingEdu !== null && editingEdu !== 'new') {
      const newEdu = [...education];
      newEdu[editingEdu] = eduForm;
      setEducation(newEdu);
    } else {
      setEducation([...education, eduForm]);
    }
    handleCancelEdu();
    setStatus({ type: 'success', message: 'Education saved!' });
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  // Handle Certifications
  const handleEditCert = (cert) => {
    setEditingCert(cert.id);
    setCertForm(cert);
  };
  const handleCancelCert = () => {
    setEditingCert(null);
    setCertForm({ name: '', source: '', icon: '' });
  };
  const handleDeleteCert = (id) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    setCerts(certs.filter(c => c.id !== id));
  };
  const handleSubmitCert = (e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    
    if (editingCert !== null && editingCert !== 'new') {
      setCerts(certs.map(c => c.id === editingCert ? { ...certForm, id: editingCert } : c));
    } else {
      setCerts([...certs, { ...certForm, id: Date.now() }]);
    }
    handleCancelCert();
    setStatus({ type: 'success', message: 'Certification saved!' });
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Education & Certifications</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
          Manage your academic background and professional certificates.
        </p>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${status.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
          {status.message}
        </div>
      )}

      {/* Education Section */}
      <div className={`p-6 rounded-2xl border mb-8 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Formal Education</h2>
          {!editingEdu && (
            <button onClick={() => setEditingEdu('new')} className="text-sm font-medium text-indigo-500 hover:underline">+ Add Education</button>
          )}
        </div>

        {editingEdu && (
          <form onSubmit={handleSubmitEdu} className="space-y-4 mb-6 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Degree / Course Name" value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} required className={`w-full px-4 py-2 rounded-lg border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-200'}`} />
              <input type="text" placeholder="School / University" value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} required className={`w-full px-4 py-2 rounded-lg border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-200'}`} />
              <input type="text" placeholder="Years (e.g. 2022 - 2026)" value={eduForm.year} onChange={e => setEduForm({...eduForm, year: e.target.value})} required className={`w-full px-4 py-2 rounded-lg border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-200'}`} />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleCancelEdu} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-500/30">Cancel</button>
              <button type="submit" disabled={isGuest} className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white">Save</button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {education.map((edu, idx) => (
            <div key={idx} className={`p-4 rounded-xl border flex justify-between items-center ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div>
                <h4 className="font-bold">{edu.degree}</h4>
                <p className="text-sm opacity-70">{edu.school} • {edu.year}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEditEdu(edu, idx)} className="text-sm font-medium text-indigo-500 hover:underline">Edit</button>
                <button onClick={() => handleDeleteEdu(idx)} className="text-sm font-medium text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Certifications</h2>
          {!editingCert && (
            <button onClick={() => setEditingCert('new')} className="text-sm font-medium text-indigo-500 hover:underline">+ Add Certificate</button>
          )}
        </div>

        {editingCert && (
          <form onSubmit={handleSubmitCert} className="space-y-4 mb-6 p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Certificate Name" value={certForm.name} onChange={e => setCertForm({...certForm, name: e.target.value})} required className={`w-full px-4 py-2 rounded-lg border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-200'}`} />
              <input type="text" placeholder="Source (e.g. Coursera)" value={certForm.source} onChange={e => setCertForm({...certForm, source: e.target.value})} required className={`w-full px-4 py-2 rounded-lg border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-200'}`} />
              <input type="text" placeholder="Emoji Icon (e.g. 🚀)" value={certForm.icon} onChange={e => setCertForm({...certForm, icon: e.target.value})} required className={`w-full px-4 py-2 rounded-lg border outline-none ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-200'}`} />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={handleCancelCert} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-500/30">Cancel</button>
              <button type="submit" disabled={isGuest} className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500 text-white">Save</button>
            </div>
          </form>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((cert) => (
            <div key={cert.id} className={`p-4 rounded-xl border flex gap-3 items-center ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl bg-indigo-500/10">{cert.icon}</div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{cert.name}</h4>
                <p className="text-xs opacity-70">{cert.source}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => handleEditCert(cert)} className="text-xs font-medium text-indigo-500 hover:underline">Edit</button>
                <button onClick={() => handleDeleteCert(cert.id)} className="text-xs font-medium text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageEducation;
