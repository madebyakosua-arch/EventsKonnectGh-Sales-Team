import React from 'react';
import { RecruitmentWhatsAppCta } from './RecruitmentWhatsAppCta';

export const EarningsSection: React.FC = () => {
  return (
    <section id="earnings" className="py-16 sm:py-20 bg-red-600 text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="max-w-3xl mx-auto">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
            How much do you earn?
          </h2>

          {/* Prominent 30% Typography */}
          <div className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white leading-none mb-3">
            30%
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
            Commission on Every Vendor Registration
          </h3>

          {/* Crystal Clear Explanation */}
          <div className="bg-red-700/60 border border-white/20 rounded-2xl p-6 sm:p-8 text-left max-w-2xl mx-auto space-y-4 mb-8 text-white/95">
            <div>
              <h4 className="font-bold text-white text-lg sm:text-xl mb-1">
                How It Works:
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-white/90">
                When an event vendor or service provider (such as a caterer, photographer, DJ, decorator, or venue) registers and lists their business on EventsKonnectGH through you, <strong className="text-white underline decoration-yellow-300 decoration-2 underline-offset-2">you earn 30% commission (15 GH₵) per vendor</strong> on their registration fee.
              </p>
            </div>

            <div className="pt-2 border-t border-white/15">
              <h4 className="font-bold text-white text-base sm:text-lg mb-1">
                Unlimited Earning Potential:
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-white/90">
                This is a flexible role for anyone confident in reaching out to business owners, following up, and helping them get listed. There is no cap—<strong>the more successful registrations you bring in, the more you earn.</strong>
              </p>
            </div>
          </div>

          {/* Illustrative Earning Potential Scenarios */}
          <div className="max-w-2xl mx-auto mb-6">
            <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-4 text-center">
              Potential Earnings Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Example 1 */}
              <div className="bg-white text-slate-900 rounded-xl p-5 shadow-md border border-red-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-2.5">
                    Scenario 1: 5 Vendors / Day
                  </span>
                  <p className="text-sm text-slate-600 mb-3">
                    If you register <strong>5 vendors a day</strong> at 15 GH₵ commission each:
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center mb-3">
                    <span className="text-xs text-slate-500 font-medium block">Daily Earnings</span>
                    <span className="text-xl font-black text-slate-900">15 GH₵ × 5 = <span className="text-red-600">75 GH₵ / day</span></span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Monthly Total (30 days):</span>
                  <span className="font-extrabold text-slate-950 text-base">2,250 GH₵</span>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-white text-slate-900 rounded-xl p-5 shadow-md border border-red-100 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md mb-2.5">
                    Scenario 2: 10 Vendors / Day
                  </span>
                  <p className="text-sm text-slate-600 mb-3">
                    If you register <strong>10 vendors a day</strong> at 15 GH₵ commission each:
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center mb-3">
                    <span className="text-xs text-slate-500 font-medium block">Daily Earnings</span>
                    <span className="text-xl font-black text-slate-900">15 GH₵ × 10 = <span className="text-red-600">150 GH₵ / day</span></span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-slate-600 font-medium">Monthly Total (30 days):</span>
                  <span className="font-extrabold text-slate-950 text-base">4,500 GH₵</span>
                </div>
              </div>
            </div>
          </div>

          {/* Earnings Disclaimer Notice */}
          <div className="bg-red-800/60 border border-white/20 rounded-xl p-4 text-xs text-white/85 max-w-2xl mx-auto text-left leading-relaxed mb-8">
            <span className="font-bold text-white block mb-0.5">Disclaimer:</span>
            Earning potential is strictly based on individual effort, communication, and good work ethic. EventsKonnectGh does not guarantee specific income or results.
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

