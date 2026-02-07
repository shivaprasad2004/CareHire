import React, { useState, useEffect } from 'react';
import { Search, BookOpen, FileText, Video, Download, Filter, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ["All", "Critical Care", "Cardiology", "Pediatrics", "Neurology", "Surgery", "Pharmacology"];

export default function Resources({ user }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'All') queryParams.append('category', selectedCategory);
        if (searchQuery) queryParams.append('search', searchQuery);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/resources?${queryParams}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            setResources(data.data.resources);
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
        fetchResources();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);

  const handleDownload = async (id) => {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${import.meta.env.VITE_API_URL}/resources/${id}/download`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        // Optimistically update download count
        setResources(prev => prev.map(r => r.id === id ? { ...r, downloadCount: (r.downloadCount || 0) + 1 } : r));
      } catch (error) {
          console.error("Error incrementing download:", error);
      }
  };

  const getIcon = (type) => {
      switch(type?.toLowerCase()) {
          case 'video': return <Video size={20} className="text-purple-500" />;
          case 'protocol': return <FileText size={20} className="text-emerald-500" />;
          default: return <BookOpen size={20} className="text-blue-500" />;
      }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Medical Knowledge Bank</h1>
          <p className="text-emerald-50 mb-8 max-w-2xl text-sm sm:text-base">
            Access the latest clinical guidelines, research papers, and educational resources curated for medical professionals and students.
          </p>
          
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search guidelines, protocols, or topics..." 
              className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl bg-white text-slate-900 shadow-xl focus:ring-2 focus:ring-emerald-300 focus:outline-none transition-all placeholder:text-slate-400 text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === category 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
            <div className="col-span-full flex justify-center p-8 text-slate-500">Loading resources...</div>
        ) : resources.length === 0 ? (
            <div className="col-span-full flex justify-center p-8 text-slate-500">No resources found matching your criteria.</div>
        ) : (
            resources.map(resource => (
                <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 hover:border-emerald-200 hover:shadow-md transition-all group cursor-pointer"
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                            {getIcon(resource.type)}
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                            {resource.format || 'PDF'}
                        </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                        {resource.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">{resource.author}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                        <span className="flex items-center gap-1">
                            <Download size={14} />
                            {resource.downloadCount || 0}
                        </span>
                        <span>{new Date(resource.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                    
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(resource.id);
                        }}
                        className="w-full mt-3 btn btn-secondary text-xs py-2 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600"
                    >
                        Download Resource
                    </button>
                </motion.div>
            ))
        )}
      </div>
    </div>
  );
}
