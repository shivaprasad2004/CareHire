import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Users, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { jobService } from '../../services/jobService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import toast from 'react-hot-toast';

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', location: '', type: 'Full-time', salaryRange: '',
    requirements: '', skills: '', benefits: '', experienceLevel: '', workplaceType: 'On-site',
    department: '', specialtyRequired: '', deadline: ''
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.location) {
      return toast.error('Please fill in all required fields');
    }
    try {
      setLoading(true);
      const data = {
        ...form,
        requirements: form.requirements ? form.requirements.split('\n').filter(Boolean) : [],
        skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        benefits: form.benefits ? form.benefits.split('\n').filter(Boolean) : [],
      };
      const res = await jobService.createJob(data);
      if (res.status === 'success') {
        toast.success('Job posted successfully!');
        navigate('/jobs');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-2xl font-bold">Post a Job</h1>
          <p className="text-sm text-slate-500">Find the best medical professionals for your team</p>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <h2 className="text-lg font-bold mb-4">Job Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Title *</label>
              <input className="input" value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g., Senior Cardiologist" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                <input className="input" value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Workplace Type</label>
                <select className="input" value={form.workplaceType} onChange={e => update('workplaceType', e.target.value)}>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Job Type</label>
                <select className="input" value={form.type} onChange={e => update('type', e.target.value)}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Locum">Locum</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
                <select className="input" value={form.experienceLevel} onChange={e => update('experienceLevel', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Entry">Entry Level</option>
                  <option value="Mid">Mid Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Director">Director</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Salary Range</label>
                <input className="input" value={form.salaryRange} onChange={e => update('salaryRange', e.target.value)} placeholder="e.g., $80k-120k" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description *</label>
              <textarea className="input min-h-[160px]" value={form.description} onChange={e => update('description', e.target.value)} placeholder="Describe the role, responsibilities, and what you're looking for..." />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-bold mb-4">Requirements & Skills</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Requirements (one per line)</label>
              <textarea className="input min-h-[100px]" value={form.requirements} onChange={e => update('requirements', e.target.value)} placeholder="MBBS or equivalent&#10;3+ years experience&#10;Board certified" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Skills (comma separated)</label>
              <input className="input" value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="Surgery, Patient Care, EMR Systems" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Benefits (one per line)</label>
              <textarea className="input min-h-[80px]" value={form.benefits} onChange={e => update('benefits', e.target.value)} placeholder="Health insurance&#10;Continuing education&#10;Flexible schedule" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <input className="input" value={form.department} onChange={e => update('department', e.target.value)} placeholder="e.g., Cardiology" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
                <input type="date" className="input" value={form.deadline} onChange={e => update('deadline', e.target.value)} />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
          <Button variant="gradient" onClick={handleSubmit} loading={loading} icon={<Check size={16} />} size="lg">
            Post Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
