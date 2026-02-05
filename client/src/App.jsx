import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import Feed from './features/feed/Feed';
import Profile from './features/profile/Profile';
import Jobs from './features/jobs/Jobs';
import Network from './features/network/Network';
import Resources from './features/resources/Resources';
import Messages from './features/messages/Messages';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize to determine if we are on mobile
  useEffect(() => {
    const handleResize = () => {
      // Consider < 1024px as "Mobile/Tablet" mode where Sidebar is hidden
      // and BottomNav is shown
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-sky-500/20 selection:text-sky-900 overflow-x-hidden">
      
      {/* Desktop Sidebar Navigation (Hidden on Mobile) */}
      <div className="hidden lg:block">
        <Sidebar 
          activePage={activePage} 
          onNavigate={setActivePage}
          collapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobile={false}
        />
      </div>

      {/* Main Content Area */}
      <main 
        className={`flex-1 transition-all duration-300 relative pb-20 lg:pb-0 ${
          isMobile 
            ? 'ml-0' 
            : isSidebarCollapsed ? 'ml-20' : 'ml-[280px]'
        }`}
      >
        
        {/* Top Header */}
        <Header 
          activePage={activePage} 
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        {/* Dynamic Content */}
        <div className="pt-20 lg:pt-24 px-4 lg:px-8 w-full min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activePage === 'dashboard' && <Feed />}
              {activePage === 'network' && <Network />}
              {activePage === 'jobs' && <Jobs />}
              {activePage === 'profile' && <Profile />}
              {activePage === 'resources' && <Resources />}
              {activePage === 'messages' && <Messages />}
              
              {/* Fallback for other routes */}
              {!['dashboard', 'network', 'jobs', 'profile', 'resources', 'messages'].includes(activePage) && (
                <div className="flex items-center justify-center h-[60vh] text-slate-400">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 capitalize">{activePage}</h2>
                    <p>This module is currently under development.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <BottomNav activePage={activePage} onNavigate={setActivePage} />
      )}

    </div>
  );
}

export default App;
