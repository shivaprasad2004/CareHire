import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, ArrowRight, Check, Upload, Globe, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { organizationService } from '../../services/organizationService';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ImageUpload from '../../components/ui/ImageUpload';
import toast from 'react-hot-toast';

const CreateOrganization = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', tagline: '', industry: '', location: '', website: '',
    size: '', founded: '', type: 'hospital', specialties: '', email: '', phone: '',
    logo: '', coverImage: ''
  });

  const orgTypes = [
    { value: 'hospital', label: 'Hospital', icon: '\u{1F3E5}' },
    { value: 'clinic', label: 'Clinic', icon: '\u{1F3E8}' },
    { value: 'university', label: 'University', icon: '\u{1F393}' },
    { value: 'pharma', label: 'Pharmaceutical', icon: '\u{1F48A}' },
    { value: 'research', label: 'Research Institute', icon: '\u{1F52C}' },
    { value: 'ngo', label: 'NGO', icon: '\u{1F30D}' },
    { value: 'other', label: 'Other', icon: '\u{1F3E2}' },
  ];

  const sizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1001-5000', '5000+'];

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error('Organization name is required');
    try {
      setLoading(true);
      const data = {
        ...form,
        specialties: form.specialties ? form.specialties.split(',').map(s => s.trim()).filter(Boolean) : []
      };
      const res = await organizationService.createOrganization(data);
      if (res.status === 'success') {
        toast.success('Organization created successfully!');
        navigate(`/organization/${res.data.organization.slug}`);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Create Organization</h1>
          <p className="text-sm text-slate-500">Set up your hospital, clinic, or institution page</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full transition-colors ${s <= step ? 'bg-carehire-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          {step === 1 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Organization Name *</label>
                  <input className="input" value={form.name} onChange={e => update('name', e.target.value)} placeholder="e.g., Apollo Hospitals" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tagline</label>
                  <input className="input" value={form.tagline} onChange={e => update('tagline', e.target.value)} placeholder="Brief description of your organization" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Organization Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {orgTypes.map(t => (
                      <button
                        key={t.value}
                        onClick={() => update('type', t.value)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          form.type === t.value
                            ? 'border-carehire-600 bg-carehire-50 dark:bg-carehire-950'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-2xl">{t.icon}</span>
                        <span className="block text-xs font-medium mt-1">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                  <input className="input" value={form.industry} onChange={e => update('industry', e.target.value)} placeholder="e.g., Healthcare, Medical Research" />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} icon={<ArrowRight size={16} />}>Next</Button>
                </div>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea className="input min-h-[120px]" value={form.description} onChange={e => update('description', e.target.value)} placeholder="Tell people about your organization..." />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                    <input className="input" value={form.location} onChange={e => update('location', e.target.value)} placeholder="City, Country" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Website</label>
                    <input className="input" value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://..." />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Size</label>
                    <select className="input" value={form.size} onChange={e => update('size', e.target.value)}>
                      <option value="">Select size</option>
                      {sizes.map(s => <option key={s} value={s}>{s} employees</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Founded Year</label>
                    <input className="input" value={form.founded} onChange={e => update('founded', e.target.value)} placeholder="e.g., 2005" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Specialties (comma separated)</label>
                  <input className="input" value={form.specialties} onChange={e => update('specialties', e.target.value)} placeholder="Cardiology, Neurology, Orthopedics" />
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft size={16} /> Back</Button>
                  <Button onClick={() => setStep(3)} icon={<ArrowRight size={16} />}>Next</Button>
                </div>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Review & Create</h2>
              <div className="space-y-4">
                {/* Preview Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="h-24 bg-gradient-to-r from-carehire-600 to-teal-500" />
                  <div className="px-4 pb-4">
                    <div className="flex items-end gap-3 -mt-8">
                      <div className="h-16 w-16 rounded-xl bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow flex items-center justify-center">
                        <Building2 size={24} className="text-carehire-600" />
                      </div>
                      <div className="pb-1">
                        <h3 className="font-bold text-lg">{form.name || 'Organization Name'}</h3>
                        <p className="text-sm text-slate-500">{form.tagline || 'No tagline'}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-slate-500">
                      {form.type && <span className="tag">{orgTypes.find(t => t.value === form.type)?.label}</span>}
                      {form.location && <span className="flex items-center gap-1"><MapPin size={12} />{form.location}</span>}
                      {form.size && <span className="flex items-center gap-1"><Users size={12} />{form.size}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(2)}><ArrowLeft size={16} /> Back</Button>
                  <Button variant="gradient" onClick={handleSubmit} loading={loading} icon={<Check size={16} />}>
                    Create Organization
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CreateOrganization;
