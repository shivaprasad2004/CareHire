import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark } from 'lucide-react';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';

const SavedJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><ArrowLeft size={20} /></button>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
      </div>
      <Card>
        <EmptyState icon={Bookmark} title="No saved jobs yet" description="Save jobs you're interested in to review them later." action={
          <button onClick={() => navigate('/jobs')} className="btn btn-primary mt-2">Browse Jobs</button>
        } />
      </Card>
    </div>
  );
};

export default SavedJobs;
