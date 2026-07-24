import React from 'react';
import { clsx } from 'clsx';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={clsx('animate-pulse bg-neutral-800 rounded-md', className)} />;
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'gold' | 'neutral' | 'success' }> = ({
  children,
  variant = 'gold',
}) => {
  const styles = {
    gold: 'bg-brand-gold/10 text-brand-gold border-brand-gold/30',
    neutral: 'bg-neutral-800 text-neutral-300 border-neutral-700',
    success: 'bg-emerald-950 text-emerald-400 border-emerald-800',
  };

  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', styles[variant])}>
      {children}
    </span>
  );
};
