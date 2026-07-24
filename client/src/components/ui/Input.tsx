import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</label>}
      <input
        className={clsx(
          'w-full bg-neutral-900/90 border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold transition-colors',
          error && 'border-red-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
