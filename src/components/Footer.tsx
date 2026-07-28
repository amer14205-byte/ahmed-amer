import React from 'react';
import { Heart, ChevronUp, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types';

interface FooterProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D2D2D] text-[#F9F7F2] py-16 px-6 relative overflow-hidden border-t border-[#A68B67]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Monogram Badge */}
        <div className="w-14 h-14 rounded-full border-2 border-[#A68B67] flex items-center justify-center text-[#A68B67] text-lg font-serif-en tracking-widest bg-[#2D2D2D]">
          {config.monogram}
        </div>

        {/* Groom & Bride Names */}
        <h3 className={`text-2xl sm:text-4xl font-light text-[#F9F7F2] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
          {isAr ? `${config.groomNameAr} & ${config.brideNameAr}` : `${config.groomNameEn} & ${config.brideNameEn}`}
        </h3>

        <p className="text-xs uppercase tracking-[0.3em] font-sans text-[#A68B67] max-w-md">
          {isAr ? 'نشكركم على محبتكم ومشاركتكم في بداية حياتنا الجديدة' : 'Thank you for being part of our beautiful beginning.'}
        </p>

        <div className="w-24 h-px bg-[#A68B67]/30 my-4" />

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[11px] uppercase tracking-[0.3em] font-sans text-[#F9F7F2]/70">
          <a href="#schedule" className="hover:text-[#A68B67] transition-colors">{isAr ? 'البرنامج' : 'Schedule'}</a>
          <a href="#venue" className="hover:text-[#A68B67] transition-colors">{isAr ? 'المكان' : 'Venue'}</a>
          <a href="#dresscode" className="hover:text-[#A68B67] transition-colors">{isAr ? 'الملابس' : 'Dress Code'}</a>
          <a href="#rsvp" className="hover:text-[#A68B67] transition-colors">{isAr ? 'تأكيد الحضور' : 'RSVP'}</a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="mt-6 p-3 rounded-full border border-[#A68B67]/40 text-[#A68B67] hover:bg-[#A68B67] hover:text-white transition-all shadow-sm"
          title={isAr ? 'الرجوع للأعلى' : 'Back to top'}
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        <div className="text-[10px] uppercase tracking-[0.4em] font-sans opacity-40 pt-4">
          {isAr ? 'دعوة زفاف فاخرة بأسلوب التحرير | جميع الحقوق محفوظة ٢٠٢٦' : 'Editorial Wedding Invitation • Est. 2026'}
        </div>

      </div>
    </footer>
  );
};
