import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Users, Briefcase, MessageSquare, Bell, ChevronDown,
  Settings, Moon, Sun, LogOut, Building2, BookOpen,
  Plus, Search, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../../config/api';
import { notificationService } from '../../services/notificationService';
import SearchBar from '../ui/SearchBar';
import Avatar from '../ui/Avatar';
import useAuthStore from '../../stores/authStore';
import useUiStore from '../../stores/uiStore';
import useNotificationStore from '../../stores/notificationStore';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(s => s.user);
  const { theme, toggleTheme, isMobile } = useUiStore();
  const { notifications, unreadCount, setNotifications, addNotification, markAsRead } = useNotificationStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const socketRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const createRef = useRef(null);

  const activePage = location.pathname.split('/')[1] || 'feed';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      socketRef.current = io(API_BASE_URL, { auth: { token } });
      socketRef.current.on('new_notification', (notification) => {
        addNotification(notification);
      });
      notificationService.getAllNotifications()
        .then(data => {
          if (data.status === 'success') {
            setNotifications(data.data.notifications || []);
          }
        })
        .catch(err => console.error('Notification fetch error:', err));
    }
    return () => { if (socketRef.current) socketRef.current.disconnect(); };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
      if (createRef.current && !createRef.current.contains(e.target)) setShowCreateMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      markAsRead(id);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home', path: '/feed' },
    { id: 'network', icon: Users, label: 'Network', path: '/network' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs', path: '/jobs' },
    { id: 'messaging', icon: MessageSquare, label: 'Messages', path: '/messaging' },
  ];

  const createItems = [
    { icon: BookOpen, label: 'Write a post', action: () => navigate('/feed') },
    { icon: Briefcase, label: 'Post a job', action: () => navigate('/jobs/post') },
    { icon: Building2, label: 'Create organization', action: () => navigate('/organization/new') },
  ];

  return (
    <header className="glass-header sticky top-0 z-40 pt-safe">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center h-16 gap-2 lg:gap-4">

          {/* Logo */}
          <button onClick={() => navigate('/feed')} className="flex items-center gap-2 shrink-0">
            <div className="h-9 w-9 bg-gradient-to-br from-carehire-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-carehire-600/20 text-sm">
              CH
            </div>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight text-lg hidden xl:inline">
              Care<span className="text-carehire-600">Hire</span>
            </span>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-auto">
            {navItems.map((item) => {
              const isActive = activePage === item.id || location.pathname.startsWith(item.path);
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center justify-center px-4 py-1 min-w-[76px] rounded-lg transition-all relative group ${
                    isActive
                      ? 'text-carehire-600 dark:text-carehire-400'
                      : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className="text-[11px] mt-0.5 font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="headerNav"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-carehire-600 dark:bg-carehire-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`flex flex-col items-center justify-center px-4 py-1 min-w-[76px] rounded-lg transition-all relative ${
                  showNotifications ? 'text-carehire-600' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                <div className="relative">
                  <Bell size={22} strokeWidth={1.8} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-[11px] mt-0.5 font-medium">Alerts</span>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="dropdown-menu right-0 top-full mt-2 w-96"
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-carehire-600 font-bold bg-carehire-50 dark:bg-carehire-900/30 px-2.5 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-[360px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm">No notifications yet</div>
                      ) : (
                        notifications.slice(0, 10).map(notif => (
                          <div
                            key={notif.id}
                            className={`flex gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800/50 ${
                              !notif.isRead ? 'bg-carehire-50/30 dark:bg-carehire-950/10' : ''
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notif.isRead ? 'bg-carehire-500' : 'bg-transparent'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{notif.message}</p>
                              <span className="text-[11px] text-slate-400 mt-1 block">
                                {new Date(notif.createdAt).toLocaleString()}
                              </span>
                            </div>
                            {!notif.isRead && (
                              <button onClick={() => handleMarkAsRead(notif.id)} className="text-slate-300 hover:text-carehire-500 self-center shrink-0">
                                <Check size={14} />
                              </button>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={() => { navigate('/notifications'); setShowNotifications(false); }}
                        className="w-full py-3 text-sm text-carehire-600 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center border-t border-slate-100 dark:border-slate-800"
                      >
                        View all notifications
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex flex-col items-center justify-center px-3 py-1 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 transition-all"
              >
                <Avatar src={user?.avatarUrl} name={user ? `${user.firstName} ${user.lastName}` : '?'} size="xs" />
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span className="text-[11px] font-medium">Me</span>
                  <ChevronDown size={12} />
                </div>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="dropdown-menu right-0 top-full mt-2 w-72"
                  >
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <Avatar src={user?.avatarUrl} name={user ? `${user.firstName} ${user.lastName}` : '?'} size="lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 dark:text-white truncate">{user?.firstName} {user?.lastName}</h4>
                          <p className="text-xs text-slate-500 truncate">{user?.headline || user?.title || user?.specialty || 'Medical Professional'}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { navigate('/in/me'); setShowProfileMenu(false); }}
                        className="w-full mt-3 py-1.5 text-sm font-semibold text-carehire-600 border border-carehire-600 rounded-full hover:bg-carehire-50 dark:hover:bg-carehire-950 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                    <div className="py-1">
                      <button onClick={() => { navigate('/settings'); setShowProfileMenu(false); }} className="dropdown-item w-full">
                        <Settings size={18} className="text-slate-400" /> Settings & Privacy
                      </button>
                      <button onClick={toggleTheme} className="dropdown-item w-full">
                        {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-400" />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      <button onClick={() => { navigate('/resources'); setShowProfileMenu(false); }} className="dropdown-item w-full">
                        <BookOpen size={18} className="text-slate-400" /> Resources
                      </button>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                      <button onClick={() => { onLogout(); setShowProfileMenu(false); }} className="dropdown-item-danger w-full">
                        <LogOut size={18} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Create Button */}
            <div ref={createRef} className="relative">
              <button
                onClick={() => setShowCreateMenu(!showCreateMenu)}
                className="btn btn-primary text-sm py-2 px-4 rounded-lg flex items-center gap-1.5"
              >
                <Plus size={18} />
                <span className="hidden xl:inline">Create</span>
              </button>
              <AnimatePresence>
                {showCreateMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="dropdown-menu right-0 top-full mt-2 w-56"
                  >
                    <div className="py-1">
                      {createItems.map((item, i) => (
                        <button key={i} onClick={() => { item.action(); setShowCreateMenu(false); }} className="dropdown-item w-full">
                          <item.icon size={18} className="text-slate-400" /> {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 ml-auto lg:hidden">
            <button onClick={() => setShowMobileSearch(true)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <Search size={22} />
            </button>
            <button onClick={toggleTheme} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
            <button onClick={() => navigate('/feed')} className="btn btn-primary text-sm py-1.5 px-3 rounded-lg">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-slate-900 z-[60] flex items-start pt-4 px-4"
          >
            <div className="flex items-center gap-2 w-full">
              <SearchBar className="flex-1" />
              <button onClick={() => setShowMobileSearch(false)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full shrink-0">
                <X size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
