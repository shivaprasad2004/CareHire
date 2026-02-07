import React from 'react';
import LandingHeader from './components/LandingHeader';
import HeroSection from './components/HeroSection';
import ContentSection from './components/ContentSection';
import LandingFooter from './components/LandingFooter';

const LandingPage = ({ onLoginClick, onJoinClick }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <LandingHeader onLoginClick={onLoginClick} onJoinClick={onJoinClick} />
      <HeroSection onLoginClick={onLoginClick} onJoinClick={onJoinClick} />
      <ContentSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
