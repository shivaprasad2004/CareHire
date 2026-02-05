import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  MessageSquare, 
  Briefcase,
  FileText,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import Logo, { LogoText } from '../ui/Logo';
import { motion } from 'framer-motion';

const Sidebar = ({ 
  activePage, 
  onNavigate, 
  collapsed = false, 
  mobileOpen = false, 
  toggleSidebar, 
  isMobile,
  closeMobileMenu
}) => {
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'network', label: 'My Network', icon: Users },
    { id: 'jobs', label: 'Find Jobs', icon: Briefcase, badge: 'NEW' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  // Determine sidebar variants based on mode
  const sidebarVariants = isMobile ? {
    open: { x: 0, width: 280 },
    closed: { x: "-100%", width: 280 }
  } : {
    open: { width: 280, x: 0 },
    collapsed: { width: 80, x: 0 }
  };

  return (
    <motion.aside 
      initial={isMobile ? "closed" : "open"}
      animate={isMobile ? (mobileOpen ? "open" : "closed") : (collapsed ? "collapsed" : "open")}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/50 z-50 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]`}
    >
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100/50 justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <Logo className="w-10 h-10 shrink-0" />
          {(!collapsed || isMobile) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <LogoText />
            </motion.div>
          )}
        </div>
        
        {/* Mobile Close Button */}
        {isMobile && (
          <button onClick={closeMobileMenu} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-4 whitespace-nowrap overflow-hidden">
          {(!collapsed || isMobile) ? 'Menu' : '...'}
        </div>
        
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <item.icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
              
              {(!collapsed || isMobile) && (
                <span className="font-medium text-sm flex-1 text-left whitespace-nowrap overflow-hidden">{item.label}</span>
              )}

              {/* Active Indicator (Right Border) if collapsed, or standard visual */}
              {isActive && collapsed && !isMobile && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
              )}
              
              {/* Badge */}
              {item.badge && (!collapsed || isMobile) && (
                <span className={`${
                  item.badge === 'NEW' ? 'bg-emerald-500' : 'bg-rose-500'
                } text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[18px] flex items-center justify-center shadow-sm ml-auto`}>
                  {item.badge}
                </span>
              )}
              {item.badge && collapsed && !isMobile && (
                <span className={`absolute top-2 right-2 h-2 w-2 ${
                  item.badge === 'NEW' ? 'bg-emerald-500' : 'bg-rose-500'
                } rounded-full border-2 border-white`}></span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Profile Snippet */}
      <div className="p-4 border-t border-slate-100">
        <div 
          onClick={() => onNavigate('profile')}
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer ${collapsed && !isMobile ? 'justify-center' : ''}`}
        >
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
             <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" className="h-full w-full object-cover" alt="User" />
          </div>
          {(!collapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-900 truncate">Dr. Sarah Jenkins</h4>
              <p className="text-xs text-slate-500 truncate">Neurologist</p>
            </div>
          )}
          {(!collapsed || isMobile) && <ChevronRight size={16} className="text-slate-400" />}
        </div>
      </div>

      {/* Desktop Collapse Toggle */}
      {!isMobile && (
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-24 h-6 w-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md text-slate-400 hover:text-sky-600 transition-colors z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      )}
    </motion.aside>
  );
};

export default Sidebar;
