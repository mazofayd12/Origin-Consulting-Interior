import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, glass = true, className, ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-lg p-6 transition-all duration-300 border border-neutral-800',
        glass ? 'glass-panel text-white' : 'bg-neutral-900 text-white shadow-xl',
        'hover:border-brand-gold/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
