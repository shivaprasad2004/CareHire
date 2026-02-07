import React from 'react';
import { Briefcase, FileText, Users, Monitor, Gamepad2 } from 'lucide-react';

const NavItem = ({ icon: Icon, label }) => (
    <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-slate-900 transition-colors group">
        <Icon size={20} className="group-hover:scale-110 transition-transform" />
        <span className="text-xs">{label}</span>
    </div>
);

const LandingHeader = ({ onLoginClick, onJoinClick }) => {
  return (
    <nav className="flex items-center justify-between px-4 lg:px-24 py-3 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">C</div>
          <span className="text-xl font-bold text-emerald-700 tracking-tight">CareHire</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-slate-500 text-sm font-medium">
           <NavItem icon={FileText} label="Articles" />
           <NavItem icon={Users} label="People" />
           <NavItem icon={Monitor} label="Learning" />
           <NavItem icon={Briefcase} label="Jobs" />
           <NavItem icon={Gamepad2} label="Games" />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onJoinClick}
            className="hidden sm:block text-slate-600 font-bold hover:bg-slate-100 px-4 py-2 rounded-full transition-colors"
          >
            Join now
          </button>
          <button 
            onClick={onLoginClick}
            className="text-emerald-600 font-bold border border-emerald-600 hover:bg-emerald-50 px-6 py-2 rounded-full transition-colors"
          >
            Sign in
          </button>
        </div>
    </nav>
  );
};

export default LandingHeader;
