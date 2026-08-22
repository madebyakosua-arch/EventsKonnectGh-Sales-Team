import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import { OFFICIAL_WEBSITE_URL, PRIMARY_STICKY_WHATSAPP } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
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

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
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

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EventsKonnectGH. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built for event professionals across Ghana</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
