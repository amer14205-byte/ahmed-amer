import React, { useState } from 'react';
import { Gift, Copy, Check, Plane, Coffee, Home, CreditCard } from 'lucide-react';
import { WeddingConfig } from '../types';

interface GiftRegistryProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const GiftRegistry: React.FC<GiftRegistryProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="registry" className="py-20 sm:py-28 bg-[#F3EFE7] border-t border-[#A68B67]/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'صندوق الهدايا وشهر العسل' : 'GIFT REGISTRY & HONEYMOON FUND'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? 'حضوركم أسمى هديتنا، وإن أحببتم مشاركتنا فرحتنا' : 'Your Presence is Our Greatest Gift'}
          </h2>
          <p className="max-w-xl mx-auto text-sm text-[#555] mt-2">
            {isAr 
              ? 'وجودكم في ليلتنا هو أثمن هدية لنا. وإذا رغبتم في إهدائنا لمساهمة في رحلة العمر، يسعدنا ذلك بكل امتنان.'
              : 'If you wish to honor us with a gift, a contribution towards our honeymoon and new beginning would be deeply appreciated.'}
          </p>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />
        </div>

        {/* Registry Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.registryItems.map((item) => {
            const hasProgress = item.targetAmount && item.currentAmount;
            const percentage = hasProgress ? Math.min(100, Math.round((item.currentAmount! / item.targetAmount!) * 100)) : 0;

            return (
              <div
                key={item.id}
                className="bg-[#F9F7F2] border border-[#A68B67]/30 p-6 flex flex-col justify-between shadow-xs hover:border-[#A68B67] transition-all"
              >
                <div className="space-y-4">
                  {/* Photo if available */}
                  {item.imageUrl && (
                    <div className="aspect-16/9 overflow-hidden border border-[#A68B67]/20">
                      <img
                        src={item.imageUrl}
                        alt={isAr ? item.titleAr : item.titleEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#A68B67] font-semibold block">
                    {isAr ? item.categoryAr : item.categoryEn}
                  </span>

                  <h3 className={`text-xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <p className="text-xs text-[#555] leading-relaxed">
                    {isAr ? item.paymentDetailsAr : item.paymentDetailsEn}
                  </p>

                  {/* Progress bar */}
                  {hasProgress && (
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs text-[#777]">
                        <span>{isAr ? 'المساهمات' : 'Fund Progress'}</span>
                        <span className="font-semibold text-[#A68B67]">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F3EFE7] rounded-full overflow-hidden border border-[#A68B67]/20">
                        <div
                          className="h-full bg-[#A68B67] transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Account / InstaPay Details Box */}
                {item.accountNumber && (
                  <div className="mt-6 pt-4 border-t border-[#A68B67]/20 flex items-center justify-between bg-[#F3EFE7] p-3 border border-[#A68B67]/20">
                    <div className="text-xs font-mono text-[#2D2D2D] truncate max-w-[200px]">
                      {item.accountNumber}
                    </div>

                    <button
                      onClick={() => handleCopy(item.accountNumber!, item.id)}
                      className="px-3 py-1.5 bg-[#2D2D2D] text-[#F9F7F2] text-[10px] uppercase tracking-wider font-sans hover:bg-[#A68B67] transition-all flex items-center gap-1 shrink-0"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{isAr ? 'تم النسخ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#A68B67]" />
                          <span>{isAr ? 'نسخ الحساب' : 'Copy'}</span>
                        </>
                      )}
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
