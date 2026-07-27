import React from 'react';
import { Heart } from 'lucide-react';
import { WeddingConfig } from '../types';

interface QuranQuoteProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const QuranQuote: React.FC<QuranQuoteProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-20 bg-[#F9F7F2] text-[#2D2D2D] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Subtle Decorative Floral/Monogram Ornament */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F3EFE7] border border-[#A68B67] flex items-center justify-center text-[#A68B67]">
            <Heart className="w-5 h-5 fill-[#A68B67]/20" />
          </div>
        </div>

        {/* Verse Container with Editorial Golden Hairline Framing */}
        <div className="p-8 sm:p-14 border-2 border-[#A68B67]/30 bg-white/60 relative">
          {/* Top Left & Bottom Right Double Border Accents */}
          <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#A68B67]/20 pointer-events-none" />

          <p className="text-2xl sm:text-4xl leading-relaxed text-[#2D2D2D] font-serif-ar mb-6 font-bold">
            "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً"
          </p>

          <p className="text-xs uppercase tracking-[0.3em] font-sans text-[#A68B67] font-semibold">
            {isAr ? 'سورة الروم - الآية ٢١' : 'SURAH AR-RUM - VERSE 21'}
          </p>

          <div className="w-24 h-px bg-[#A68B67]/40 mx-auto my-6" />

          <p className="text-sm sm:text-base italic text-[#555] max-w-2xl mx-auto font-serif-en">
            "And among His signs is that He created for you spouses from among yourselves so that you may find tranquility in them, and He placed between you affection and mercy."
          </p>
        </div>
      </div>
    </section>
  );
};
