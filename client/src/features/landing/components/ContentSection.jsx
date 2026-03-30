import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Stethoscope, GraduationCap, Users, Briefcase, BookOpen, Building2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PillButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-carehire-50 hover:border-carehire-300 hover:text-carehire-700 transition-all text-sm whitespace-nowrap"
  >
    {label}
  </button>
);

const FeatureCard = ({ icon: Icon, title, description, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const ContentSection = () => {
  const navigate = useNavigate();

  const specialties = [
    'Cardiology', 'Emergency Medicine', 'Surgery', 'Pediatrics',
    'Neurology', 'Oncology', 'Psychiatry', 'Radiology',
    'Orthopedics', 'Dermatology', 'Internal Medicine', 'Anesthesiology'
  ];

  const jobs = [
    'Resident Doctor', 'Surgeon', 'Nurse Practitioner', 'Medical Officer',
    'Anesthesiologist', 'Pharmacist', 'Physical Therapist', 'Radiologist',
    'Lab Technician', 'Healthcare Administrator', 'Paramedic', 'Dental Surgeon'
  ];

  return (
    <>
      {/* Features Grid */}
      <section className="py-20 px-4 lg:px-16 xl:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to build your <span className="text-gradient">medical career</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              CareHire connects medical students with the tools, network, and opportunities they need to succeed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Users}
              title="Professional Network"
              description="Connect with fellow medical students, residents, and senior doctors. Build meaningful professional relationships."
              color="bg-gradient-to-br from-carehire-500 to-carehire-600"
              delay={0.1}
            />
            <FeatureCard
              icon={Briefcase}
              title="Job & Residency Search"
              description="Discover internships, residency programs, and healthcare positions tailored to your specialty and experience."
              color="bg-gradient-to-br from-teal-500 to-teal-600"
              delay={0.2}
            />
            <FeatureCard
              icon={BookOpen}
              title="Medical Articles"
              description="Read and contribute to collaborative medical articles. Share your clinical insights and learn from experts."
              color="bg-gradient-to-br from-amber-500 to-amber-600"
              delay={0.3}
            />
            <FeatureCard
              icon={Stethoscope}
              title="Clinical Cases"
              description="Share anonymized clinical cases, discuss diagnoses, and learn from real-world medical scenarios."
              color="bg-gradient-to-br from-rose-500 to-rose-600"
              delay={0.4}
            />
            <FeatureCard
              icon={GraduationCap}
              title="Skill Endorsements"
              description="Get your medical skills endorsed by colleagues and mentors. Showcase your expertise on your profile."
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              delay={0.5}
            />
            <FeatureCard
              icon={Building2}
              title="Hospital Pages"
              description="Follow hospitals, clinics, and research institutions. Stay updated on their latest openings and news."
              color="bg-gradient-to-br from-sky-500 to-sky-600"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4 lg:px-16 xl:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore by specialty</h2>
            <p className="text-slate-500 mb-6">Find articles, professionals, and opportunities in your medical field of interest.</p>
          </div>
          <div className="flex-1 flex flex-wrap gap-3 content-start">
            {specialties.map(s => (
              <PillButton key={s} label={s} onClick={() => navigate(`/articles/${s.toLowerCase().replace(/\s+/g, '-')}`)} />
            ))}
            <button
              onClick={() => navigate('/articles')}
              className="px-4 py-2.5 rounded-full border-2 border-carehire-600 text-carehire-600 font-semibold hover:bg-carehire-50 transition-colors text-sm flex items-center gap-1"
            >
              View all <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 px-4 lg:px-16 xl:px-24 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Find the right role for you</h2>
            <p className="text-slate-500">Search thousands of healthcare positions from top hospitals and medical institutions.</p>
          </div>
          <div className="flex-1 flex flex-wrap gap-3 content-start">
            {jobs.map(j => (
              <PillButton key={j} label={j} onClick={() => navigate('/login')} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 lg:px-16 xl:px-24 bg-gradient-to-br from-carehire-600 to-teal-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to advance your medical career?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of medical students and healthcare professionals who are building their careers on CareHire.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-carehire-700 font-bold px-8 py-4 rounded-full text-lg hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 group"
            >
              Get Started - It's Free
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContentSection;
