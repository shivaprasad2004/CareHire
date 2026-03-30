import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, hover = false, className = '', padding = 'p-6', onClick }) => {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover ? {
    whileHover: { y: -2, boxShadow: '0 12px 20px -8px rgba(0,0,0,0.08), 0 4px 12px -4px rgba(0,0,0,0.04)' },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] ${padding} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...hoverProps}
    >
      {children}
    </Component>
  );
};

export default Card;
