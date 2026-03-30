import React from 'react';
import { FileText, Users, Briefcase, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 cursor-pointer text-slate-500 hover:text-slate-900 transition-colors group px-3 py-1">
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const LandingHeader = ({ onLoginClick, onJoinClick }) => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-4 lg:px-16 xl:px-24 py-3 bg-white/90 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center gap-2.5">
        <div className="h-9 w-9 bg-gradient-to-br from-carehire-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-carehire-600/20 text-sm">
          CH
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          Care<span className="text-carehire-600">Hire</span>
        </span>
      </div>

      <div className="hidden lg:flex items-center gap-6 text-slate-500 text-sm">
        <NavItem icon={FileText} label="Articles" onClick={() => navigate('/articles')} />
        <NavItem icon={Users} label="People" onClick={onJoinClick} />
        <NavItem icon={BookOpen} label="Resources" onClick={() => navigate('/articles')} />
        <NavItem icon={Briefcase} label="Jobs" onClick={onJoinClick} />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onJoinClick}
          className="hidden sm:block text-slate-600 font-semibold hover:bg-slate-50 px-5 py-2 rounded-full transition-colors text-sm"
        >
          Join now
        </button>
        <button
          onClick={onLoginClick}
          className="text-carehire-600 font-semibold border-2 border-carehire-600 hover:bg-carehire-50 px-5 py-2 rounded-full transition-all text-sm flex items-center gap-1.5 group"
        >
          Sign in
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </nav>
  );
};

export default LandingHeader;
