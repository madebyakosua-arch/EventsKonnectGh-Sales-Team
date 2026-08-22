import React from 'react';
import { Quote } from 'lucide-react';
import kofiImg from '../assets/images/kofi_mensah_avatar_1787424237661.jpg';
import abenaImg from '../assets/images/abena_osei_avatar_1787424251053.jpg';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Kofi Mensah",
    role: "Sales Representative with EventsKonnectGh",
    location: "Accra, Ghana",
    quote: "Connecting local event vendors with EventsKonnectGH has been both flexible and rewarding. Earning the 30% commission per registration is straightforward, and photographers and caterers in my area were genuinely excited to gain more client visibility.",
    image: kofiImg
  },
  {
    name: "Abena Osei",
    role: "Sales Representative with EventsKonnectGh",
    location: "Kumasi, Ghana",
    quote: "I had a few questions before joining, but speaking directly with the recruitment team on WhatsApp gave me all the clarity I needed. Working on my own schedule while helping event decorators and DJs grow their business has been a great experience.",
    image: abenaImg
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Centered */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            Hear From Our Sales Team
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Real feedback from team members connecting event businesses across Ghana.
          </p>
        </div>

        {/* 2 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                  <Quote className="w-5 h-5 fill-red-600/20" />
                </div>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-red-100 shadow-xs shrink-0"
                />
                <div>
                  <h3 className="font-bold text-slate-950 text-base leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {item.role} • <span className="text-red-600 font-medium">{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
