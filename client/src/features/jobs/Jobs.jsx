import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Globe, GraduationCap, Stethoscope, Search, Filter, Briefcase, CheckCircle2, ChevronRight, Star, HeartPulse, Activity, Pill, Microscope, Smile } from 'lucide-react';
import { jobService } from '../../services/jobService';
import Skeleton from '../../components/ui/Skeleton';

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
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs();
        
        // Map API data to UI format
        const mappedJobs = data.data.jobs.map(job => ({
          id: job.id,
          hospital: job.recruiter?.organization || 'Unknown Hospital',
          location: job.location,
          role: job.title,
          type: job.type,
          salary: job.salaryRange || 'Competitive',
          tags: job.requirements ? job.requirements.slice(0, 2) : [], // Use first 2 requirements as tags for now
          match: 90, // Mocked match percentage
          logo: job.recruiter?.avatarUrl || "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80&w=200&h=200",
          requirements: job.requirements || [],
          scope: "urban" // Mocked scope for now, or derive from location
        }));

        // If no jobs in DB, fallback to demo data
        if (mappedJobs.length === 0) {
           setJobs(jobsData);
        } else {
           setJobs(mappedJobs);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        // Fallback to demo data on error
        setJobs(jobsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = activeTab === 'all' 
    ? jobs 
    : jobs.filter(job => job.scope === activeTab);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 pb-24 lg:pb-8">
      
      {/* Header / Search Hero */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 text-white p-5 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/25 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/25 rounded-full blur-[80px] -ml-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-emerald-300 font-bold tracking-wider text-xs uppercase mb-4"
          >
            <Globe size={14} />
            Global Opportunity Exchange
          </motion.div>
          
          <h1 className="text-2xl sm:text-5xl font-bold mb-6 leading-tight">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-300">Dream Job</span> in Healthcare
          </h1>
          
          <p className="text-emerald-100/90 text-sm sm:text-lg mb-8 max-w-xl">
            Connecting lakhs of students with top organizations across all medical sub-sectors. From rural clinics to international research centers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
             <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-100/70 group-focus-within:text-white transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Job title, specialty, or hospital..." 
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-0"
                />
             </div>
             <div className="h-px sm:h-auto sm:w-px bg-white/10"></div>
             <div className="flex-1 relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-100/70 group-focus-within:text-white transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="City, state, or 'Remote'..." 
                  className="w-full bg-transparent border-none text-white placeholder:text-slate-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-0"
                />
             </div>
             <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-emerald-500/30">
               Find Jobs
             </button>
          </div>
        </div>
      </div>

      {/* Sub-Sectors Grid */}
      <div className="mb-10">
        <h3 className="font-bold text-slate-900 text-lg mb-4">Browse by Sub-Sector</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {subSectors.map((sector) => (
                <motion.div 
                    key={sector.name}
                    whileHover={{ y: -4 }}
                    className="card p-3 sm:p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all group"
                >
                    <div className={`h-12 w-12 rounded-full ${sector.color} bg-opacity-10 flex items-center justify-center text-${sector.color.split('-')[1]}-600 mb-3 group-hover:scale-110 transition-transform`}>
                        <sector.icon size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">{sector.name}</span>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Scope Toggles - Horizontal Scroll on Mobile */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
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

          {isLoading ? (
            <>
              <SkeletonJobCard />
              <SkeletonJobCard />
              <SkeletonJobCard />
            </>
          ) : (
            filteredJobs.map((job) => (
               <JobCard key={job.id} job={job} />
            ))
          )}
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

const SkeletonJobCard = () => (
  <div className="card p-6 space-y-6">
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <Skeleton variant="rect" width={56} height={56} className="rounded-xl" />
        <div className="space-y-2">
          <Skeleton width={200} height={20} />
          <Skeleton width={150} height={16} />
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <Skeleton width={80} height={24} className="rounded-lg" />
        <Skeleton width={60} height={12} />
      </div>
    </div>
    <div className="flex gap-2">
      <Skeleton width={80} height={24} className="rounded-lg" />
      <Skeleton width={80} height={24} className="rounded-lg" />
      <Skeleton width={80} height={24} className="rounded-lg" />
    </div>
    <div className="flex justify-between items-center pt-2">
      <Skeleton width={250} height={16} />
      <Skeleton width={100} height={16} />
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
      active 
      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
      : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-slate-200'
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
    className="card p-0 overflow-hidden group hover:border-emerald-200 transition-all duration-300"
  >
    <div className="p-4 sm:p-6">
       <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4 sm:gap-0">
          <div className="flex gap-3 sm:gap-4">
             <img src={job.logo} alt={job.hospital} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0" />
             <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">{job.role}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium mt-1">
                   <Building2 size={14} />
                   {job.hospital}
                   <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:block"></span>
                   <span className="hidden sm:inline">{job.location}</span>
                </div>
                <div className="text-xs text-slate-400 sm:hidden mt-1">{job.location}</div>
             </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
             <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                <Star size={14} fill="currentColor" />
                {job.match}% Match
             </div>
             <span className="text-xs text-slate-400 mt-0 sm:mt-2 font-medium">Posted 2d ago</span>
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
             <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
                {tag}
             </span>
          ))}
       </div>

       <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-slate-500">
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
          <button className="flex items-center gap-2 text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors">
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
