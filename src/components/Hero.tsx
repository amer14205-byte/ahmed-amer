import React from 'react';
import { PersonalInfo } from '../types';
import { Phone, Mail, MapPin, Briefcase, PlusCircle, CheckCircle2, ShieldCheck, Database, Scale, Calculator, ArrowRight, ArrowLeft, Share2 } from 'lucide-react';
import profilePhoto from '../assets/images/ahmed_amer_profile_1785237337468.jpg';

interface HeroProps {
  personalInfo: PersonalInfo;
  lang: 'ar' | 'en';
  onOpenAddJob: () => void;
  onSharePortfolio: () => void;
  experienceCount: number;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo, lang, onOpenAddJob, onSharePortfolio, experienceCount }) => {
  const isAr = lang === 'ar';

  return (
    <section id="about" className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-slate-900 border-b border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-right rtl:lg:text-right ltr:lg:text-left">
            {/* Top status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'مدير إداري ومستشار قانوني ومالي متمرس' : 'Experienced Admin Manager & Legal/Finance Specialist'}</span>
            </div>

            {/* Main Name */}
            <div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {isAr ? personalInfo.nameAr : personalInfo.nameEn}
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-amber-400">
                {isAr ? personalInfo.titleAr : personalInfo.titleEn}
              </p>
            </div>

            {/* Profile summary paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {isAr ? personalInfo.profileAr : personalInfo.profileEn}
            </p>

            {/* Special Callout Box for New Job */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-800/90 to-blue-950/40 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-right rtl:text-right ltr:text-left">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? 'جاهز لإضافة وظيفتك الجديدة في ملفك' : 'Ready to add your new job to your portfolio'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isAr
                      ? 'اضغط هنا لكتابة اسم الشركة وتفاصيل عملك الجديد ليتم تضمينها مباشرة'
                      : 'Click to enter your new company name & job role to feature it on top.'}
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenAddJob}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isAr ? 'إضافة العمل الجديد الآن' : 'Add New Role Now'}</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-2.5 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'ليسانس حقوق (حقوق حلوان)' : 'LL.B. Law (Helwan)'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-400" />
                <span>{isAr ? 'ذكاء اصطناعي وعلم بيانات (Machinfy)' : 'AI & Data Science (Machinfy)'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'محاسبة وتحليل مالي' : 'Finance & Accounting'}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{isAr ? 'إدارة عقود ومخاطر' : 'Contracts & Risk Mgt'}</span>
              </span>
            </div>

            {/* Contact links */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onSharePortfolio}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-400 border border-amber-500/40 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                title={isAr ? 'نسخ رابط السيرة الذاتية ومشاركتها' : 'Copy and share portfolio link'}
              >
                <Share2 className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'مشاركة رابط الملف' : 'Share Portfolio'}</span>
              </button>

              <a
                href={`tel:${personalInfo.phone}`}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`https://wa.me/2${personalInfo.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isAr ? 'واتساب مباشر' : 'Direct WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl relative">
              <div className="space-y-6">
                
                {/* Header Profile Avatar/Icon */}
                <div className="text-center pb-4 border-b border-slate-700/80">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-amber-500 via-blue-600 to-amber-400 p-1 mx-auto shadow-2xl shadow-amber-500/10 overflow-hidden relative group">
                    <img
                      src={profilePhoto}
                      alt={isAr ? personalInfo.nameAr : personalInfo.nameEn}
                      className="w-full h-full object-cover rounded-[14px] transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="mt-3 font-bold text-lg text-white">
                    {isAr ? personalInfo.nameAr : personalInfo.nameEn}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center justify-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? personalInfo.locationAr : personalInfo.locationEn}</span>
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                    <div className="text-2xl font-extrabold text-amber-400">+8</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {isAr ? 'سنوات خبرة متراكمة' : 'Years Experience'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60">
                    <div className="text-2xl font-extrabold text-blue-400">{experienceCount}</div>
                    <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                      {isAr ? 'وظائف وشركات' : 'Key Roles Managed'}
                    </div>
                  </div>
                </div>

                {/* Core Pillars */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    {isAr ? 'محاور التخصص الرئيسية' : 'Core Expertise Pillars'}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isAr ? 'إدارة التكاليف والميزانيات والفواتير' : 'Cost Control, Budgeting & Invoicing'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isAr ? 'صياغة العقود وتأسيس الشركات والامتثال' : 'Contract Drafting & Corporate Law'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isAr ? 'علوم البيانات وبايثون و Power BI' : 'Python, SQL & Power BI Analytics'}</span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => {
                    const el = document.getElementById('contact');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>{isAr ? 'تواصل معي مباشرة' : 'Get In Touch'}</span>
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
