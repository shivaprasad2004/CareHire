import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40 px-8 flex items-center justify-between transition-all">
      {/* Search Bar - Professional & Clean */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for colleagues, research, or guidelines..." 
            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white focus:border-sky-500/30 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white shadow-sm">CTRL K</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-6">
        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all relative">
          <HelpCircle size={20} />
        </button>
        <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <button className="btn btn-primary text-sm py-2 px-5 rounded-xl shadow-slate-900/20">
          + New Patient Case
        </button>
      </div>
    </header>
  );
};

export default Header;
