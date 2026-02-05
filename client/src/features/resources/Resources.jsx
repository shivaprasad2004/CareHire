import React, { useState } from 'react';
import { Search, BookOpen, FileText, Video, Download, Filter, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const RESOURCES_DATA = [
  {
    id: 1,
    title: "2025 Sepsis Management Guidelines",
    type: "protocol",
    category: "Critical Care",
    author: "International Sepsis Alliance",
    date: "Jan 15, 2025",
    downloads: "12.5k",
    format: "PDF"
  },
  {
    id: 2,
    title: "Advanced ECG Interpretation Guide",
    type: "guide",
    category: "Cardiology",
    author: "Dr. Sarah Miller",
    date: "Feb 02, 2025",
    downloads: "8.2k",
    format: "Video"
  },
  {
    id: 3,
    title: "Pediatric Dosage Handbook",
    type: "reference",
    category: "Pediatrics",
    author: "Children's Hospital Research",
    date: "Dec 10, 2024",
    downloads: "45k",
    format: "PDF"
  },
  {
    id: 4,
    title: "Neurological Exam Techniques",
    type: "guide",
    category: "Neurology",
    author: "Stanford Medicine",
    date: "Jan 28, 2025",
    downloads: "5.1k",
    format: "Article"
  }
];

const CATEGORIES = ["All", "Critical Care", "Cardiology", "Pediatrics", "Neurology", "Surgery", "Pharmacology"];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCES_DATA.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Medical Knowledge Bank</h1>
          <p className="text-emerald-50 mb-8 max-w-2xl">
            Access the latest clinical guidelines, research papers, and educational resources curated for medical professionals and students.
          </p>
          
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search guidelines, protocols, or topics..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 shadow-xl focus:ring-2 focus:ring-emerald-300 focus:outline-none transition-all placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${
                item.format === 'PDF' ? 'bg-red-50 text-red-600' :
                item.format === 'Video' ? 'bg-blue-50 text-blue-600' :
                'bg-emerald-50 text-emerald-600'
              }`}>
                {item.format === 'PDF' ? <FileText size={24} /> :
                 item.format === 'Video' ? <Video size={24} /> :
                 <BookOpen size={24} />}
              </div>
              <button className="text-slate-400 hover:text-amber-400 transition-colors">
                <Star size={20} />
              </button>
            </div>

            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
              {item.title}
            </h3>
            
            <div className="flex items-center text-sm text-slate-500 mb-4 space-x-2">
              <span>{item.author}</span>
              <span>•</span>
              <span>{item.date}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                {item.category}
              </span>
              <button className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700">
                <Download size={16} className="mr-1" />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
