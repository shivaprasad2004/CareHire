import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { applicationService } from '../../services/applicationService';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications()
      .then(res => {
        if (res.status === 'success') setApplications(res.data.applications || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statusColors = { Pending: 'warning', Reviewed: 'info', Interview: 'primary', Offer: 'success', Rejected: 'danger' };

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ArrowLeft size={20} /></button>
        <h1 className="text-2xl font-bold">Applied Jobs</h1>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton h-20 rounded-2xl" />)}</div>
      ) : applications.length === 0 ? (
        <Card><EmptyState icon={Briefcase} title="No applications yet" description="Start applying for jobs to track your applications here." action={
          <button onClick={() => navigate('/jobs')} className="btn btn-primary mt-2">Browse Jobs</button>
        } /></Card>
      ) : (
        <div className="space-y-3">
          {applications.map(app => (
            <Card key={app.id} hover onClick={() => navigate(`/jobs/${app.job?.id || app.jobId}`)}>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-carehire-50 dark:bg-carehire-900/30 flex items-center justify-center shrink-0">
                  <Briefcase size={20} className="text-carehire-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{app.job?.title || 'Job Position'}</h3>
                  <p className="text-sm text-slate-500">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant={statusColors[app.status] || 'default'} size="sm">{app.status}</Badge>
                <ArrowRight size={16} className="text-slate-400 shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
