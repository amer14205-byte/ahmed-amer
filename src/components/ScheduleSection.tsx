import React from 'react';
import { Clock, Sparkles, GlassWater, Utensils, Heart, Music } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface ScheduleSectionProps {
  lang: Language;
  config: WeddingConfig;
}

const getEventIcon = (iconName: string) => {
  switch (iconName) {
    case 'GlassWater': return <GlassWater className="w-5 h-5 text-[#A68B67]" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#A68B67]" />;
    case 'Utensils': return <Utensils className="w-5 h-5 text-[#A68B67]" />;
    case 'Heart': return <Heart className="w-5 h-5 text-[#A68B67]" />;
    case 'Music': return <Music className="w-5 h-5 text-[#A68B67]" />;
    default: return <Clock className="w-5 h-5 text-[#A68B67]" />;
  }
};

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';

  return (
    <section id="schedule" className="py-24 bg-[#F9F7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <Clock className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'برنامج الفرح والأوقات' : 'THE CELEBRATION SCHEDULE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {isAr ? 'جدول الفقرات والتوقيتات' : 'Order of Events'}
          </h2>
          <p className="text-base text-[#555] font-serif italic">
            {isAr ? 'برنامج الحفل لتشاركونا كل لحظة جميلة' : 'Everything planned for an unforgettable evening'}
          </p>
        </div>

        {/* Schedule List */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-translate-x-1/2 before:w-px before:bg-[#A68B67]/30">
          
          {config.scheduleEvents.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Event Card */}
                <div className="w-full md:w-[calc(50%-2rem)] bg-[#F3EFE7] p-6 sm:p-8 border border-[#A68B67]/30 shadow-sm hover:border-[#A68B67] transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#2D2D2D] text-[#F9F7F2] text-xs font-sans tracking-widest uppercase">
                      {item.time}
                    </span>
                    <div className="p-2 bg-white rounded-full border border-[#A68B67]/30">
                      {getEventIcon(item.iconName)}
                    </div>
                  </div>

                  <h3 className="text-xl font-serif text-[#2D2D2D]">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-xs font-sans text-[#A68B67] font-semibold tracking-wider uppercase">
                    📍 {isAr ? item.locationAr : item.locationEn}
                  </p>

                  <p className="text-xs font-sans text-[#555] leading-relaxed">
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>

                {/* Timeline Node Badge */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#2D2D2D] text-[#F9F7F2] border-2 border-[#A68B67] items-center justify-center text-xs font-sans font-bold shadow-sm">
                  {idx + 1}
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
