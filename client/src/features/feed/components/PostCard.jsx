import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, MessageCircle, Share2, ThumbsUp, ShieldCheck, FileText, Clock } from 'lucide-react';

const PostCard = ({ post, onLike, onShare }) => {
  const handleLikeClick = () => {
    onLike(post.id);
  };

  const handleShareClick = () => {
    onShare(post.id);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card overflow-hidden group hover:border-slate-300 transition-all duration-300"
    >
      {/* Header */}
      <div className="p-3 sm:p-5 flex items-start justify-between">
        <div className="flex gap-2 sm:gap-4">
          <img 
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-slate-100" 
            alt="Author"
          />
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
              {post.author}
              {post.verified && <ShieldCheck size={14} className="text-sky-500" />}
            </h4>
            <p className="text-xs text-slate-500 font-medium">{post.role} @ {post.org}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
              <Clock size={10} /> {post.time}
            </p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-5 pb-3">
        {post.category && (
          <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2">
            {post.category}
          </span>
        )}
        <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{post.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          {post.content}
        </p>
        
        {post.image && (
          <div className="rounded-xl overflow-hidden border border-slate-100 mb-4">
            <img src={post.image} className="w-full object-cover max-h-[400px]" alt="Case attachment" />
          </div>
        )}
      </div>

      {/* Footer / Stats */}
      <div className="px-3 sm:px-5 py-3 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={handleLikeClick}
            className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors group"
          >
            <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">{post.stats.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 transition-colors group">
            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">{post.stats.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors group">
            <FileText size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold">{post.stats.consults} Consults</span>
          </button>
        </div>
        <button 
          onClick={handleShareClick}
          className="text-slate-400 hover:text-slate-700"
        >
          <Share2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default PostCard;