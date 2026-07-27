import React from 'react';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface HeroSectionProps {
  lang: Language;
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';

  const formattedDate = new Date(config.weddingDate).toLocaleDateString(
    isAr ? 'ar-EG' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between p-6 sm:p-12 lg:p-16 overflow-hidden bg-[#F9F7F2]">
      
      {/* Editorial Decorative Background Layers */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F3EFE7] -z-0 pointer-events-none" />
      <div className="absolute top-12 right-12 sm:right-24 w-px h-64 bg-[#A68B67] opacity-40 pointer-events-none" />
      <div className="absolute bottom-12 left-12 sm:left-24 w-px h-48 bg-[#A68B67] opacity-40 pointer-events-none" />

      {/* Decorative Large Watermark Initials */}
      <div className="absolute -bottom-10 -left-10 text-[200px] sm:text-[320px] font-serif font-light text-[#A68B67] opacity-[0.04] select-none pointer-events-none leading-none">
        {config.monogram}
      </div>

      {/* Top Editorial Subheader */}
      <div className="relative z-10 flex flex-wrap justify-between items-center border-b border-[#A68B67]/20 pb-4 mb-8 sm:mb-12">
        <div className="text-xs tracking-[0.3em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#A68B67]" />
          {isAr ? 'دعوة زفاف مباركة' : 'The Union of Two Souls'}
        </div>
        <div className="text-xs tracking-[0.3em] uppercase font-sans text-[#2D2D2D]/70 font-semibold">
          {isAr ? 'القاهرة • 2026' : 'EST. 2026'}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left / Primary Column: Names & Invitation Quote */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#F3EFE7] border border-[#A68B67]/30 text-xs tracking-widest text-[#A68B67] font-sans">
            {isAr ? 'يتشرفان بدعوتكم لحضور حفل زفافهما' : 'Together with their families invite you to celebrate'}
          </div>

          {/* Huge Editorial Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light text-[#2D2D2D] tracking-tight leading-[1.05]">
            <span>{isAr ? config.groomNameAr : config.groomNameEn}</span>
            <br />
            <span className="italic font-normal text-[#A68B67] text-4xl sm:text-6xl lg:text-7xl my-1 inline-block px-2">
              &amp;
            </span>
            <br />
            <span>{isAr ? config.brideNameAr : config.brideNameEn}</span>
          </h1>

          {/* Quote Banner */}
          <div className="max-w-xl border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#A68B67] pl-6 rtl:pl-0 rtl:pr-6 py-2 my-6">
            <p className="text-base sm:text-lg leading-relaxed text-[#555] font-serif italic">
              "{isAr ? config.heroQuoteAr : config.heroQuoteEn}"
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#rsvp"
              className="px-8 py-4 bg-[#2D2D2D] text-[#F9F7F2] font-sans text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#A68B67] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {isAr ? 'تأكيد الحضور (RSVP)' : 'Kindly RSVP'}
            </a>

            <a
              href="#location"
              className="px-6 py-4 bg-transparent border border-[#2D2D2D]/30 text-[#2D2D2D] font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#F3EFE7] hover:border-[#A68B67] transition-all flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-[#A68B67]" />
              {isAr ? 'موقع الحفل واللوكيشن' : 'View Location'}
            </a>
          </div>

        </div>

        {/* Right / Secondary Column: Date & Venue Snapshot */}
        <div className="lg:col-span-5 bg-[#F3EFE7]/80 backdrop-blur-sm p-8 sm:p-10 border border-[#A68B67]/30 shadow-sm relative space-y-8">
          
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#A68B67]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#A68B67]" />

          {/* When */}
          <div>
            <h3 className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold mb-2">
              {isAr ? 'التاريخ والزمان' : 'WHEN'}
            </h3>
            <p className="text-xl sm:text-2xl font-serif text-[#2D2D2D]">
              {formattedDate}
            </p>
            <p className="text-sm text-[#555] mt-1 font-sans">
              {isAr ? 'السادسة مساءً (06:00 PM)' : 'Six O\'Clock in the Evening'}
            </p>
          </div>

          {/* Where */}
          <div className="pt-4 border-t border-[#A68B67]/20">
            <h3 className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold mb-2">
              {isAr ? 'مكان الحفل' : 'WHERE'}
            </h3>
            <p className="text-xl font-serif text-[#2D2D2D]">
              {isAr ? config.venueNameAr : config.venueNameEn}
            </p>
            <p className="text-sm text-[#555] mt-1 font-sans leading-relaxed">
              {isAr ? config.venueAddressAr : config.venueAddressEn}
            </p>
          </div>

          {/* Quick Map Button */}
          <div className="pt-2">
            <a
              href={config.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#A68B67] hover:text-[#2D2D2D] uppercase tracking-wider transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>{isAr ? 'فتح اللوكيشن في خرائط جوجل ←' : 'Open in Google Maps →'}</span>
            </a>
          </div>

        </div>

      </div>

      {/* Footer Scroll Indicator */}
      <div className="relative z-10 pt-8 mt-8 border-t border-[#A68B67]/20 flex justify-between items-center text-[11px] uppercase tracking-[0.3em] font-sans text-[#555]">
        <div>
          {isAr ? 'الزي الرسمي: ملابس رسمية أنيقة' : 'Dress Code: Formal / Black Tie'}
        </div>
        <a href="#countdown" className="flex items-center gap-1 hover:text-[#A68B67] transition-colors">
          <span>{isAr ? 'التفاصيل بالأسفل' : 'Scroll for Details'}</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>

    </section>
  );
};
