import React from 'react';
import { Check } from 'lucide-react';

export const EligibilitySection: React.FC = () => {
  return (
    <section id="eligibility" className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            Who can apply?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            To join the EventsKonnectGH Sales Team, applicants must:
          </p>
        </div>

        {/* Key Requirements */}
        <div className="max-w-xl mx-auto space-y-4 mb-8 text-left">
          
          <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Be 18 years old or above
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Be comfortable communicating with vendors and business owners
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Be prepared to actively reach out to potential event service providers
              </h3>
            </div>
          </div>

        </div>

        {/* Fit Statement */}
        <div className="max-w-xl mx-auto p-5 bg-red-50/60 rounded-2xl border border-red-100">
          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
            You may be a strong fit if you <strong className="text-slate-950">enjoy speaking to people, building connections and helping businesses grow.</strong>
          </p>
        </div>

      </div>
    </section>
  );
};

