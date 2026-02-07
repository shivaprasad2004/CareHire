import React from 'react';

const Section = ({ title, children }) => (
  <div className="card p-6">
    <h3 className="font-bold text-lg text-slate-900 mb-4">{title}</h3>
    {children}
  </div>
);

export default Section;