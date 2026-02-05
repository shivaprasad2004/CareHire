import React, { useState } from 'react';
import { Search, Bell, HelpCircle, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ activePage, toggleSidebar, isMobile }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between transition-all">
      
      {/* Mobile: Logo & Profile */}
      {isMobile && (
        <div className="flex items-center gap-3 mr-auto">
          <div className="h-8 w-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
            CH
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">CareHire</span>
        </div>
      )}

      {/* Desktop Search Bar (Always Visible) */}
      <div className={`hidden lg:block flex-1 max-w-xl ${isMobile ? 'hidden' : ''} mx-auto`}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for colleagues, research, or guidelines..." 
            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white focus:border-sky-500/30 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white shadow-sm">CTRL K</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Toggle & Expanded View */}
      {isMobile && (
        <AnimatePresence>
          {isSearchOpen ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-white z-50 flex items-center px-4 gap-2"
            >
              <Search className="text-slate-400 shrink-0" size={20} />
              <input 
                type="text" 
                autoFocus
                placeholder="Search CareHire..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-base"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500"
              >
                <X size={18} />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto lg:ml-6">
        
        {/* Mobile Search Trigger */}
        {isMobile && (
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
          >
            <Search size={22} />
          </button>
        )}

        <button className="hidden sm:block p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all relative">
          <HelpCircle size={20} />
        </button>
        
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all relative">
          <Bell size={22} />
          <span className="absolute top-2 right-2.5 sm:top-2 sm:right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Desktop Profile Pic (since mobile has it in bottom nav or elsewhere? Actually let's keep it here for consistency) */}
        {!isMobile && (
             <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        )}
        
        {/* Create Button - Compact on Mobile */}
        <button className="btn btn-primary text-sm py-2 px-3 sm:px-5 rounded-xl shadow-slate-900/20 whitespace-nowrap flex items-center gap-2">
          <span className="text-lg leading-none font-light sm:hidden">+</span>
          <span className="hidden sm:inline">+ New Case</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
