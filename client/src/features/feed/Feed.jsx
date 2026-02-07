import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, MessageCircle, Share2, ThumbsUp, Bookmark, Activity, ArrowRight, ShieldCheck, FileText, Clock, Briefcase } from 'lucide-react';
import SmartRounds from './SmartRounds';
import UrgentCases from './UrgentCases';
import Skeleton from '../../components/ui/Skeleton';
import ProfileWidget from './ProfileWidget';
import TrendingWidget from './TrendingWidget';
import JobsWidget from './JobsWidget';

const Feed = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch posts');
        
        const data = await response.json();
        
        // Map API data to UI format
        const mappedPosts = data.data.posts.map(post => ({
            id: post.id,
            author: `${post.author.firstName} ${post.author.lastName}`,
            role: post.author.specialty || 'Healthcare Professional',
            org: 'Medical Center',
            time: new Date(post.createdAt).toLocaleDateString(),
            title: post.type === 'UrgentCase' ? 'Urgent Case' : (post.type === 'SmartRound' ? 'Smart Round' : 'Medical Update'),
            content: post.content,
            category: post.type || 'General',
            image: post.mediaUrl,
            stats: { 
                likes: post.likesCount || 0, 
                comments: post.commentsCount || 0, 
                consults: 0 
            },
            verified: false
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-6 px-4 lg:px-8 pb-24 lg:pb-8">
      {/* Main Feed Column */}
      <div className="flex-1 min-w-0">
        
        {/* Mobile Profile Header (Visible only on small screens) */}
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

        {/* Urgent Cases (Stories) - NEW FEATURE */}
        <UrgentCases />

        {/* Smart Rounds Triage - "Something New" */}
        <SmartRounds />

        {/* Spacer */}
        <div className="h-6"></div>

        {/* Create Post Widget - Redesigned */}
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
                 <button className="w-full text-left bg-slate-50 hover:bg-white hover:shadow-md hover:border-slate-300 text-slate-500 py-4 px-4 sm:px-6 rounded-2xl border border-slate-200 transition-all duration-300 text-sm font-medium flex items-center justify-between group">
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

        {/* Posts - "Medical Case Cards" */}
        <div className="space-y-8">
           {isLoading ? (
             <>
               <SkeletonCard />
               <SkeletonCard />
             </>
           ) : posts.length > 0 ? (
             posts.map(post => (
               <MedicalCaseCard 
                 key={post.id}
                 {...post}
               />
             ))
           ) : (
             <div className="text-center py-10 text-slate-500">
                <p>No posts yet. Be the first to share a case!</p>
             </div>
           )}

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

        {/* Mobile Widgets (Visible on small screens) */}
        <div className="lg:hidden mt-8 space-y-6">
            <ProfileWidget user={user} />
            <TrendingWidget />
            <JobsWidget />
        </div>

      </div>

      {/* Right Sidebar (Widgets) - Refined */}
      <div className="hidden lg:block w-80 space-y-6">
         <ProfileWidget user={user} />
         <TrendingWidget />
         <JobsWidget />
      </div>
    </div>
  );
};

/* --- Sub-Components --- */

const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circle" width={48} height={48} />
      <div className="space-y-2">
        <Skeleton width={140} height={16} />
        <Skeleton width={100} height={12} />
      </div>
    </div>
    <div className="space-y-2 py-2">
      <Skeleton width="100%" height={24} />
      <Skeleton width="90%" height={16} />
      <Skeleton width="80%" height={16} />
    </div>
    <Skeleton width="100%" height={200} className="rounded-xl" />
  </div>
);

const ActionButton = ({ label, icon }) => (
    <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-white hover:shadow-sm hover:text-slate-900 transition-all border border-transparent hover:border-slate-200">
        <span className="text-base">{icon}</span>
        {label}
    </button>
);

const MedicalCaseCard = ({ author, role, org, time, title, content, image, tags, stats, verified, category }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card overflow-hidden group hover:border-slate-300 transition-all duration-300"
    >
        {/* Header */}
        <div className="p-3 sm:p-5 flex items-start justify-between">
            <div className="flex gap-2 sm:gap-4">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-slate-100" />
                <div>
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                        {author}
                        {verified && <ShieldCheck size={14} className="text-sky-500" />}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{role} @ {org}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock size={10} /> {time}
                    </p>
                </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-50">
                <MoreHorizontal size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="px-3 sm:px-5 pb-3">
             {category && (
                <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                    {category}
                </span>
             )}
            <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {content}
            </p>
            
            {image && (
                <div className="rounded-xl overflow-hidden border border-slate-100 mb-4">
                    <img src={image} className="w-full object-cover max-h-[400px]" alt="Case attachment" />
                </div>
            )}
        </div>

        {/* Footer / Stats */}
        <div className="px-3 sm:px-5 py-3 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4 sm:gap-6">
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors group">
                    <ThumbsUp size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">{stats.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 transition-colors group">
                    <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">{stats.comments}</span>
                </button>
                 <button className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors group">
                    <FileText size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">{stats.consults} Consults</span>
                </button>
            </div>
            <button className="text-slate-400 hover:text-slate-700">
                <Share2 size={18} />
            </button>
        </div>
    </motion.div>
);

export default Feed;
