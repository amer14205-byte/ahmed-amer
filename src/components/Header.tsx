import React from 'react';
import { Volume2, VolumeX, Globe, Settings, Calendar, Heart } from 'lucide-react';
import { WeddingConfig } from '../types';

interface HeaderProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  lang,
  setLang,
  isMusicPlaying,
  onToggleMusic,
  onOpenAdmin,
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#A68B67]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Left branding */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-9 h-9 rounded-full border border-[#A68B67] flex items-center justify-center text-xs font-serif tracking-widest text-[#A68B67] bg-[#F3EFE7]">
            {config.monogram}
          </div>
          <div className="hidden sm:block">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#A68B67] font-semibold">
              {isAr ? 'دعوة زفاف خاصة' : 'THE UNION OF TWO SOULS'}
            </div>
            <div className="text-sm font-serif italic text-[#2D2D2D]">
              {isAr ? `${config.groomNameAr} & ${config.brideNameAr}` : `${config.groomNameEn} & ${config.brideNameEn}`}
            </div>
          </div>
        </div>

        {/* Center / Quick Nav links for Desktop */}
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-xs tracking-[0.2em] uppercase text-[#2D2D2D]/80">
          <a href="#schedule" className="hover:text-[#A68B67] transition-colors">{isAr ? 'البرنامج' : 'Schedule'}</a>
          <a href="#venue" className="hover:text-[#A68B67] transition-colors">{isAr ? 'المكان' : 'Venue'}</a>
          <a href="#dresscode" className="hover:text-[#A68B67] transition-colors">{isAr ? 'الملابس' : 'Dress Code'}</a>
          <a href="#registry" className="hover:text-[#A68B67] transition-colors">{isAr ? 'الهدايا' : 'Registry'}</a>
          <a href="#rsvp" className="text-[#A68B67] font-semibold hover:underline transition-all">{isAr ? 'تأكيد الحضور' : 'RSVP'}</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
          {/* Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? (isAr ? 'إيقاف الموسيقى' : 'Mute Music') : (isAr ? 'تشغيل موسيقى هادئة' : 'Play Music')}
            className={`p-2 rounded-full border border-[#A68B67]/30 transition-all ${
              isMusicPlaying ? 'bg-[#A68B67] text-white shadow-sm' : 'bg-white/60 text-[#2D2D2D] hover:bg-[#F3EFE7]'
            }`}
          >
            {isMusicPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1.5 rounded-full border border-[#A68B67]/30 text-xs font-medium text-[#2D2D2D] bg-white/60 hover:bg-[#F3EFE7] transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          {/* Admin Toggle */}
          <button
            onClick={onOpenAdmin}
            title={isAr ? 'لوحة تحكم العروسين' : 'Admin Panel'}
            className="p-2 rounded-full border border-[#A68B67]/30 text-[#2D2D2D] bg-white/60 hover:bg-[#F3EFE7] transition-colors"
          >
            <Settings className="w-4 h-4 text-[#A68B67]" />
          </button>

          {/* Direct RSVP Button */}
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center space-x-1 rtl:space-x-reverse px-4 py-1.5 bg-[#2D2D2D] text-[#F9F7F2] text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#A68B67] transition-all shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>{isAr ? 'تأكيد الحضور' : 'RSVP'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
