import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SkillCategory } from '../types';
import { Award, Scale, CircleDollarSign, Database, Building2, CheckCircle2, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkillsSectionProps {
  categories: SkillCategory[];
  lang: 'ar' | 'en';
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories, lang }) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'overall' | 'tech' | 'legalFinance'>('overall');

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

  const radarDataOverall = [
    {
      subject: isAr ? 'الشؤون القانونية' : 'Legal & Compliance',
      mastery: 95,
      experience: 90,
      fullMark: 100,
    },
    {
      subject: isAr ? 'التحليل المالي' : 'Financial Analysis',
      mastery: 92,
      experience: 88,
      fullMark: 100,
    },
    {
      subject: isAr ? 'علوم البيانات والـ SQL' : 'Data Science & SQL',
      mastery: 88,
      experience: 82,
      fullMark: 100,
    },
    {
      subject: isAr ? 'برمجة بايثون' : 'Python & AI Tools',
      mastery: 85,
      experience: 80,
      fullMark: 100,
    },
    {
      subject: isAr ? 'الإدارة والقيادة' : 'Operations Leadership',
      mastery: 94,
      experience: 95,
      fullMark: 100,
    },
    {
      subject: isAr ? 'أنظمة Oracle & ERP' : 'Oracle & ERP Systems',
      mastery: 96,
      experience: 92,
      fullMark: 100,
    },
  ];

  const radarDataTech = [
    {
      subject: isAr ? 'بايثون (Python)' : 'Python Language',
      mastery: 88,
      experience: 85,
      fullMark: 100,
    },
    {
      subject: isAr ? 'قواعد بيانات SQL' : 'SQL Databases',
      mastery: 90,
      experience: 88,
      fullMark: 100,
    },
    {
      subject: isAr ? 'لوحات Power BI' : 'Power BI Dashboards',
      mastery: 86,
      experience: 82,
      fullMark: 100,
    },
    {
      subject: isAr ? 'أنظمة Oracle ERP' : 'Oracle ERP',
      mastery: 95,
      experience: 92,
      fullMark: 100,
    },
    {
      subject: isAr ? 'إكسيل متقدم' : 'Advanced Excel',
      mastery: 98,
      experience: 96,
      fullMark: 100,
    },
    {
      subject: isAr ? 'تحليل البيانات' : 'Data Analytics',
      mastery: 87,
      experience: 84,
      fullMark: 100,
    },
  ];

  const radarDataLegalFinance = [
    {
      subject: isAr ? 'صياغة العقود' : 'Contract Drafting',
      mastery: 96,
      experience: 94,
      fullMark: 100,
    },
    {
      subject: isAr ? 'تأسيس الشركات' : 'Company Formation',
      mastery: 92,
      experience: 90,
      fullMark: 100,
    },
    {
      subject: isAr ? 'الميزانيات والتكاليف' : 'Budgeting & Costs',
      mastery: 94,
      experience: 92,
      fullMark: 100,
    },
    {
      subject: isAr ? 'الإقرارات الضريبية' : 'Tax Preparation',
      mastery: 90,
      experience: 88,
      fullMark: 100,
    },
    {
      subject: isAr ? 'فض النزاعات' : 'Dispute Resolution',
      mastery: 93,
      experience: 89,
      fullMark: 100,
    },
    {
      subject: isAr ? 'المناقصات والتسويات' : 'Tenders & Settlement',
      mastery: 95,
      experience: 93,
      fullMark: 100,
    },
  ];

  const currentChartData =
    activeTab === 'tech'
      ? radarDataTech
      : activeTab === 'legalFinance'
      ? radarDataLegalFinance
      : radarDataOverall;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-amber-500/40 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl text-xs sm:text-sm space-y-1.5 min-w-[170px]">
          <p className="font-bold text-white border-b border-slate-700/80 pb-1">
            {data.subject}
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-400 font-medium">{isAr ? 'الإتقان الفني:' : 'Technical Mastery:'}</span>
            <span className="font-extrabold text-white">{data.mastery}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-blue-400 font-medium">{isAr ? 'الخبرة الميدانية:' : 'Field Experience:'}</span>
            <span className="font-extrabold text-white">{data.experience}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="skills" className="py-16 md:py-24 bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
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
        </motion.div>

        {/* Radar Chart Proficiency Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700/60">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                <BarChart3 className="w-4 h-4" />
                <span>{isAr ? 'مخطط رادار الكفاءات الفنية (Technical Proficiency Radar)' : 'Technical Proficiency Radar Chart'}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                {isAr
                  ? 'رسم بياني تفاعلي يوضح توازن مهارات أحمد عامر بين الشؤون القانونية، المالية، وإدارة البيانات والتكنولوجيا'
                  : 'Interactive visual radar illustrating balanced mastery across legal, finance, and data technologies'}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80 shrink-0 text-xs">
              <button
                onClick={() => setActiveTab('overall')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeTab === 'overall'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'المجالات الرئيسية' : 'Core Domains'}
              </button>
              <button
                onClick={() => setActiveTab('tech')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeTab === 'tech'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'أدوات التكنولوجيا' : 'Tech & Data'}
              </button>
              <button
                onClick={() => setActiveTab('legalFinance')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeTab === 'legalFinance'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'القانون والمالية' : 'Legal & Finance'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Recharts Radar Container */}
            <div className="lg:col-span-8 h-[340px] sm:h-[380px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={currentChartData}>
                  <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Radar
                    name={isAr ? 'الإتقان الفني' : 'Technical Mastery'}
                    dataKey="mastery"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.35}
                  />
                  <Radar
                    name={isAr ? 'الخبرة العملية' : 'Field Experience'}
                    dataKey="experience"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.25}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Side Legend & Stats */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? 'دليل الرسم البياني' : 'Chart Legend & Indicators'}</span>
                </h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-amber-500/30">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                      <span className="font-bold text-slate-200">{isAr ? 'مستوى الإتقان الفني' : 'Technical Mastery'}</span>
                    </div>
                    <span className="font-extrabold text-amber-400">90%+</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/80 border border-blue-500/30">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                      <span className="font-bold text-slate-200">{isAr ? 'الخبرة الميدانية التطبيقية' : 'Field Experience'}</span>
                    </div>
                    <span className="font-extrabold text-blue-400">85%+</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{isAr ? 'القيمة المضافة للمؤسسة' : 'Organizational Value'}</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  {isAr
                    ? 'يجمع أحمد عامر بين الرؤية القانونية الدقيقة، الضبط المالي الصارم، مع طاقات عالية في علوم البيانات والأنظمة الرقمية.'
                    : 'Combines legal precision with financial rigor and cutting-edge data science capabilities.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
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

            </motion.div>
          ))}
        </div>

        {/* Software & Technical Tools Quick Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-slate-800 via-blue-950/40 to-slate-800 border border-blue-500/30 text-center space-y-4"
        >
          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
            {isAr ? 'الأنظمة والبرامج التكنولوجية المُتقنة' : 'Mastered Software Systems & Tools'}
          </h4>

          <div className="flex flex-wrap justify-center gap-3">
            {['Python', 'SQL', 'Power BI', 'Oracle ERP', 'MS Excel (Advanced)', 'MS Word', 'MS PowerPoint', 'MS Outlook'].map((tool, tIdx) => (
              <span
                key={tIdx}
                className="px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-slate-900/50 hover:border-amber-500/40 transition-all"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};


