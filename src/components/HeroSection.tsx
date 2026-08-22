import React from 'react';
import { RecruitmentWhatsAppCta } from './RecruitmentWhatsAppCta';
import heroSalesTeamImg from '../assets/images/ghana_sales_team_1787421963395.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Main Headings - Centered */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4 max-w-4xl mx-auto">
          Join the <span className="text-red-600">EventsKonnectGH</span> Sales Team
        </h1>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-700 tracking-tight mb-6 max-w-3xl mx-auto">
          Earn while helping event businesses grow
        </h2>

        {/* Intro Copy */}
        <div className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-relaxed space-y-4 mb-8">
          <p>
            Are you confident, good with people and interested in connecting with businesses in Ghana’s events industry?
          </p>
          <p>
            <strong className="text-slate-900 font-semibold">EventsKonnectGH is looking for motivated people to join our Sales Team</strong> and help introduce event vendors and service providers to the platform.
          </p>
          <p className="text-slate-900 font-medium bg-red-50 py-2 px-4 rounded-xl inline-block border border-red-100">
            Gain sales experience, build valuable relationships, and{' '}
            <span className="text-red-600 font-bold">earn 30% from every successful registration</span> you bring to EventsKonnectGH.
          </p>
        </div>

        {/* Trust Statement */}
        <div className="max-w-xl mx-auto mb-8 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
          <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1">
            Have questions before you decide?
          </h3>
          <p className="text-sm sm:text-base text-slate-600">
            That is completely okay. Speak directly with our recruitment team on WhatsApp and get the information you need.
          </p>
        </div>

        {/* Unified Corporate WhatsApp CTA */}
        <div className="mb-12">
          <RecruitmentWhatsAppCta idPrefix="hero" theme="light" />
        </div>

        {/* Photo 1: Centered Authentic African Sales Team */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <img
              src={heroSalesTeamImg}
              alt="EventsKonnectGH professional sales team collaborating in a modern office in Ghana"
              referrerPolicy="no-referrer"
              className="w-full h-[280px] sm:h-[400px] md:h-[460px] object-cover object-center"
              loading="eager"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

