import React from 'react';
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types';

interface HeroProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  const formattedDate = new Date(config.weddingDate).toLocaleDateString(
    isAr ? 'ar-EG' : 'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden bg-[#F9F7F2] text-[#2D2D2D]">
      {/* Background Ornamental Color Block & Subtle Image Layer */}
      <div className="absolute top-0 right-0 w-full lg:w-2/5 h-full bg-[#F3EFE7] -z-0 opacity-80" />
      
      {/* Editorial Decorative Vertical Line */}
      <div className="absolute top-20 right-8 md:right-24 w-px h-64 bg-[#A68B67] opacity-40 hidden sm:block" />
      <div className="absolute bottom-10 left-8 w-px h-48 bg-[#A68B67] opacity-30 hidden sm:block" />

      {/* Top Banner Subhead */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-12 sm:mb-20 border-b border-[#A68B67]/20 pb-4">
        <div className="text-xs tracking-[0.3em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'رباط الحب الأبدي' : 'The Union of Two Souls'}</span>
        </div>
        <div className="text-xs tracking-[0.3em] uppercase font-sans font-semibold text-[#2D2D2D]/70 mt-2 sm:mt-0">
          {isAr ? 'عقد القران والزفاف | ٢٠٢٦' : 'EST. 2026'}
        </div>
      </div>

      {/* Hero Content Main Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Side: Names & Invitation Quote */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-4">
            <span className={`text-[#A68B67] italic text-2xl sm:text-3xl ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isAr ? 'يتشرفان بدعوتكم لحضور حفل زفاف' : 'Join us for the wedding of'}
            </span>
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-[100px] lg:text-[115px] leading-[0.92] font-light tracking-tighter mb-8 font-serif-en">
            {isAr ? (
              <span className="font-serif-ar block">
                {config.groomNameAr} <span className="italic font-normal text-[#A68B67] font-serif-en">&</span>
                <br />
                {config.brideNameAr}
              </span>
            ) : (
              <span>
                {config.groomNameEn} <span className="italic font-normal text-[#A68B67]">&</span>
                <br />
                {config.brideNameEn}
              </span>
            )}
          </h1>

          <div className="max-w-xl border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#A68B67] pl-6 rtl:pl-0 rtl:pr-6 py-2 mt-4 sm:mt-8">
            <p className={`text-base sm:text-lg leading-relaxed text-[#555] italic ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
              {isAr ? config.heroQuoteAr : config.heroQuoteEn}
            </p>
          </div>
        </div>

        {/* Right Side: Hero Details & Image Frame */}
        <div className="lg:col-span-5 flex flex-col justify-end space-y-8 bg-white/70 backdrop-blur-sm p-6 sm:p-8 border border-[#A68B67]/30 shadow-sm relative">
          {/* Subtle Frame Accent */}
          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#A68B67]" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#A68B67]" />

          <section>
            <h3 className="text-xs tracking-[0.4em] uppercase font-sans text-[#A68B67] mb-2 font-semibold">
              {isAr ? 'متى' : 'WHEN'}
            </h3>
            <p className="text-xl sm:text-2xl font-light text-[#2D2D2D]">{formattedDate}</p>
            <p className="text-base text-[#555] mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#A68B67]" />
              <span>{isAr ? 'السادسة مساءً' : 'Six O\'Clock in the Evening'}</span>
            </p>
          </section>

          <section className="pt-2 border-t border-[#A68B67]/20">
            <h3 className="text-xs tracking-[0.4em] uppercase font-sans text-[#A68B67] mb-2 font-semibold">
              {isAr ? 'أين' : 'WHERE'}
            </h3>
            <p className="text-xl sm:text-2xl font-light text-[#2D2D2D]">
              {isAr ? config.venueNameAr : config.venueNameEn}
            </p>
            <p className="text-sm text-[#555] mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#A68B67] shrink-0" />
              <span>{isAr ? config.venueAddressAr : config.venueAddressEn}</span>
            </p>
          </section>

          <section className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="#rsvp"
              className="px-8 py-3.5 bg-[#2D2D2D] text-[#F9F7F2] font-sans text-xs tracking-[0.25em] uppercase text-center transition-all hover:bg-[#A68B67] shadow-md flex items-center justify-center gap-2 group"
            >
              <Heart className="w-4 h-4 text-[#A68B67] group-hover:text-white transition-colors" />
              <span>{isAr ? 'تأكيد الحضور (RSVP)' : 'KINDLY RSVP'}</span>
            </a>

            <a
              href="#venue"
              className="px-6 py-3.5 border border-[#A68B67] text-[#2D2D2D] font-sans text-xs tracking-[0.2em] uppercase text-center transition-all hover:bg-[#F3EFE7]"
            >
              {isAr ? 'تفاصيل المكان والخريطة' : 'VENUE MAP'}
            </a>
          </section>
        </div>
      </div>

      {/* Decorative Monogram Background watermark */}
      <div className="absolute -bottom-16 -left-10 text-[260px] sm:text-[360px] font-light text-[#A68B67] opacity-[0.04] select-none pointer-events-none font-serif-en">
        {config.monogram}
      </div>
    </section>
  );
};
