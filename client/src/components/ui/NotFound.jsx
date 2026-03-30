import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-black text-carehire-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate(-1)} className="btn btn-secondary flex items-center gap-2">
            <ArrowLeft size={16} /> Go Back
          </button>
          <button onClick={() => navigate('/feed')} className="btn btn-primary flex items-center gap-2">
            <Home size={16} /> Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
