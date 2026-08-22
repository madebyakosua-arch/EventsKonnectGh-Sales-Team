import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppButtonProps {
  id?: string;
  url: string;
  label: string;
  sublabel?: string;
  variant?: 'primary' | 'secondary' | 'compact' | 'white';
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  id,
  url,
  label,
  sublabel,
  variant = 'primary',
  className = '',
  iconClassName = 'w-6 h-6',
  onClick
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-400/40 rounded-xl group relative overflow-hidden text-center";
  
  let variantClasses = "";
  if (variant === 'primary') {
    variantClasses = "bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md hover:shadow-lg shadow-green-600/20 active:scale-[0.98] py-4 px-6 sm:px-8";
  } else if (variant === 'secondary') {
    variantClasses = "bg-[#128C7E] hover:bg-[#0e7468] text-white shadow-md hover:shadow-lg shadow-emerald-700/20 active:scale-[0.98] py-4 px-6 sm:px-8";
  } else if (variant === 'compact') {
    variantClasses = "bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm hover:shadow active:scale-[0.98] py-2.5 px-4 text-sm";
  } else if (variant === 'white') {
    variantClasses = "bg-white hover:bg-slate-50 text-[#128C7E] border-2 border-[#25D366] shadow-sm hover:shadow active:scale-[0.98] py-4 px-6 sm:px-8 font-semibold";
  }

  return (
    <a
      id={id}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      aria-label={`${label}${sublabel ? ` - ${sublabel}` : ''}`}
    >
      <div className="flex items-center gap-3">
        <WhatsAppIcon className={`${iconClassName} shrink-0 transition-transform duration-200 group-hover:scale-110`} />
        <div className="text-left">
          <span className="block font-semibold text-base sm:text-lg leading-tight tracking-tight">
            {label}
          </span>
          {sublabel && (
            <span className="block text-xs opacity-90 font-normal leading-tight mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};
