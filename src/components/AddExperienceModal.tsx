import React, { useState } from 'react';
import { X, Briefcase, Building, Calendar, CheckCircle2, Plus, Sparkles } from 'lucide-react';
import { AddJobFormData } from '../types';
import { sanitizeInput } from '../utils/security';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AddJobFormData) => void;
  lang: 'ar' | 'en';
}

export const AddExperienceModal: React.FC<AddExperienceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';

  const [companyAr, setCompanyAr] = useState('');
  const [companyEn, setCompanyEn] = useState('');
  const [titleAr, setTitleAr] = useState('مدير إداري / أخصائي');
  const [titleEn, setTitleEn] = useState('Administrative Manager / Specialist');
  const [period, setPeriod] = useState('2025 - الحاضر');
  const [responsibilitiesAr, setResponsibilitiesAr] = useState('');
  const [responsibilitiesEn, setResponsibilitiesEn] = useState('');
  const [isCurrent, setIsCurrent] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyAr.trim() && !companyEn.trim()) {
      alert(isAr ? 'يرجى كتابة اسم الشركة الجديدة' : 'Please enter the company name');
      return;
    }

    onSave({
      companyAr: sanitizeInput(companyAr.trim() || companyEn.trim()),
      companyEn: sanitizeInput(companyEn.trim() || companyAr.trim()),
      titleAr: sanitizeInput(titleAr.trim() || titleEn.trim()),
      titleEn: sanitizeInput(titleEn.trim() || titleAr.trim()),
      period: sanitizeInput(period.trim() || '2025 - Present'),
      responsibilitiesAr: sanitizeInput(responsibilitiesAr.trim()),
      responsibilitiesEn: sanitizeInput(responsibilitiesEn.trim()),
      isCurrent,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative my-8">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900/60 via-slate-800 to-slate-900 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{isAr ? 'إضافة عملك/شركتك الجديدة' : 'Add New Job & Company'}</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'قم بإدخال اسم الشركة ومسمى عملك الجديد لتظهر في أعلى قائمة الخبرات'
                  : 'Enter your new company name and details to display at the top.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-right rtl:text-right ltr:text-left">
          
          {/* Company Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'اسم الشركة الجديدة (بالعربي) *' : 'Company Name (Arabic) *'}
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute right-3 top-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'مثال: شركة الأهلي للمشاريع' : 'e.g., Al Ahly Contracting Co.'}
                  value={companyAr}
                  onChange={(e) => setCompanyAr(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'اسم الشركة (بالإنجليزي)' : 'Company Name (English)'}
              </label>
              <input
                type="text"
                placeholder="e.g., Al Ahly Enterprises"
                value={companyEn}
                onChange={(e) => setCompanyEn(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Job Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'المسمى الوظيفي (بالعربي) *' : 'Job Title (Arabic) *'}
              </label>
              <input
                type="text"
                required
                placeholder={isAr ? 'مثال: مدير عام إداري وقانوني' : 'e.g., General Admin Manager'}
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'المسمى الوظيفي (بالإنجليزي)' : 'Job Title (English)'}
              </label>
              <input
                type="text"
                placeholder="e.g., General Administrative Manager"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>

          {/* Period and IsCurrent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isAr ? 'فترة العمل (من - إلى)' : 'Employment Period'}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto pointer-events-none" />
                <input
                  type="text"
                  placeholder="2025 - Present"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700/60 rounded-xl">
              <input
                type="checkbox"
                id="isCurrentCheck"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-700"
              />
              <label htmlFor="isCurrentCheck" className="text-xs font-semibold text-amber-400 cursor-pointer select-none">
                {isAr ? 'عملي الحالي (وظيفة رسمية مستمرة)' : 'Current position (Ongoing)'}
              </label>
            </div>
          </div>

          {/* Responsibilities Arabic */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isAr ? 'أبرز المهام والمسؤوليات (كل مهمة في سطر منفصل)' : 'Key Responsibilities (One per line)'}
            </label>
            <textarea
              rows={4}
              placeholder={
                isAr
                  ? '• إدارة القطاع الإداري والقانوني\n• متابعة العقود والالتزامات المالي\n• تطوير آليات المتابعة والأداء'
                  : '• Managing administrative & legal operations\n• Overseeing budgets and contracts'
              }
              value={responsibilitiesAr}
              onChange={(e) => setResponsibilitiesAr(e.target.value)}
              className="w-full p-3 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'حفظ وإضافة للملف' : 'Save & Add To Experience'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
