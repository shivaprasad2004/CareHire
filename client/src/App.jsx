import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
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

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-sky-500/20 selection:text-sky-900">
      
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Main Content Area */}
      <main className="flex-1 ml-20 lg:ml-[280px] transition-all duration-300 relative">
        
        {/* Top Header */}
        <Header activePage={activePage} />

        {/* Dynamic Content */}
        <div className="pt-24 pb-12 px-4 lg:px-8 w-full min-h-screen">
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
    </div>
  );
}

export default App;
