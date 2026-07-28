import React from 'react';
import { PersonalInfo } from '../types';
import { ArrowUp, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  personalInfo: PersonalInfo;
  lang: 'ar' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ personalInfo, lang }) => {
  const isAr = lang === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Brand */}
          <div className="flex items-center gap-3 text-center md:text-right rtl:md:text-right ltr:md:text-left">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center font-bold text-white text-base shadow-md">
              AA
            </div>
            <div>
              <span className="font-bold text-white text-base block">
                {isAr ? personalInfo.nameAr : personalInfo.nameEn}
              </span>
              <span className="text-xs text-slate-400">
                {isAr ? 'مدير إداري | مستشار قانوني ومالي | أخصائي بيانات' : 'Administrative Manager & Legal / Financial Specialist'}
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 font-medium text-slate-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">
              {isAr ? 'عنّي' : 'About'}
            </a>
            <a href="#experience" className="hover:text-amber-400 transition-colors">
              {isAr ? 'الخبرات' : 'Experience'}
            </a>
            <a href="#education" className="hover:text-amber-400 transition-colors">
              {isAr ? 'المؤهلات' : 'Education'}
            </a>
            <a href="#skills" className="hover:text-amber-400 transition-colors">
              {isAr ? 'المهارات' : 'Skills'}
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">
              {isAr ? 'التواصل' : 'Contact'}
            </a>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-2"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'للأعلى' : 'Top'}</span>
          </button>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
          <p className="text-slate-500">
            © {new Date().getFullYear()} {isAr ? personalInfo.nameAr : personalInfo.nameEn}. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>

          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isAr ? 'البورتفوليو المهني الرسمي' : 'Official Professional Portfolio'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
