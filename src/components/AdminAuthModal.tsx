import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, X, ShieldAlert, Check, Eye, EyeOff, ShieldCheck, Timer } from 'lucide-react';
import { hashText } from '../utils/security';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: () => void;
  lang: 'ar' | 'en';
  currentPassword: string;
  onPasswordChange?: (newPass: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  lang,
  currentPassword,
  onPasswordChange,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [successChangeMsg, setSuccessChangeMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let interval: any;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    setIsVerifying(true);
    try {
      const inputHash = await hashText(passwordInput);
      const targetHash = currentPassword.length === 64 ? currentPassword : await hashText(currentPassword);

      if (inputHash === targetHash) {
        setErrorMsg('');
        setPasswordInput('');
        setFailedAttempts(0);
        onAuthenticate();
        onClose();
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);

        if (nextAttempts >= 4) {
          setLockoutTimer(30);
          setErrorMsg(
            isAr
              ? 'تم تجاوز عدد المحاولات المسموحة! تم قفل الدخول مؤقتاً لمدة 30 ثانية لدواعي الأمان.'
              : 'Too many failed attempts! Admin login locked for 30 seconds for security.'
          );
        } else {
          setErrorMsg(
            isAr
              ? `كلمة السر غير صحيحة! (محاولة ${nextAttempts} من 4)`
              : `Incorrect password! (Attempt ${nextAttempts} of 4)`
          );
        }
      }
    } catch (err) {
      console.error('Password hash error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 3) {
      setErrorMsg(
        isAr ? 'كلمة السر الجديدة يجب أن تكون 3 أحرف/أرقام على الأقل' : 'Password must be at least 3 characters'
      );
      return;
    }

    if (onPasswordChange) {
      onPasswordChange(newPassword.trim());
      setSuccessChangeMsg(
        isAr ? 'تم تحديث كلمة السر بنجاح!' : 'Password updated successfully!'
      );
      setNewPassword('');
      setIsChangingPass(false);
      setErrorMsg('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{isAr ? 'التحقق من هوية صاحب الملف' : 'Admin Security Verification'}</span>
              </h3>
              <p className="text-xs text-amber-400/80">
                {isAr ? 'حماية إضافة وتعديل الخبرات بكلمة سر' : 'Password protected administration'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 text-right rtl:text-right ltr:text-left">
          {successChangeMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successChangeMsg}</span>
            </div>
          )}

          {!isChangingPass ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'أدخل كلمة السر الخاصة بك لتسجيل الدخول كأدمن:' : 'Enter your password to unlock admin access:'}
                </label>
                
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    disabled={lockoutTimer > 0 || isVerifying}
                    placeholder={
                      lockoutTimer > 0
                        ? isAr
                          ? `مقفل مؤقتاً (${lockoutTimer} ثانية)`
                          : `Locked (${lockoutTimer}s)`
                        : isAr
                        ? 'أدخل كلمة السر الخاصة بك'
                        : 'Enter your password'
                    }
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-10 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3.5 rtl:left-3 rtl:right-auto ltr:right-3 ltr:left-auto text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {lockoutTimer > 0 && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-2">
                  <Timer className="w-4 h-4 shrink-0 animate-spin" />
                  <span>
                    {isAr
                      ? `يرجى الانتظار ${lockoutTimer} ثانية حتى تتمكن من تجربة كلمة السر مجدداً`
                      : `Please wait ${lockoutTimer} seconds to try again`}
                  </span>
                </div>
              )}

              {errorMsg && lockoutTimer === 0 && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-semibold">{isAr ? 'حماية مشفرة: ' : 'Encrypted Protection: '}</span>
                  {isAr
                    ? 'يتم فحص كلمة السر بتشفير SHA-256 لحماية ملفك تماماً من التغيير أو التعديل من قبل الزوار.'
                    : 'Password validated with SHA-256 encryption to prevent unauthorized changes.'}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPass(true);
                    setErrorMsg('');
                  }}
                  className="text-xs text-amber-400 hover:underline cursor-pointer"
                >
                  {isAr ? 'تغيير كلمة السر؟' : 'Change Password?'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={lockoutTimer > 0 || isVerifying}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isVerifying
                      ? isAr ? 'جاري التحقق...' : 'Verifying...'
                      : isAr ? 'تأكيد الدخول' : 'Unlock Admin'}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'تعيين كلمة سر جديدة:' : 'Set New Admin Password:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'اكتب كلمة السر الجديدة' : 'Type new password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/90 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsChangingPass(false)}
                  className="text-xs text-slate-400 hover:underline cursor-pointer"
                >
                  {isAr ? 'إلغاء وتراجع' : 'Back'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  {isAr ? 'حفظ كلمة السر الجديدة' : 'Save New Password'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
