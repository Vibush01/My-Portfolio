import { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

function ManageSkills() {
  const { theme } = useTheme();
  const { isGuest } = useAuth();
  const { data, updateData } = useData();
  
  const [skills, _setSkills] = useState([]);
  const [tools, _setTools] = useState([]);
  const [status, setStatus] = useState({ type: '', message: '' });

  const setSkills = (newSkills) => {
    _setSkills(newSkills);
    if (!isGuest) updateData('skills', newSkills);
  };

  const setTools = (newTools) => {
    _setTools(newTools);
    if (!isGuest) updateData('tools', newTools);
  };

  useEffect(() => {
    if (data) {
      if (data.skills) _setSkills(data.skills);
      if (data.tools) _setTools(data.tools);
    }
  }, [data]);

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
  const handleSaveAll = async () => {
    if (isGuest) return setStatus({ type: 'error', message: 'Guest Mode active. Cannot save.' });
    setStatus({ type: 'loading', message: 'Saving skills and tools to Firebase...' });
    
    const r1 = await updateData('skills', skills);
    const r2 = await updateData('tools', tools);
    
    if (r1.success && r2.success) {
      setStatus({ type: 'success', message: 'Skills and Tools saved successfully!' });
    } else {
      setStatus({ type: 'error', message: r1.error || r2.error });
    }
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between md:items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Skills & Tools</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            Customize categories, reorder items, and update your tech stack.
          </p>
        </div>
        <button 
          disabled={true}
          className={`px-8 py-3 rounded-xl font-semibold text-white transition-all bg-green-500/80 cursor-default shadow-lg shadow-green-500/30 self-start md:self-auto`}
        >
          {isGuest ? 'Disabled (Guest)' : '✓ Auto-Saved'}
        </button>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl mb-6 font-medium ${status.type === 'error' ? 'bg-red-500/10 text-red-500' : status.type === 'loading' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-green-500/10 text-green-500'}`}>
          {status.message}
        </div>
      )}

      {/* Skills Section */}
      <div className={`p-4 sm:p-6 rounded-2xl border mb-8 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-6">
          <h2 className="text-xl font-bold">Technical Skills Categories</h2>
          <form onSubmit={handleAddSkillCategory} className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <input type="text" name="catName" placeholder="New Category..." required className={`flex-1 min-w-0 px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <button type="submit" disabled={isGuest} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50 whitespace-nowrap">+ Add Category</button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skills.map((cat, catIndex) => (
            <div key={cat.id} className={`p-3 sm:p-4 rounded-xl border flex flex-col ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <button onClick={() => handleMoveSkillCategory(catIndex, 'up')} disabled={catIndex === 0} className="text-xs hover:text-indigo-500 disabled:opacity-30">▲</button>
                    <button onClick={() => handleMoveSkillCategory(catIndex, 'down')} disabled={catIndex === skills.length - 1} className="text-xs hover:text-indigo-500 disabled:opacity-30">▼</button>
                  </div>
                  <h3 className="font-bold capitalize text-indigo-500 text-sm sm:text-base">{cat.category}</h3>
                </div>
                <button onClick={() => handleRemoveSkillCategory(catIndex)} className="text-red-500 text-xs sm:text-sm hover:underline shrink-0">Delete</button>
              </div>
              
              <div className="flex flex-col gap-2 mb-4 flex-1">
                {cat.items.map((skill, skillIndex) => (
                  <div key={skill} className={`flex items-center justify-between px-2 sm:px-3 py-1.5 rounded-lg text-sm border ${theme === 'dark' ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                      <div className="flex flex-col shrink-0">
                        <button onClick={() => handleMoveSkill(catIndex, skillIndex, 'up')} disabled={skillIndex === 0} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▲</button>
                        <button onClick={() => handleMoveSkill(catIndex, skillIndex, 'down')} disabled={skillIndex === cat.items.length - 1} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▼</button>
                      </div>
                      <span className="font-medium truncate text-xs sm:text-sm">{skill}</span>
                    </div>
                    <button onClick={() => handleRemoveSkill(catIndex, skillIndex)} className="text-red-500 hover:text-red-600 font-bold shrink-0 ml-2">×</button>
                  </div>
                ))}
              </div>

              <form onSubmit={(e) => handleAddSkill(catIndex, e)} className="flex gap-2 mt-auto">
                <input type="text" name="skill" placeholder="Add skill..." required className={`flex-1 px-2 sm:px-3 py-2 rounded-lg border outline-none text-xs sm:text-sm min-w-0 ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
                <button type="submit" disabled={isGuest} className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50 shrink-0">+</button>
              </form>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div className={`p-4 sm:p-6 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center mb-6">
          <h2 className="text-xl font-bold">Tools & Software Categories</h2>
          <form onSubmit={handleAddToolCategory} className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <input type="text" name="catName" placeholder="New Category..." required className={`flex-1 min-w-0 px-3 py-2 rounded-lg border outline-none text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
            <button type="submit" disabled={isGuest} className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50 whitespace-nowrap">+ Add Category</button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {tools.map((cat, catIndex) => (
            <div key={cat.id} className={`p-3 sm:p-4 rounded-xl border flex flex-col ${theme === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <button onClick={() => handleMoveToolCategory(catIndex, 'up')} disabled={catIndex === 0} className="text-xs hover:text-indigo-500 disabled:opacity-30">▲</button>
                    <button onClick={() => handleMoveToolCategory(catIndex, 'down')} disabled={catIndex === tools.length - 1} className="text-xs hover:text-indigo-500 disabled:opacity-30">▼</button>
                  </div>
                  <h3 className="font-bold capitalize text-indigo-500 text-sm sm:text-base">{cat.category}</h3>
                </div>
                <button onClick={() => handleRemoveToolCategory(catIndex)} className="text-red-500 text-xs sm:text-sm hover:underline shrink-0">Delete</button>
              </div>
              
              <div className="flex flex-col gap-2 mb-4 flex-1">
                {cat.items.map((tool, toolIndex) => (
                  <div key={tool.name} className={`flex items-center justify-between px-2 sm:px-3 py-1.5 rounded-lg border text-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                      <div className="flex flex-col shrink-0">
                        <button onClick={() => handleMoveTool(catIndex, toolIndex, 'up')} disabled={toolIndex === 0} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▲</button>
                        <button onClick={() => handleMoveTool(catIndex, toolIndex, 'down')} disabled={toolIndex === cat.items.length - 1} className="text-[10px] hover:text-indigo-500 disabled:opacity-30">▼</button>
                      </div>
                      
                      {tool.icon.startsWith('http') || tool.icon.startsWith('/') ? (
                        <img src={tool.icon} alt={tool.name} className="w-5 h-5 object-contain" />
                      ) : (
                        <span className="text-sm">{tool.icon}</span>
                      )}
                      
                      <span className="font-medium truncate text-xs sm:text-sm" style={{ color: tool.color }}>{tool.name}</span>
                    </div>
                    <button onClick={() => handleRemoveTool(catIndex, toolIndex)} className="text-red-500 hover:text-red-600 font-bold shrink-0 ml-2">×</button>
                  </div>
                ))}
              </div>

              <form onSubmit={(e) => handleAddTool(catIndex, e)} className="flex flex-col sm:flex-row gap-2 mt-auto">
                <div className="flex gap-2 w-full sm:flex-1">
                  <input type="text" name="toolIcon" placeholder="URL/Emoji" required className={`w-20 sm:w-28 px-2 py-2 text-center rounded-lg border outline-none text-xs sm:text-sm shrink-0 ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
                  <input type="text" name="toolName" placeholder="Name" required className={`flex-1 min-w-0 px-2 sm:px-3 py-2 rounded-lg border outline-none text-xs sm:text-sm ${theme === 'dark' ? 'bg-slate-900 border-slate-600' : 'bg-white border-slate-300'}`} />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <input type="color" name="toolColor" defaultValue="#3b82f6" className="w-12 sm:w-9 h-9 rounded-lg cursor-pointer shrink-0" />
                  <button type="submit" disabled={isGuest} className="flex-1 sm:flex-none px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-bold disabled:opacity-50 shrink-0">+</button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageSkills;
