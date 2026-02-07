import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const UrgentCases = () => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(getApiUrl('/stories'), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const data = await response.json();
                setStories(data.data.stories);
            }
        } catch (error) {
            console.error("Error fetching stories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchStories();
  }, []);

  const myStory = { id: 'me', name: "My Update", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150", isUser: true };

  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
        {/* My Story */}
        <motion.div 
            key={myStory.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
        >
            <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] border-2 border-dashed border-slate-300">
                    <div className="w-full h-full bg-white rounded-full p-[2px]">
                        <img 
                            src={myStory.img} 
                            alt={myStory.name} 
                            className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-1 border-2 border-white shadow-sm">
                    <Plus size={14} strokeWidth={3} />
                </div>
            </div>
            <span className="block text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors w-16 sm:w-20 text-center truncate mt-1">
                {myStory.name}
            </span>
        </motion.div>

        {/* Fetched Stories */}
        {stories.map((story, index) => (
          <motion.div 
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
          >
            <div className="relative">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] ${
                  story.urgency === 'critical' 
                    ? 'bg-gradient-to-tr from-rose-500 to-orange-500 animate-pulse' 
                    : story.urgency === 'high'
                      ? 'bg-gradient-to-tr from-amber-400 to-orange-400'
                      : 'bg-[#00a651]'
              }`}>
                <div className="w-full h-full bg-white rounded-full p-[2px]">
                  <img 
                    src={story.user?.avatarUrl || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150"} 
                    alt={story.user?.firstName} 
                    className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
            
            <span className="block text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors w-16 sm:w-20 text-center truncate mt-1">
              {story.user ? `${story.user.firstName} ${story.user.lastName}` : 'Unknown'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UrgentCases;
