import React from 'react';
import { Activity } from 'lucide-react';

const FeedHeader = ({ user }) => {
  if (!user) return null;

  return (
    <div className="lg:hidden mb-6 flex items-center justify-between px-1">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070"}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" 
            alt="Profile"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a651] border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="font-bold text-slate-900 leading-tight">Good Morning, {user?.firstName}</h2>
          <p className="text-xs text-slate-500 font-medium">{user?.specialty || 'Medical Professional'}</p>
        </div>
      </div>
      <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm">
        <Activity size={20} />
      </button>
    </div>
  );
};

export default FeedHeader;