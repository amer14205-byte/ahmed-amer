import React from 'react';
import { SkillCategory } from '../types';
import { Award, Scale, CircleDollarSign, Database, Building2, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
  lang: 'ar' | 'en';
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories, lang }) => {
  const isAr = lang === 'ar';

  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale':
        return <Scale className="w-6 h-6 text-amber-400" />;
      case 'CircleDollarSign':
        return <CircleDollarSign className="w-6 h-6 text-emerald-400" />;
      case 'Database':
        return <Database className="w-6 h-6 text-blue-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-indigo-400" />;
      default:
        return <Award className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>{isAr ? 'المهارات والكفاءات' : 'Core Competences'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'مجالات الخبرة والأدوات التقنية' : 'Skills & Technical Capabilities'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isAr
              ? 'مزيج فريد من المعرفة القانونية، التحليل المالي، إدارة العمليات، والحلول التقنية والبرمجية.'
              : 'A powerful mix of legal jurisprudence, financial mastery, operations management, and analytical tech tools.'}
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition-all shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {isAr ? cat.titleAr : cat.titleEn}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {isAr ? 'مهارات مثبتة عملياً' : 'Proven Professional Mastery'}
                  </span>
                </div>
              </div>

              {/* Skills list pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(isAr ? cat.skillsAr : cat.skillsEn).map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-2.5 hover:border-amber-500/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Software & Technical Tools Quick Bar */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-slate-800 via-blue-950/40 to-slate-800 border border-blue-500/30 text-center space-y-4">
          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
            {isAr ? 'الأنظمة والبرامج التكنولوجية المُتقنة' : 'Mastered Software Systems & Tools'}
          </h4>

          <div className="flex flex-wrap justify-center gap-3">
            {['Python', 'SQL', 'Power BI', 'Oracle ERP', 'MS Excel (Advanced)', 'MS Word', 'MS PowerPoint', 'MS Outlook'].map((tool, tIdx) => (
              <span
                key={tIdx}
                className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-slate-900/50"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
