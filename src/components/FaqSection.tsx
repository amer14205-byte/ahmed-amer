import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { WeddingConfig } from '../types';

interface FaqSectionProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] border-t border-[#A68B67]/20 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'الأسئلة الشائعة والمعلومات' : 'FREQUENTLY ASKED QUESTIONS'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? 'كل ما تود معرفته عن ليلتنا' : 'Questions & Essential Info'}
          </h2>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {config.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F3EFE7] border border-[#A68B67]/30 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left rtl:text-right flex justify-between items-center gap-4 hover:bg-[#A68B67]/10 transition-colors"
                >
                  <span className={`text-lg sm:text-xl font-medium text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                    {isAr ? faq.questionAr : faq.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A68B67] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#A68B67]/20 text-sm sm:text-base text-[#555] leading-relaxed animate-fade-in">
                    <p className={isAr ? 'font-serif-ar' : 'font-serif-en'}>
                      {isAr ? faq.answerAr : faq.answerEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
