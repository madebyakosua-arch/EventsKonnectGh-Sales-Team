import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Briefcase, 
  Banknote, 
  UserCheck, 
  Info,
  Send,
  Lock,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { OFFICIAL_WEBSITE_URL } from '../data';

export type EligibilityStatus = 'qualified' | 'unqualified' | null;

interface QuestionConfig {
  id: number;
  heading: string;
  options: string[];
}

const QUESTIONS: QuestionConfig[] = [
  {
    id: 1,
    heading: "Are you 18 years old or above?",
    options: ["Yes", "No"]
  },
  {
    id: 2,
    heading: "Our Sales Team earns 30% of the registration fee for each successful service provider registration they generate. Do you understand and accept this payment structure?",
    options: ["Yes, I understand and accept", "No"]
  },
  {
    id: 3,
    heading: "Are you comfortable contacting event vendors and business owners, explaining EventsKonnectGH to them and following up with interested providers?",
    options: ["Yes", "No", "I am not sure"]
  },
  {
    id: 4,
    heading: "Are you prepared to actively find potential event service providers rather than waiting for customers to contact you?",
    options: ["Yes", "No"]
  },
  {
    id: 5,
    heading: "If accepted, how soon would you be ready to start?",
    options: [
      "Immediately",
      "Within 1 week",
      "Within 2 weeks",
      "I am only exploring the opportunity"
    ]
  }
];

const LOCAL_STORAGE_KEY = 'eventskonnect_sales_eligibility_status';
const INTEREST_LIST_STORAGE_KEY = 'eventskonnect_sales_interest_leads';
const PRIMARY_RECRUITMENT_PHONE = '233554700904';
const SECONDARY_SUPPORT_PHONE = '233539733353';

const COUNTRY_CODES = [
  { code: '+233', flag: '🇬🇭', label: 'Ghana (+233)' },
  { code: '+234', flag: '🇳🇬', label: 'Nigeria (+234)' },
  { code: '+1', flag: '🇺🇸', label: 'USA / Canada (+1)' },
  { code: '+44', flag: '🇬🇧', label: 'UK (+44)' },
  { code: '+27', flag: '🇿🇦', label: 'South Africa (+27)' },
  { code: '+254', flag: '🇰🇪', label: 'Kenya (+254)' },
  { code: '+49', flag: '🇩🇪', label: 'Germany (+49)' },
  { code: '+33', flag: '🇫🇷', label: 'France (+33)' }
];

export interface SavedInterestLead {
  id: string;
  fullName: string;
  whatsappNumber: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  submittedAt: string;
  submittedAtFormatted: string;
  eligibilityResult: string;
  answers: Record<number, string>;
  internalCategory: string;
  internalReason: string;
  consentAgreed: boolean;
  consentText: string;
}

interface EligibilityModalProps {
  isOpen: boolean;
  onQualified: () => void;
  onRetake: () => void;
}

type ModalStep = 
  | 'intro' 
  | number 
  | 'success' 
  | 'unsuccessful_under_18' 
  | 'unsuccessful' 
  | 'interest_form' 
  | 'interest_confirmed';

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onQualified,
  onRetake
}) => {
  const [currentStep, setCurrentStep] = useState<ModalStep>('intro');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+233');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    consent?: string;
  }>({});
  const [honeypot, setHoneypot] = useState('');

  // Internal evaluation storage
  const [evaluatedInternalReason, setEvaluatedInternalReason] = useState<string>('');
  const [evaluatedInternalCategory, setEvaluatedInternalCategory] = useState<string>('');

  // Lock body scroll when modal is open and prevent escape dismissal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(1);
      setIsTransitioning(false);
    }, 150);
  };

  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (typeof currentStep === 'number') {
      if (currentStep < 5) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentStep(currentStep + 1);
          setIsTransitioning(false);
        }, 150);
      } else if (currentStep === 5) {
        evaluateQualification();
      }
    }
  };

  const handleBack = () => {
    if (typeof currentStep === 'number' && currentStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 150);
    } else if (currentStep === 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep('intro');
        setIsTransitioning(false);
      }, 150);
    } else if (currentStep === 'interest_form') {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep('unsuccessful');
        setIsTransitioning(false);
      }, 150);
    }
  };

  const evaluateQualification = () => {
    const isUnder18 = answers[1] === "No";
    const q1Pass = answers[1] === "Yes";
    const q2Pass = answers[2] === "Yes, I understand and accept";
    const q3Pass = answers[3] === "Yes";
    const q4Pass = answers[4] === "Yes";
    const q5Pass =
      answers[5] === "Immediately" ||
      answers[5] === "Within 1 week" ||
      answers[5] === "Within 2 weeks";

    const qualifies = q1Pass && q2Pass && q3Pass && q4Pass && q5Pass;

    // Determine internal segmentation categories
    const failedReasons: string[] = [];
    if (!q1Pass) failedReasons.push("Under 18");
    if (!q2Pass) failedReasons.push("Does not accept commission structure");
    if (!q3Pass) failedReasons.push("Not comfortable with sales");
    if (!q4Pass) failedReasons.push("Not prepared to actively find providers");
    if (answers[5] === "I am only exploring the opportunity") failedReasons.push("Only exploring");

    let category = "Qualified";
    let reason = "Met all criteria";

    if (!qualifies) {
      if (failedReasons.length > 1) {
        category = "Multiple eligibility requirements not met";
        reason = `Multiple eligibility requirements not met (${failedReasons.join('; ')})`;
      } else if (failedReasons.length === 1) {
        category = failedReasons[0];
        reason = failedReasons[0];
      } else {
        category = "Did not meet requirements";
        reason = "Did not meet minimum readiness requirements";
      }
    }

    setEvaluatedInternalCategory(category);
    setEvaluatedInternalReason(reason);

    setIsTransitioning(true);
    setTimeout(() => {
      if (qualifies) {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, 'qualified');
        } catch {
          // ignore
        }
        setCurrentStep('success');
      } else if (isUnder18) {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, 'unqualified');
        } catch {
          // ignore
        }
        setCurrentStep('unsuccessful_under_18');
      } else {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, 'unqualified');
        } catch {
          // ignore
        }
        setCurrentStep('unsuccessful');
      }
      setIsTransitioning(false);
    }, 200);
  };

  const handleOpenInterestForm = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('interest_form');
      setIsTransitioning(false);
    }, 150);
  };

  const handleInterestFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot detection
    if (honeypot.trim().length > 0) {
      // Silently complete without saving spam
      setCurrentStep('interest_confirmed');
      return;
    }

    const errors: {
      fullName?: string;
      phoneNumber?: string;
      email?: string;
      consent?: string;
    } = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phoneNumber = 'Please enter a valid WhatsApp phone number.';
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (!consentAgreed) {
      errors.consent = 'You must agree to be contacted to join the interest list.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    const fullWhatsApp = `${countryCode} ${phoneNumber.trim()}`;
    const now = new Date();
    const consentText = "I agree to be contacted by EventsKonnectGH about future Sales Team opportunities.";

    const newLead: SavedInterestLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      fullName: fullName.trim(),
      whatsappNumber: fullWhatsApp,
      countryCode,
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || 'Not provided',
      submittedAt: now.toISOString(),
      submittedAtFormatted: now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      eligibilityResult: 'ineligible',
      answers: { ...answers },
      internalCategory: evaluatedInternalCategory || 'Does not currently meet requirements',
      internalReason: evaluatedInternalReason || 'Requirements not met',
      consentAgreed: true,
      consentText
    };

    // 1. Centralized Netlify Forms submission
    try {
      const answersFormatted = Object.entries(answers)
        .map(([qId, ans]) => `Q${qId}: ${ans}`)
        .join(' | ');

      const formDataBody = new URLSearchParams({
        'form-name': 'sales-team-interest-list',
        'fullName': newLead.fullName,
        'whatsappNumber': newLead.whatsappNumber,
        'email': newLead.email,
        'submittedAt': newLead.submittedAt,
        'eligibilityResult': newLead.eligibilityResult,
        'internalCategory': newLead.internalCategory,
        'internalReason': newLead.internalReason,
        'answers': answersFormatted,
        'consentStatus': 'Agreed',
        'consentText': newLead.consentText
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataBody.toString()
      }).catch(() => {
        // Network resilient: continues even if offline
      });
    } catch {
      // ignore
    }

    // 2. Persistent storage for cross-session/local review & instant CSV export
    try {
      const existing = localStorage.getItem(INTEREST_LIST_STORAGE_KEY);
      const list: SavedInterestLead[] = existing ? JSON.parse(existing) : [];
      list.unshift(newLead);
      localStorage.setItem(INTEREST_LIST_STORAGE_KEY, JSON.stringify(list));
    } catch {
      // ignore storage restriction
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep('interest_confirmed');
        setIsTransitioning(false);
      }, 150);
    }, 400);
  };

  const exactWhatsAppMessage = "Hi, I want to join the EventsKonnectGH Sales Team and have some questions.";
  const qualifiedWhatsAppUrl = `https://wa.me/${PRIMARY_RECRUITMENT_PHONE}?text=${encodeURIComponent(exactWhatsAppMessage)}`;
  const secondarySupportUrl = `https://wa.me/${SECONDARY_SUPPORT_PHONE}?text=${encodeURIComponent(exactWhatsAppMessage)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="eligibility-title"
      className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md overflow-y-auto flex items-center justify-center p-3 sm:p-5 md:p-6"
    >
      {/* Hidden Netlify Form Registration for build-time asset detection */}
      <form
        name="sales-team-interest-list"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
        aria-hidden="true"
      >
        <input type="hidden" name="form-name" value="sales-team-interest-list" />
        <input type="text" name="bot-field" />
        <input type="text" name="fullName" />
        <input type="text" name="whatsappNumber" />
        <input type="email" name="email" />
        <input type="text" name="submittedAt" />
        <input type="text" name="eligibilityResult" />
        <input type="text" name="internalCategory" />
        <input type="text" name="internalReason" />
        <input type="text" name="answers" />
        <input type="text" name="consentStatus" />
        <input type="text" name="consentText" />
      </form>

      <div
        className={`relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh] transition-all duration-200 ${
          isTransitioning ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
        }`}
      >
        {/* Brand Header */}
        <div className="bg-white border-b border-slate-100 px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="https://i.ibb.co/qFpTY6Ph/upload-your-own-banner.png"
              alt="EventsKonnectGH Logo"
              referrerPolicy="no-referrer"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
            Official Recruitment
          </span>
        </div>

        {/* Progress Bar for Questions (Steps 1 to 5) */}
        {typeof currentStep === 'number' && (
          <div className="w-full bg-white shrink-0 border-b border-slate-100">
            <div className="flex items-center justify-between px-5 sm:px-7 pt-3 pb-1 text-xs font-semibold text-slate-700">
              <span className="text-red-600 font-bold">
                Question {currentStep} of 5
              </span>
              <span className="text-slate-900">{Math.round((currentStep / 5) * 100)}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100">
              <div
                className="h-full bg-red-600 transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-7 md:p-8 flex-1 overflow-y-auto bg-white">
          {/* ================= OPENING SCREEN (CRISP MODERN JOB OVERVIEW) ================= */}
          {currentStep === 'intro' && (
            <div className="text-left space-y-4 sm:space-y-5">
              
              {/* Tag & Heading */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-red-600 text-xs font-bold uppercase tracking-wide border border-red-200 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span>Sales Representative Opportunity</span>
                </div>
                <h2
                  id="eligibility-title"
                  className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight mb-1.5"
                >
                  Interested in joining our Sales Team?
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-700">
                  Before continuing, please complete this short <span className="text-red-600 font-bold">60-second eligibility check</span>.
                </p>
              </div>

              {/* Crisp Modern Structure & Opportunity Summary */}
              <div className="space-y-3 text-slate-900 text-xs sm:text-sm">
                
                {/* 0. What is EventsKonnectGH? (Catchy Summary) */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-slate-950 text-sm mb-1.5">
                    <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
                    <span>What is <span className="text-red-600">EventsKonnectGH</span>?</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    <strong className="text-slate-950 font-bold">EventsKonnectGH</strong> is Ghana's exclusive event marketplace connecting top event vendors and service providers directly with clients planning weddings, parties, and corporate celebrations nationwide. From caterers and photographers to DJs, makeup artists, decorators, and MCs, we bring together the trusted professionals who make every event a true success.
                  </p>
                </div>

                {/* 1. The Role: Sales Representative */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-slate-950 text-sm mb-1.5">
                    <Briefcase className="w-4 h-4 text-red-600 shrink-0" />
                    <span>The Role: <span className="text-red-600">Sales Representative</span></span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Reach out to Ghanaian event vendors and service providers (photographers, caterers, DJs, decorators, MCs, venues, makeup artists), introduce them to the <strong className="text-slate-950 font-bold">EventsKonnectGH</strong> platform, and guide them through registration to connect them with clients.
                  </p>
                </div>

                {/* 2. Payment Terms & 30% Commission */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-slate-950 text-sm mb-1.5">
                    <Banknote className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Payment Terms & Earning Potential</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    Earn a <strong className="text-red-600 font-bold">30% commission (15 GH₵)</strong> for each successful service provider registration generated. <strong className="text-red-600 font-bold">No earning limits.</strong>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600 font-medium block text-[11px] uppercase tracking-wider">5 vendors a day</span>
                      <span className="font-black text-slate-950 text-sm block mt-0.5">
                        <span className="text-red-600 font-extrabold">75 GH₵</span> / day <span className="text-slate-500 font-normal text-xs">→ 2,250 GH₵/mo</span>
                      </span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-600 font-medium block text-[11px] uppercase tracking-wider">10 vendors a day</span>
                      <span className="font-black text-slate-950 text-sm block mt-0.5">
                        <span className="text-red-600 font-extrabold">150 GH₵</span> / day <span className="text-slate-500 font-normal text-xs">→ 4,500 GH₵/mo</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Who We Are Looking For */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-slate-950 text-sm mb-2">
                    <UserCheck className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Who We Are Looking For</span>
                  </div>
                  <ul className="space-y-2 text-slate-700 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span><strong className="text-slate-950">Visionary thinkers:</strong> Creative, ambitious individuals passionate about transforming Ghana's event industry.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span><strong className="text-slate-950">Proactive & driven:</strong> Comfortable reaching out to event vendors actively.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span><strong className="text-slate-950">Honest & reliable:</strong> Strong professional communication and work ethic.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span><strong className="text-slate-950">Requirements:</strong> <span className="text-red-600 font-bold">18 years or older</span> with a smartphone and active internet.</span>
                    </li>
                  </ul>
                </div>

                {/* 4. Earnings Disclaimer */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] sm:text-xs text-slate-700 flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-slate-950">Earnings Disclaimer:</strong> Earning potential is based on personal effort, active outreach, and good work ethic. EventsKonnectGH does not guarantee specific results.
                  </p>
                </div>

              </div>

              {/* Call to Action Button - Goes BRIGHT GREEN on Hover */}
              <div className="pt-2">
                <button
                  id="start-eligibility-btn"
                  onClick={handleStart}
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-green-500 active:bg-green-600 text-white font-bold text-base sm:text-lg py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                >
                  <span>START ELIGIBILITY CHECK</span>
                  <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <p className="text-center text-[11px] font-medium text-slate-500 mt-2">
                  5 simple multiple-choice questions • Takes under <span className="text-red-600 font-semibold">60 seconds</span>
                </p>
              </div>

            </div>
          )}

          {/* ================= QUESTION SCREENS (1 to 5) ================= */}
          {typeof currentStep === 'number' && (
            <div className="space-y-6">
              {/* Question Heading */}
              <div>
                <h2
                  id="eligibility-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug"
                >
                  {QUESTIONS[currentStep - 1].heading}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {QUESTIONS[currentStep - 1].options.map((option, idx) => {
                  const isSelected = answers[currentStep] === option;
                  return (
                    <button
                      key={idx}
                      id={`q${currentStep}-option-${idx}`}
                      onClick={() => handleSelectOption(currentStep, option)}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.99] ${
                        isSelected
                          ? 'border-red-600 bg-red-50/60 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <span
                        className={`text-sm sm:text-base leading-snug ${
                          isSelected ? 'font-bold text-slate-950' : 'font-medium text-slate-700'
                        }`}
                      >
                        {option}
                      </span>
                      
                      {/* Radio Indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-red-600 bg-red-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <button
                  id="eligibility-back-btn"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-3 text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  id="eligibility-continue-btn"
                  onClick={handleNext}
                  disabled={!answers[currentStep]}
                  className={`inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all shadow-xs ${
                    answers[currentStep]
                      ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white cursor-pointer active:scale-[0.98]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === 5 ? 'VIEW RESULTS' : 'CONTINUE'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= SUCCESS SCREEN ================= */}
          {currentStep === 'success' && (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h2
                  id="eligibility-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2"
                >
                  🎉 You Meet Our Initial Requirements
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                  Based on your answers, you meet the initial requirements for the EventsKonnectGH Sales Team.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-sm text-slate-700 leading-relaxed">
                The next step is to speak with our recruitment team on WhatsApp (+233 55 470 0904). You can ask any questions you have and get onboarded to start earning.
              </div>

              {/* Main WhatsApp Action */}
              <div className="pt-2 space-y-3">
                <a
                  id="qualified-speak-recruitment-btn"
                  href={qualifiedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onQualified}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd59] active:bg-[#19a54c] text-white font-bold text-base sm:text-lg py-4 px-6 rounded-xl shadow-lg transition-all active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-6 h-6 shrink-0 fill-white" />
                  <span>SPEAK TO THE RECRUITMENT TEAM</span>
                </a>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                  <span>Alternative line?</span>
                  <a
                    id="qualified-support-backup-link"
                    href={secondarySupportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#128C7E] hover:text-[#0b5c53] font-semibold underline"
                  >
                    Connect with Secondary Advisor
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    id="qualified-view-website-btn"
                    onClick={onQualified}
                    className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-4 cursor-pointer"
                  >
                    Explore Full Website & Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= UNSUCCESSFUL SCREEN: UNDER 18 ================= */}
          {currentStep === 'unsuccessful_under_18' && (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
                <AlertCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h2
                  id="eligibility-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2"
                >
                  Thank You for Your Interest
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                  You do not currently meet the age requirement for the EventsKonnectGH Sales Team.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm leading-relaxed text-left">
                We appreciate your interest and encourage you to visit us again when you meet the eligibility requirements.
              </div>

              <div className="pt-2 space-y-3">
                <a
                  id="under18-visit-website-btn"
                  href={OFFICIAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <span>VISIT EVENTS KONNECT GH</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* ================= UNSUCCESSFUL SCREEN: 18+ (INELIGIBLE APPLICANT SCREEN) ================= */}
          {currentStep === 'unsuccessful' && (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
                <AlertCircle className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <h2
                  id="eligibility-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2"
                >
                  Thank You for Your Interest
                </h2>
                <div className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto space-y-2 text-left sm:text-center">
                  <p>
                    Based on your answers, you do not currently meet the requirements for the EventsKonnectGH Sales Team.
                  </p>
                  <p>
                    We appreciate your interest in joining us.
                  </p>
                  <p className="text-slate-700 font-medium pt-1">
                    If you would like to hear about future Sales Team opportunities, you can join our interest list and we will contact you if a suitable opportunity becomes available.
                  </p>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                {/* Primary Action: KEEP ME UPDATED */}
                <button
                  id="ineligible-keep-me-updated-btn"
                  onClick={handleOpenInterestForm}
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base sm:text-lg py-4 px-6 rounded-xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>KEEP ME UPDATED</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Secondary Action: VISIT EVENTS KONNECT GH */}
                <a
                  id="ineligible-visit-website-btn"
                  href={OFFICIAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all"
                >
                  <span>VISIT EVENTS KONNECT GH</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* ================= KEEP ME UPDATED CONTACT FORM ================= */}
          {currentStep === 'interest_form' && (
            <div className="text-left space-y-5">
              
              {/* Form Heading & Intro */}
              <div>
                <button
                  id="interest-form-back-btn"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium mb-3 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to overview</span>
                </button>

                <h2
                  id="eligibility-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2"
                >
                  Stay Connected with EventsKonnectGH
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Leave your details below and we may contact you if a suitable Sales Team opportunity becomes available in the future.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleInterestFormSubmit} className="space-y-4">
                
                {/* Honeypot Spam Trap */}
                <input
                  type="text"
                  name="_gotcha"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* 1. Full Name (Required) */}
                <div>
                  <label
                    htmlFor="interest-full-name"
                    className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="interest-full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (formErrors.fullName) {
                          setFormErrors((prev) => ({ ...prev, fullName: undefined }));
                        }
                      }}
                      placeholder="e.g. Kwame Mensah"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-slate-300 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* 2. WhatsApp Number (Required) */}
                <div>
                  <label
                    htmlFor="interest-whatsapp-number"
                    className="block text-xs sm:text-sm font-bold text-slate-900 mb-1.5"
                  >
                    WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    {/* Country Code Select */}
                    <div className="shrink-0 w-32 sm:w-36">
                      <select
                        id="interest-country-code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full px-2.5 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 cursor-pointer"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.flag} {item.code}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Telephone Input */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        id="interest-whatsapp-number"
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (formErrors.phoneNumber) {
                            setFormErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                          }
                        }}
                        placeholder="e.g. 55 470 0904"
                        className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors ${
                          formErrors.phoneNumber ? 'border-red-500 bg-red-50/20' : 'border-slate-300 hover:border-slate-400'
                        }`}
                      />
                    </div>
                  </div>
                  {formErrors.phoneNumber ? (
                    <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.phoneNumber}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 mt-1">
                      Please enter your active WhatsApp mobile number with your country code.
                    </p>
                  )}
                </div>

                {/* 3. Email Address (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="interest-email"
                      className="block text-xs sm:text-sm font-bold text-slate-900"
                    >
                      Email Address
                    </label>
                    <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
                      Optional
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="interest-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formErrors.email) {
                          setFormErrors((prev) => ({ ...prev, email: undefined }));
                        }
                      }}
                      placeholder="e.g. kwame@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-colors ${
                        formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-slate-300 hover:border-slate-400'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-red-600 mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* 4. Consent Checkbox (Required) */}
                <div className="pt-2">
                  <label
                    htmlFor="interest-consent-checkbox"
                    className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer select-none ${
                      consentAgreed
                        ? 'border-red-500/80 bg-red-50/40'
                        : formErrors.consent
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      id="interest-consent-checkbox"
                      type="checkbox"
                      required
                      checked={consentAgreed}
                      onChange={(e) => {
                        setConsentAgreed(e.target.checked);
                        if (formErrors.consent) {
                          setFormErrors((prev) => ({ ...prev, consent: undefined }));
                        }
                      }}
                      className="mt-0.5 w-4.5 h-4.5 rounded text-red-600 focus:ring-red-500 border-slate-300 cursor-pointer accent-red-600 shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                      I agree to be contacted by EventsKonnectGH about future Sales Team opportunities. <span className="text-red-600 font-bold">*</span>
                    </span>
                  </label>
                  {formErrors.consent && (
                    <p className="text-xs text-red-600 mt-1.5 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{formErrors.consent}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="submit-interest-list-btn"
                    type="submit"
                    disabled={isSubmitting || !consentAgreed}
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold text-base py-4 px-6 rounded-xl shadow-md transition-all ${
                      consentAgreed && !isSubmitting
                        ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white cursor-pointer active:scale-[0.98]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>SAVING YOUR DETAILS...</span>
                      </span>
                    ) : (
                      <>
                        <span>JOIN THE INTEREST LIST</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Your information is protected and used solely for EventsKonnectGH Sales Team updates.
                  </p>
                </div>

              </form>

            </div>
          )}

          {/* ================= CONFIRMATION SCREEN ================= */}
          {currentStep === 'interest_confirmed' && (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h2
                  id="eligibility-title"
                  className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2"
                >
                  You’re on the List
                </h2>
                <div className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto space-y-2">
                  <p>
                    Thank you for your interest in EventsKonnectGH.
                  </p>
                  <p>
                    If a suitable Sales Team opportunity becomes available in the future, our team may contact you using the details you provided.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-600 text-left leading-relaxed">
                <div className="flex items-center gap-2 font-semibold text-slate-800 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Details Saved Successfully</span>
                </div>
                <span>We have registered your contact preferences. You can now explore the main EventsKonnectGH marketplace to learn more about how we connect event professionals with clients across Ghana.</span>
              </div>

              <div className="pt-2">
                <a
                  id="confirmed-visit-website-btn"
                  href={OFFICIAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <span>VISIT EVENTS KONNECT GH</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


