import React from 'react';
import { Image, Video, FileText, BarChart3 } from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import useAuthStore from '../../../stores/authStore';

const CreatePostWidget = ({ user, onCreatePost }) => {
  const currentUser = user || useAuthStore.getState().user;

  return (
    <div className="card p-4 mb-2">
      <div className="flex items-center gap-3">
        <Avatar
          src={currentUser?.avatarUrl}
          name={`${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`}
          size="md"
          status="online"
        />
        <button
          onClick={onCreatePost}
          className="flex-1 text-left bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 py-3 px-4 rounded-full border border-slate-200 dark:border-slate-700 transition-all text-sm font-medium"
        >
          Start a post...
        </button>
      </div>
      <div className="flex items-center justify-around mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button onClick={onCreatePost} className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
          <Image size={20} className="text-blue-500" />
          <span className="hidden sm:inline font-medium">Photo</span>
        </button>
        <button onClick={onCreatePost} className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
          <Video size={20} className="text-green-500" />
          <span className="hidden sm:inline font-medium">Video</span>
        </button>
        <button onClick={onCreatePost} className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
          <FileText size={20} className="text-amber-500" />
          <span className="hidden sm:inline font-medium">Article</span>
        </button>
        <button onClick={onCreatePost} className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
          <BarChart3 size={20} className="text-rose-500" />
          <span className="hidden sm:inline font-medium">Poll</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePostWidget;
