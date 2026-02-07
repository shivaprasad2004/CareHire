import React from 'react';
import { Briefcase, MapPin } from 'lucide-react';

const JobsWidget = () => {
  const jobs = [
    { id: 1, title: "Clinical Nurse Specialist", hospital: "Cleveland Clinic", location: "Cleveland, OH" },
    { id: 2, title: "Emergency Physician", hospital: "Mount Sinai", location: "New York, NY" },
    { id: 3, title: "Pediatric Surgeon", hospital: "Children's Hospital", location: "Boston, MA" }
  ];

  return (
    <div className="card p-5 bg-white border border-slate-200 shadow-sm rounded-xl">
      <div className="flex items-center gap-2 mb-4">
         <Briefcase size={18} className="text-blue-600" />
         <h3 className="font-bold text-slate-900">Recommended Jobs</h3>
      </div>
      <div className="space-y-4">
         {jobs.map(job => (
             <div key={job.id} className="group cursor-pointer">
                 <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                 <div className="text-xs text-slate-500 font-medium mb-1">{job.hospital}</div>
                 <div className="flex items-center gap-1 text-[10px] text-slate-400">
                     <MapPin size={10} /> {job.location}
                 </div>
             </div>
         ))}
      </div>
      <button className="w-full mt-5 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 border border-blue-100 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">
          Search Jobs
      </button>
    </div>
  );
};

export default JobsWidget;
