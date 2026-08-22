import React from 'react';
import { Camera, Utensils, Sparkles, Music, Building2, Users } from 'lucide-react';
import { VENDOR_CATEGORIES } from '../data';

const getCategoryIcon = (iconName: string) => {
  const iconProps = { className: "w-5 h-5 text-white shrink-0" };
  switch (iconName) {
    case 'camera':
      return <Camera {...iconProps} />;
    case 'utensils':
      return <Utensils {...iconProps} />;
    case 'sparkles':
      return <Sparkles {...iconProps} />;
    case 'music':
      return <Music {...iconProps} />;
    case 'building':
      return <Building2 {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-red-600 text-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            What is EventsKonnectGH?
          </h2>
          <p className="text-base sm:text-lg text-white/95 leading-relaxed">
            EventsKonnectGH is a growing platform built to connect clients with trusted event vendors and service providers across Ghana.
          </p>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed mt-2">
            From photographers and caterers to decorators, DJs, venues and more, the platform helps event businesses become more visible and easier for clients to discover.
          </p>
          <p className="text-sm sm:text-base font-semibold text-white mt-4 bg-red-700/60 border border-white/20 py-2.5 px-4 rounded-xl inline-block">
            We are growing our network and looking for people who can help us connect with quality event service providers and vendors.
          </p>
        </div>

        {/* Vendor Areas Simple Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {VENDOR_CATEGORIES.map((category, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/20 shadow-2xs text-center flex flex-col items-center justify-center gap-2 hover:bg-white/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                {getCategoryIcon(category.icon)}
              </div>
              <h3 className="font-semibold text-white text-xs sm:text-sm">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

