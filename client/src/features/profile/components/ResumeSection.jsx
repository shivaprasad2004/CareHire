import React from 'react';
import { Download } from 'lucide-react';

const ResumeSection = ({ onDownload }) => (
  <div className="card p-6 bg-slate-900 text-white">
    <h3 className="font-bold mb-2">Curriculum Vitae</h3>
    <p className="text-slate-400 text-xs mb-4">Download updated CV</p>
    <button 
      onClick={onDownload}
      className="w-full bg-white text-slate-900 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
    >
      <Download size={16} />
      Download CV
    </button>
  </div>
);

export default ResumeSection;