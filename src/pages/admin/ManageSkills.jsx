import { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { skills as initialSkills, toolsWithIcons as initialTools } from '../../data/skills';

function ManageSkills() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  
  const [skills, setSkills] = useState(initialSkills);
  const [tools, setTools] = useState(initialTools);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Generic Reorder Function
  const moveItem = (list, index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === list.length - 1)
    ) return list;
    
    const newList = [...list];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
    return newList;
  };

  // ----- SKILLS Handlers -----
  const handleAddSkillCategory = (e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const val = e.target.elements.catName.value.trim();
    if (val) {
      setSkills([...skills, { id: Date.now().toString(), category: val, items: [] }]);
      e.target.reset();
    }
  };

  const handleRemoveSkillCategory = (index) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleMoveSkillCategory = (index, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    setSkills(moveItem(skills, index, direction));
  };

  const handleAddSkill = (catIndex, e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const val = e.target.elements.skill.value.trim();
    if (val && !skills[catIndex].items.includes(val)) {
      const newSkills = [...skills];
      newSkills[catIndex].items.push(val);
      setSkills(newSkills);
      e.target.reset();
    }
  };

  const handleRemoveSkill = (catIndex, skillIndex) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const newSkills = [...skills];
    newSkills[catIndex].items.splice(skillIndex, 1);
    setSkills(newSkills);
  };

  const handleMoveSkill = (catIndex, skillIndex, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const newSkills = [...skills];
    newSkills[catIndex].items = moveItem(newSkills[catIndex].items, skillIndex, direction);
    setSkills(newSkills);
  };

  // ----- TOOLS Handlers -----
  const handleAddToolCategory = (e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const val = e.target.elements.catName.value.trim();
    if (val) {
      setTools([...tools, { id: Date.now().toString(), category: val, items: [] }]);
      e.target.reset();
    }
  };

  const handleRemoveToolCategory = (index) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    setTools(tools.filter((_, i) => i !== index));
  };

  const handleMoveToolCategory = (index, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    setTools(moveItem(tools, index, direction));
  };

  const handleAddTool = (catIndex, e) => {
    e.preventDefault();
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const name = e.target.elements.toolName.value.trim();
    const icon = e.target.elements.toolIcon.value.trim();
    const color = e.target.elements.toolColor.value;
    
    if (name && icon && !tools[catIndex].items.find(t => t.name === name)) {
      const newTools = [...tools];
      newTools[catIndex].items.push({ name, icon, color });
      setTools(newTools);
      e.target.reset();
    }
  };

  const handleRemoveTool = (catIndex, toolIndex) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const newTools = [...tools];
    newTools[catIndex].items.splice(toolIndex, 1);
    setTools(newTools);
  };

  const handleMoveTool = (catIndex, toolIndex, direction) => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active.' });
    const newTools = [...tools];
    newTools[catIndex].items = moveItem(newTools[catIndex].items, toolIndex, direction);
    setTools(newTools);
  };

  // ----- SAVE -----
  const handleSaveAll = () => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active. Cannot save.' });
    setStatus({ type: 'loading', message: 'Saving skills and tools...' });
    setTimeout(() => {
      setStatus({ type: 'success', message: 'Skills and Tools saved successfully!' });
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Skills & Tools</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Customize categories, reorder items, and update your tech stack.
          </p>
        </div>
        <button 
          onClick={handleSaveAll}
          disabled={isGuest}
          className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
            isGuest 
              ? 'bg-slate-500 cursor-not-allowed opacity-50' 
              : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30'
          }`}
        >
          {isGuest ? 'Disabled (Guest)' : 'Save All Changes'}
        </button>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${status.type === 'error' ? 'bg-red-500/10 text-red-500' : status.type === 'loading' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-green-500/10 text-green-500'}`}>
          {status.message}
        </div>
      )}

      {/* Skills Section */}
      <div className={`p-6 rounded-2xl border mb-8 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Technical Skills Categories</h2>
          <form onSubmit={handleAddSkillCategory} className="flex gap-2">
            <input type="text" name="catName" placeholder="New Category..." required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <button type="submit" disabled={isGuest} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50">+ Add Category</button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((cat, catIndex) => (
            <div key={cat.id} className={`p-4 rounded-xl border flex flex-col ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <button onClick={() => handleMoveSkillCategory(catIndex, 'up')} disabled={catIndex === 0} className="text-xs hover:text-indigo-500 disabled:opacity-30">▲</button>
                    <button onClick={() => handleMoveSkillCategory(catIndex, 'down')} disabled={catIndex === skills.length - 1} className="text-xs hover:text-indigo-500 disabled:opacity-30">▼</button>
                  </div>
                  <h3 className="font-bold capitalize text-indigo-500">{cat.category}</h3>
                </div>
                <button onClick={() => handleRemoveSkillCategory(catIndex)} className="text-red-500 text-sm hover:underline">Delete</button>
              </div>
              
              <div className="flex flex-col gap-2 mb-4 flex-1">
                {cat.items.map((skill, skillIndex) => (
                  <div key={skill} className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-sm border ${theme === 'dark' ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <button onClick={() => handleMoveSkill(catIndex, skillIndex, 'up')} disabled={skillIndex === 0} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▲</button>
                        <button onClick={() => handleMoveSkill(catIndex, skillIndex, 'down')} disabled={skillIndex === cat.items.length - 1} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▼</button>
                      </div>
                      <span className="font-medium">{skill}</span>
                    </div>
                    <button onClick={() => handleRemoveSkill(catIndex, skillIndex)} className="text-red-500 hover:text-red-600 font-bold">×</button>
                  </div>
                ))}
              </div>

              <form onSubmit={(e) => handleAddSkill(catIndex, e)} className="flex gap-2 mt-auto">
                <input type="text" name="skill" placeholder="Add skill..." required className={`flex-1 px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
                <button type="submit" disabled={isGuest} className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50">+</button>
              </form>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Tools & Software Categories</h2>
          <form onSubmit={handleAddToolCategory} className="flex gap-2">
            <input type="text" name="catName" placeholder="New Category..." required className={`px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <button type="submit" disabled={isGuest} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50">+ Add Category</button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((cat, catIndex) => (
            <div key={cat.id} className={`p-5 rounded-xl border flex flex-col ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <button onClick={() => handleMoveToolCategory(catIndex, 'up')} disabled={catIndex === 0} className="text-xs hover:text-indigo-500 disabled:opacity-30">▲</button>
                    <button onClick={() => handleMoveToolCategory(catIndex, 'down')} disabled={catIndex === tools.length - 1} className="text-xs hover:text-indigo-500 disabled:opacity-30">▼</button>
                  </div>
                  <h3 className="font-bold capitalize">{cat.category}</h3>
                </div>
                <button onClick={() => handleRemoveToolCategory(catIndex)} className="text-red-500 text-sm hover:underline">Delete</button>
              </div>
              
              <div className="flex flex-col gap-2 mb-4 flex-1">
                {cat.items.map((tool, toolIndex) => (
                  <div key={tool.name} className={`flex items-center justify-between p-2 rounded-lg border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <button onClick={() => handleMoveTool(catIndex, toolIndex, 'up')} disabled={toolIndex === 0} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▲</button>
                        <button onClick={() => handleMoveTool(catIndex, toolIndex, 'down')} disabled={toolIndex === cat.items.length - 1} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▼</button>
                      </div>
                      
                      {tool.icon.startsWith('http') || tool.icon.startsWith('/') ? (
                        <img src={tool.icon} alt={tool.name} className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-lg">{tool.icon}</span>
                      )}
                      
                      <span className="text-sm font-bold" style={{ color: tool.color }}>{tool.name}</span>
                    </div>
                    <button onClick={() => handleRemoveTool(catIndex, toolIndex)} className="text-red-500 hover:text-red-600 font-bold text-lg">×</button>
                  </div>
                ))}
              </div>

              <form onSubmit={(e) => handleAddTool(catIndex, e)} className="flex gap-2 mt-auto">
                <input type="text" name="toolIcon" placeholder="URL or Emoji" required className={`w-28 px-2 py-2 text-center rounded-lg border outline-none text-xs ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
                <input type="text" name="toolName" placeholder="Tool name" required className={`flex-1 px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
                <input type="color" name="toolColor" defaultValue="#3b82f6" className="w-10 h-10 rounded-lg cursor-pointer" />
                <button type="submit" disabled={isGuest} className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50">+</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageSkills;
