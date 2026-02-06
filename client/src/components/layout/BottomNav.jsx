import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  MessageSquare, 
  Briefcase, 
  FileText 
} from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = ({ activePage, onNavigate }) => {
  
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutGrid },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, badge: 'NEW' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
    { id: 'resources', label: 'Resources', icon: FileText },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 min-h-[4rem] bg-white/90 backdrop-blur-xl border-t border-slate-200 z-50 lg:hidden pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center justify-center w-full h-full space-y-1 group"
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 -translate-y-1' : 'text-slate-400 group-hover:text-slate-600'
              }`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Badge */}
                {item.badge && (
                  <span className={`absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] text-[9px] font-bold text-white rounded-full ring-2 ring-white ${
                    item.badge === 'NEW' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}>
                    {item.badge === 'NEW' ? 'N' : item.badge}
                  </span>
                )}
              </div>
              
              <span className={`text-[10px] font-medium transition-colors ${
                isActive ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {item.label}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div 
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-1 w-1 h-1 bg-slate-900 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;