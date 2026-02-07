import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2, Loader2, Camera } from 'lucide-react';
import { uploadService } from '../../../services/uploadService';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    title: user.title || '',
    specialty: user.specialty || '',
    organization: user.organization || '',
    bio: user.bio || '',
    location: user.location || '',
    phone: user.phone || '',
    website: user.website || '',
    avatarUrl: user.avatarUrl || '',
    coverUrl: user.coverUrl || '',
    experience: user.experience ? JSON.parse(user.experience) : [],
    education: user.education ? JSON.parse(user.education) : [],
    skills: user.skills ? JSON.parse(user.skills) : []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Stringify complex fields
      const dataToSave = {
        ...formData,
        experience: JSON.stringify(formData.experience),
        education: JSON.stringify(formData.education),
        skills: JSON.stringify(formData.skills)
      };
      await onSave(dataToSave);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Experience Helpers
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role: '', company: '', period: '', location: '', description: '', current: false }]
    });
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index][field] = value;
    setFormData({ ...formData, experience: newExp });
  };

  const removeExperience = (index) => {
    const newExp = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExp });
  };

  // Education Helpers
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { school: '', degree: '', year: '' }]
    });
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...formData.education];
    newEdu[index][field] = value;
    setFormData({ ...formData, education: newEdu });
  };

  const removeEducation = (index) => {
    const newEdu = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEdu });
  };

  // Skills Helper
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadService.uploadImage(formData);
      const url = response.data?.url || response.url;
      setFormData(prev => ({ ...prev, [field]: url }));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95 }} 
        animate={{ scale: 1 }} 
        exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="font-bold text-lg text-slate-900">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex border-b border-slate-100 overflow-x-auto">
          {['basic', 'details', 'experience', 'education'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab} Info
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Title (e.g. Dr., RN)" name="title" value={formData.title} onChange={handleChange} />
                <Input label="Specialty" name="specialty" value={formData.specialty} onChange={handleChange} />
              </div>
              <Input label="Current Organization" name="organization" value={formData.organization} onChange={handleChange} />
              <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                <Input label="Website" name="website" value={formData.website} onChange={handleChange} />
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image</label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    {formData.avatarUrl && <img src={formData.avatarUrl} className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200" alt="Preview" />}
                    <label className="btn btn-secondary text-xs cursor-pointer flex items-center gap-2">
                      <Camera size={14} /> Upload Image
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'avatarUrl')} />
                    </label>
                    <span className="text-xs text-slate-400">or use URL below</span>
                  </div>
                  <input type="text" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} className="input text-xs text-slate-500" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cover Image</label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    {formData.coverUrl && <img src={formData.coverUrl} className="w-20 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200" alt="Preview" />}
                    <label className="btn btn-secondary text-xs cursor-pointer flex items-center gap-2">
                      <Camera size={14} /> Upload Cover
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'coverUrl')} />
                    </label>
                    <span className="text-xs text-slate-400">or use URL below</span>
                  </div>
                  <input type="text" name="coverUrl" value={formData.coverUrl} onChange={handleChange} className="input text-xs text-slate-500" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={5} className="input" placeholder="Tell us about yourself..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
                <textarea 
                  defaultValue={formData.skills.join(', ')} 
                  onBlur={handleSkillsChange}
                  className="input" 
                  placeholder="Neurology, Research, etc." 
                />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-3 relative bg-slate-50/50">
                  <button onClick={() => removeExperience(idx)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Role" value={exp.role} onChange={(e) => updateExperience(idx, 'role', e.target.value)} />
                    <Input label="Company" value={exp.company} onChange={(e) => updateExperience(idx, 'company', e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Period" value={exp.period} onChange={(e) => updateExperience(idx, 'period', e.target.value)} />
                    <Input label="Location" value={exp.location} onChange={(e) => updateExperience(idx, 'location', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
                    <textarea value={exp.description} onChange={(e) => updateExperience(idx, 'description', e.target.value)} className="input text-sm" rows={2} />
                  </div>
                </div>
              ))}
              <button onClick={addExperience} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                <Plus size={18} /> Add Experience
              </button>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              {formData.education.map((edu, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl space-y-3 relative bg-slate-50/50">
                  <button onClick={() => removeEducation(idx)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                  <Input label="School" value={edu.school} onChange={(e) => updateEducation(idx, 'school', e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Degree" value={edu.degree} onChange={(e) => updateEducation(idx, 'degree', e.target.value)} />
                    <Input label="Year" value={edu.year} onChange={(e) => updateEducation(idx, 'year', e.target.value)} />
                  </div>
                </div>
              ))}
              <button onClick={addEducation} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-medium hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                <Plus size={18} /> Add Education
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={isLoading} className="btn btn-primary min-w-[100px]">
            {isLoading ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input type="text" className="input" {...props} />
  </div>
);

export default EditProfileModal;