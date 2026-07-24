import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    gold: 'bg-brand-gold hover:bg-brand-goldLight text-black shadow-luxury font-semibold',
    outline: 'border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black',
    ghost: 'text-gray-300 hover:text-brand-gold hover:bg-white/5',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs tracking-wider uppercase',
    md: 'px-5 py-2.5 text-sm tracking-wider uppercase',
    lg: 'px-8 py-3.5 text-base tracking-widest uppercase font-semibold',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
      {children}
    </button>
  );
};
