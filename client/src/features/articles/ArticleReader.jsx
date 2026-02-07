
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Clock, Share2, Bookmark, MessageSquare } from 'lucide-react';
import LandingHeader from '../landing/components/LandingHeader';
import LandingFooter from '../landing/components/LandingFooter';
import { articlesData } from './data';

const ArticleReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const found = articlesData.find(a => a.id === id);
    if (found) {
      setArticle(found);
    }
  }, [id]);

  if (!article) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Article not found</h2>
                <button onClick={() => navigate('/articles')} className="mt-4 text-emerald-600 font-bold hover:underline">Back to Articles</button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <LandingHeader onLoginClick={() => navigate('/login')} onJoinClick={() => navigate('/login')} />
      
      {/* Progress Bar (Optional) */}
      <div className="h-1 bg-slate-100 w-full sticky top-[72px] lg:top-[80px] z-30">
        <div className="h-full bg-emerald-500 w-1/3"></div> 
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 lg:px-8 py-8 lg:py-12">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
            <ChevronLeft size={18} />
          </div>
          <span className="font-bold text-sm">Back</span>
        </button>

        <article>
           {/* Article Header */}
           <div className="mb-8">
              <div className="flex gap-2 mb-4">
                 <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {article.topic}
                 </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-between border-y border-slate-100 py-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                       <img src={`https://ui-avatars.com/api/?name=${article.author}&background=random`} alt={article.author} />
                    </div>
                    <div>
                       <div className="font-bold text-slate-900">{article.author}</div>
                       <div className="text-xs text-slate-500">{article.role}</div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-6 text-slate-500 text-sm hidden sm:flex">
                    <span className="flex items-center gap-2"><Calendar size={16} /> {article.date}</span>
                    <span className="flex items-center gap-2"><Clock size={16} /> {article.readTime}</span>
                 </div>
              </div>
           </div>

           {/* Featured Image */}
           <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
              <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
           </div>

           {/* Content */}
           <div 
             className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-emerald-600"
             dangerouslySetInnerHTML={{ __html: article.content }}
           />

           {/* Engagement */}
           <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between">
              <div className="flex gap-4">
                 <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    <MessageSquare size={18} /> <span>Comment</span>
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 font-bold hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                    <Share2 size={18} /> <span>Share</span>
                 </button>
              </div>
              <button className="p-3 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                 <Bookmark size={24} />
              </button>
           </div>
        </article>

      </main>
      
      <LandingFooter />
    </div>
  );
};

export default ArticleReader;
