import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Briefcase, BarChart3, Settings, Edit, PlusCircle } from 'lucide-react';
import { organizationService } from '../../services/organizationService';
import Card from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import useAuthStore from '../../stores/authStore';

const OrgAdmin = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const [org, setOrg] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await organizationService.getOrganizationBySlug(slug);
        if (res.status === 'success') {
          setOrg(res.data.organization);
          if (res.data.organization.adminId !== user?.id) {
            navigate(`/organization/${slug}`);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  useEffect(() => {
    if (!org) return;
    if (activeTab === 'members') {
      organizationService.getMembers(org.id).then(res => {
        if (res.status === 'success') setMembers(res.data.members);
      }).catch(console.error);
    }
  }, [activeTab, org]);

  if (loading) return <div className="skeleton h-96 rounded-2xl max-w-4xl mx-auto" />;
  if (!org) return <EmptyState title="Organization not found" />;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(`/organization/${slug}`)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">{org.name}</h1>
          <p className="text-sm text-slate-500">Admin Panel</p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-4" />

      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <div className="text-3xl font-bold text-carehire-600">{org.followersCount || 0}</div>
            <div className="text-sm text-slate-500 mt-1">Followers</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600">{org.employeesCount || 0}</div>
            <div className="text-sm text-slate-500 mt-1">Members</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-amber-600">0</div>
            <div className="text-sm text-slate-500 mt-1">Job Posts</div>
          </Card>
          <div className="md:col-span-3">
            <Card>
              <h3 className="text-lg font-bold mb-3">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigate('/jobs/post')} icon={<Briefcase size={16} />}>Post a Job</Button>
                <Button variant="outline" onClick={() => navigate(`/organization/${slug}`)} icon={<Edit size={16} />}>Edit Page</Button>
                <Button variant="outline" icon={<PlusCircle size={16} />}>Invite Members</Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'members' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Members ({members.length})</h2>
            <Button size="sm" icon={<PlusCircle size={14} />}>Add Member</Button>
          </div>
          {members.length === 0 ? (
            <EmptyState icon={Users} title="No members yet" description="Invite team members to join your organization." />
          ) : (
            <div className="space-y-2">
              {members.map(m => (
                <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    {m.user?.avatarUrl && <img src={m.user.avatarUrl} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{m.user?.firstName} {m.user?.lastName}</h4>
                    <p className="text-xs text-slate-500">{m.title || m.role}</p>
                  </div>
                  <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full capitalize">{m.role}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card>
          <h2 className="text-lg font-bold mb-4">Organization Settings</h2>
          <p className="text-slate-500 text-sm">Organization settings and management tools coming soon.</p>
        </Card>
      )}
    </div>
  );
};

export default OrgAdmin;
