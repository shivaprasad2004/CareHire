import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import Feed from './features/feed/Feed';
import Profile from './features/profile/Profile';
import Jobs from './features/jobs/Jobs';
import Network from './features/network/Network';
import Resources from './features/resources/Resources';
import Messages from './features/messages/Messages';
import Auth from './features/auth/Auth';
import LandingPage from './features/landing/LandingPage';
import FAB from './components/ui/FAB';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [targetConversationId, setTargetConversationId] = useState(null);

  // Derive activePage from URL for highlighting navigation
  // e.g. /dashboard -> dashboard, /messages -> messages
  const activePage = location.pathname.split('/')[1] || 'dashboard';

  // Check for logged in user
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoadingUser(false);
  }, []);

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

  const handleLogin = (userData, token) => {
    setUser(userData);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setTargetConversationId(null);
    navigate('/');
  };

  const handleNavigate = (page) => {
    navigate(`/${page}`);
  };

  if (isLoadingUser) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  // Unauthenticated Routes
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={
          <LandingPage 
            onLoginClick={() => navigate('/login')} 
            onJoinClick={() => navigate('/login')} 
          />
        } />
        <Route path="/login" element={
          <Auth onLogin={handleLogin} onBack={() => navigate('/')} />
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // Authenticated Routes & Layout
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-sky-500/20 selection:text-sky-900 overflow-x-hidden">
      
      {/* Desktop Sidebar Navigation (Hidden on Mobile) */}
      <div className="hidden lg:block">
        <Sidebar 
          activePage={activePage} 
          onNavigate={handleNavigate}
          collapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobile={false}
          onLogout={handleLogout}
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
        
          {/* Header */}
          <Header 
            activePage={activePage} 
            toggleSidebar={toggleSidebar}
            isMobile={isMobile}
            onLogout={handleLogout}
          />

        {/* Dynamic Content */}
        <div className="pt-20 lg:pt-24 px-4 lg:px-8 w-full min-h-screen">
          <AnimatePresence mode="wait">
            {/* Wrap Routes in a motion.div is tricky because Routes renders the component. 
                Instead, we can wrap the element inside each Route, or use useLocation key on Routes?
                Actually, wrapping Routes in AnimatePresence doesn't work directly for page transitions.
                We need to wrap the outlet or the rendered component.
                Let's use a wrapper component for page transitions.
            */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              
              <Route path="/dashboard" element={
                <PageTransition>
                  <Feed user={user} />
                </PageTransition>
              } />
              
              <Route path="/network" element={
                <PageTransition>
                  <Network user={user} onNavigate={handleNavigate} setTargetConversationId={setTargetConversationId} />
                </PageTransition>
              } />
              
              <Route path="/jobs" element={
                <PageTransition>
                  <Jobs user={user} />
                </PageTransition>
              } />
              
              <Route path="/profile" element={
                <PageTransition>
                  <Profile user={user} />
                </PageTransition>
              } />
              
              <Route path="/resources" element={
                <PageTransition>
                  <Resources user={user} />
                </PageTransition>
              } />
              
              <Route path="/messages" element={
                <PageTransition>
                  <Messages user={user} targetConversationId={targetConversationId} setTargetConversationId={setTargetConversationId} />
                </PageTransition>
              } />
              
              <Route path="*" element={
                <PageTransition>
                  <div className="flex items-center justify-center h-[60vh] text-slate-400">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2 capitalize">{activePage}</h2>
                      <p>This module is currently under development.</p>
                    </div>
                  </div>
                </PageTransition>
              } />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <>
          <FAB />
          <BottomNav activePage={activePage} onNavigate={handleNavigate} />
        </>
      )}

    </div>
  );
}

// Helper component for page transitions
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

export default App;
