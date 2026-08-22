import React from 'react';
import { RecruitmentWhatsAppCta } from './RecruitmentWhatsAppCta';

export const EarningsSection: React.FC = () => {
  return (
    <section id="earnings" className="py-16 sm:py-20 bg-red-600 text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
            How do you earn?
          </h2>

          {/* Prominent 30% Typography */}
          <div className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white leading-none mb-3">
            30%
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
            Commission on Every Vendor Registration
          </h3>

          {/* Crystal Clear Explanation */}
          <div className="bg-red-700/60 border border-white/20 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto space-y-4 mb-10 text-white/95">
            <div>
              <h4 className="font-bold text-white text-lg sm:text-xl mb-1">
                How It Works:
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-white/90">
                When an event vendor or service provider (such as a caterer, photographer, DJ, decorator, or venue) pays to register and list their business on EventsKonnectGH through you, <strong className="text-white underline decoration-yellow-300 decoration-2 underline-offset-2">you earn 30% of their registration fee</strong>.
              </p>
            </div>

            <div className="pt-2 border-t border-white/15">
              <h4 className="font-bold text-white text-base sm:text-lg mb-1">
                Unlimited Earning Potential:
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-white/90">
                This is a flexible role for anyone confident in reaching out to business owners, following up, and helping them get listed. There is no limit—<strong>the more successful registrations you bring in, the more you earn.</strong>
              </p>
            </div>
          </div>

          {/* WhatsApp CTAs */}
          <div className="mt-8">
            <RecruitmentWhatsAppCta idPrefix="earnings" theme="red" />
          </div>

        </div>

      </div>
    </section>
  );
};

