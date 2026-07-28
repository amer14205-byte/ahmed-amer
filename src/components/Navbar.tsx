import React from 'react';
import { Briefcase, User, GraduationCap, Award, Phone, Languages, PlusCircle, Share2, Lock, Unlock } from 'lucide-react';

interface NavbarProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
  onOpenAddJob: () => void;
  onSharePortfolio: () => void;
  isAdminAuthorized?: boolean;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onOpenAddJob,
  onSharePortfolio,
  isAdminAuthorized = false,
  onOpenAuthModal,
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-blue-600 to-indigo-600 flex items-center justify-center font-extrabold text-base shadow-lg shadow-amber-500/20 text-white shrink-0 border border-slate-700/50">
            AA
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg block tracking-tight">
              {isAr ? 'أحمد عامر أحمد' : 'Ahmed Amer Ahmed'}
            </span>
            <span className="text-xs text-blue-400 font-medium hidden sm:block">
              {isAr ? 'مدير إداري | مستشار قانوني ومالي' : 'Administrative Manager & Legal Consultant'}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'عنّي' : 'About'}</span>
          </a>
          <a href="#experience" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'الخبرات' : 'Experience'}</span>
          </a>
          <a href="#education" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'المؤهلات' : 'Education'}</span>
          </a>
          <a href="#skills" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <Award className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'المهارات' : 'Skills'}</span>
          </a>
          <a href="#contact" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-blue-400" />
            <span>{isAr ? 'التواصل' : 'Contact'}</span>
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Lock status button */}
          {onOpenAuthModal && (
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isAdminAuthorized
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40 shadow-sm'
                  : 'bg-amber-950/40 text-amber-400 border-amber-500/30 hover:bg-amber-900/60'
              }`}
              title={
                isAdminAuthorized
                  ? isAr ? 'وضع الأدمن مفعل (انقر للإغلاق)' : 'Admin Mode Unlocked'
                  : isAr ? 'دخول صاحب الملف (كلمة السر)' : 'Admin Login (Password)'
              }
            >
              {isAdminAuthorized ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">{isAr ? 'صاحب الملف' : 'Admin'}</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{isAr ? 'كلمة السر' : 'Admin Lock'}</span>
                </>
              )}
            </button>
          )}

          {/* Share Portfolio button */}
          <button
            onClick={onSharePortfolio}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 border border-slate-700 shadow-sm transition-all cursor-pointer"
            title={isAr ? 'مشاركة رابط الملف الشخصي' : 'Share Portfolio link'}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'مشاركة الملف' : 'Share'}</span>
          </button>

          {/* Add Job button */}
          <button
            onClick={onOpenAddJob}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            title={isAr ? 'إضافة عمل جديد لملفك' : 'Add new job to your profile'}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isAr ? 'إضافة عمل جديد' : 'Add New Job'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center gap-1.5 text-xs font-semibold"
            title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Languages className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
