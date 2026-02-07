import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Link, Mail, Phone, Building, GraduationCap, CheckCircle, Edit2 } from 'lucide-react';
import ContactItem from './ContactItem';

const ProfileHeader = ({ user, onEditStart, showVerification, setShowVerification }) => {
  // Safe JSON parse helpers
  const getEducation = () => {
    try {
      return user.education ? JSON.parse(user.education) : [];
    } catch (e) { return []; }
  };

  const education = getEducation();

  return (
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
              onClick={onEditStart}
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
  );
};

export default ProfileHeader;