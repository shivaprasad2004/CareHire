import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PillButton = ({ label, onClick }) => (
    <button 
        onClick={onClick}
        className="px-5 py-3 rounded-full border border-slate-400 text-slate-600 font-bold hover:bg-slate-100 hover:border-slate-600 hover:text-slate-900 transition-all text-sm whitespace-nowrap"
    >
        {label}
    </button>
);

const ContentSection = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate('/login');
  };

  const handleArticleClick = (topic) => {
    const slug = topic.toLowerCase().replace(/\s+/g, '-');
    navigate(`/articles/${slug}`);
  };

  const handleShowAllArticles = () => {
    navigate('/articles');
  };

  const articles = [
      'Clinical Research', 'Patient Care', 'Hospital Administration', 'Nursing', 
      'Telehealth', 'Public Health', 'Medical Ethics', 'Surgery', 'Pediatrics',
      'Mental Health', 'Emergency Medicine', 'Oncology', 'Cardiology', 'Neurology'
  ];

  const jobs = [
      'Registered Nurse', 'Surgeon', 'Medical Assistant', 'Anesthesiologist', 
      'Pharmacist', 'Physical Therapist', 'Radiologist', 'Lab Technician', 
      'Healthcare Administrator', 'Nurse Practitioner', 'Occupational Therapist',
      'Paramedic', 'Dental Hygienist', 'Medical Scribe', 'Phlebotomist'
  ];

  const tools = [
      'EHR Systems', 'Telemedicine Platforms', 'Medical Billing', 'Patient Scheduling', 
      'Practice Management', 'Clinical Decision Support', 'Radiology Info Systems',
      'Laboratory Info Systems', 'Pharmacy Management', 'Revenue Cycle Management',
      'Healthcare CRM', 'Medical Imaging', 'e-Prescribing'
  ];

  return (
    <>
      {/* Collaborative Articles Section */}
      <section className="bg-slate-50 py-16 px-4 lg:px-24">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
               <h2 className="text-3xl font-light text-slate-800 mb-4">Explore collaborative articles</h2>
               <p className="text-slate-600 mb-6">We're unlocking community knowledge in a new way. Experts add insights directly into each article, started with the help of AI.</p>
            </div>
            <div className="flex-1 flex flex-wrap gap-3 content-start">
               {articles.map(topic => (
                  <PillButton key={topic} label={topic} onClick={() => handleArticleClick(topic)} />
               ))}
               <button 
                 onClick={handleShowAllArticles}
                 className="px-5 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 transition-colors text-sm"
               >
                 Show all
               </button>
            </div>
         </div>
      </section>

      {/* Job Search Section */}
      <section className="bg-white py-16 px-4 lg:px-24">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
               <h2 className="text-3xl font-light text-slate-800 mb-4">Find the right job or internship for you</h2>
            </div>
            <div className="flex-1 flex flex-wrap gap-3 content-start">
               {jobs.map(job => (
                  <PillButton key={job} label={job} onClick={() => handleArticleClick(job)} />
               ))}
               <button 
                 onClick={handleShowAllArticles}
                 className="px-5 py-3 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors text-sm flex items-center gap-1"
               >
                 Show more <ChevronDown size={16} />
               </button>
            </div>
         </div>
      </section>

      {/* Post Job Section */}
      <section className="bg-orange-50/50 py-16 px-4 lg:px-24">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl lg:text-4xl text-orange-900 font-light mb-8">Post your job for millions of people to see</h2>
            <button 
              onClick={handleAction}
              className="px-6 py-3 rounded-full border border-orange-700 text-orange-700 font-bold hover:bg-orange-100 transition-colors"
            >
              Post a job
            </button>
         </div>
      </section>

      {/* Software Tools Section */}
      <section className="bg-white py-16 px-4 lg:px-24">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
               <h2 className="text-3xl font-light text-slate-800 mb-4">Discover the best software tools</h2>
               <p className="text-slate-600">Connect with buyers who have first-hand experience to find the best products for you.</p>
            </div>
            <div className="flex-1 flex flex-wrap gap-3 content-start">
               {tools.map(tool => (
                  <PillButton key={tool} label={tool} onClick={() => handleArticleClick(tool)} />
               ))}
               <button 
                 onClick={handleShowAllArticles}
                 className="px-5 py-3 rounded-full border border-emerald-600 text-emerald-700 font-bold hover:bg-emerald-50 transition-colors text-sm"
               >
                 Show all
               </button>
            </div>
         </div>
      </section>
    </>
  );
};

export default ContentSection;
