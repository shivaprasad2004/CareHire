import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

const Badge = ({ children, variant = 'default', size = 'sm', icon, className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    primary: 'bg-carehire-50 text-carehire-700 dark:bg-carehire-900/30 dark:text-carehire-400',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-amber-50 text-amber-700',
    danger: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700',
    verified: 'bg-blue-50 text-blue-600',
    premium: 'bg-amber-50 text-amber-600',
    openToWork: 'bg-green-50 text-green-700 border border-green-200',
    hiring: 'bg-purple-50 text-purple-700 border border-purple-200'
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {variant === 'verified' && <CheckCircle size={12} />}
      {variant === 'premium' && <Shield size={12} />}
      {icon}
      {children}
    </span>
  );
};

export default Badge;
