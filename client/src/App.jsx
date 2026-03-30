import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './stores/authStore';
import useUiStore from './stores/uiStore';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import FAB from './components/ui/FAB';
import NotFound from './components/ui/NotFound';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Core Pages (eager loaded)
import Feed from './features/feed/Feed';
import Auth from './features/auth/Auth';
import LandingPage from './features/landing/LandingPage';

// Lazy loaded pages
const Profile = lazy(() => import('./features/profile/Profile'));
const PublicProfile = lazy(() => import('./features/profile/PublicProfile'));
const Jobs = lazy(() => import('./features/jobs/Jobs'));
const JobDetail = lazy(() => import('./features/jobs/JobDetail'));
const PostJob = lazy(() => import('./features/jobs/PostJob'));
const SavedJobs = lazy(() => import('./features/jobs/SavedJobs'));
const AppliedJobs = lazy(() => import('./features/jobs/AppliedJobs'));
const ManageApplicants = lazy(() => import('./features/jobs/ManageApplicants'));
const Network = lazy(() => import('./features/network/Network'));
const Resources = lazy(() => import('./features/resources/Resources'));
const Messages = lazy(() => import('./features/messages/Messages'));
const ArticlesPage = lazy(() => import('./features/articles/ArticlesPage'));
const ArticleReader = lazy(() => import('./features/articles/ArticleReader'));
const OrganizationPage = lazy(() => import('./features/organization/OrganizationPage'));
const CreateOrganization = lazy(() => import('./features/organization/CreateOrganization'));
const OrgAdmin = lazy(() => import('./features/organization/OrgAdmin'));
const PostDetail = lazy(() => import('./features/feed/PostDetail'));
const SearchPage = lazy(() => import('./features/search/SearchPage'));
const Settings = lazy(() => import('./features/settings/Settings'));
const NotificationsPage = lazy(() => import('./features/notifications/NotificationsPage'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-carehire-600 to-teal-500 animate-pulse-soft" />
      <div className="text-sm text-slate-400 font-medium">Loading...</div>
    </div>
  </div>
);

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login, logout } = useAuthStore();
  const { isMobile, setIsMobile, sidebarCollapsed, toggleSidebar, theme } = useUiStore();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Load user on mount
  useEffect(() => {
    setIsLoadingUser(false);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  const handleLogin = (userData, token) => {
    login(userData, token);
    navigate('/feed');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-carehire-600 to-teal-500 animate-pulse-soft" />
          <span className="text-sm text-slate-400 font-medium">Loading CareHire...</span>
        </div>
      </div>
    );
  }

  // Unauthenticated Routes
  if (!user) {
    return (
      <>
        <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
        <Routes>
          <Route path="/" element={<LandingPage onLoginClick={() => navigate('/login')} onJoinClick={() => navigate('/login')} />} />
          <Route path="/login" element={<Auth onLogin={handleLogin} onBack={() => navigate('/')} />} />
          <Route path="/signup" element={<Auth onLogin={handleLogin} onBack={() => navigate('/')} defaultTab="register" />} />
          <Route path="/articles" element={<Suspense fallback={<PageLoader />}><ArticlesPage /></Suspense>} />
          <Route path="/articles/:topic" element={<Suspense fallback={<PageLoader />}><ArticlesPage /></Suspense>} />
          <Route path="/article/:id" element={<Suspense fallback={<PageLoader />}><ArticleReader /></Suspense>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    );
  }

  // Authenticated Routes
  return (
    <div className="flex min-h-screen bg-[#F3FBF7] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-carehire-500/20 overflow-x-hidden">
      <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isMobile={false}
          onLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 relative pb-20 lg:pb-0 ${
        isMobile ? 'ml-0' : sidebarCollapsed ? 'ml-[72px]' : 'ml-[280px]'
      }`}>
        <Header onLogout={handleLogout} />

        <div className="pt-4 px-4 lg:px-8 w-full min-h-screen max-w-7xl mx-auto">
          <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes location={location} key={location.pathname}>
                {/* Redirects */}
                <Route path="/" element={<Navigate to="/feed" />} />
                <Route path="/dashboard" element={<Navigate to="/feed" />} />

                {/* Feed */}
                <Route path="/feed" element={<PageTransition><Feed user={user} /></PageTransition>} />
                <Route path="/post/:postId" element={<PageTransition><PostDetail /></PageTransition>} />

                {/* Profile */}
                <Route path="/profile" element={<Navigate to="/in/me" />} />
                <Route path="/in/me" element={<PageTransition><Profile user={user} onUpdateUser={(u) => useAuthStore.getState().updateUser(u)} /></PageTransition>} />
                <Route path="/in/:userId" element={<PageTransition><PublicProfile /></PageTransition>} />

                {/* Network */}
                <Route path="/network" element={<PageTransition><Network user={user} /></PageTransition>} />
                <Route path="/network/invitations" element={<PageTransition><Network user={user} defaultTab="invitations" /></PageTransition>} />

                {/* Jobs */}
                <Route path="/jobs" element={<PageTransition><Jobs user={user} /></PageTransition>} />
                <Route path="/jobs/:jobId" element={<PageTransition><JobDetail /></PageTransition>} />
                <Route path="/jobs/post" element={<PageTransition><PostJob /></PageTransition>} />
                <Route path="/jobs/saved" element={<PageTransition><SavedJobs /></PageTransition>} />
                <Route path="/jobs/applied" element={<PageTransition><AppliedJobs /></PageTransition>} />
                <Route path="/jobs/manage/:jobId" element={<PageTransition><ManageApplicants /></PageTransition>} />

                {/* Messages */}
                <Route path="/messaging" element={<PageTransition><Messages user={user} /></PageTransition>} />
                <Route path="/messaging/:conversationId" element={<PageTransition><Messages user={user} /></PageTransition>} />

                {/* Organizations */}
                <Route path="/organization/new" element={<PageTransition><CreateOrganization /></PageTransition>} />
                <Route path="/organization/:slug" element={<PageTransition><OrganizationPage /></PageTransition>} />
                <Route path="/organization/:slug/admin" element={<PageTransition><OrgAdmin /></PageTransition>} />

                {/* Search */}
                <Route path="/search" element={<PageTransition><SearchPage /></PageTransition>} />

                {/* Notifications */}
                <Route path="/notifications" element={<PageTransition><NotificationsPage /></PageTransition>} />

                {/* Settings */}
                <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
                <Route path="/settings/:section" element={<PageTransition><Settings /></PageTransition>} />

                {/* Resources & Articles */}
                <Route path="/resources" element={<PageTransition><Resources user={user} /></PageTransition>} />
                <Route path="/articles" element={<PageTransition><ArticlesPage /></PageTransition>} />
                <Route path="/articles/:topic" element={<PageTransition><ArticlesPage /></PageTransition>} />
                <Route path="/article/:id" element={<PageTransition><ArticleReader /></PageTransition>} />

                {/* 404 */}
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </Suspense>
          </AnimatePresence>
          </ErrorBoundary>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <>
          <FAB />
          <BottomNav />
        </>
      )}
    </div>
  );
}

export default App;
