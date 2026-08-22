import React from 'react';
import { PRIMARY_STICKY_WHATSAPP, WHATSAPP_CONTACTS } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon';

export const MobileStickyCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:hidden bg-gradient-to-t from-white via-white/95 to-transparent pb-safe pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <a
          id="mobile-sticky-whatsapp-btn"
          href={PRIMARY_STICKY_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white py-3.5 px-6 rounded-2xl shadow-xl shadow-green-900/30 border border-green-400/40 font-bold text-base tracking-tight transition-all active:scale-[0.98]"
          aria-label="Ask About the Sales Role on WhatsApp"
        >
          <div className="relative">
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </span>
          </div>
          <span className="font-bold text-base text-white drop-shadow-2xs">
            Ask About the Sales Role
          </span>
        </a>
      </div>
    </div>
  );
};
