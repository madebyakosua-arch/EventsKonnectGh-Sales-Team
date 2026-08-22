import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OFFICIAL_WEBSITE_URL, PRIMARY_STICKY_WHATSAPP } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="/" 
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg p-1"
          aria-label="EventsKonnectGH Home"
        >
          <img 
            src="https://i.ibb.co/qFpTY6Ph/upload-your-own-banner.png" 
            alt="EventsKonnectGH Logo"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </a>

        {/* Action Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            id="nav-visit-website-link"
            href={OFFICIAL_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
          >
            <span>Visit EventsKonnectGH</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            id="nav-whatsapp-direct"
            href={PRIMARY_STICKY_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
