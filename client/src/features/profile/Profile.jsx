import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Link, Mail, Phone, Download, Building, GraduationCap, Award, CheckCircle, Stethoscope, BookOpen, Edit2, X, Save, Camera, Loader2, Plus, Trash2 } from 'lucide-react';
import { userService } from '../../services/userService';

const Profile = ({ user, onUpdateUser }) => {
  const [showVerification, setShowVerification] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  if (!user) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  const handleSaveProfile = async (updatedData) => {
    try {
      const newUser = await userService.updateProfile(updatedData);
      if (onUpdateUser) {
        onUpdateUser(newUser);
      }
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    }
  };

  // Safe JSON parse helpers
  const getExperience = () => {
    try {
      return user.experience ? JSON.parse(user.experience) : [];
    } catch (e) { return []; }
  };
  
  const getEducation = () => {
    try {
      return user.education ? JSON.parse(user.education) : [];
    } catch (e) { return []; }
  };

  const getSkills = () => {
    try {
      return user.skills ? JSON.parse(user.skills) : [];
    } catch (e) { return []; }
  };

  const experience = getExperience();
  const education = getEducation();
  const skills = getSkills();

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 lg:px-8 space-y-6 pb-24 lg:pb-8">
      
      {/* Profile Header Card */}
      <div className="card overflow-hidden">
        {/* Banner */}
        <div className="h-32 sm:h-48 bg-slate-900 relative">
             <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
             {user.coverUrl ? (
                <img src={user.coverUrl} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Cover" />
             ) : (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
        </div>
        
        <div className="px-4 sm:px-8 pb-8">
            <div className="relative flex flex-col sm:flex-row justify-between items-end -mt-12 sm:-mt-16 mb-6 gap-4">
                <div className="p-1 bg-white rounded-2xl shadow-sm mx-auto sm:mx-0 relative group">
                    <img 
                        src={user.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070"}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover" 
                        alt="Profile"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <button className="btn btn-secondary text-sm flex-1 sm:flex-none justify-center">Message</button>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="btn btn-primary text-sm flex-1 sm:flex-none justify-center flex items-center gap-2"
                    >
                        <Edit2 size={14} /> Edit Profile
                    </button>
                </div>
            </div>

            <div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="text-center sm:text-left w-full">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2 relative">
                            {user.title || ''} {user.firstName} {user.lastName}
                            <div 
                                className="relative cursor-pointer group"
                                onMouseEnter={() => setShowVerification(true)}
                                onMouseLeave={() => setShowVerification(false)}
                            >
                                <CheckCircle size={18} className="text-blue-500" fill="currentColor" color="white" />
                                <AnimatePresence>
                                {showVerification && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-xs rounded-lg shadow-xl text-center z-50 pointer-events-none"
                                    >
                                        <div className="font-bold text-emerald-400 mb-0.5">Verified Physician</div>
                                        <div className="text-slate-300 text-[10px]">NPI: {user.npi || '1234567890'}</div>
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>
                        </h1>
                        <p className="text-lg text-slate-600 font-medium">{user.specialty ? `Specialist in ${user.specialty}` : 'Medical Professional'}</p>
                        <p className="text-slate-500 text-sm mt-1 max-w-2xl mx-auto sm:mx-0 whitespace-pre-wrap">
                            {user.bio || 'Passionate about advancing patient care through evidence-based medicine.'}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-slate-500 text-sm w-full sm:w-auto items-center sm:items-end">
                         <div className="flex items-center gap-2">
                            <Building size={14} /> {user.organization || 'No Organization'}
                         </div>
                         <div className="flex items-center gap-2">
                            <GraduationCap size={14} /> {education[0]?.school || 'Medical School'}
                         </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-6 pt-6 border-t border-slate-100">
                    <ContactItem icon={MapPin} text={user.location || "Location not set"} />
                    <ContactItem icon={Link} text={user.website || "No website"} link={!!user.website} />
                    <ContactItem icon={Mail} text={user.email} />
                    <ContactItem icon={Phone} text={user.phone || "No phone"} />
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-6">
             
             {/* About */}
             <Section title="About">
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {user.bio || "No bio available."}
                </p>
             </Section>

             {/* Experience */}
             <Section title="Experience">
                <div className="space-y-6">
                    {experience.length > 0 ? experience.map((exp, index) => (
                        <TimelineItem 
                            key={index}
                            role={exp.role}
                            company={exp.company}
                            period={exp.period}
                            location={exp.location}
                            description={exp.description}
                            current={exp.current}
                        />
                    )) : (
                        <p className="text-slate-400 text-sm italic">No experience listed.</p>
                    )}
                </div>
             </Section>

             {/* Education */}
             <Section title="Education">
                <div className="space-y-4">
                    {education.length > 0 ? education.map((edu, index) => (
                        <div key={index} className="flex gap-4">
                            <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                                <GraduationCap className="text-slate-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{edu.school}</h4>
                                <p className="text-slate-600 text-sm">{edu.degree}</p>
                                <p className="text-slate-400 text-xs mt-1">{edu.year}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-slate-400 text-sm italic">No education listed.</p>
                    )}
                </div>
             </Section>

         </div>

         {/* Sidebar */}
         <div className="space-y-6">
             {/* Skills */}
             <div className="card p-6">
                <h3 className="font-bold text-slate-900 mb-4">Skills & Endorsements</h3>
                <div className="flex flex-wrap gap-2">
                    {skills.length > 0 ? skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-md border border-slate-100">
                            {skill}
                        </span>
                    )) : (
                        <span className="text-slate-400 text-xs italic">No skills listed.</span>
                    )}
                </div>
             </div>

             {/* Resume */}
             <div className="card p-6 bg-slate-900 text-white">
                <h3 className="font-bold mb-2">Curriculum Vitae</h3>
                <p className="text-slate-400 text-xs mb-4">Download updated CV</p>
                <button className="w-full bg-white text-slate-900 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                    <Download size={16} />
                    Download CV
                </button>
             </div>

         </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
            <EditProfileModal 
                user={user} 
                onClose={() => setIsEditing(false)} 
                onSave={handleSaveProfile} 
            />
        )}
      </AnimatePresence>

    </div>
  );
};

const Section = ({ title, children }) => (
    <div className="card p-6">
        <h3 className="font-bold text-lg text-slate-900 mb-4">{title}</h3>
        {children}
    </div>
);

const ContactItem = ({ icon: Icon, text, link }) => (
    <div className={`flex items-center gap-2 text-sm ${link ? 'text-blue-600 hover:underline cursor-pointer' : 'text-slate-500'}`}>
        <Icon size={16} className={link ? 'text-blue-600' : 'text-slate-400'} />
        {text}
    </div>
);

const TimelineItem = ({ role, company, period, location, description, current, icon: Icon }) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${current ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
            <div className="w-0.5 flex-1 bg-slate-100 my-1"></div>
        </div>
        <div className="pb-6">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                {role}
                {Icon && <Icon size={14} className="text-slate-400" />}
            </h4>
            <div className="text-slate-600 text-sm font-medium">{company}</div>
            <div className="text-slate-400 text-xs mt-0.5 flex items-center gap-2">
                <span>{period}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{location}</span>
            </div>
            <p className="text-slate-500 text-sm mt-2 whitespace-pre-wrap">{description}</p>
        </div>
    </div>
);

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
        // Stringify complex fields
        const dataToSave = {
            ...formData,
            experience: JSON.stringify(formData.experience),
            education: JSON.stringify(formData.education),
            skills: JSON.stringify(formData.skills)
        };
        await onSave(dataToSave);
        setIsLoading(false);
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
        // Split by comma and trim
        const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s);
        setFormData({ ...formData, skills: skillsArray });
    };

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Optional: Show loading state specific to upload if needed
            const url = await userService.uploadImage(file);
            setFormData(prev => ({ ...prev, [field]: url }));
        } catch (error) {
            alert('Upload failed: ' + error.message);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        >
            <motion.div 
                initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="font-bold text-lg text-slate-900">Edit Profile</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
                </div>
                
                <div className="flex border-b border-slate-100 overflow-x-auto">
                    {['basic', 'details', 'experience', 'education'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
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
                                    <button onClick={() => removeExperience(idx)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
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
                                    <button onClick={() => removeEducation(idx)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
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

export default Profile;
