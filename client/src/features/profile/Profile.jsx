import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Link, Mail, Phone, Download, Building, GraduationCap, Award, CheckCircle } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 lg:px-8 space-y-6 pb-24 lg:pb-8">
      
      {/* Profile Header Card */}
      <div className="card overflow-hidden">
        {/* Banner */}
        <div className="h-32 sm:h-48 bg-slate-900 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="px-4 sm:px-8 pb-8">
            <div className="relative flex flex-col sm:flex-row justify-between items-end -mt-12 sm:-mt-16 mb-6 gap-4">
                <div className="p-1 bg-white rounded-2xl shadow-sm mx-auto sm:mx-0">
                    <img 
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070" 
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover" 
                        alt="Profile"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto justify-center sm:justify-end">
                    <button className="btn btn-secondary text-sm flex-1 sm:flex-none justify-center">Message</button>
                    <button className="btn btn-primary text-sm flex-1 sm:flex-none justify-center">Connect</button>
                </div>
            </div>

            <div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="text-center sm:text-left w-full">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                            Dr. Sarah Jenkins, MD
                            <CheckCircle size={18} className="text-blue-500" fill="currentColor" color="white" />
                        </h1>
                        <p className="text-lg text-slate-600 font-medium">Chief of Neurology at Presbyterian Hospital</p>
                        <p className="text-slate-500 text-sm mt-1 max-w-2xl mx-auto sm:mx-0">
                            Specializing in neurodegenerative disorders and clinical research. Dedicated to advancing patient care through evidence-based medicine.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 text-slate-500 text-sm w-full sm:w-auto items-center sm:items-end">
                         <div className="flex items-center gap-2">
                            <Building size={14} /> Presbyterian Hospital
                         </div>
                         <div className="flex items-center gap-2">
                            <GraduationCap size={14} /> Harvard Medical School
                         </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-6 pt-6 border-t border-slate-100">
                    <ContactItem icon={MapPin} text="New York, NY" />
                    <ContactItem icon={Link} text="sarahjenkins.md" link />
                    <ContactItem icon={Mail} text="contact@sarahjenkins.md" />
                    <ContactItem icon={Phone} text="+1 (555) 123-4567" />
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-6">
             
             {/* About */}
             <Section title="About">
                <p className="text-slate-600 text-sm leading-relaxed">
                    Board-certified Neurologist with over 15 years of experience in treating complex neurological disorders. 
                    Passionate about advancing research in neuroplasticity and early-onset Alzheimer's detection. 
                    Currently leading a team of 20+ specialists at Presbyterian Hospital. 
                    <br/><br/>
                    Published author of "The Resilient Brain" and regular contributor to The Lancet Neurology.
                </p>
             </Section>

             {/* Experience */}
             <Section title="Experience">
                <div className="space-y-6">
                    <TimelineItem 
                        role="Chief of Neurology"
                        company="Presbyterian Hospital"
                        period="2018 - Present"
                        location="New York, NY"
                        description="Leading the Department of Neurology. Overseeing clinical operations, research initiatives, and resident training programs."
                        current
                    />
                    <TimelineItem 
                        role="Senior Neurologist"
                        company="Mount Sinai"
                        period="2012 - 2018"
                        location="New York, NY"
                        description="Specialized in stroke rehabilitation and neurocritical care. Mentored 15 residents."
                    />
                </div>
             </Section>

             {/* Education */}
             <Section title="Education">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                            <GraduationCap className="text-slate-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">Harvard Medical School</h4>
                            <p className="text-slate-600 text-sm">Doctor of Medicine (M.D.)</p>
                            <p className="text-slate-400 text-xs mt-1">2004 - 2008</p>
                        </div>
                    </div>
                </div>
             </Section>

         </div>

         {/* Sidebar */}
         <div className="space-y-6">
             {/* Skills */}
             <div className="card p-6">
                <h3 className="font-bold text-slate-900 mb-4">Skills & Endorsements</h3>
                <div className="flex flex-wrap gap-2">
                    {['Neurology', 'Clinical Research', 'Medical Education', 'Healthcare Management', 'Patient Safety'].map(skill => (
                        <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-md border border-slate-100">
                            {skill}
                        </span>
                    ))}
                </div>
                <button className="w-full mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700">
                    Show all 24 skills
                </button>
             </div>

             {/* Certifications */}
             <div className="card p-6">
                <h3 className="font-bold text-slate-900 mb-4">Certifications</h3>
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <Award className="text-orange-500 shrink-0" size={20} />
                        <div>
                            <div className="font-bold text-slate-900 text-xs">Board Certified in Neurology</div>
                            <div className="text-slate-500 text-[10px]">American Board of Psychiatry and Neurology</div>
                        </div>
                    </div>
                </div>
             </div>

             {/* Resume */}
             <div className="card p-6 bg-slate-900 text-white">
                <h3 className="font-bold mb-2">Curriculum Vitae</h3>
                <p className="text-slate-400 text-xs mb-4">Updated January 2026</p>
                <button className="w-full bg-white text-slate-900 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                    <Download size={16} />
                    Download CV
                </button>
             </div>

         </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
    <div className="card p-6">
        <h3 className="font-bold text-lg text-slate-900 mb-4">{title}</h3>
        {children}
    </div>
);

const ContactItem = ({ icon: Icon, text, link }) => (
    <div className={`flex items-center gap-2 text-sm ${link ? 'text-blue-600 hover:underline cursor-pointer' : 'text-slate-500'}`}>
        <Icon size={16} className={link ? 'text-blue-600' : 'text-slate-400'} />
        {text}
    </div>
);

const TimelineItem = ({ role, company, period, location, description, current }) => (
    <div className="flex gap-4">
        <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${current ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
            <div className="w-0.5 flex-1 bg-slate-100 my-1"></div>
        </div>
        <div className="pb-6">
            <h4 className="font-bold text-slate-900 text-sm">{role}</h4>
            <div className="text-slate-600 text-sm font-medium">{company}</div>
            <div className="text-slate-400 text-xs mt-0.5 flex items-center gap-2">
                <span>{period}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>{location}</span>
            </div>
            <p className="text-slate-500 text-sm mt-2">{description}</p>
        </div>
    </div>
);

export default Profile;
