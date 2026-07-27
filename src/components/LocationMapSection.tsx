import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Phone, ExternalLink, Compass } from 'lucide-react';
import { Language, WeddingConfig } from '../types';

interface LocationMapSectionProps {
  lang: Language;
  config: WeddingConfig;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ lang, config }) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);

  const fullAddress = isAr ? `${config.venueNameAr} - ${config.venueAddressAr}` : `${config.venueNameEn} - ${config.venueAddressEn}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Extract or convert map embed URL safely
  const mapQuery = encodeURIComponent(`${config.venueNameEn}, ${config.venueAddressEn}`);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const wazeUrl = `https://waze.com/ul?q=${mapQuery}`;

  return (
    <section id="location" className="py-24 bg-[#F9F7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <MapPin className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'مكان وموعد الحفل' : 'VENUE & LOCATION'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {isAr ? 'تفاصيل الموقع والخريطة' : 'How to Get There'}
          </h2>
          <p className="text-base text-[#555] font-serif italic">
            {isAr 
              ? 'يسعدنا استقبالكم في القاعة الرئيسية لقصر السرايا. خريطة التوجه ومواقف السيارات بالأسفل.' 
              : 'We look forward to welcoming you at our celebration. Map and directions are provided below.'}
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-[#F3EFE7] p-8 sm:p-10 border border-[#A68B67]/30 flex flex-col justify-between space-y-8 relative">
            <div className="space-y-6">
              
              <div className="border-b border-[#A68B67]/20 pb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#A68B67] font-semibold block mb-2">
                  {isAr ? 'اسم القاعة والفندق' : 'VENUE NAME'}
                </span>
                <h3 className="text-2xl font-serif text-[#2D2D2D]">
                  {isAr ? config.venueNameAr : config.venueNameEn}
                </h3>
              </div>

              <div className="border-b border-[#A68B67]/20 pb-6">
                <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#A68B67] font-semibold block mb-2">
                  {isAr ? 'العنوان التفصيلي' : 'FULL ADDRESS'}
                </span>
                <p className="text-base font-sans text-[#555] leading-relaxed">
                  {isAr ? config.venueAddressAr : config.venueAddressEn}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-sans text-[#A68B67] font-semibold block mb-2">
                  {isAr ? 'خدمات الضيوف والباركينج' : 'GUEST AMENITIES & PARKING'}
                </span>
                <ul className="text-xs font-sans text-[#555] space-y-2 list-disc list-inside">
                  <li>{isAr ? 'خدمة الفاليه وموقف سيارات مجاني مغطى' : 'Complementary Valet & Covered Parking'}</li>
                  <li>{isAr ? 'مدخل مهيأ للكراسي المتحركة وكبار السن' : 'Wheelchair Accessible Entrance'}</li>
                  <li>{isAr ? 'قاعة مكيفة بالكامل مع شاشات وعرض حي' : 'Fully Air-conditioned Ballroom & Terrace'}</li>
                </ul>
              </div>

            </div>

            {/* Quick Location Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#A68B67]/20">
              <div className="flex flex-wrap gap-3">
                <a
                  href={config.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] px-4 py-3 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] font-sans text-xs uppercase tracking-[0.15em] font-medium transition-all text-center flex items-center justify-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{isAr ? 'خرائط جوجل' : 'Google Maps'}</span>
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] px-4 py-3 bg-[#F9F7F2] text-[#2D2D2D] border border-[#A68B67]/40 hover:border-[#A68B67] font-sans text-xs uppercase tracking-[0.15em] font-medium transition-all text-center flex items-center justify-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#A68B67]" />
                  <span>Waze</span>
                </a>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyAddress}
                  className="w-full py-2.5 px-4 bg-white/80 border border-[#A68B67]/30 hover:border-[#A68B67] text-[#2D2D2D] font-sans text-xs font-medium tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#A68B67]" />}
                  <span>
                    {copied 
                      ? (isAr ? 'تم نسخ العنوان بنجاح!' : 'Address Copied!') 
                      : (isAr ? 'نسخ العنوان بالكامل' : 'Copy Full Address')}
                  </span>
                </button>
              </div>

              {config.contactPhone && (
                <div className="text-center pt-2">
                  <a 
                    href={`tel:${config.contactPhone}`}
                    className="inline-flex items-center gap-2 text-xs font-sans text-[#A68B67] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{isAr ? `للاستفسار والتواصل: ${config.contactPhone}` : `Inquiries: ${config.contactPhone}`}</span>
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Right Embedded Google Map */}
          <div className="lg:col-span-7 bg-[#EFECE6] border border-[#A68B67]/30 min-h-[400px] lg:min-h-[500px] relative overflow-hidden shadow-inner group">
            <iframe
              title="Wedding Venue Location Map"
              src={mapEmbedUrl}
              className="w-full h-full min-h-[420px] border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div className="absolute top-4 right-4 bg-[#F9F7F2]/95 backdrop-blur-md px-4 py-2 border border-[#A68B67]/30 text-xs font-sans text-[#2D2D2D] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isAr ? 'خريطة تفاعلية مباشرة' : 'Interactive Map Preview'}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
