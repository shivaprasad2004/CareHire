import React from 'react';

const Avatar = ({ src, name, size = 'md', status, className = '', badge }) => {
  const sizes = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-2xl',
    '2xl': 'h-28 w-28 text-3xl'
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-slate-300',
    busy: 'bg-red-500'
  };

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
    '2xl': 'h-5 w-5'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm`} />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-carehire-400 to-carehire-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm`}>
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span className={`absolute bottom-0 right-0 ${statusSizes[size]} ${statusColors[status]} rounded-full ring-2 ring-white`} />
      )}
      {badge && (
        <span className="absolute -top-1 -right-1 bg-carehire-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white">
          {badge}
        </span>
      )}
    </div>
  );
};

export default Avatar;
