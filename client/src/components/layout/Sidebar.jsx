import React from 'react';
import { 
  Activity, 
  LayoutGrid, 
  Users, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronRight,
  Briefcase,
  FileText
} from 'lucide-react';
import Logo, { LogoText } from '../ui/Logo';
import { motion } from 'framer-motion';

const Sidebar = ({ activePage, onNavigate, collapsed = false }) => {
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'network', label: 'My Network', icon: Users },
    { id: 'jobs', label: 'Find Jobs', icon: Briefcase, badge: 'NEW' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-xl border-r border-slate-200/50 z-50 flex flex-col transition-all duration-300 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]"
    >
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100/50">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10 shrink-0" />
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <LogoText />
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-4">
          {!collapsed ? 'Menu' : '...'}
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
              <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
              
              {!collapsed && (
                <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
              )}

              {/* Active Indicator (Right Border) if collapsed, or standard visual */}
              {isActive && collapsed && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
              )}
              
              {/* Badge */}
              {item.badge && !collapsed && (
                <span className={`${
                  item.badge === 'NEW' ? 'bg-emerald-500' : 'bg-rose-500'
                } text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[18px] flex items-center justify-center shadow-sm`}>
                  {item.badge}
                </span>
              )}
              {item.badge && collapsed && (
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
          className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
             <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" className="h-full w-full object-cover" alt="User" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-slate-900 truncate">Dr. Sarah Jenkins</h4>
              <p className="text-xs text-slate-500 truncate">Neurologist</p>
            </div>
          )}
          {!collapsed && <ChevronRight size={16} className="text-slate-400" />}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
