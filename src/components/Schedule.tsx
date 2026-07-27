import React from 'react';
import { GlassWater, Sparkles, Utensils, Heart, Music, Clock, MapPin } from 'lucide-react';
import { WeddingConfig } from '../types';

interface ScheduleProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

const getScheduleIcon = (iconName: string) => {
  switch (iconName) {
    case 'GlassWater':
      return <GlassWater className="w-5 h-5 text-[#A68B67]" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-[#A68B67]" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 text-[#A68B67]" />;
    case 'Heart':
      return <Heart className="w-5 h-5 text-[#A68B67]" />;
    case 'Music':
      return <Music className="w-5 h-5 text-[#A68B67]" />;
    default:
      return <Clock className="w-5 h-5 text-[#A68B67]" />;
  }
};

export const Schedule: React.FC<ScheduleProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="schedule" className="py-20 sm:py-28 bg-[#F9F7F2] relative">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'جدول أحداث الفرح' : 'ORDER OF EVENTS'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? 'برنامج السهرة الملكية' : 'Wedding Day Schedule'}
          </h2>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#A68B67]/30 ml-4 rtl:ml-0 rtl:mr-4 pl-6 rtl:pl-0 rtl:pr-6 sm:ml-8 rtl:sm:mr-8 space-y-10">
          {config.scheduleEvents.map((event) => (
            <div key={event.id} className="relative group">
              {/* Bullet Dot */}
              <div className="absolute -left-[35px] rtl:-left-auto rtl:-right-[35px] top-1.5 w-6 h-6 rounded-full bg-[#F9F7F2] border-2 border-[#A68B67] flex items-center justify-center shadow-xs group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#A68B67]" />
              </div>

              <div className="bg-[#F3EFE7] p-6 border border-[#A68B67]/30 shadow-xs hover:border-[#A68B67] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-semibold tracking-widest text-[#A68B67] uppercase">
                    {getScheduleIcon(event.iconName)}
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-[#555]">
                    <MapPin className="w-3.5 h-3.5 text-[#A68B67]" />
                    <span>{isAr ? event.locationAr : event.locationEn}</span>
                  </div>
                </div>

                <h3 className={`text-xl sm:text-2xl font-light text-[#2D2D2D] mb-2 ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isAr ? event.titleAr : event.titleEn}
                </h3>

                <p className={`text-sm sm:text-base text-[#555] leading-relaxed ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isAr ? event.descriptionAr : event.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
