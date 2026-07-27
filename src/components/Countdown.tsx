import React, { useState, useEffect } from 'react';
import { Calendar, Download, Clock, CheckCircle2 } from 'lucide-react';
import { WeddingConfig } from '../types';
import { calculateTimeRemaining, TimeRemaining, getGoogleCalendarUrl, downloadIcalFile } from '../utils/calendar';

interface CountdownProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const Countdown: React.FC<CountdownProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';
  const [time, setTime] = useState<TimeRemaining>(calculateTimeRemaining(config.weddingDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeRemaining(config.weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.weddingDate]);

  const googleCalUrl = getGoogleCalendarUrl(config, isAr);

  return (
    <section className="py-16 sm:py-24 bg-[#F3EFE7] border-y border-[#A68B67]/25 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        
        {/* Editorial Eyebrow */}
        <div className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold mb-3">
          {isAr ? 'العد التنازلي لليوم الموعود' : 'COUNTDOWN TO OUR SPECIAL DAY'}
        </div>

        <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] mb-12 ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
          {time.isPassed 
            ? (isAr ? 'تم الزفاف بحمد الله وفضله!' : 'The Celebration Has Begun!') 
            : (isAr ? 'نعد الأيام والساعات حتى نلتقي بكم' : 'Counting Every Moment Until We Say I Do')}
        </h2>

        {/* Countdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto mb-12">
          {[
            { label: isAr ? 'يوم' : 'DAYS', value: time.days },
            { label: isAr ? 'ساعة' : 'HOURS', value: time.hours },
            { label: isAr ? 'دقيقة' : 'MINUTES', value: time.minutes },
            { label: isAr ? 'ثانية' : 'SECONDS', value: time.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F9F7F2] border border-[#A68B67]/40 p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-sm hover:border-[#A68B67] transition-all"
            >
              <span className="text-4xl sm:text-6xl font-light font-serif-en text-[#2D2D2D]">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#A68B67] font-semibold mt-3">
                {item.label}
              </span>
              {/* Corner Accents */}
              <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#A68B67]" />
              <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#A68B67]" />
            </div>
          ))}
        </div>

        {/* Calendar Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#A68B67] text-[#2D2D2D] text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#2D2D2D] hover:text-[#F9F7F2] hover:border-[#2D2D2D] transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <Calendar className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'إضافة إلى تقويم جودل' : 'Add to Google Calendar'}</span>
          </a>

          <button
            onClick={() => downloadIcalFile(config, isAr)}
            className="w-full sm:w-auto px-6 py-3.5 bg-white border border-[#A68B67]/40 text-[#2D2D2D] text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#F3EFE7] transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'تحميل ملف التقويم (.ics)' : 'Download .ics Calendar'}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
