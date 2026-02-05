import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Globe, GraduationCap, Stethoscope, Search, Filter, Briefcase, CheckCircle2, ChevronRight, Star, HeartPulse, Activity, Pill, Microscope, Smile } from 'lucide-react';

const jobsData = [
  {
    id: 1,
    hospital: "Mayo Clinic",
    location: "Rochester, MN (Urban)",
    role: "Internal Medicine Residency",
    type: "Residency",
    salary: "$68,000/yr",
    tags: ["J1 Visa Sponsor", "Research Track"],
    match: 98,
    logo: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=200&h=200",
    requirements: ["USMLE Step 1 > 240", "3 LoRs", "Clinical Experience"],
    scope: "urban"
  },
  {
    id: 4,
    hospital: "Seattle Children's",
    location: "Seattle, WA",
    role: "Pediatric Nurse Practitioner",
    type: "Full-time",
    salary: "$120,000/yr",
    tags: ["Nursing", "Pediatrics"],
    match: 95,
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200&h=200",
    requirements: ["MSN", "RN License", "PALS Certification"],
    scope: "urban"
  },
  {
    id: 5,
    hospital: "Cleveland Clinic",
    location: "Cleveland, OH",
    role: "Radiology Technician",
    type: "Allied Health",
    salary: "$75,000/yr",
    tags: ["Radiology", "Technician"],
    match: 88,
    logo: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=200&h=200",
    requirements: ["ARRT Certification", "MRI Experience"],
    scope: "urban"
  },
  {
    id: 2,
    hospital: "Rural Health Alliance",
    location: "Appalachia Region (Rural)",
    role: "General Practitioner - Student Placement",
    type: "Internship",
    salary: "$4,000/mo stipend",
    tags: ["Housing Provided", "Loan Forgiveness"],
    match: 92,
    logo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200&h=200",
    requirements: ["Final Year Med Student", "Family Medicine Interest"],
    scope: "rural"
  },
  {
    id: 3,
    hospital: "King's College Hospital",
    location: "London, UK (International)",
    role: "Clinical Fellow in Cardiology",
    type: "Fellowship",
    salary: "£52,000/yr",
    tags: ["Tier 2 Visa", "Relocation Support"],
    match: 85,
    logo: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=200&h=200",
    requirements: ["MRCP(UK)", "GMC Registration", "2 Years Core Training"],
    scope: "international"
  }
];

const subSectors = [
    { name: "Physicians & Surgeons", icon: Stethoscope, color: "bg-blue-500" },
    { name: "Nursing", icon: HeartPulse, color: "bg-rose-500" },
    { name: "Allied Health", icon: Activity, color: "bg-emerald-500" },
    { name: "Pharmacy", icon: Pill, color: "bg-amber-500" },
    { name: "Research", icon: Microscope, color: "bg-purple-500" },
    { name: "Dentistry", icon: Smile, color: "bg-cyan-500" },
];

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 lg:px-8">
      
      {/* Header / Search Hero */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-500/20 rounded-full blur-[80px] -ml-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sky-400 font-bold tracking-wider text-xs uppercase mb-4"
          >
            <Globe size={14} />
            Global Opportunity Exchange
          </motion.div>
          
          <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-400">Dream Job</span> in Healthcare
          </h1>
          
          <p className="text-slate-300 text-lg mb-8 max-w-xl">
            Connecting lakhs of students with top organizations across all medical sub-sectors. From rural clinics to international research centers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
             <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Job title, specialty, or hospital..." 
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-0"
                />
             </div>
             <div className="h-px sm:h-auto sm:w-px bg-white/10"></div>
             <div className="flex-1 relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="City, state, or 'Remote'..." 
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-0"
                />
             </div>
             <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-sky-500/20">
               Find Jobs
             </button>
          </div>
        </div>
      </div>

      {/* Sub-Sectors Grid */}
      <div className="mb-10">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Browse by Sub-Sector</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subSectors.map((sector) => (
                <motion.div 
                    key={sector.name}
                    whileHover={{ y: -4 }}
                    className="card p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:border-sky-200 transition-all group"
                >
                    <div className={`h-12 w-12 rounded-full ${sector.color} bg-opacity-10 flex items-center justify-center text-${sector.color.split('-')[1]}-600 mb-3 group-hover:scale-110 transition-transform`}>
                        <sector.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">{sector.name}</span>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Scope Toggles */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <TabButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={Briefcase} label="All Opportunities" />
        <TabButton active={activeTab === 'rural'} onClick={() => setActiveTab('rural')} icon={Building2} label="Rural Service" />
        <TabButton active={activeTab === 'urban'} onClick={() => setActiveTab('urban')} icon={MapPin} label="Urban Centers" />
        <TabButton active={activeTab === 'international'} onClick={() => setActiveTab('international')} icon={Globe} label="International" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Job List */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-lg">Recommended for You</h3>
            <span className="text-sm text-slate-500">Based on your profile</span>
          </div>

          {jobsData.map((job) => (
             <JobCard key={job.id} job={job} />
          ))}
        </div>

        {/* Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6">
           <div className="card p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
              <h3 className="font-bold text-lg mb-2">Complete Your Profile</h3>
              <p className="text-slate-300 text-sm mb-4">Hospitals are 3x more likely to contact students with verified credentials.</p>
              
              <div className="space-y-3 mb-6">
                 <RequirementCheck label="USMLE Scores" checked />
                 <RequirementCheck label="Medical School Transcripts" checked />
                 <RequirementCheck label="Letters of Recommendation" />
                 <RequirementCheck label="Clinical Rotations Log" />
              </div>
              
              <button className="w-full bg-white text-slate-900 font-bold py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-sm">
                 Upload Documents
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
      active 
      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const JobCard = ({ job }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="card p-0 overflow-hidden group hover:border-sky-200 transition-all duration-300"
  >
    <div className="p-6">
       <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
             <img src={job.logo} alt={job.hospital} className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm" />
             <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors">{job.role}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                   <Building2 size={14} />
                   {job.hospital}
                   <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                   {job.location}
                </div>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                <Star size={14} fill="currentColor" />
                {job.match}% Match
             </div>
             <span className="text-xs text-slate-400 mt-2 font-medium">Posted 2d ago</span>
          </div>
       </div>

       <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
            <Briefcase size={12} /> {job.type}
          </span>
          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wide">
            {job.salary}
          </span>
          {job.tags.map((tag, i) => (
             <span key={i} className="px-3 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-bold border border-sky-100">
                {tag}
             </span>
          ))}
       </div>

       <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <span className="font-bold text-slate-900">Requirements:</span>
             {job.requirements.slice(0, 2).map((req, i) => (
                <span key={i} className="flex items-center gap-1">
                   <CheckCircle2 size={14} className="text-emerald-500" />
                   {req}
                </span>
             ))}
             {job.requirements.length > 2 && (
                <span className="text-xs text-slate-400">+ {job.requirements.length - 2} more</span>
             )}
          </div>
          <button className="flex items-center gap-2 text-sky-600 font-bold text-sm hover:text-sky-700 transition-colors">
             View Details <ChevronRight size={16} />
          </button>
       </div>
    </div>
  </motion.div>
);

const RequirementCheck = ({ label, checked }) => (
  <div className="flex items-center justify-between group cursor-pointer">
     <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 group-hover:border-white'}`}>
           {checked && <CheckCircle2 size={12} className="text-white" />}
        </div>
        <span className={`text-sm font-medium ${checked ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{label}</span>
     </div>
  </div>
);

export default Jobs;
