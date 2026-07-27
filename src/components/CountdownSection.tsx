import React, { useState, useEffect } from 'react';
import { CalendarPlus, Download, Sparkles } from 'lucide-react';
import { Language, WeddingConfig } from '../types';
import { calculateTimeRemaining, TimeRemaining, getGoogleCalendarUrl, downloadIcalFile } from '../utils/calendar';

interface CountdownSectionProps {
  lang: Language;
  config: WeddingConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeRemaining(config.weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(config.weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.weddingDate]);

  const handleGoogleCal = () => {
    const url = getGoogleCalendarUrl(config, isAr);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleIcal = () => {
    downloadIcalFile(config, isAr);
  };

  return (
    <section id="countdown" className="py-20 bg-[#F3EFE7] border-y border-[#A68B67]/20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <Sparkles className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'العد التنازلي لليوم الموعود' : 'COUNTING DOWN TO THE BIG DAY'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {timeLeft.isPassed 
              ? (isAr ? 'اليوم حفل الزفاف! مرحباً بكم' : 'The Wedding Day is Here!')
              : (isAr ? 'ننتظر ليلتنا الكبرى بشغف' : 'We Can’t Wait to Celebrate')}
          </h2>
        </div>

        {/* Countdown Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {[
            { labelAr: 'يوم', labelEn: 'Days', value: timeLeft.days },
            { labelAr: 'ساعة', labelEn: 'Hours', value: timeLeft.hours },
            { labelAr: 'دقيقة', labelEn: 'Minutes', value: timeLeft.minutes },
            { labelAr: 'ثانية', labelEn: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#F9F7F2] p-6 sm:p-8 border border-[#A68B67]/30 shadow-sm relative group hover:border-[#A68B67] transition-all"
            >
              <div className="text-4xl sm:text-6xl font-serif font-normal text-[#2D2D2D]">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs uppercase tracking-[0.25em] font-sans text-[#A68B67] font-semibold mt-3">
                {isAr ? item.labelAr : item.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Calendar Sync Actions */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <button
            onClick={handleGoogleCal}
            className="px-6 py-3 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm flex items-center gap-2"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>{isAr ? 'إضافة لتقويم جوجل' : 'Add to Google Calendar'}</span>
          </button>

          <button
            onClick={handleIcal}
            className="px-6 py-3 bg-[#F9F7F2] text-[#2D2D2D] border border-[#A68B67]/40 hover:border-[#A68B67] hover:bg-white font-sans text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'تحميل ملف التقويم (.ics)' : 'Download iCal / Outlook'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
