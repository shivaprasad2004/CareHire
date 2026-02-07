import React from 'react';

const TimelineItem = ({ role, company, period, location, description, current, icon: Icon }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${current ? 'bg-blue-600 ring-4 ring-blue-50' : 'bg-slate-300'}`}></div>
      <div className="w-0.5 flex-1 bg-slate-100 my-1"></div>
    </div>
    <div className="pb-6">
      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
        {role}
        {Icon && <Icon size={14} className="text-slate-400" />}
      </h4>
      <div className="text-slate-600 text-sm font-medium">{company}</div>
      <div className="text-slate-400 text-xs mt-0.5 flex items-center gap-2">
        <span>{period}</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span>{location}</span>
      </div>
      <p className="text-slate-500 text-sm mt-2 whitespace-pre-wrap">{description}</p>
    </div>
  </div>
);

export default TimelineItem;