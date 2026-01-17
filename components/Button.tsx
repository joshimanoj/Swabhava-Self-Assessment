import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "px-8 py-3 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-dark text-white hover:bg-gray-800 focus:ring-gray-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-brand-red text-white hover:bg-red-700 focus:ring-red-500 shadow-md",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white focus:ring-gray-500",
    ghost: "text-gray-600 hover:text-brand-dark hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
