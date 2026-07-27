import React from 'react';
import { Shirt, Sparkles, Check } from 'lucide-react';
import { WeddingConfig } from '../types';

interface DressCodeProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const DressCode: React.FC<DressCodeProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="dresscode" className="py-20 sm:py-28 bg-[#F9F7F2] relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        {/* Eyebrow */}
        <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
          {isAr ? 'قواعد الأناقة والملابس' : 'GUEST ATTIRE GUIDE'}
        </span>

        <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] mb-4 ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
          {isAr ? config.dressCodeTitleAr : config.dressCodeTitleEn}
        </h2>

        <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mb-8" />

        <p className={`max-w-2xl mx-auto text-base sm:text-lg text-[#555] leading-relaxed mb-12 ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
          {isAr ? config.dressCodeDescAr : config.dressCodeDescEn}
        </p>

        {/* Color Palette Swatches Grid */}
        <div className="bg-[#F3EFE7] p-8 sm:p-12 border border-[#A68B67]/30 max-w-4xl mx-auto shadow-xs">
          <h3 className="text-xs tracking-[0.3em] uppercase font-sans text-[#A68B67] font-semibold mb-8">
            {isAr ? 'لوحة الألوان المقترحة (COLOR PALETTE)' : 'RECOMMENDED COLOR PALETTE'}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
            {config.dressCodeColors.map((color, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3 group">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                </div>
                <span className={`text-xs sm:text-sm text-[#2D2D2D] font-medium ${isAr ? 'font-sans-ar' : 'font-sans'}`}>
                  {isAr ? color.nameAr : color.nameEn}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#A68B67]/20 flex flex-col sm:flex-row justify-center items-center gap-6 text-xs text-[#555]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Check className="w-4 h-4 text-[#A68B67]" />
              <span>{isAr ? 'السادة: بدل رسمية / توكسيدو' : 'Gentlemen: Suits or Tuxedos'}</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Check className="w-4 h-4 text-[#A68B67]" />
              <span>{isAr ? 'السيدات: فساتين سهرة راقية' : 'Ladies: Formal Evening Gowns'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
