import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Stethoscope, GraduationCap, Briefcase, Heart } from 'lucide-react';

const HeroSection = ({ onLoginClick, onJoinClick }) => {
  const stats = [
    { number: '50K+', label: 'Medical Students' },
    { number: '12K+', label: 'Healthcare Jobs' },
    { number: '3K+', label: 'Organizations' },
  ];

  const features = [
    'Connect with medical professionals worldwide',
    'Find healthcare internships & residencies',
    'Share clinical cases & medical research',
    'Build your medical career profile',
  ];

  return (
    <section className="flex-1 flex flex-col lg:flex-row items-center px-4 lg:px-16 xl:px-24 py-12 lg:py-20 gap-12 lg:gap-20 max-w-7xl mx-auto w-full min-h-[calc(100vh-64px)]">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-8 max-w-xl"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-carehire-50 text-carehire-700 rounded-full text-sm font-semibold mb-6"
          >
            <Stethoscope size={16} />
            The #1 Network for Medical Students
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-slate-900 leading-[1.1] tracking-tight">
            Your medical career
            <span className="block mt-2 text-gradient">starts here</span>
          </h1>

          <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-lg">
            Join the largest professional network built exclusively for medical students and healthcare professionals. Find opportunities, share knowledge, grow together.
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle size={18} className="text-carehire-600 shrink-0" />
              <span className="text-slate-700 text-sm font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button
            onClick={onJoinClick}
            className="btn btn-gradient text-base px-8 py-3.5 rounded-full shadow-xl shadow-carehire-600/20 group"
          >
            Join CareHire - It's Free
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onLoginClick}
            className="btn btn-secondary text-base px-8 py-3.5 rounded-full"
          >
            Sign In
          </button>
        </motion.div>

        {/* Stats */}
        <div className="flex items-center gap-8 pt-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-slate-900">{stat.number}</div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Visual */}
      <motion.div
        initial={{ opacity: 0, x: 30, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex-1 w-full max-w-lg relative"
      >
        {/* Background Decorations */}
        <div className="absolute -top-8 -right-8 w-72 h-72 bg-carehire-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-teal-200/30 rounded-full blur-3xl" />

        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 space-y-6">
          {/* Floating Icons */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 border border-slate-100"
          >
            <Stethoscope size={24} className="text-carehire-600" />
          </motion.div>
          <motion.div
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 border border-slate-100"
          >
            <GraduationCap size={24} className="text-teal-500" />
          </motion.div>

          {/* Profile Preview */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-carehire-500 to-teal-400 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              JS
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Dr. Jane Smith</h3>
              <p className="text-sm text-slate-500">Cardiology Resident, AIIMS</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Briefcase, label: 'Jobs Applied', value: '12' },
              { icon: Heart, label: 'Connections', value: '248' },
              { icon: GraduationCap, label: 'Certifications', value: '6' },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 bg-slate-50 rounded-xl">
                <item.icon size={18} className="text-carehire-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-slate-900">{item.value}</div>
                <div className="text-[10px] text-slate-500 font-medium">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {['Cardiology', 'Emergency Medicine', 'Research', 'Surgery', 'Patient Care'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-carehire-50 text-carehire-700 rounded-full text-xs font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Connection Prompt */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 ring-2 ring-white">
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-medium">+2.4K mutual connections</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
