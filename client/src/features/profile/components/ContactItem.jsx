import React from 'react';

const ContactItem = ({ icon: Icon, text, link }) => (
  <div className={`flex items-center gap-2 text-sm ${link ? 'text-blue-600 hover:underline cursor-pointer' : 'text-slate-500'}`}>
    <Icon size={16} className={link ? 'text-blue-600' : 'text-slate-400'} />
    {text}
  </div>
);

export default ContactItem;