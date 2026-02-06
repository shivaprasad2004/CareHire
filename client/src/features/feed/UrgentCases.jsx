import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const STORIES = [
  { id: 0, name: "My Update", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150", isUser: true },
  { id: 1, name: "Dr. House", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150", urgency: "critical" },
  { id: 2, name: "Mayo Clinic", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=150", urgency: "normal" },
  { id: 3, name: "Surgery Dept", img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=150", urgency: "high" },
  { id: 4, name: "Research Lab", img: "https://images.unsplash.com/photo-1576091160550-2187d80a1b95?auto=format&fit=crop&q=80&w=150", urgency: "normal" },
  { id: 5, name: "ER Team", img: "https://images.unsplash.com/photo-1584515933487-9dca0094768e?auto=format&fit=crop&q=80&w=150", urgency: "critical" },
];

const UrgentCases = () => {
  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
        {STORIES.map((story, index) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
          >
            <div className="relative">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] ${
                story.isUser 
                  ? 'border-2 border-dashed border-slate-300' 
                  : story.urgency === 'critical' 
                    ? 'bg-gradient-to-tr from-rose-500 to-orange-500 animate-pulse' 
                    : story.urgency === 'high'
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-400'
                      : 'bg-[#00a651]'
              }`}>
                <div className="w-full h-full bg-white rounded-full p-[2px]">
                  <img 
                    src={story.img} 
                    alt={story.name} 
                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              
              {story.isUser && (
                <div className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                  <Plus size={14} strokeWidth={3} />
                </div>
              )}
            </div>
            
            <span className="block text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors w-16 sm:w-20 text-center truncate mt-1">
              {story.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UrgentCases;
