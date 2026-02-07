import React from 'react';
import { Award, Building2, UserPlus } from 'lucide-react';

const ProfileWidget = ({ user }) => {
  return (
    <div className="card p-0 overflow-hidden bg-white border border-slate-200 shadow-sm rounded-xl">
      <div className="h-20 bg-gradient-to-r from-emerald-600 to-teal-600 relative">
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
           <img 
             src={user?.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070"} 
             className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
             alt="Profile"
           />
        </div>
      </div>
      <div className="pt-10 pb-5 px-5 text-center">
         <h3 className="font-bold text-slate-900 text-lg">{user?.firstName} {user?.lastName}</h3>
         <p className="text-xs text-slate-500 font-medium mb-4">{user?.specialty || 'Healthcare Professional'} @ {user?.organization || 'Medical Center'}</p>
         
         <div className="flex justify-center gap-6 py-4 border-t border-slate-100">
            <div className="text-center">
               <div className="font-bold text-slate-900">1.2k</div>
               <div className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Followers</div>
            </div>
            <div className="text-center">
               <div className="font-bold text-slate-900">450</div>
               <div className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Following</div>
            </div>
         </div>
         
         <div className="pt-4 border-t border-slate-100 text-left space-y-3">
             <div className="flex items-center gap-3 text-sm text-slate-600">
                 <Building2 size={16} className="text-slate-400" />
                 <span>Mayo Clinic</span>
             </div>
             <div className="flex items-center gap-3 text-sm text-slate-600">
                 <Award size={16} className="text-slate-400" />
                 <span>Board Certified</span>
             </div>
         </div>
      </div>
      <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">View My Profile</button>
      </div>
    </div>
  );
};

export default ProfileWidget;
