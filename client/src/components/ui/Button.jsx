import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = 'primary', size = 'md', loading = false, disabled = false, icon, className = '', ...props }) => {
  const variants = {
    primary: 'bg-carehire-600 text-white hover:bg-carehire-700 hover:shadow-lg hover:shadow-carehire-600/20 border border-transparent focus:ring-carehire-600/40',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm',
    ghost: 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent',
    outline: 'border-2 border-carehire-600 text-carehire-600 hover:bg-carehire-50',
    gradient: 'bg-gradient-to-r from-carehire-600 to-teal-500 text-white hover:shadow-lg hover:shadow-carehire-600/30 border border-transparent'
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs rounded-lg gap-1',
    sm: 'px-3 py-2 text-sm rounded-lg gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-xl gap-2',
    xl: 'px-8 py-4 text-lg rounded-2xl gap-3'
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
    </motion.button>
  );
};

export default Button;
