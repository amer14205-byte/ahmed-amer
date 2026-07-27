import React from 'react';
import { Volume2, VolumeX, Globe, Settings, MapPin, Calendar, Heart, Gift, Clock } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface HeaderNavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  config: WeddingConfig;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenEditModal: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  lang,
  setLang,
  config,
  isPlayingMusic,
  onToggleMusic,
  onOpenEditModal,
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/90 backdrop-blur-md border-b border-[#A68B67]/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Monogram / Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-[#A68B67] flex items-center justify-center bg-[#F3EFE7] group-hover:bg-[#A68B67] group-hover:text-white transition-all text-sm font-serif tracking-widest text-[#2D2D2D]">
            {config.monogram}
          </div>
          <div className="hidden sm:block">
            <span className="block text-xs uppercase tracking-[0.25em] text-[#A68B67] font-semibold">
              {isAr ? 'دعوة زفاف خاصة' : 'THE WEDDING OF'}
            </span>
            <span className="block text-sm font-serif font-medium text-[#2D2D2D]">
              {isAr ? `${config.groomNameAr} & ${config.brideNameAr}` : `${config.groomNameEn} & ${config.brideNameEn}`}
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.2em] font-sans text-[#555]">
          <a href="#location" className="hover:text-[#A68B67] transition-colors flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#A68B67]" />
            {isAr ? 'المكان واللوكيشن' : 'Location'}
          </a>
          <a href="#schedule" className="hover:text-[#A68B67] transition-colors flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#A68B67]" />
            {isAr ? 'الجدول' : 'Schedule'}
          </a>
          <a href="#story" className="hover:text-[#A68B67] transition-colors flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#A68B67]" />
            {isAr ? 'قصتنا' : 'Our Story'}
          </a>
          <a href="#rsvp" className="hover:text-[#A68B67] transition-colors flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#A68B67]" />
            {isAr ? 'تأكيد الحضور' : 'RSVP'}
          </a>
          <a href="#registry" className="hover:text-[#A68B67] transition-colors flex items-center gap-1.5">
            <Gift className="w-3.5 h-3.5 text-[#A68B67]" />
            {isAr ? 'الهدايا' : 'Registry'}
          </a>
        </nav>

        {/* Control Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio Music Toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? (isAr ? 'إيقاف الموسيقى' : 'Mute Music') : (isAr ? 'تشغيل الموسيقى' : 'Play Music')}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full border text-xs font-sans tracking-wider flex items-center gap-1.5 transition-all ${
              isPlayingMusic 
                ? 'bg-[#A68B67] text-white border-[#A68B67] shadow-sm' 
                : 'bg-[#F3EFE7] text-[#2D2D2D] border-[#A68B67]/30 hover:border-[#A68B67]'
            }`}
          >
            {isPlayingMusic ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {isPlayingMusic ? (isAr ? 'صوت' : 'Music On') : (isAr ? 'موسيقى' : 'Music')}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="px-2.5 py-1.5 rounded-full border border-[#A68B67]/30 bg-[#F3EFE7] hover:border-[#A68B67] text-xs font-sans font-semibold tracking-wider text-[#2D2D2D] flex items-center gap-1 transition-all"
            title={isAr ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#A68B67]" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Edit Invitation Config & Names (Feature requested by user) */}
          <button
            onClick={onOpenEditModal}
            className="px-3 py-1.5 rounded-full bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] text-xs font-sans tracking-widest uppercase flex items-center gap-1.5 transition-all shadow-sm"
            title={isAr ? 'تعديل بيانات الدعوة والأسماء واللوكيشن' : 'Edit Names & Venue Details'}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">
              {isAr ? 'تعديل الدعوة' : 'Edit Info'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
