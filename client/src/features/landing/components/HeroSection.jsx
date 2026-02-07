import React from 'react';

const AuthButton = ({ icon, label }) => (
    <button className="w-full sm:w-96 flex items-center justify-center gap-3 py-3 px-6 bg-white border border-slate-400 rounded-full text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-800 hover:text-slate-800 transition-all">
        {typeof icon === 'string' ? <img src={icon} alt="" className="w-5 h-5" /> : icon}
        {label}
    </button>
);

const HeroSection = ({ onLoginClick, onJoinClick }) => {
  return (
    <section className="flex-1 flex flex-col lg:flex-row items-center px-4 lg:px-24 py-12 lg:py-20 gap-12 max-w-7xl mx-auto w-full">
         <div className="flex-1 space-y-8 max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 leading-[1.15]">
              Find your dream <span className="text-emerald-700 font-medium">healthcare job</span> and build your career
            </h1>
            
            <div className="space-y-3">
               <AuthButton icon="https://www.google.com/favicon.ico" label="Continue with Google" />
               <AuthButton icon="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" label="Continue with Microsoft" />
               <button 
                 onClick={onLoginClick}
                 className="w-full sm:w-96 flex items-center justify-center gap-3 py-3 px-6 bg-white border border-slate-300 rounded-full text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
               >
                 Sign in with email
               </button>
            </div>

            <p className="text-xs text-slate-500 max-w-sm">
              By clicking Continue to join or sign in, you agree to CareHire's <a href="#" className="text-emerald-700 font-bold hover:underline">User Agreement</a>, <a href="#" className="text-emerald-700 font-bold hover:underline">Privacy Policy</a>, and <a href="#" className="text-emerald-700 font-bold hover:underline">Cookie Policy</a>.
            </p>

            <div className="flex items-center gap-2 text-slate-800 font-medium">
              New to CareHire? <button onClick={onJoinClick} className="text-emerald-700 font-bold hover:underline">Join now</button>
            </div>
         </div>

         <div className="flex-1 w-full relative">
            <img 
              src="https://img.freepik.com/free-vector/telecommuting-concept-illustration_114360-1600.jpg?w=1060&t=st=1707290000~exp=1707290600~hmac=5b0d0c..." 
              alt="Healthcare professional working" 
              className="w-full h-auto object-cover opacity-90 mix-blend-multiply" 
            />
            {/* Fallback illustration if external link fails or is slow */}
            <div className="absolute inset-0 -z-10 bg-emerald-50 rounded-full blur-3xl opacity-50 transform translate-x-12 translate-y-12"></div>
         </div>
    </section>
  );
};

export default HeroSection;
