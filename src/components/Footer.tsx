import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { OFFICIAL_WEBSITE_URL, PRIMARY_STICKY_WHATSAPP } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon';
import { LegalModal, LegalModalType } from './LegalModal';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<LegalModalType>(null);

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pb-28 sm:pb-12 pt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <img 
                src="https://i.ibb.co/qFpTY6Ph/upload-your-own-banner.png" 
                alt="EventsKonnectGH Logo"
                referrerPolicy="no-referrer"
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              Connecting trusted event professionals with clients across Ghana. Sales Team recruitment portal.
            </p>
          </div>

          {/* Quick links & Legal */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
            <a
              id="footer-official-site"
              href={OFFICIAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <span>Main Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              id="footer-whatsapp-chat"
              href={PRIMARY_STICKY_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Speak to Recruitment Team Advisors</span>
            </a>
          </div>

        </div>

        {/* Legal Disclaimer Note in Footer */}
        <div className="py-5 border-b border-slate-900 text-slate-400 text-xs leading-relaxed">
          <p className="text-[11px] sm:text-xs text-slate-400/90 text-center sm:text-left">
            <strong className="text-slate-300">Earnings & Opportunity Disclaimer:</strong> Sales Representative earnings are calculated on a 30% commission basis per registered vendor. All earning figures and scenarios displayed on this site are illustrative estimates. Actual earnings depend entirely on individual effort, diligence, and work ethic. EventsKonnectGh does not guarantee any specific earnings or outcomes.
          </p>
        </div>

        {/* Bottom bar with Privacy Policy and Disclaimer buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EventsKonnectGH. All rights reserved.</p>
          
          <div className="flex items-center gap-4 text-xs">
            <button
              id="footer-privacy-policy-btn"
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">•</span>
            <button
              id="footer-disclaimer-btn"
              onClick={() => setModalType('disclaimer')}
              className="hover:text-white transition-colors underline decoration-slate-600 underline-offset-4 cursor-pointer"
            >
              Disclaimer & Terms
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Modal */}
      <LegalModal type={modalType} onClose={() => setModalType(null)} />
    </footer>
  );
};
