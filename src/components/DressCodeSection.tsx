import React from 'react';
import { Shirt, Sparkles } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface DressCodeSectionProps {
  lang: Language;
  config: WeddingConfig;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 bg-[#F3EFE7] border-y border-[#A68B67]/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <Shirt className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'قواعد الملابس والزي' : 'DRESS CODE & PALETTE'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#2D2D2D]">
            {isAr ? config.dressCodeTitleAr : config.dressCodeTitleEn}
          </h2>
          <p className="text-sm sm:text-base text-[#555] font-serif max-w-2xl mx-auto leading-relaxed">
            {isAr ? config.dressCodeDescAr : config.dressCodeDescEn}
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#A68B67] font-semibold block">
            {isAr ? 'لوحة الألوان المقترحة للضيوف' : 'RECOMMENDED COLOR PALETTE'}
          </span>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-2">
            {config.dressCodeColors.map((color, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div 
                  className="w-12 h-12 rounded-full border border-black/10 shadow-sm group-hover:scale-110 transition-transform duration-300 relative flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  <Sparkles className="w-4 h-4 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[11px] font-sans text-[#2D2D2D] font-medium">
                  {isAr ? color.nameAr : color.nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
