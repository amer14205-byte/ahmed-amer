import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface StorySectionProps {
  lang: Language;
  config: WeddingConfig;
}

export const StorySection: React.FC<StorySectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';

  return (
    <section id="story" className="py-24 bg-[#F3EFE7] border-y border-[#A68B67]/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <Heart className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'حكايتنا والرحلة' : 'OUR LOVE STORY'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {isAr ? 'رحلة حب تنبض بالوفاء' : 'How It All Began'}
          </h2>
          <p className="text-base text-[#555] font-serif italic">
            {isAr ? 'محطات شكلت حكايتنا حتى نصل لهذه الليلة المباركة' : 'Key moments that brought us closer together'}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {config.storyMilestones.map((milestone, idx) => (
            <div 
              key={milestone.id}
              className="bg-[#F9F7F2] border border-[#A68B67]/30 p-6 flex flex-col justify-between group hover:border-[#A68B67] transition-all shadow-sm relative"
            >
              <div className="space-y-4">
                
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-[#EFECE6] relative">
                  <img
                    src={milestone.imageUrl}
                    alt={isAr ? milestone.titleAr : milestone.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#2D2D2D]/90 text-[#F9F7F2] px-3 py-1 text-xs font-sans tracking-widest uppercase">
                    {milestone.year}
                  </div>
                </div>

                {/* Milestone Details */}
                <div>
                  <h3 className="text-xl font-serif font-medium text-[#2D2D2D] mb-2">
                    {isAr ? milestone.titleAr : milestone.titleEn}
                  </h3>
                  <p className="text-xs font-sans text-[#666] leading-relaxed">
                    {isAr ? milestone.descriptionAr : milestone.descriptionEn}
                  </p>
                </div>

              </div>

              <div className="pt-4 mt-4 border-t border-[#A68B67]/20 text-[10px] uppercase tracking-[0.2em] text-[#A68B67] font-semibold flex items-center justify-between">
                <span>{isAr ? `محطة 0${idx + 1}` : `CHAPTER 0${idx + 1}`}</span>
                <Sparkles className="w-3 h-3 text-[#A68B67]" />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
