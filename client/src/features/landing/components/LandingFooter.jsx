import React from 'react';
import { ChevronDown } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-slate-100 py-8 px-4 lg:px-24 text-xs text-slate-500">
         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
            <div className="col-span-2 lg:col-span-1">
               <div className="flex items-center gap-2 mb-4">
                 <span className="text-lg font-bold text-emerald-700">CareHire</span>
               </div>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-3">General</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Sign Up</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Help Center</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">About</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Press</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Blog</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Careers</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Developers</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-3">Browse CareHire</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Learning</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Jobs</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Games</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Services</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Products</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Top Hospitals</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-3">Business Solutions</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Talent</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Marketing</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Sales</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Learning</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 mb-3">Directories</h4>
               <ul className="space-y-2">
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Members</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Jobs</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Companies</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Featured</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Learning</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Posts</a></li>
                  <li><a href="#" className="hover:text-emerald-700 hover:underline">Articles</a></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex gap-4">
                 <span className="font-bold text-slate-900">CareHire © 2026</span>
                 <a href="#" className="hover:underline">About</a>
                 <a href="#" className="hover:underline">Accessibility</a>
                 <a href="#" className="hover:underline">User Agreement</a>
                 <a href="#" className="hover:underline">Privacy Policy</a>
                 <a href="#" className="hover:underline">Cookie Policy</a>
                 <a href="#" className="hover:underline">Copyright Policy</a>
                 <a href="#" className="hover:underline">Brand Policy</a>
                 <a href="#" className="hover:underline">Guest Controls</a>
                 <a href="#" className="hover:underline">Community Guidelines</a>
             </div>
             <div className="flex items-center gap-2 font-bold text-slate-600 cursor-pointer">
                 Language <ChevronDown size={14} />
             </div>
         </div>
    </footer>
  );
};

export default LandingFooter;
