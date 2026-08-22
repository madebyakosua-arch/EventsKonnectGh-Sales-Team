import React from 'react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { WHATSAPP_CONTACTS } from '../data';
import { MessageCircle } from 'lucide-react';

interface RecruitmentWhatsAppCtaProps {
  idPrefix?: string;
  theme?: 'light' | 'dark' | 'red';
  className?: string;
}

export const RecruitmentWhatsAppCta: React.FC<RecruitmentWhatsAppCtaProps> = ({
  idPrefix = 'recruitment',
  theme = 'light',
  className = ''
}) => {
  const primaryContact = WHATSAPP_CONTACTS[0];
  const secondaryContact = WHATSAPP_CONTACTS[1];

  const isRedBg = theme === 'red';

  return (
    <div className={`flex flex-col items-center justify-center max-w-xl mx-auto ${className}`}>
      {/* Primary Action Button */}
      <a
        id={`${idPrefix}-primary-whatsapp-btn`}
        href={primaryContact.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto min-w-[300px] sm:min-w-[360px] inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd59] text-white shadow-md hover:shadow-lg font-bold text-base sm:text-lg py-4 px-6 sm:px-8 rounded-xl transition-all duration-200 active:scale-[0.98] group"
        aria-label="Speak to an EventsKonnectGh Recruitment Team on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
        <span className="leading-tight tracking-tight">
          Speak to an EventsKonnectGH Recruitment Team on WhatsApp
        </span>
      </a>

      {/* Verified Sub-badge / Support Line Fallback */}
      <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
        <span className={isRedBg ? "text-white/80" : "text-slate-500"}>
          Line busy?
        </span>
        <a
          id={`${idPrefix}-secondary-support-link`}
          href={secondaryContact.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-semibold transition-colors underline decoration-1 underline-offset-2 ${
            isRedBg
              ? "text-yellow-200 hover:text-white"
              : "text-[#128C7E] hover:text-[#0b5c53]"
          }`}
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>Connect with the EventsKonnectGh Support Line</span>
        </a>
      </div>
    </div>
  );
};
