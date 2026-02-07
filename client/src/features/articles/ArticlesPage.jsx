
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ArrowRight, Clock, User } from 'lucide-react';
import LandingHeader from '../landing/components/LandingHeader';
import LandingFooter from '../landing/components/LandingFooter';
import { articlesData, topics } from './data';

const ArticlesPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Normalize topic for comparison (e.g., "clinical-research" -> "Clinical Research")
  const formatTopicFromUrl = (urlSlug) => {
    if (!urlSlug) return 'All';
    return urlSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const currentTopic = formatTopicFromUrl(topic);

  const filteredArticles = articlesData.filter(article => {
    const matchesTopic = currentTopic === 'All' || article.topic === currentTopic;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const handleTopicClick = (t) => {
    const slug = t.toLowerCase().replace(/\s+/g, '-');
    navigate(`/articles/${slug}`);
  };

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Reusing Landing Header for consistency */}
      <LandingHeader onLoginClick={() => navigate('/login')} onJoinClick={() => navigate('/login')} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 lg:py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-slate-500 mb-4 text-sm">
             <span className="cursor-pointer hover:text-emerald-600" onClick={() => navigate('/')}>Home</span>
             <span>/</span>
             <span className="font-semibold text-slate-900">Articles</span>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            {currentTopic === 'All' ? 'Explore Healthcare Insights' : `${currentTopic} Articles`}
          </h1>
          
          <div className="relative max-w-2xl">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text"
               placeholder="Search for articles, topics, or experts..." 
               className="w-full pl-12 pr-4 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-slate-700"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </div>

        {/* Topics Filter */}
        <div className="mb-12">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Browse by Topic</h3>
           <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => navigate('/articles')}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    currentTopic === 'All' 
                    ? 'bg-emerald-600 text-white shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                All Topics
              </button>
              {topics.map(t => (
                <button 
                  key={t}
                  onClick={() => handleTopicClick(t)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      currentTopic === t 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredArticles.map((article, index) => (
               <motion.div 
                 key={article.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.05 }}
                 className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                 onClick={() => handleArticleClick(article.id)}
               >
                 <div className="h-48 overflow-hidden relative">
                   <img 
                     src={article.image} 
                     alt={article.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-700">
                     {article.topic}
                   </div>
                 </div>
                 <div className="p-6">
                   <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors">
                     {article.title}
                   </h2>
                   <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                      <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                   </div>
                   <div className="flex items-center text-emerald-600 font-bold text-sm group/btn">
                      Read Article <ArrowRight size={16} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <Search size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">No articles found</h3>
             <p className="text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
             <button 
               onClick={() => { setSearchTerm(''); navigate('/articles'); }}
               className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors"
             >
               Clear Filters
             </button>
          </div>
        )}

      </main>

      <LandingFooter />
    </div>
  );
};

export default ArticlesPage;
