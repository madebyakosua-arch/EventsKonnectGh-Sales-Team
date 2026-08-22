import React from 'react';
import { Check } from 'lucide-react';
import { ROLE_RESPONSIBILITIES } from '../data';
import repMeetingVendorImg from '../assets/images/rep_meeting_vendor_1787421975374.jpg';

export const RoleSection: React.FC = () => {
  return (
    <section id="role" className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Centered */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            What will you do?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            As part of the EventsKonnectGH Sales Team, your role will be to introduce the platform to event vendors and service providers, explain the benefits of joining and guide interested businesses through the registration process.
          </p>
        </div>

        {/* Clean 2-Column: Photo 2 + Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          
          {/* Photo Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <img
                src={repMeetingVendorImg}
                alt="African sales representative speaking with an event vendor in Ghana"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Responsibilities Clean Checklist */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            {ROLE_RESPONSIBILITIES.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-red-600 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

