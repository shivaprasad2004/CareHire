import React from 'react';
import Section from './Section';

const SkillsSection = ({ skills = [] }) => (
  <Section title="Skills & Endorsements">
    <div className="flex flex-wrap gap-2">
      {skills.length > 0 ? skills.map(skill => (
        <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-md border border-slate-100">
          {skill}
        </span>
      )) : (
        <span className="text-slate-400 text-xs italic">No skills listed.</span>
      )}
    </div>
  </Section>
);

export default SkillsSection;