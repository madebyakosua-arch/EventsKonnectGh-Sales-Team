import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { RoleSection } from './components/RoleSection';
import { EarningsSection } from './components/EarningsSection';
import { EligibilitySection } from './components/EligibilitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-red-500 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* About EventsKonnectGH */}
        <AboutSection />

        {/* Sales Role & Responsibilities */}
        <RoleSection />

        {/* 30% Earnings Model */}
        <EarningsSection />

        {/* Who Can Apply */}
        <EligibilitySection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Transparency & Trust */}
        <TrustSection />

        {/* Final Conversion CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
}
