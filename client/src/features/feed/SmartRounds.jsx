import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, FileText, Stethoscope, ChevronRight, Sparkles } from 'lucide-react';
import { roundService } from '../../services/roundService';

const RoundCard = ({ item }) => {
    const Icon = item.icon || Stethoscope;
    
    return (
      <motion.div 
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="min-w-[220px] p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-sm cursor-pointer hover:shadow-lg hover:border-sky-200 transition-all group flex flex-col justify-between h-[150px] relative overflow-hidden"
      >
        {/* AI Score Background Gradient */}
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
           <Sparkles size={48} className={item.priority === 'high' ? 'text-rose-500' : 'text-sky-500'} />
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div className={`h-8 w-8 rounded-full ${item.color} flex items-center justify-center text-white shadow-sm`}>
            <Icon size={14} strokeWidth={2.5} />
          </div>
          {item.priority === 'high' && (
            <span className="animate-pulse h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
          )}
        </div>
        
        <div className="relative z-10">
          <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 group-hover:text-sky-600 transition-colors line-clamp-2">
            {item.title}
          </h4>
          <p className="text-xs text-slate-500 font-medium mb-2 truncate">{item.patient}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Clock size={10} />
                {item.time}
            </div>
            {item.aiScore && (
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                    item.aiScore > 90 ? 'bg-[#00a651]/10 text-[#00a651] border-[#00a651]/30' : 
                    item.aiScore > 80 ? 'bg-sky-50 text-sky-600 border-sky-200' :
                    'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                    AI {item.aiScore}
                </div>
            )}
          </div>
        </div>
      </motion.div>
    );
};

const SmartRounds = () => {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    const fetchRounds = async () => {
        try {
            const data = await roundService.getAllRounds();
            
            if (data && data.data) {
                const mappedRounds = data.data.rounds.map(r => ({
                    id: r.id,
                    type: r.type,
                    title: r.title,
                    patient: r.patientName,
                    time: getTimeAgo(r.createdAt),
                    priority: r.priority,
                    aiScore: r.aiScore,
                    icon: getIconForType(r.type),
                    color: getColorForType(r.type)
                }));
                setRounds(mappedRounds);
            }
        } catch (error) {
            console.error("Error fetching rounds:", error);
        }
    };

    fetchRounds();
  }, []);

  const getTimeAgo = (dateStr) => {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${Math.floor(diffHours / 24)}d ago`;
  };

  const getIconForType = (type) => {
      switch(type) {
          case 'urgent': return AlertCircle;
          case 'lab': return FileText;
          case 'round': return Stethoscope;
          default: return Clock;
      }
  };

  const getColorForType = (type) => {
      switch(type) {
          case 'urgent': return 'bg-rose-500';
          case 'lab': return 'bg-indigo-500';
          case 'round': return 'bg-[#00a651]';
          default: return 'bg-amber-500';
      }
  };

  return (
    <div className="mb-8 relative">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">
            Smart Rounds
            </h2>
            <div className="px-2 py-0.5 rounded-full bg-sky-100 border border-sky-200 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
                </span>
                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wide">AI Live</span>
            </div>
        </div>
        <button className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-transform hover:translate-x-1">
          View All <ChevronRight size={14} />
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 mask-image-gradient pt-2">
        {rounds.length === 0 ? (
            <div className="w-full text-center py-4 text-slate-400 text-sm italic">
                No active rounds assigned.
            </div>
        ) : (
            rounds.map((item) => (
              <RoundCard key={item.id} item={item} />
            ))
        )}
        
        {/* 'Add New' Placeholder */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="min-w-[60px] rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:text-sky-500 hover:border-sky-300 hover:bg-sky-50 transition-all"
        >
            <span className="text-2xl font-light">+</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SmartRounds;
