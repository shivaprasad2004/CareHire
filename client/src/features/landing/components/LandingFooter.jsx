import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingFooter = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'General',
      links: [
        { label: 'Sign Up', path: '/signup' },
        { label: 'Help Center', path: '#' },
        { label: 'About', path: '#' },
        { label: 'Press', path: '#' },
        { label: 'Blog', path: '/articles' },
        { label: 'Careers', path: '/login' },
      ],
    },
    {
      title: 'Browse CareHire',
      links: [
        { label: 'Medical Articles', path: '/articles' },
        { label: 'Find Jobs', path: '/login' },
        { label: 'People', path: '/login' },
        { label: 'Organizations', path: '/login' },
        { label: 'Resources', path: '/articles' },
      ],
    },
    {
      title: 'Specialties',
      links: [
        { label: 'Cardiology', path: '/articles/cardiology' },
        { label: 'Surgery', path: '/articles/surgery' },
        { label: 'Pediatrics', path: '/articles/pediatrics' },
        { label: 'Emergency Medicine', path: '/articles/emergency-medicine' },
        { label: 'Neurology', path: '/articles/neurology' },
      ],
    },
    {
      title: 'For Organizations',
      links: [
        { label: 'Post a Job', path: '/login' },
        { label: 'Create Page', path: '/login' },
        { label: 'Recruiting', path: '/login' },
        { label: 'Advertising', path: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Brand */}
          <div className="lg:w-1/4">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 bg-gradient-to-br from-carehire-500 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                CH
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Care<span className="text-carehire-400">Hire</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              The professional network built for medical students and healthcare professionals worldwide.
            </p>
          </div>

          {/* Link Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            {sections.map(section => (
              <div key={section.title}>
                <h4 className="text-sm font-bold text-white mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.label}>
                      <button
                        onClick={() => navigate(link.path)}
                        className="text-sm hover:text-carehire-400 transition-colors"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} CareHire. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Cookie Policy</button>
            <button className="hover:text-white transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
