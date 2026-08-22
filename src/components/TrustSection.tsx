import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { OFFICIAL_WEBSITE_URL, PRIMARY_STICKY_WHATSAPP } from '../data';
import { WhatsAppIcon } from './WhatsAppIcon';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mx-auto text-center">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            A genuine opportunity you can trust
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
            We know many people are cautious about opportunities they see online, and that is understandable. EventsKonnectGH is a real platform with a clear mission to connect clients with trusted event professionals across Ghana.
          </p>

          <p className="text-base sm:text-lg font-bold text-slate-900 mb-8">
            We want you to feel comfortable asking questions before making any decision. There is no pressure.
          </p>

          {/* Simple bullet points */}
          <div className="space-y-3 mb-10 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              </div>
              <span className="text-slate-800 text-sm sm:text-base font-medium">Visit the official EventsKonnectGH website</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              </div>
              <span className="text-slate-800 text-sm sm:text-base font-medium">Explore the platform yourself</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              </div>
              <span className="text-slate-800 text-sm sm:text-base font-medium">Speak directly with our recruitment team</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
              </div>
              <span className="text-slate-800 text-sm sm:text-base font-medium">Ask questions before deciding whether to apply</span>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="inline-block mb-5">
            <a
              id="trust-whatsapp-btn"
              href={PRIMARY_STICKY_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebd59] text-white text-base sm:text-lg font-bold px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white text-white" />
              <span>Speak to Our Recruitment Team on WhatsApp</span>
            </a>
          </div>

          <div>
            <a
              id="trust-visit-site-link"
              href={OFFICIAL_WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hover:underline"
            >
              <span>Or visit the official platform at www.eventskonnectgh.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

