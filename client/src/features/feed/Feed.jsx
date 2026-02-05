import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, MessageCircle, Share2, ThumbsUp, Bookmark, Activity, ArrowRight, ShieldCheck, FileText, Clock, Briefcase } from 'lucide-react';
import SmartRounds from './SmartRounds';
import Skeleton from '../../components/ui/Skeleton';

const Feed = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
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
                       src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
                       className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" 
                       alt="Profile"
                   />
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
               </div>
               <div>
                   <h2 className="font-bold text-slate-900 leading-tight">Good Morning, Sarah</h2>
                   <p className="text-xs text-slate-500 font-medium">3 Urgencies • 5 New Cases</p>
               </div>
           </div>
           <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm">
               <Activity size={20} />
           </button>
        </div>

        {/* Smart Rounds Triage - "Something New" */}
        <SmartRounds />

        {/* Create Post Widget - Redesigned */}
        <div className="card p-4 sm:p-6 mb-8 backdrop-blur-sm bg-white/90 border-slate-200/80">
           <div className="flex gap-3 sm:gap-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-4 ring-slate-50"
                  alt="User"
                />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
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
           ) : (
             <>
               <MedicalCaseCard 
                 author="Dr. Elena Foster"
                 role="Neurologist"
                 org="Mount Sinai Hospital"
                 time="2h ago"
                 title="Early-Onset Alzheimer's: Synaptic Density Analysis"
                 content="Observing remarkable neuroplasticity in the test group (n=450). The initial data suggests that the new compound significantly reduces beta-amyloid plaque formation."
                 category="Clinical Trial"
                 image="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=2070"
                 stats={{ likes: 423, comments: 89, consults: 12 }}
                 verified
               />

               <MedicalCaseCard 
                 author="James Wilson"
                 role="Senior Surgeon"
                 org="Cleveland Clinic"
                 time="5h ago"
                 title="Complex Aortic Arch Reconstruction"
                 content="Preparing for a Type A dissection repair utilizing the frozen elephant trunk technique. Seeking insights on cerebral protection strategies."
                 category="Surgical Technique"
                 image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2070"
                 stats={{ likes: 215, comments: 45, consults: 8 }}
                 verified
               />
             </>
           )}
        </div>

      </div>

      {/* Right Sidebar (Widgets) - Refined */}
      <div className="hidden lg:block w-80 space-y-6">
         
         {/* Profile Card - "Digital ID" Style */}
         <div className="card p-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 group-hover:scale-105 transition-transform duration-700"></div>
            <div className="relative z-10 -mt-2 mb-4 flex justify-center">
                <div className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white rotate-3 hover:rotate-0 transition-all duration-300">
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover" />
                </div>
            </div>
            <div className="text-center relative z-10">
                <h3 className="font-bold text-lg text-slate-900 flex items-center justify-center gap-1">
                    Dr. Sarah Jenkins
                    <ShieldCheck size={16} className="text-sky-500" />
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-6 tracking-wide">NEUROLOGIST • NYC</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="font-bold text-slate-900 text-lg">1.2k</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Network</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="font-bold text-slate-900 text-lg">98</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">Impact</div>
                    </div>
                </div>
                
                <button className="w-full btn btn-primary py-3 rounded-xl text-xs uppercase tracking-wider">
                    View Credentials
                </button>
            </div>
         </div>

         {/* Trending Topics - "Intelligence Hub" */}
         <div className="card p-5 border-slate-200/60">
            <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2 uppercase tracking-wider opacity-70">
                <Activity size={14} />
                Global Intelligence
            </h4>
            <div className="space-y-3">
                <TrendingItem topic="AI in Diagnostics" count="15.4k" trend="+12%" />
                <TrendingItem topic="Telehealth Regs" count="8.2k" trend="+5%" />
                <TrendingItem topic="CRISPR Tx" count="6.1k" trend="+8%" />
            </div>
            <button className="w-full mt-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1 transition-colors">
                View All Insights <ArrowRight size={12} />
            </button>
         </div>

         {/* Featured Opportunities - "Career Connect" */}
         <div className="card p-5 border-slate-200/60 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h4 className="font-bold text-white text-sm mb-4 flex items-center gap-2 uppercase tracking-wider opacity-90">
                <Briefcase size={14} />
                Featured Roles
            </h4>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                   <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl">🏥</div>
                   <div>
                      <h5 className="font-bold text-sm text-white leading-tight">Rural Health Fellowship</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Appalachia Region • $4k/mo</p>
                   </div>
                </div>
                <div className="flex items-start gap-3">
                   <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl">🏙️</div>
                   <div>
                      <h5 className="font-bold text-sm text-white leading-tight">Cardiology Resident</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Mayo Clinic • Visa Sponsor</p>
                   </div>
                </div>
            </div>
            <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-xl text-xs transition-colors">
                Explore 240+ Jobs
            </button>
         </div>

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
            <button className="text-slate-400 hover:text-slate-900 p-1 rounded-full hover:bg-slate-100 transition-colors">
                <MoreHorizontal size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="px-3 sm:px-5 pb-3">
            <div className="mb-3">
                <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide mb-2">
                    {category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-sky-600 transition-colors cursor-pointer">
                    {title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    {content}
                </p>
            </div>
        </div>

        {/* Visual Attachment (Bento Style) */}
        {image && (
            <div className="px-3 sm:px-5 pb-5">
                <div className="relative h-48 sm:h-64 w-full rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                    <img src={image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        View Analysis
                    </button>
                </div>
            </div>
        )}

        {/* Actions Footer */}
        <div className="px-3 sm:px-5 py-3 sm:py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-y-3 bg-slate-50/50">
            <div className="flex gap-2 sm:gap-4">
                <InteractionButton icon={ThumbsUp} count={stats.likes} label="Endorse" />
                <InteractionButton icon={MessageCircle} count={stats.comments} label="Discuss" />
                <InteractionButton icon={FileText} count={stats.consults} label="Consult" />
            </div>
            <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                    <Bookmark size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors">
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    </motion.div>
);

const InteractionButton = ({ icon: Icon, count, label }) => (
    <button className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors group">
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold">{count}</span>
        <span className="text-xs font-medium hidden sm:inline-block opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-200">{label}</span>
    </button>
);

const TrendingItem = ({ topic, count, trend }) => (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
        <div>
            <div className="font-bold text-slate-900 text-xs mb-0.5 group-hover:text-sky-600 transition-colors">{topic}</div>
            <div className="text-[10px] text-slate-400 font-medium">{count} posts</div>
        </div>
        <div className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
            {trend}
        </div>
    </div>
);

export default Feed;
