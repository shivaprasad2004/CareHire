import React from 'react';
import { Activity } from 'lucide-react';

const CreatePostWidget = ({ user, onCreatePost }) => {
  const handleCreatePost = () => {
    onCreatePost();
  };

  return (
    <div className="card p-4 sm:p-6 mb-8 backdrop-blur-sm bg-white/90 border-slate-200/80">
      <div className="flex gap-3 sm:gap-4">
        <div className="relative">
          <img 
            src={user?.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070"}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-4 ring-slate-50"
            alt="User"
          />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00a651] border-2 border-white rounded-full"></div>
        </div>
        <div className="flex-1">
          <button 
            onClick={handleCreatePost}
            className="w-full text-left bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-300 text-slate-500 py-4 px-4 sm:px-6 rounded-2xl border border-slate-200 transition-all duration-300 text-sm font-medium flex items-center justify-between group"
          >
            <span className="truncate mr-2">Draft a clinical case or update...</span>
            <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-md text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">CMD + K</span>
          </button>
          <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
            <ActionButton label="Upload Imaging" icon="🖼️" />
            <ActionButton label="Case File" icon="📁" />
            <ActionButton label="Live Event" icon="📹" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ label, icon }) => (
  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all border border-transparent hover:border-slate-200">
    <span className="text-base">{icon}</span>
    {label}
  </button>
);

export default CreatePostWidget;