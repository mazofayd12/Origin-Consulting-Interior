import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'warning' | 'danger' | 'info';
  title?: string;
  message: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, message, className }) => {
  const styles = {
    success: 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300',
    warning: 'bg-amber-950/50 border-amber-500/50 text-amber-300',
    danger: 'bg-red-950/50 border-red-500/50 text-red-300',
    info: 'bg-blue-950/50 border-blue-500/50 text-blue-300',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400" />,
    danger: <XCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  return (
    <div className={clsx('flex gap-3 p-4 rounded-md border text-sm', styles[type], className)}>
      {icons[type]}
      <div>
        {title && <h4 className="font-semibold mb-0.5">{title}</h4>}
        <p>{message}</p>
      </div>
    </div>
  );
};
