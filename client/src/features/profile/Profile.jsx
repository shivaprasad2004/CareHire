import React, { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import Section from './components/Section';
import TimelineItem from './components/TimelineItem';
import SkillsSection from './components/SkillsSection';
import ResumeSection from './components/ResumeSection';
import EditProfileModal from './components/EditProfileModal';

const Profile = ({ user, isEditing, loading, error, onSaveProfile, onEditStart, onEditCancel }) => {
  const [showVerification, setShowVerification] = useState(false);

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

  const handleDownloadCV = () => {
    // Implement CV download logic
    console.log('Downloading CV for user:', user.id);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 lg:px-8 space-y-6 pb-24 lg:pb-8">
      
      {/* Profile Header Card */}
      <ProfileHeader 
        user={user}
        onEditStart={onEditStart}
        showVerification={showVerification}
        setShowVerification={setShowVerification}
      />

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
          <SkillsSection skills={skills} />

          {/* Resume */}
          <ResumeSection onDownload={handleDownloadCV} />
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <EditProfileModal 
          user={user} 
          onClose={onEditCancel} 
          onSave={onSaveProfile} 
        />
      )}
    </div>
  );
};

export default Profile;