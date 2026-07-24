import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className, ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{label}</label>}
      <select
        className={clsx(
          'w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-brand-gold transition-colors',
          error && 'border-red-500',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
