import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Mail, FileText } from 'lucide-react';
import { applicationService } from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import toast from 'react-hot-toast';

const ManageApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getJobApplications(jobId)
      .then(res => {
        if (res.status === 'success') setApplicants(res.data.applications || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [jobId]);

  const updateStatus = async (id, status) => {
    try {
      await applicationService.updateApplicationStatus(id, status);
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      toast.success(`Application ${status.toLowerCase()}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const statusColors = { Pending: 'warning', Reviewed: 'info', Interview: 'primary', Offer: 'success', Rejected: 'danger' };

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-xl font-bold">Manage Applicants</h1>
          <p className="text-sm text-slate-500">{applicants.length} applicant{applicants.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>
      ) : applicants.length === 0 ? (
        <Card><EmptyState icon={Users} title="No applicants yet" description="Applicants will appear here once they apply." /></Card>
      ) : (
        <div className="space-y-3">
          {applicants.map(app => (
            <Card key={app.id}>
              <div className="flex items-start gap-4">
                <Avatar src={app.applicant?.avatarUrl} name={`${app.applicant?.firstName} ${app.applicant?.lastName}`} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 dark:text-white cursor-pointer hover:text-carehire-600" onClick={() => navigate(`/in/${app.applicant?.id}`)}>
                      {app.applicant?.firstName} {app.applicant?.lastName}
                    </h3>
                    <Badge variant={statusColors[app.status] || 'default'} size="xs">{app.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">{app.applicant?.specialty || app.applicant?.title || 'Medical Professional'}</p>
                  <p className="text-xs text-slate-400 mt-1">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                  {app.coverLetter && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{app.coverLetter}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="xs" variant="primary" onClick={() => updateStatus(app.id, 'Interview')}>Interview</Button>
                    <Button size="xs" variant="outline" onClick={() => updateStatus(app.id, 'Reviewed')}>Mark Reviewed</Button>
                    <Button size="xs" variant="ghost" className="text-red-600" onClick={() => updateStatus(app.id, 'Rejected')}>Reject</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageApplicants;
