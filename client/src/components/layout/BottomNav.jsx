import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname.split('/')[1] || 'feed';

  const navItems = [
    { id: 'feed', label: 'Home', icon: Home, path: '/feed' },
    { id: 'network', label: 'Network', icon: Users, path: '/network' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { id: 'messaging', label: 'Messages', icon: MessageSquare, path: '/messaging' },
    { id: 'in', label: 'Me', icon: User, path: '/in/me' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 lg:hidden shadow-nav pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id || location.pathname.startsWith(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-carehire-600 text-white shadow-lg shadow-carehire-600/30 -translate-y-0.5'
                  : 'text-slate-400 group-hover:text-carehire-600 dark:group-hover:text-carehire-400'
              }`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-0.5 font-medium transition-colors ${
                isActive ? 'text-carehire-600 dark:text-carehire-400' : 'text-slate-400'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute bottom-1 w-1 h-1 bg-carehire-600 rounded-full"
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
