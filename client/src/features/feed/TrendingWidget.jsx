import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';

const TrendingWidget = () => {
  const trends = [
    { id: 1, tag: "CardiologyUpdate", posts: "2.4k" },
    { id: 2, tag: "NursesWeek", posts: "15k" },
    { id: 3, tag: "MedTech", posts: "8.1k" },
    { id: 4, tag: "ResidentLife", posts: "5.3k" },
    { id: 5, tag: "PublicHealth", posts: "3.2k" }
  ];

  return (
    <div className="card p-5 bg-white border border-slate-200 shadow-sm rounded-xl">
      <div className="flex items-center gap-2 mb-4">
         <TrendingUp size={18} className="text-emerald-600" />
         <h3 className="font-bold text-slate-900">Trending Now</h3>
      </div>
      <div className="space-y-4">
         {trends.map(trend => (
             <div key={trend.id} className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                        <Hash size={14} />
                     </div>
                     <div>
                         <div className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">#{trend.tag}</div>
                         <div className="text-[10px] text-slate-400">{trend.posts} posts</div>
                     </div>
                 </div>
             </div>
         ))}
      </div>
      <button className="w-full mt-5 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
          View All Trends
      </button>
    </div>
  );
};

export default TrendingWidget;
