import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Stethoscope, UserPlus, X } from 'lucide-react';

const FAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const actions = [
    { icon: Stethoscope, label: 'New Case', color: 'bg-rose-500' },
    { icon: Search, label: 'Find Job', color: 'bg-emerald-500' },
    { icon: UserPlus, label: 'Invite', color: 'bg-sky-500' },
  ];

  return (
    <div className="fixed bottom-24 right-4 z-50 lg:hidden">
      <AnimatePresence>
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3 mb-2 flex flex-col items-end">
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 group"
              >
                <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
                <div className={`${action.color} p-3 rounded-full text-white shadow-lg shadow-slate-900/10`}>
                  <action.icon size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        className={`p-4 rounded-full shadow-xl shadow-sky-500/20 text-white transition-all duration-300 animate-float ${
          isOpen ? 'bg-slate-800 rotate-45' : 'bg-sky-500 hover:bg-sky-600'
        }`}
      >
        <Plus size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default FAB;
