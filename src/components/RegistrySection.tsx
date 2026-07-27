import React, { useState } from 'react';
import { Gift, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface RegistrySectionProps {
  lang: Language;
  config: WeddingConfig;
}

export const RegistrySection: React.FC<RegistrySectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAccount = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <section id="registry" className="py-24 bg-[#F9F7F2] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <Gift className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'صندوق الهدايا وشهر العسل' : 'GIFT REGISTRY & HONEYMOON FUND'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {isAr ? 'شاركونا صناعة ذكريات العمر' : 'Honeymoon & Home Registry'}
          </h2>
          <p className="text-base text-[#555] font-serif italic leading-relaxed">
            {isAr 
              ? 'حضوركم ووجودكم بيننا هو أغلى هدية في ليلتنا، وإن رغبتم في إهدائنا فإليكم التفاصيل أدناه' 
              : 'Your presence is our greatest gift. Should you wish to honor us with a gift, details are below.'}
          </p>
        </div>

        {/* Registry Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.registryItems.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <div 
                key={item.id}
                className="bg-[#F3EFE7] p-8 border border-[#A68B67]/30 flex flex-col justify-between space-y-6 hover:border-[#A68B67] transition-all shadow-sm group"
              >
                <div className="space-y-4">
                  {item.imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden bg-[#EFECE6] mb-4">
                      <img 
                        src={item.imageUrl} 
                        alt={isAr ? item.titleAr : item.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  )}

                  <span className="text-[10px] uppercase tracking-[0.25em] font-sans text-[#A68B67] font-semibold block">
                    {isAr ? item.categoryAr : item.categoryEn}
                  </span>

                  <h3 className="text-xl font-serif text-[#2D2D2D]">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-xs font-sans text-[#555] leading-relaxed">
                    {isAr ? item.paymentDetailsAr : item.paymentDetailsEn}
                  </p>
                </div>

                {/* Account details & Copy button */}
                {item.accountNumber && (
                  <div className="pt-4 border-t border-[#A68B67]/20 space-y-3">
                    <div className="p-3 bg-white border border-[#A68B67]/20 text-center font-mono text-xs text-[#2D2D2D] truncate">
                      {item.accountNumber}
                    </div>

                    <button
                      onClick={() => handleCopyAccount(item.id, item.accountNumber)}
                      className="w-full py-2.5 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all flex items-center justify-center gap-2"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>
                        {isCopied 
                          ? (isAr ? 'تم نسخ الحساب!' : 'Copied!') 
                          : (isAr ? 'نسخ الحساب / إنستاباي' : 'Copy Account Info')}
                      </span>
                    </button>
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
