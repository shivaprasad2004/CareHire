import React from 'react';

const AuthButton = ({ icon, label, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full sm:w-96 flex items-center justify-center gap-3 py-3 px-6 bg-white border border-slate-400 rounded-full text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-800 hover:text-slate-800 transition-all"
    >
        {typeof icon === 'string' ? <img src={icon} alt="" className="w-5 h-5" /> : icon}
        {label}
    </button>
);

const HeroSection = ({ onLoginClick, onJoinClick }) => {
  const handleSocialLogin = (provider) => {
    // In a real app, this would redirect to the backend OAuth endpoint
    // window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
    alert(`${provider} login is currently being configured. Please use email login.`);
  };

  return (
    <section className="flex-1 flex flex-col lg:flex-row items-center px-4 lg:px-24 py-12 lg:py-20 gap-12 max-w-7xl mx-auto w-full relative min-h-[calc(100vh-80px)]">
         <div className="flex-1 space-y-8 max-w-xl flex flex-col justify-center h-full pb-16">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 leading-[1.15]">
              Find your dream <span className="text-emerald-700 font-medium">healthcare job</span> and build your career
            </h1>
            
            <div className="space-y-3">
               <AuthButton 
                 icon="https://www.google.com/favicon.ico" 
                 label="Continue with Google" 
                 onClick={() => handleSocialLogin('google')} 
               />
               <AuthButton 
                 icon="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
                 label="Continue with Microsoft" 
                 onClick={() => handleSocialLogin('microsoft')} 
               />
               <button 
                 onClick={onLoginClick}
                 className="w-full sm:w-96 flex items-center justify-center gap-3 py-3 px-6 bg-white border border-slate-300 rounded-full text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm hover:shadow-md"
               >
                 Sign in with email
               </button>
            </div>

            <div className="flex items-center gap-2 text-slate-800 font-medium">
              New to CareHire? <button onClick={onJoinClick} className="text-emerald-700 font-bold hover:underline">Join now</button>
            </div>
            
            <div className="absolute bottom-4 left-4 lg:left-24 text-xs text-slate-500 max-w-sm">
              <p>
                By clicking Continue to join or sign in, you agree to CareHire's <a href="#" className="text-emerald-700 font-bold hover:underline">User Agreement</a>, <a href="#" className="text-emerald-700 font-bold hover:underline">Privacy Policy</a>, and <a href="#" className="text-emerald-700 font-bold hover:underline">Cookie Policy</a>.
              </p>
            </div>
         </div>

         <div className="flex-1 w-full relative">
            <img 
              src="https://img.freepik.com/free-vector/health-professional-team-concept-illustration_114360-1618.jpg" 
              alt="Healthcare professionals" 
              className="w-full h-auto object-cover opacity-90 mix-blend-multiply" 
            />
            {/* Fallback illustration if external link fails or is slow */}
            <div className="absolute inset-0 -z-10 bg-emerald-50 rounded-full blur-3xl opacity-50 transform translate-x-12 translate-y-12"></div>
         </div>
    </section>
  );
};

export default HeroSection;
