import React from 'react';
import { MapPin, Navigation, Car, ShieldCheck, Compass } from 'lucide-react';
import { WeddingConfig } from '../types';

interface VenueDetailsProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
}

export const VenueDetails: React.FC<VenueDetailsProps> = ({ config, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="venue" className="py-20 sm:py-28 bg-[#F3EFE7] border-t border-[#A68B67]/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'موقع الفرح والقاعة' : 'THE VENUE & LOCATION'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? config.venueNameAr : config.venueNameEn}
          </h2>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Venue Image Showcase */}
          <div className="lg:col-span-7">
            <div className="relative border-2 border-[#A68B67]/40 p-2 bg-[#F9F7F2] shadow-sm">
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src="/src/assets/images/city_mark_hotel_1785220146208.jpg"
                  alt="City Mark Hotel Ballroom"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                  <div>
                    <span className="text-xs tracking-widest uppercase font-sans text-[#E8D2C9]">
                      {isAr ? 'القاعة الملكية الكبرى' : 'GRAND BALLROOM'}
                    </span>
                    <h4 className="text-lg font-serif-en font-light text-white">
                      {isAr ? config.venueNameAr : config.venueNameEn}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Venue Information & Map Link */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F9F7F2] p-8 border border-[#A68B67]/30 shadow-xs space-y-6">
              
              <div className="space-y-2">
                <div className="text-xs tracking-[0.3em] uppercase text-[#A68B67] font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#A68B67]" />
                  <span>{isAr ? 'العنوان المباشر' : 'VENUE ADDRESS'}</span>
                </div>
                <p className={`text-lg text-[#2D2D2D] leading-relaxed ${isAr ? 'font-serif-ar font-medium' : 'font-serif-en'}`}>
                  {isAr ? config.venueAddressAr : config.venueAddressEn}
                </p>
              </div>

              <div className="w-full h-px bg-[#A68B67]/20" />

              {/* Parking & Valet Note */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-semibold text-[#2D2D2D]">
                  <Car className="w-4 h-4 text-[#A68B67]" />
                  <span>{isAr ? 'خدمة الفاليه ومواقف السيارات' : 'Valet & Parking Services'}</span>
                </div>
                <p className={`text-sm text-[#555] leading-relaxed ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                  {isAr 
                    ? 'يتوفر موقف سيارات واسع بداخل الدار بالإضافة لخدمة الفاليه (Valet Parking) المجانية لراحتكم عند المدخل الرئيسي.' 
                    : 'Complementary valet service and direct covered parking are available at the main palace entrance.'}
                </p>
              </div>

              {/* Navigation Action Button */}
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 px-6 py-3.5 bg-[#2D2D2D] text-[#F9F7F2] text-xs uppercase tracking-[0.25em] font-sans hover:bg-[#A68B67] transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#A68B67]" />
                <span>{isAr ? 'فتح الخريطة على خرائط جوجل' : 'Open Google Maps Directions'}</span>
              </a>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
