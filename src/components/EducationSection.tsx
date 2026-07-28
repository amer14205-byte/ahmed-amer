import React from 'react';
import { EducationItem } from '../types';
import { GraduationCap, BookOpen, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface EducationSectionProps {
  educationList: EducationItem[];
  lang: 'ar' | 'en';
}

export const EducationSection: React.FC<EducationSectionProps> = ({ educationList, lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="education" className="py-16 md:py-24 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isAr ? 'المؤهلات والدراسات' : 'Academic Credentials'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'التعليم والتأهيل الأكاديمي' : 'Education & Professional Studies'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isAr
              ? 'تجمع الدراسة بين الخلفية القانونية الجامعية العريقة والتقنيات الحديثة في الذكاء الاصطناعي وعلم البيانات.'
              : 'Combining classical legal jurisprudence with modern technical mastery in artificial intelligence and data science.'}
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-slate-700/80 hover:border-blue-500/50 transition-all shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
                  {edu.id === 'edu-1' ? <BookOpen className="w-6 h-6 text-amber-400" /> : <GraduationCap className="w-6 h-6 text-blue-400" />}
                </div>

                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-amber-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{edu.period}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {isAr ? edu.degreeAr : edu.degreeEn}
              </h3>

              <div className="text-sm font-semibold text-blue-400 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-400" />
                <span>{isAr ? edu.institutionAr : edu.institutionEn}</span>
              </div>

              <div className="pt-4 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? edu.locationAr : edu.locationEn}</span>
              </div>

              {/* Special highlight details for each */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-700/40 text-xs text-slate-300 space-y-1.5">
                {edu.id === 'edu-1' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'تحليل البيانات المتقدم واستخراج الأنماط بـ Python & SQL' : 'Advanced Data Analysis & Pattern Mining via Python & SQL'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'تطبيق نماذج الذكاء الاصطناعي على حلول الأعمال والمالية' : 'AI Model applications in finance & administrative analytics'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'دراسة القوانين التجارية، المدنية، والشركات والتأسيس' : 'Comprehensive Commercial, Corporate & Civil Law studies'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{isAr ? 'تأصيل قانوني دقيق لصياغة العقود والتحكيم وفض النزاعات' : 'Specialized contract drafting, arbitration & compliance grounding'}</span>
                    </div>
                  </>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
