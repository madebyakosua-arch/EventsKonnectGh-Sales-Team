import React, { useEffect } from 'react';
import { X, ShieldCheck, AlertCircle } from 'lucide-react';

export type LegalModalType = 'privacy' | 'disclaimer' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {type === 'privacy' ? 'Privacy Policy' : 'Disclaimer & Earnings Notice'}
              </h3>
              <p className="text-xs text-slate-500">
                EventsKonnectGh Sales Recruitment Portal
              </p>
            </div>
          </div>

          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 overflow-y-auto space-y-4 text-sm text-slate-600 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">1. Information Collection</h4>
                <p>
                  EventsKonnectGh respects your privacy. When you contact our recruitment team or customer support via WhatsApp or our platform, we only collect information necessary to assist with your sales representative inquiries and onboarding (such as your name, phone number, and location in Ghana).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">2. Use of Information</h4>
                <p>
                  Your information is strictly used to facilitate communication between you and EventsKonnectGh advisors, coordinate commission disbursements, and provide support. We do not sell, rent, or trade your personal information to third parties.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">3. Third-Party Links & Messaging</h4>
                <p>
                  Our recruitment interactions are conducted through secure WhatsApp channels and verified phone numbers. Please ensure you only engage with the official phone lines and advisors listed on this official portal.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">4. Data Security</h4>
                <p>
                  We implement standard safeguards to protect your personal details against unauthorized access. If you have any inquiries regarding data handling, please contact our support team.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">1. Earnings & Income Disclaimer</h4>
                <p className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-lg font-medium text-xs sm:text-sm">
                  <strong>Important:</strong> All earning projections and examples illustrated on this website are provided for explanatory purposes only. Earning potential is strictly based on individual effort, diligence, sales outreach skills, and good work ethic. EventsKonnectGh cannot and does not guarantee any specific financial results or income levels.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">2. Independent Representative Nature</h4>
                <p>
                  Joining as a Sales Representative with EventsKonnectGh offers flexible, commission-based compensation per successful vendor registration (30% commission / 15 GH₵ per vendor). Representatives operate on their own chosen schedule.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">3. General Website Disclaimer</h4>
                <p>
                  The information on this recruitment portal is provided in good faith. EventsKonnectGh reserves the right to update commission structures, vendor registration fees, or platform terms with appropriate advance notification to active representatives.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            id="dismiss-legal-modal-btn"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
