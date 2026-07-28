import React, { useState, useEffect, useCallback } from 'react';
import { PERSONAL_INFO, EDUCATION_LIST, INITIAL_EXPERIENCE_LIST, SKILL_CATEGORIES } from './data/portfolioData';
import { ExperienceItem, AddJobFormData } from './types';
import { Check, Lock, Unlock, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useSecurityProtection } from './hooks/useSecurityProtection';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { AddExperienceModal } from './components/AddExperienceModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { Footer } from './components/Footer';

const LOCAL_STORAGE_EXP_KEY = 'ahmed_amer_portfolio_experiences_v4';
const LOCAL_STORAGE_ADMIN_PASS_KEY = 'ahmed_amer_admin_pass_v1';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ADMIN_PASS_KEY);
      if (stored) return stored;
    } catch (e) {
      console.error('Failed to read admin pass:', e);
    }
    return '19981988';
  });

  const [toastConfig, setToastConfig] = useState<{
    show: boolean;
    title: string;
    description: string;
    isSuccess?: boolean;
  }>({
    show: false,
    title: '',
    description: '',
    isSuccess: true,
  });

  // Load stored custom or default experiences
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_EXP_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored experiences:', e);
    }
    return INITIAL_EXPERIENCE_LIST;
  });

  // Sync document language & direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Auto hide toast notification
  useEffect(() => {
    if (toastConfig.show) {
      const timer = setTimeout(() => {
        setToastConfig((prev) => ({ ...prev, show: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastConfig.show]);

  // Trigger Toast
  const triggerToast = useCallback((title: string, description: string, isSuccess = true) => {
    setToastConfig({
      show: true,
      title,
      description,
      isSuccess,
    });
  }, []);

  // Initialize Anti-Scraping & DevTools Protection
  useSecurityProtection({
    enableContextMenuProtection: true,
    enableDevToolsBlocker: true,
    enableImageDragProtection: true,
    onSecurityAlert: useCallback(
      (msg: string) => {
        triggerToast(
          lang === 'ar' ? 'تنبيه الأمان والحماية' : 'Security Alert',
          msg,
          false
        );
      },
      [lang, triggerToast]
    ),
  });

  // Open Add Job handler with security check
  const handleTriggerAddJob = () => {
    if (isAdminAuthorized) {
      setIsAddJobOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  // Admin authenticate handler
  const handleAuthenticateAdmin = () => {
    setIsAdminAuthorized(true);
    setIsAddJobOpen(true);
    triggerToast(
      lang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Admin Mode Unlocked!',
      lang === 'ar' ? 'أهلاً بك يا أستاذ أحمد. يمكنك الآن إضافة وتعديل خبراتك.' : 'Welcome Ahmed! You can now add and edit jobs.'
    );
  };

  // Handle Password change
  const handlePasswordChange = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_PASS_KEY, newPass);
    } catch (e) {
      console.error('Failed to save admin pass:', e);
    }
    triggerToast(
      lang === 'ar' ? 'تم حفظ كلمة السر' : 'Password Saved',
      lang === 'ar' ? 'تم تحديث كلمة السر الخاصة بك كصاحب للملف' : 'Your new admin password has been saved.'
    );
  };

  // Share Portfolio URL handler
  const handleSharePortfolio = () => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => triggerToast(
          lang === 'ar' ? 'تم نسخ الرابط بنجاح!' : 'Copied!',
          lang === 'ar' ? 'تم نسخ رابط السيرة الذاتية إلى الحافظة' : 'Portfolio URL copied to clipboard'
        ))
        .catch(() => fallbackCopyText(url));
    } else {
      fallbackCopyText(url);
    }
  };

  const fallbackCopyText = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      triggerToast(
        lang === 'ar' ? 'تم نسخ الرابط بنجاح!' : 'Copied!',
        lang === 'ar' ? 'تم نسخ رابط السيرة الذاتية إلى الحافظة' : 'Portfolio URL copied to clipboard'
      );
    } catch (e) {
      console.error('Copy failed:', e);
    }
    document.body.removeChild(el);
  };

  // Save experiences to LocalStorage
  const saveExperiences = (newList: ExperienceItem[]) => {
    setExperiences(newList);
    try {
      localStorage.setItem(LOCAL_STORAGE_EXP_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Failed to save experiences:', e);
    }
  };

  // Add new job handler
  const handleSaveNewJob = (formData: AddJobFormData) => {
    const newExp: ExperienceItem = {
      id: `custom-${Date.now()}`,
      titleAr: formData.titleAr,
      titleEn: formData.titleEn,
      companyAr: formData.companyAr,
      companyEn: formData.companyEn,
      period: formData.period,
      responsibilitiesAr: formData.responsibilitiesAr
        ? formData.responsibilitiesAr.split('\n').filter((line) => line.trim().length > 0)
        : ['إدارة المهام والعمليات التنفيذية للشركة الجديد.'],
      responsibilitiesEn: formData.responsibilitiesEn
        ? formData.responsibilitiesEn.split('\n').filter((line) => line.trim().length > 0)
        : ['Managing new corporate administrative operations and team workflow.'],
      isCurrent: formData.isCurrent,
    };

    const updated = [newExp, ...experiences];
    saveExperiences(updated);
  };

  // Delete job handler
  const handleDeleteJob = (id: string) => {
    const updated = experiences.filter((e) => e.id !== id);
    saveExperiences(updated);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        onOpenAddJob={handleTriggerAddJob}
        onSharePortfolio={handleSharePortfolio}
        isAdminAuthorized={isAdminAuthorized}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          personalInfo={PERSONAL_INFO}
          lang={lang}
          onOpenAddJob={handleTriggerAddJob}
          onSharePortfolio={handleSharePortfolio}
          experienceCount={experiences.length}
        />

        <ExperienceSection
          experiences={experiences}
          lang={lang}
          onOpenAddJob={handleTriggerAddJob}
          onDeleteJob={handleDeleteJob}
        />

        <EducationSection
          educationList={EDUCATION_LIST}
          lang={lang}
        />

        <SkillsSection
          categories={SKILL_CATEGORIES}
          lang={lang}
        />

        <ContactSection
          personalInfo={PERSONAL_INFO}
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        personalInfo={PERSONAL_INFO}
        lang={lang}
      />

      {/* Admin Password Verification Modal */}
      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateAdmin}
        lang={lang}
        currentPassword={adminPassword}
        onPasswordChange={handlePasswordChange}
      />

      {/* Add New Job Modal */}
      <AddExperienceModal
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        onSave={handleSaveNewJob}
        lang={lang}
      />

      {/* Toast Notification */}
      {toastConfig.show && (
        <div
          className={`fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-800/95 text-white border shadow-2xl backdrop-blur-md transition-all animate-bounce max-w-sm ${
            toastConfig.isSuccess !== false
              ? 'border-emerald-500/50 shadow-emerald-500/20'
              : 'border-amber-500/50 shadow-amber-500/20'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              toastConfig.isSuccess !== false
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}
          >
            {toastConfig.isSuccess !== false ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5" />
            )}
          </div>
          <div>
            <h5
              className={`text-xs font-bold ${
                toastConfig.isSuccess !== false ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {toastConfig.title}
            </h5>
            <p className="text-xs text-slate-300 mt-0.5">{toastConfig.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
