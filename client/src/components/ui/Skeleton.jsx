import React from 'react';

const Skeleton = ({ className = "", width, height, variant = "rect" }) => {
  const style = {
    width,
    height,
  };
  
  const baseClasses = "skeleton";
  const variantClasses = variant === "circle" ? "rounded-full" : "rounded-lg";

  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      style={style}
    />
  );
};

export default Skeleton;
