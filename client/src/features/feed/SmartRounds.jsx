import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, FileText, Stethoscope, ChevronRight } from 'lucide-react';

const roundsData = [
  {
    id: 1,
    type: 'urgent',
    title: 'Stat Consult: Cardiology',
    patient: 'J. Doe (Rm 302)',
    time: '10m ago',
    priority: 'high',
    icon: AlertCircle,
    color: 'bg-rose-500'
  },
  {
    id: 2,
    type: 'lab',
    title: 'Pathology Results Ready',
    patient: 'A. Smith',
    time: '24m ago',
    priority: 'medium',
    icon: FileText,
    color: 'bg-indigo-500'
  },
  {
    id: 3,
    type: 'round',
    title: 'Morning Rounds: ICU',
    patient: 'Team A',
    time: '1h ago',
    priority: 'normal',
    icon: Stethoscope,
    color: 'bg-emerald-500'
  },
  {
    id: 4,
    type: 'lab',
    title: 'CBC Results Pending',
    patient: 'M. Johnson',
    time: '1h 15m ago',
    priority: 'medium',
    icon: Clock,
    color: 'bg-amber-500'
  }
];

const RoundCard = ({ item }) => (
  <motion.div 
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="min-w-[200px] p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm cursor-pointer hover:shadow-md transition-all group flex flex-col justify-between h-[140px]"
  >
    <div className="flex justify-between items-start">
      <div className={`h-8 w-8 rounded-full ${item.color} flex items-center justify-center text-white shadow-sm`}>
        <item.icon size={14} strokeWidth={2.5} />
      </div>
      {item.priority === 'high' && (
        <span className="animate-pulse h-2 w-2 rounded-full bg-rose-500"></span>
      )}
    </div>
    
    <div>
      <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-sky-600 transition-colors">
        {item.title}
      </h4>
      <p className="text-xs text-slate-500 font-medium mb-2">{item.patient}</p>
      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <Clock size={10} />
        {item.time}
      </div>
    </div>
  </motion.div>
);

const SmartRounds = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Smart Rounds
        </h2>
        <button className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mask-image-gradient">
        {roundsData.map((item) => (
          <RoundCard key={item.id} item={item} />
        ))}
        
        {/* 'Add New' Placeholder */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="min-w-[60px] rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-200 hover:bg-sky-50 transition-all"
        >
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
            <span className="text-xl leading-none mb-0.5">+</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default SmartRounds;
