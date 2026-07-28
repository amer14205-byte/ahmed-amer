import React from 'react';
import { ExperienceItem } from '../types';
import { Briefcase, Building2, Calendar, CheckCircle, PlusCircle, Trash2, Sparkles, ShieldCheck } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  lang: 'ar' | 'en';
  onOpenAddJob: () => void;
  onDeleteJob?: (id: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  lang,
  onOpenAddJob,
  onDeleteJob,
}) => {
  const isAr = lang === 'ar';

  return (
    <section id="experience" className="py-16 md:py-24 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isAr ? 'مسيرة العمل والخبرات' : 'Career Timeline'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isAr ? 'الخبرات المهنية والإدارية' : 'Professional Work Experience'}
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              {isAr
                ? 'سجل التدرج الوظيفي والقيادي في مجالات الإدارة الفعالة، الاستشارات القانونية، التحليل المالي والمقاولات العامة.'
                : 'A rich career path across administrative management, legal advocacy, financial auditing, and corporate compliance.'}
            </p>
          </div>

          <button
            onClick={onOpenAddJob}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isAr ? 'إضافة عمل/شركة جديدة' : 'Add New Role'}</span>
          </button>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8 relative">
          {/* Vertical connecting line for timeline */}
          <div className="hidden lg:block absolute top-6 bottom-6 right-8 rtl:right-8 ltr:left-8 w-0.5 bg-slate-800 pointer-events-none" />

          {experiences.map((exp, idx) => {
            const isCustom = exp.id.startsWith('custom-');

            return (
              <div
                key={exp.id}
                className={`relative p-6 sm:p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.005] ${
                  exp.isCurrent
                    ? 'bg-slate-800/90 border-2 border-amber-500/50 shadow-xl shadow-amber-500/10 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20'
                    : 'bg-slate-800/50 border border-slate-700/80 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10'
                }`}
              >
                {/* Top Badge for Current position or Custom tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.period}</span>
                    </span>

                    {exp.isCurrent && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{isAr ? 'الوظيفة الحالية' : 'Current Role'}</span>
                      </span>
                    )}
                  </div>

                  {isCustom && onDeleteJob && (
                    <button
                      onClick={() => onDeleteJob(exp.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                      title={isAr ? 'حذف هذا العمل' : 'Delete this role'}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{isAr ? 'حذف' : 'Remove'}</span>
                    </button>
                  )}
                </div>

                {/* Main Job Title & Company */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>{isAr ? exp.titleAr : exp.titleEn}</span>
                  </h3>
                  <div className="text-amber-400 font-semibold text-sm sm:text-base flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>{isAr ? exp.companyAr : exp.companyEn}</span>
                  </div>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                    <span>{isAr ? 'أبرز الإنجازات والمهام التفصيلية:' : 'Key Scope & Deliverables:'}</span>
                  </h4>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300 text-xs sm:text-sm">
                    {(isAr ? exp.responsibilitiesAr : exp.responsibilitiesEn).map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-900/90 transition-all duration-200 flex items-start gap-2.5 leading-relaxed"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
