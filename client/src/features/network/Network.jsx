import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Users, Search, MapPin, Building2, GraduationCap, ArrowRight, MessageSquare, Award } from 'lucide-react';
import Skeleton from '../../components/ui/Skeleton';

const mentorsData = [
  {
    id: 1,
    name: "Dr. Emily Chen",
    role: "Chief Resident",
    hospital: "Johns Hopkins",
    specialty: "Pediatrics",
    school: "Harvard Medical School",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200",
    mutual: 12
  },
  {
    id: 2,
    name: "Dr. Michael Ross",
    role: "Attending Surgeon",
    hospital: "Mayo Clinic",
    specialty: "Cardiothoracic Surgery",
    school: "UCSF",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
    mutual: 8
  },
  {
    id: 3,
    name: "Sarah Williams, RN",
    role: "Nurse Practitioner",
    hospital: "Cleveland Clinic",
    specialty: "Critical Care",
    school: "Penn Nursing",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
    mutual: 5
  }
];

const Network = ({ user, onNavigate, setTargetConversationId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch users to populate "Recommended Mentors"
        // Using a general user fetch for now, ideally this would be a recommendation endpoint
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
             headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to fetch network');
        
        const data = await response.json();
        
        // Map users to mentor format
        // Filter out current user if present in the list
        const mappedMentors = data.data.users
            .filter(u => u.id !== user?.id)
            .map(u => ({
                id: u.id,
                name: `${u.firstName} ${u.lastName}`,
                role: u.specialty || 'Healthcare Professional',
                hospital: u.organization || 'Medical Center',
                specialty: u.specialty || 'General',
                school: u.education?.[0]?.school || 'Medical School',
                image: u.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
                mutual: Math.floor(Math.random() * 10) // Mock mutual connections
            }));

        setMentors(mappedMentors);
      } catch (err) {
        console.error("Error fetching network:", err);
        // Fallback to demo data if fetch fails
        setMentors(mentorsData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetwork();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 lg:px-8 pb-24 lg:pb-8">
      
      {/* Network Stats / Header */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard label="Connections" value="1,240" icon={Users} color="text-blue-500" />
        <StatsCard label="Pending Invites" value="12" icon={UserPlus} color="text-amber-500" />
        <StatsCard label="Teammates" value="28" icon={Building2} color="text-emerald-500" />
        <StatsCard label="Alumni" value="450+" icon={GraduationCap} color="text-purple-500" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Feed of Suggestions */}
        <div className="flex-1 space-y-8">
          
          {/* Section: Mentors */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-slate-900">Recommended Mentors</h2>
               <button className="text-sm font-bold text-sky-600 hover:text-sky-700">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {isLoading ? (
                 <>
                   <SkeletonProfileCard />
                   <SkeletonProfileCard />
                   <SkeletonProfileCard />
                 </>
               ) : (
                 mentors.map((mentor) => (
                    <ProfileCard 
                      key={mentor.id} 
                      profile={mentor} 
                      type="mentor" 
                      onNavigate={onNavigate}
                      setTargetConversationId={setTargetConversationId}
                    />
                 ))
               )}
               {/* Explore Card */}
               {!isLoading && (
                 <motion.div 
                   whileHover={{ scale: 1.02 }}
                   className="card p-6 border-dashed border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-300 hover:bg-sky-50 transition-all"
                 >
                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm text-sky-500">
                      <Search size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900">Find Specific Mentors</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4">Search by specialty, hospital, or school</p>
                 </motion.div>
               )}
            </div>
          </section>

          {/* Section: Alumni */}
          <section>
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-bold text-slate-900">Alumni from Medical School</h2>
               <button className="text-sm font-bold text-sky-600 hover:text-sky-700">View All</button>
            </div>
            <div className="card p-6">
                <p className="text-slate-500 text-sm mb-6">People who studied at <span className="font-bold text-slate-900">Harvard Medical School</span> usually work at:</p>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    <CompanyPill name="Mass General" count="128 alumni" />
                    <CompanyPill name="Brigham & Women's" count="94 alumni" />
                    <CompanyPill name="Boston Children's" count="82 alumni" />
                    <CompanyPill name="Mount Sinai" count="45 alumni" />
                </div>
            </div>
          </section>

        </div>

        {/* Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6">
           
           {/* Manage Network */}
           <div className="card p-0 overflow-hidden">
              <div className="p-4 border-b border-slate-100 font-bold text-slate-900">Manage My Network</div>
              <div className="flex flex-col">
                 <SidebarItem icon={Users} label="Connections" count="1,240" />
                 <SidebarItem icon={Building2} label="Hospital Pages" count="14" />
                 <SidebarItem icon={MessageSquare} label="Groups" count="8" />
                 <SidebarItem icon={Award} label="Certifications" count="3" />
              </div>
           </div>

           {/* Invitation Widget */}
           <div className="card p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white">
              <h3 className="font-bold mb-2">Grow your career</h3>
              <p className="text-sm text-indigo-200 mb-4">Premium members get 4x more profile views.</p>
              <button className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-2 rounded-xl text-xs transition-colors">
                 Try Premium Free
              </button>
           </div>

        </div>

      </div>
    </div>
  );
};

const SkeletonProfileCard = () => (
  <div className="card p-5">
    <div className="flex items-start gap-4 mb-4">
      <Skeleton variant="circle" width={64} height={64} />
      <div className="space-y-2 pt-1 flex-1">
        <Skeleton width="80%" height={16} />
        <Skeleton width="60%" height={12} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <div className="pt-4 border-t border-slate-100 flex gap-2">
      <Skeleton width="100%" height={32} className="rounded-xl" />
    </div>
  </div>
);

const StatsCard = ({ label, value, icon: Icon, color }) => (
  <div className="card p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
     <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-50 flex items-center justify-center ${color} shrink-0`}>
        <Icon size={18} className="sm:w-5 sm:h-5" />
     </div>
     <div className="min-w-0">
        <div className="text-lg sm:text-2xl font-bold text-slate-900 leading-none truncate">{value}</div>
        <div className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 truncate">{label}</div>
     </div>
  </div>
);

const ProfileCard = ({ profile, type, onNavigate, setTargetConversationId }) => {
  const [status, setStatus] = useState('connect'); // connect, pending, connected, error
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/connections/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipientId: profile.id })
      });

      if (response.ok) {
        setStatus('pending');
      } else {
        console.error('Failed to send connection request');
        // Optionally handle error state
      }
    } catch (error) {
      console.error('Error sending connection request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ recipientId: profile.id })
      });

      if (response.ok) {
        const data = await response.json();
        setTargetConversationId(data.data.conversation.id);
        onNavigate('messages');
      } else {
        console.error('Failed to start conversation');
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card p-4 sm:p-5 group hover:border-sky-200 transition-all"
    >
       <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative">
             <img src={profile.image} alt={profile.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white shadow-sm" />
             {type === 'mentor' && (
               <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-white">
                  MENTOR
               </div>
             )}
          </div>
          <div className="flex-1 min-w-0">
             <h3 className="font-bold text-slate-900 truncate">{profile.name}</h3>
             <p className="text-xs text-sky-600 font-bold mb-0.5">{profile.role}</p>
             <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                <Building2 size={10} /> {profile.hospital}
             </p>
             <p className="text-[10px] text-slate-400 mt-2">
                {profile.mutual} mutual connections
             </p>
          </div>
       </div>
       <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
          <button 
            onClick={handleConnect}
            disabled={status === 'pending' || loading}
            className={`flex-1 btn py-1.5 text-xs ${
              status === 'pending' 
                ? 'bg-slate-100 text-slate-500 cursor-default' 
                : 'btn-primary'
            }`}
          >
            {loading ? 'Sending...' : status === 'pending' ? 'Pending' : 'Connect'}
          </button>
          <button onClick={handleMessage} className="btn btn-secondary px-3 py-1.5">
             <MessageSquare size={14} />
          </button>
       </div>
    </motion.div>
  );
};

const CompanyPill = ({ name, count }) => (
    <div className="min-w-[140px] p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md hover:border-sky-200 transition-all cursor-pointer text-center">
        <div className="h-8 w-8 mx-auto bg-white rounded-lg shadow-sm mb-2 flex items-center justify-center text-lg">🏥</div>
        <div className="font-bold text-slate-900 text-xs mb-0.5">{name}</div>
        <div className="text-[10px] text-slate-500">{count}</div>
    </div>
);

const SidebarItem = ({ icon: Icon, label, count }) => (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer transition-colors border-l-2 border-transparent hover:border-sky-500">
        <div className="flex items-center gap-3 text-slate-600">
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-xs text-slate-400 font-bold">{count}</span>
    </div>
);

export default Network;
