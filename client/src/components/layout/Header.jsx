import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, HelpCircle, X, Menu, Check, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';

const Header = ({ activePage, toggleSidebar, isMobile, onLogout }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        // Initialize Socket
        const socketUrl = import.meta.env.VITE_API_URL 
            ? import.meta.env.VITE_API_URL.replace('/api', '') 
            : 'http://localhost:5000';
            
        socketRef.current = io(socketUrl, {
            auth: { token }
        });

        socketRef.current.on('new_notification', (notification) => {
            setNotifications(prev => [notification, ...prev]);
            setUnreadCount(prev => prev + 1);
        });
        
        // Fetch initial notifications
        fetch(`${import.meta.env.VITE_API_URL}/notifications`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                setNotifications(data.data.notifications);
                setUnreadCount(data.data.notifications.filter(n => !n.isRead).length);
            }
        })
        .catch(err => console.error("Error fetching notifications:", err));
    }

    return () => {
        if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
        const token = localStorage.getItem('token');
        await fetch(`${import.meta.env.VITE_API_URL}/notifications/${id}/read`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        setNotifications(prev => prev.map(n => 
            n.id === id ? { ...n, isRead: true } : n
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
        console.error("Error marking notification as read:", err);
    }
  };

  return (
    <header className="min-h-[4rem] lg:min-h-[5rem] bg-white/80 backdrop-blur-xl border-b border-emerald-100/70 sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between transition-all pt-safe">
      
      {/* Mobile: Logo & Profile */}
      {isMobile && (
        <div className="flex items-center gap-3 mr-auto">
          <div className="h-9 w-9 bg-[#00a651] rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-[#00a651]/20">
            CH
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">Care<span className="text-[#00a651]">Hire</span></span>
        </div>
      )}

      {/* Desktop Search Bar (Always Visible) */}
      <div className={`hidden lg:block flex-1 max-w-xl ${isMobile ? 'hidden' : ''} mx-auto`}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search for colleagues, research, or guidelines..." 
            className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 text-sm rounded-xl pl-10 pr-16 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white focus:border-emerald-500/40 transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50 group-focus-within:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-slate-500 border border-slate-200 rounded-md px-1.5 py-0.5 bg-slate-100 shadow-sm">CTRL K</span>
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
        
        <div className="relative">
            <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all relative"
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 sm:top-2 sm:right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>

            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                    >
                        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-sm text-slate-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="text-xs text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full">{unreadCount} new</span>
                            )}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 text-sm">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div key={notif.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors flex gap-3 ${!notif.isRead ? 'bg-sky-50/30' : ''}`}>
                                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notif.isRead ? 'bg-sky-500' : 'bg-slate-200'}`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-800 leading-snug">{notif.message}</p>
                                            <span className="text-[10px] text-slate-400 mt-1 block">
                                                {new Date(notif.createdAt).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        {!notif.isRead && (
                                            <button 
                                                onClick={() => handleMarkAsRead(notif.id)}
                                                className="text-slate-300 hover:text-sky-500 self-center"
                                                title="Mark as read"
                                            >
                                                <Check size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Desktop Profile Pic (since mobile has it in bottom nav or elsewhere? Actually let's keep it here for consistency) */}
        {!isMobile && (
             <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        )}
        
        <button 
            onClick={onLogout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
            title="Logout"
        >
            <LogOut size={22} />
        </button>

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
