import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Building2, Users, Briefcase, BookmarkPlus, BookmarkCheck, Share2, DollarSign, Calendar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import useAuthStore from '../../stores/authStore';
import toast from 'react-hot-toast';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      const res = await jobService.getJobById(jobId);
      if (res.status === 'success') setJob(res.data.job);
    } catch (err) {
      console.error('Error loading job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);
      const res = await jobService.applyForJob(jobId);
      toast.success('Application submitted successfully!');
      setShowApply(false);
    } catch (err) {
      toast.error(err.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-48 rounded-lg" />
        <div className="skeleton h-64 rounded-2xl" />
        <div className="skeleton h-48 rounded-2xl" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold mb-2">Job not found</h2>
        <p className="text-slate-500 mb-4">This job listing may have been removed.</p>
        <Button onClick={() => navigate('/jobs')}>Browse Jobs</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft size={16} /> Back to jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-carehire-100 to-carehire-200 dark:from-carehire-900 dark:to-carehire-800 flex items-center justify-center shrink-0">
                <Building2 size={28} className="text-carehire-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{job.title}</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {job.organization?.name || job.recruiter?.firstName + ' ' + job.recruiter?.lastName}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                  {job.workplaceType && <Badge variant="info" size="xs">{job.workplaceType}</Badge>}
                  {job.experienceLevel && <Badge variant="default" size="xs">{job.experienceLevel}</Badge>}
                </div>
                {job.salaryRange && (
                  <div className="flex items-center gap-1 mt-2 text-sm font-medium text-green-600">
                    <DollarSign size={14} /> {job.salaryRange}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="gradient" size="lg" onClick={() => setShowApply(true)} icon={<Zap size={18} />}>
                Apply Now
              </Button>
              <Button variant="secondary" onClick={() => setSaved(!saved)} icon={saved ? <BookmarkCheck size={18} className="text-carehire-600" /> : <BookmarkPlus size={18} />}>
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="ghost" icon={<Share2 size={18} />}>Share</Button>
            </div>

            {job.applicantsCount > 0 && (
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <Users size={14} /> {job.applicantsCount} applicants
              </div>
            )}
          </Card>

          {/* Description */}
          <Card>
            <h2 className="text-lg font-bold mb-4">About the Role</h2>
            <div className="prose-carehire whitespace-pre-line">{job.description}</div>
          </Card>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {(Array.isArray(job.requirements) ? job.requirements : []).map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-carehire-600 mt-2 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span key={i} className="tag-primary">{skill}</span>
                ))}
              </div>
            </Card>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <div className="h-6 w-6 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    {b}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Job Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Posted</span>
                <span className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
              {job.deadline && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Deadline</span>
                  <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Job Type</span>
                <span className="font-medium">{job.type}</span>
              </div>
              {job.department && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Department</span>
                  <span className="font-medium">{job.department}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <Badge variant={job.status === 'Open' ? 'success' : 'danger'} size="xs">{job.status}</Badge>
              </div>
            </div>
          </Card>

          {job.recruiter && (
            <Card>
              <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Posted By</h3>
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(`/in/${job.recruiter.id}`)}>
                <Avatar src={job.recruiter.avatarUrl} name={`${job.recruiter.firstName} ${job.recruiter.lastName}`} size="md" />
                <div>
                  <h4 className="font-semibold text-sm">{job.recruiter.firstName} {job.recruiter.lastName}</h4>
                  <p className="text-xs text-slate-500">Recruiter</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <Modal isOpen={showApply} onClose={() => setShowApply(false)} title="Apply for this position" size="md">
        <div className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <h3 className="font-bold">{job.title}</h3>
            <p className="text-sm text-slate-500">{job.organization?.name || 'Direct Hire'} · {job.location}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cover Letter (Optional)</label>
            <textarea className="input min-h-[120px]" value={coverLetter} onChange={e => setCoverLetter(e.target.value)} placeholder="Tell the recruiter why you're a great fit..." />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setShowApply(false)}>Cancel</Button>
            <Button variant="gradient" onClick={handleApply} loading={applying}>Submit Application</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetail;
