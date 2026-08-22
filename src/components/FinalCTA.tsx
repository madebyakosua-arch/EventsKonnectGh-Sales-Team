import React from 'react';
import { RecruitmentWhatsAppCta } from './RecruitmentWhatsAppCta';
import confidentTeamImg from '../assets/images/confident_team_group_1787421988325.jpg';

export const FinalCTA: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-red-600 text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to learn more?
          </h2>

          <p className="text-base sm:text-lg text-white/95 leading-relaxed mb-6">
            If you are interested in the EventsKonnectGH Sales Team role and would like more information, send our recruitment team a message on WhatsApp today.
          </p>

          <div className="bg-red-700/60 border border-white/20 rounded-2xl p-5 mb-8">
            <h3 className="text-lg font-bold text-white mb-1">
              Have questions? Ask us first.
            </h3>
            <p className="text-sm sm:text-base text-white/90">
              You do not need to commit to anything before contacting us. We're here to answer questions and walk you through everything.
            </p>
          </div>

          {/* Unified Corporate WhatsApp CTA */}
          <div className="mb-12">
            <RecruitmentWhatsAppCta idPrefix="final" theme="red" />
          </div>
        </div>

        {/* Photo 3: Friendly team group */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-white/20 bg-slate-100">
            <img
              src={confidentTeamImg}
              alt="Confident, approachable EventsKonnectGH sales professionals in Ghana"
              referrerPolicy="no-referrer"
              className="w-full h-[260px] sm:h-[380px] md:h-[420px] object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        {/* Brand Logo */}
        <div className="pt-8 border-t border-white/20 flex flex-col items-center justify-center">
          <img
            src="https://i.ibb.co/qFpTY6Ph/upload-your-own-banner.png"
            alt="EventsKonnectGH Logo"
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-95"
          />
        </div>

      </div>
    </section>
  );
};

