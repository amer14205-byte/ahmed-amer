import React from 'react';
import { WeddingConfig } from '../types';
import { Sparkles, Calendar } from 'lucide-react';

interface StoryTimelineProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#F3EFE7] border-t border-[#A68B67]/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'حكايتنا وحبنا' : 'OUR JOURNEY & LOVE STORY'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? 'محطات حافلة بالحب والذكريات' : 'How Our Story Unfolded'}
          </h2>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />
        </div>

        {/* Milestones Vertical Cards */}
        <div className="space-y-12 sm:space-y-16">
          {config.storyMilestones.map((m, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={m.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F9F7F2] p-6 sm:p-10 border border-[#A68B67]/30 shadow-xs relative`}
              >
                {/* Year Badge */}
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-[#2D2D2D] text-[#F9F7F2] px-3.5 py-1 text-xs font-serif-en tracking-widest uppercase">
                  {m.year}
                </div>

                {/* Photo Side */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative overflow-hidden border border-[#A68B67]/40 aspect-4/3 group">
                    <img
                      src={m.imageUrl}
                      alt={isAr ? m.titleAr : m.titleEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Details Side */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-center space-y-3`}>
                  <div className="text-xs tracking-[0.3em] uppercase text-[#A68B67] font-semibold flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{m.year}</span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                    {isAr ? m.titleAr : m.titleEn}
                  </h3>

                  <p className={`text-base leading-relaxed text-[#555] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                    {isAr ? m.descriptionAr : m.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
