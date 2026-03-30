import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Globe, Users, Briefcase, Calendar, Shield, ExternalLink, Building2, ChevronRight, Share2, Flag, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { organizationService } from '../../services/organizationService';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import useAuthStore from '../../stores/authStore';

const OrganizationPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const [org, setOrg] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadOrganization();
  }, [slug]);

  const loadOrganization = async () => {
    try {
      setLoading(true);
      const res = await organizationService.getOrganizationBySlug(slug);
      if (res.status === 'success') {
        setOrg(res.data.organization);
        setIsFollowing(res.data.isFollowing);
      }
    } catch (err) {
      console.error('Error loading organization:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!org) return;
    if (activeTab === 'people') {
      organizationService.getMembers(org.id).then(res => {
        if (res.status === 'success') setMembers(res.data.members);
      }).catch(console.error);
    } else if (activeTab === 'jobs') {
      organizationService.getOrganizationJobs(org.id).then(res => {
        if (res.status === 'success') setJobs(res.data.jobs);
      }).catch(console.error);
    } else if (activeTab === 'posts') {
      organizationService.getOrganizationPosts(org.id).then(res => {
        if (res.status === 'success') setPosts(res.data.posts);
      }).catch(console.error);
    }
  }, [activeTab, org]);

  const handleFollow = async () => {
    try {
      const res = await organizationService.toggleFollow(org.id);
      if (res.status === 'success') {
        setIsFollowing(res.data.following);
        setOrg(prev => ({
          ...prev,
          followersCount: res.data.following ? prev.followersCount + 1 : prev.followersCount - 1
        }));
      }
    } catch (err) {
      console.error('Error toggling follow:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-48 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (!org) {
    return <EmptyState title="Organization not found" description="This organization doesn't exist or has been removed." />;
  }

  const isAdmin = user?.id === org.adminId;

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'people', label: 'People' },
    { id: 'posts', label: 'Posts' },
  ];

  const orgTypes = {
    hospital: 'Hospital',
    clinic: 'Clinic',
    university: 'University',
    pharma: 'Pharmaceutical',
    research: 'Research Institute',
    ngo: 'NGO',
    other: 'Organization'
  };

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* Cover & Header */}
      <Card padding="p-0" className="overflow-hidden mb-4">
        {/* Cover Image */}
        <div className="h-40 md:h-56 bg-gradient-to-r from-carehire-600 via-teal-500 to-emerald-500 relative">
          {org.coverImage && (
            <img src={org.coverImage} alt="Cover" className="w-full h-full object-cover" />
          )}
        </div>

        {/* Org Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-10 md:-mt-12">
            {/* Logo */}
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-lg overflow-hidden shrink-0">
              {org.logo ? (
                <img src={org.logo} alt={org.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-carehire-100 to-carehire-200 dark:from-carehire-900 dark:to-carehire-800 flex items-center justify-center">
                  <Building2 size={40} className="text-carehire-600" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{org.name}</h1>
                {org.verified && <Badge variant="verified">Verified</Badge>}
              </div>
              {org.tagline && <p className="text-slate-600 dark:text-slate-400 mt-1">{org.tagline}</p>}
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 flex-wrap">
                <span className="flex items-center gap-1"><Building2 size={14} /> {orgTypes[org.type] || org.type}</span>
                {org.location && <span className="flex items-center gap-1"><MapPin size={14} /> {org.location}</span>}
                <span className="flex items-center gap-1"><Users size={14} /> {org.followersCount || 0} followers</span>
                {org.employeesCount > 0 && <span className="flex items-center gap-1">{org.employeesCount} employees</span>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button variant={isFollowing ? 'secondary' : 'primary'} onClick={handleFollow}>
                {isFollowing ? 'Following' : '+ Follow'}
              </Button>
              {isAdmin && (
                <Button variant="outline" onClick={() => navigate(`/organization/${slug}/admin`)}>
                  Manage
                </Button>
              )}
              <Button variant="ghost" size="md" className="!px-2"><MoreHorizontal size={20} /></Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <h2 className="text-lg font-bold mb-3">About</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{org.description || 'No description provided.'}</p>
              </Card>

              {org.specialties && org.specialties.length > 0 && (
                <Card>
                  <h2 className="text-lg font-bold mb-3">Specialties</h2>
                  <div className="flex flex-wrap gap-2">
                    {org.specialties.map((s, i) => (
                      <span key={i} className="tag-primary">{s}</span>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <Card>
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Details</h3>
                <div className="space-y-3 text-sm">
                  {org.website && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-carehire-600 hover:underline">
                      <Globe size={16} /> Website <ExternalLink size={12} />
                    </a>
                  )}
                  {org.industry && <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Briefcase size={16} /> {org.industry}</div>}
                  {org.size && <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Users size={16} /> {org.size} employees</div>}
                  {org.founded && <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Calendar size={16} /> Founded {org.founded}</div>}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <Card>
            <h2 className="text-lg font-bold mb-4">Open Positions</h2>
            {jobs.length === 0 ? (
              <EmptyState icon={Briefcase} title="No open positions" description="Check back later for new opportunities." />
            ) : (
              <div className="space-y-3">
                {jobs.map(job => (
                  <div key={job.id} onClick={() => navigate(`/jobs/${job.id}`)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors border border-slate-100 dark:border-slate-800">
                    <div className="h-12 w-12 rounded-lg bg-carehire-50 dark:bg-carehire-900/30 flex items-center justify-center shrink-0">
                      <Briefcase size={20} className="text-carehire-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-slate-500">{job.location} · {job.type} {job.workplaceType && `· ${job.workplaceType}`}</p>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {activeTab === 'people' && (
          <Card>
            <h2 className="text-lg font-bold mb-4">People</h2>
            {members.length === 0 ? (
              <EmptyState icon={Users} title="No members listed" description="Members will appear here once added." />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {members.map(member => (
                  <div key={member.id} onClick={() => navigate(`/in/${member.user?.id}`)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <Avatar src={member.user?.avatarUrl} name={`${member.user?.firstName} ${member.user?.lastName}`} size="md" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{member.user?.firstName} {member.user?.lastName}</h4>
                      <p className="text-xs text-slate-500 truncate">{member.title || member.role}</p>
                    </div>
                    <Badge variant="default" size="xs">{member.role}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {activeTab === 'posts' && (
          <Card>
            <h2 className="text-lg font-bold mb-4">Posts</h2>
            {posts.length === 0 ? (
              <EmptyState title="No posts yet" description="This organization hasn't posted anything yet." />
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post.id} onClick={() => navigate(`/post/${post.id}`)} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar src={post.author?.avatarUrl} name={`${post.author?.firstName} ${post.author?.lastName}`} size="sm" />
                      <div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{post.author?.firstName} {post.author?.lastName}</span>
                        <span className="text-xs text-slate-400 ml-2">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">{post.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default OrganizationPage;
