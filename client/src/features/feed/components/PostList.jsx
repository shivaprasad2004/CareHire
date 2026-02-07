import React from 'react';
import PostCard from './PostCard';
import SkeletonCard from './SkeletonCard';

const PostList = ({ posts, loading, onLike, onShare }) => {
  if (loading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        <p>No posts yet. Be the first to share a case!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map(post => (
        <PostCard 
          key={post.id}
          post={post}
          onLike={onLike}
          onShare={onShare}
        />
      ))}

      {/* Smart Job Match - Native Ad Style */}
      <div className="card p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-500"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border border-white/10">
              🧬
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">Smart Match</div>
              <h3 className="font-bold text-lg leading-tight">Clinical Research Coordinator</h3>
              <p className="text-slate-400 text-sm">Mayo Clinic • Remote Possible</p>
            </div>
          </div>
          <button className="w-full sm:w-auto px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5">
            Easy Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;