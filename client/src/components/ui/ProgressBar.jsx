import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100, label, showPercentage = true, color = 'carehire', size = 'md', className = '' }) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  const colors = {
    carehire: 'bg-carehire-600',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500'
  };

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
          {showPercentage && <span className="text-sm font-bold text-slate-900 dark:text-white">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${heights[size]} ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
