import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid, Users, MessageSquare, Briefcase, FileText,
  ChevronRight, ChevronLeft, X, LogOut, BookOpen,
  Settings, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';
import ProgressBar from '../ui/ProgressBar';
import useAuthStore from '../../stores/authStore';

const Sidebar = ({ collapsed = false, mobileOpen = false, toggleSidebar, isMobile, closeMobileMenu, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(s => s.user);
  const activePage = location.pathname.split('/')[1] || 'feed';

  const navItems = [
    { id: 'feed', label: 'Home', icon: LayoutGrid, path: '/feed' },
    { id: 'network', label: 'My Network', icon: Users, path: '/network' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs', badge: 'NEW' },
    { id: 'messaging', label: 'Messages', icon: MessageSquare, path: '/messaging' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  ];

  const secondaryItems = [
    { id: 'resources', label: 'Resources', icon: BookOpen, path: '/resources' },
    { id: 'articles', label: 'Articles', icon: FileText, path: '/articles' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile && closeMobileMenu) closeMobileMenu();
  };

  const sidebarVariants = isMobile ? {
    open: { x: 0, width: 300 },
    closed: { x: '-100%', width: 300 }
  } : {
    open: { width: 280, x: 0 },
    collapsed: { width: 72, x: 0 }
  };

  const profileStrength = user ? [user.avatarUrl, user.bio, user.skills, user.experience, user.education].filter(Boolean).length * 20 : 0;

  return (
    <>
      {isMobile && mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      <motion.aside
        initial={isMobile ? 'closed' : 'open'}
        animate={isMobile ? (mobileOpen ? 'open' : 'closed') : (collapsed ? 'collapsed' : 'open')}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800 z-50 flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]"
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-5 border-b border-slate-100 dark:border-slate-800 justify-between shrink-0">
          <button onClick={() => handleNavigate('/feed')} className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-9 w-9 bg-gradient-to-br from-carehire-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-carehire-600/20 text-sm shrink-0">
              CH
            </div>
            {(!collapsed || isMobile) && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-slate-900 dark:text-white tracking-tight text-lg whitespace-nowrap">
                Care<span className="text-carehire-600">Hire</span>
              </motion.span>
            )}
          </button>
          {isMobile && (
            <button onClick={closeMobileMenu} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Profile Card */}
        {(!collapsed || isMobile) && (
          <div className="px-4 pt-4 pb-2">
            <div
              onClick={() => handleNavigate('/in/me')}
              className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-carehire-50/30 dark:from-slate-800 dark:to-carehire-950/30 cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <Avatar src={user?.avatarUrl} name={user ? `${user.firstName} ${user.lastName}` : ''} size="md" status="online" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</h4>
                  <p className="text-xs text-slate-500 truncate">{user?.headline || user?.specialty || 'Medical Professional'}</p>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar value={profileStrength} label="Profile strength" size="sm" showPercentage={false} />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar">
          {(!collapsed || isMobile) && (
            <div className="text-[10px] font-bold text-slate-400/80 uppercase tracking-widest px-3 mb-2">Navigate</div>
          )}
          {navItems.map((item) => {
            const isActive = activePage === item.id || location.pathname.startsWith(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-carehire-600 text-white shadow-lg shadow-carehire-600/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-carehire-600 dark:hover:text-carehire-400'
                } ${collapsed && !isMobile ? 'justify-center' : ''}`}
              >
                <item.icon size={20} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-carehire-600 dark:group-hover:text-carehire-400'}`} />
                {(!collapsed || isMobile) && (
                  <span className="font-medium text-sm flex-1 text-left whitespace-nowrap">{item.label}</span>
                )}
                {item.badge && (!collapsed || isMobile) && (
                  <span className="bg-carehire-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">{item.badge}</span>
                )}
              </button>
            );
          })}

          {(!collapsed || isMobile) ? (
            <>
              <div className="my-4 border-t border-slate-100 dark:border-slate-800" />
              <div className="text-[10px] font-bold text-slate-400/80 uppercase tracking-widest px-3 mb-2">Explore</div>
            </>
          ) : (
            <div className="my-4 border-t border-slate-100 dark:border-slate-800" />
          )}

          {secondaryItems.map((item) => {
            const isActive = activePage === item.id || location.pathname.startsWith(item.path);
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-carehire-600 dark:text-carehire-400'
                    : 'text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300'
                } ${collapsed && !isMobile ? 'justify-center' : ''}`}
              >
                <item.icon size={20} className="shrink-0" />
                {(!collapsed || isMobile) && (
                  <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 transition-all ${
              collapsed && !isMobile ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            {(!collapsed || isMobile) && <span className="font-medium text-sm">Sign Out</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-3 top-20 h-6 w-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-md text-slate-400 hover:text-carehire-600 transition-colors z-50"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
