import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, MessageCircle, Share2, ThumbsUp, Bookmark, Activity, ArrowRight, ShieldCheck, FileText, Clock, Briefcase } from 'lucide-react';
import SmartRounds from './SmartRounds';
import UrgentCases from './UrgentCases';
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
             </>
           )}
        </div>

        {/* Mobile Widgets (Visible on small screens) */}
        <div className="lg:hidden mt-8 space-y-6">
            <ProfileWidget />
            <TrendingWidget />
            <JobsWidget />
        </div>

      </div>

      {/* Right Sidebar (Widgets) - Refined */}
      <div className="hidden lg:block w-80 space-y-6">
         <ProfileWidget />
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
    <button className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group">
        <Icon size={18} className="group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold">{count}</span>
        <span className="text-xs font-medium hidden sm:inline-block opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-200">{label}</span>
    </button>
);

const TrendingItem = ({ topic, count, trend, rank }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group border border-transparent hover:border-slate-100">
        <div className="font-black text-slate-200 text-xs w-4">{rank}</div>
        <div className="flex-1">
            <div className="font-bold text-slate-900 text-xs mb-0.5 group-hover:text-emerald-700 transition-colors">{topic}</div>
            <div className="text-[10px] text-slate-400 font-medium">{count} posts</div>
        </div>
        <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
            {trend}
        </div>
    </div>
);

const ProfileWidget = () => (
    <div className="card relative overflow-hidden group border-0 shadow-lg shadow-slate-200/50">
        {/* Premium Header Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900">
            {/* Abstract Medical Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        
        <div className="relative z-10 pt-16 px-6 pb-6 text-center">
            {/* Avatar with Status Ring */}
            <div className="relative inline-block mb-4">
                <div className="h-28 w-28 rounded-2xl p-1.5 bg-white shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out">
                    <img 
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
                        className="w-full h-full object-cover rounded-xl" 
                        alt="Profile"
                    />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-lg shadow-lg border-2 border-white" title="Verified Physician">
                    <ShieldCheck size={16} strokeWidth={3} />
                </div>
            </div>

            {/* Identity */}
            <h3 className="font-bold text-xl text-slate-900 mb-1">Dr. Sarah Jenkins</h3>
            <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-6">Neurologist • NYC</p>
            
            {/* Stats Row - Glass Style */}
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex-1 bg-slate-50/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors group/stat cursor-pointer">
                    <div className="text-2xl font-black text-slate-800 group-hover/stat:text-emerald-600 transition-colors">1.2k</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Network</div>
                </div>
                <div className="flex-1 bg-slate-50/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors group/stat cursor-pointer">
                    <div className="text-2xl font-black text-slate-800 group-hover/stat:text-emerald-600 transition-colors">98</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impact Score</div>
                </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-3">
                <button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-slate-900/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    View Credentials <ArrowRight size={14} />
                </button>
                <button className="w-full py-2.5 bg-white text-slate-500 hover:text-slate-900 rounded-xl text-xs font-bold transition-colors border border-transparent hover:border-slate-200">
                    Edit Profile
                </button>
            </div>
        </div>
    </div>
);

const TrendingWidget = () => (
    <div className="card p-6 border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 uppercase tracking-wider">
                <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Activity size={14} strokeWidth={2.5} />
                </div>
                Global Intel
            </h4>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">LIVE</span>
        </div>
        
        <div className="space-y-1">
            <TrendingItem topic="AI in Diagnostics" count="15.4k" trend="+12%" rank="01" />
            <TrendingItem topic="Telehealth Regs" count="8.2k" trend="+5%" rank="02" />
            <TrendingItem topic="CRISPR Tx" count="6.1k" trend="+8%" rank="03" />
            <TrendingItem topic="Neuroplasticity" count="4.3k" trend="+15%" rank="04" />
        </div>

        <button className="w-full mt-6 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all flex items-center justify-center gap-2 group">
            Explore Intelligence Hub 
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
    </div>
);

const JobsWidget = () => (
    <div className="card p-6 border-0 bg-gradient-to-br from-emerald-900 to-slate-900 text-white shadow-xl shadow-emerald-900/20 relative overflow-hidden group">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
            <h4 className="font-bold text-white text-sm mb-6 flex items-center gap-2 uppercase tracking-wider opacity-90">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Briefcase size={14} />
                </div>
                Featured Roles
            </h4>
            
            <div className="space-y-4">
                <div className="flex items-start gap-3 group/job cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl shadow-inner">🏥</div>
                    <div>
                        <h5 className="font-bold text-sm text-white leading-tight group-hover/job:text-emerald-300 transition-colors">Rural Health Fellowship</h5>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                            Appalachia Region
                        </p>
                    </div>
                    <div className="ml-auto text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">$4k/mo</div>
                </div>
                
                <div className="flex items-start gap-3 group/job cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl shadow-inner">🏙️</div>
                    <div>
                        <h5 className="font-bold text-sm text-white leading-tight group-hover/job:text-emerald-300 transition-colors">Cardiology Resident</h5>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                            Mayo Clinic
                        </p>
                    </div>
                    <div className="ml-auto text-[10px] font-bold text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">Visa</div>
                </div>
            </div>

            <button className="w-full mt-6 bg-white text-slate-900 hover:bg-emerald-50 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-white/5 flex items-center justify-center gap-2 group/btn">
                Explore 240+ Jobs
                <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
        </div>
    </div>
);

export default Feed;
