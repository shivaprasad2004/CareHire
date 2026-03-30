import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock, TrendingUp, User, Briefcase, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions(null);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/search/suggestions?q=${encodeURIComponent(query)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.status === 'success') setSuggestions(data.data);
      } catch (err) {
        console.error('Search suggestions error:', err);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-carehire-600 transition-colors" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search people, jobs, companies..."
          className="w-full bg-slate-50/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-xl pl-10 pr-20 py-2.5 focus:outline-none focus:ring-2 focus:ring-carehire-500/20 focus:bg-white dark:focus:bg-slate-800 focus:border-carehire-500/40 transition-all placeholder:text-slate-400"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(''); setSuggestions(null); }} className="absolute right-12 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full">
            <X size={14} className="text-slate-400" />
          </button>
        )}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-600 rounded-md px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700">⌘K</span>
        </div>
      </form>

      <AnimatePresence>
        {isFocused && (query.length >= 2 && suggestions) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
          >
            {suggestions.users?.length > 0 && (
              <div className="p-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1">People</div>
                {suggestions.users.map(user => (
                  <button key={user.id} onClick={() => navigate(`/in/${user.id}`)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left">
                    <User size={16} className="text-slate-400 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{user.firstName} {user.lastName}</div>
                      <div className="text-xs text-slate-500">{user.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {suggestions.jobs?.length > 0 && (
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1">Jobs</div>
                {suggestions.jobs.map(job => (
                  <button key={job.id} onClick={() => navigate(`/jobs/${job.id}`)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left">
                    <Briefcase size={16} className="text-slate-400 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white">{job.title}</div>
                      <div className="text-xs text-slate-500">{job.location}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {suggestions.organizations?.length > 0 && (
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1">Organizations</div>
                {suggestions.organizations.map(org => (
                  <button key={org.id} onClick={() => navigate(`/organization/${org.slug}`)} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left">
                    <Building2 size={16} className="text-slate-400 shrink-0" />
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{org.name}</div>
                  </button>
                ))}
              </div>
            )}
            <button onClick={() => { navigate(`/search?q=${encodeURIComponent(query)}`); setIsFocused(false); }} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-carehire-600 font-medium hover:bg-carehire-50 border-t border-slate-100 dark:border-slate-800">
              <Search size={16} /> Search for "{query}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
