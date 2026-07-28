import React, { useState } from 'react';
import { PersonalInfo } from '../types';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle, Clock } from 'lucide-react';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
  lang: 'ar' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personalInfo, lang }) => {
  const isAr = lang === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSentSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');

    setTimeout(() => {
      setSentSuccess(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{isAr ? 'التواصل المباشر' : 'Get In Touch'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? 'تواصل معي مباشرة' : 'Contact Ahmed Amer'}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isAr
              ? 'أرحب بالتواصل بشأن الفرص الوظيفية الإدارية والقانونية والمالية والاستشارية.'
              : 'Open for full-time executive opportunities, legal & financial consultancies, and operational leadership roles.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone */}
            <a
              href={`tel:${personalInfo.phone}`}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/60 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  {isAr ? 'الهاتف المباشر' : 'Phone Number'}
                </span>
                <span className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {personalInfo.phone}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/60 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                </span>
                <span className="text-base font-bold text-white group-hover:text-amber-400 transition-colors break-all">
                  {personalInfo.email}
                </span>
              </div>
            </a>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/2${personalInfo.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/60 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  {isAr ? 'محادثة واتساب فورية' : 'WhatsApp Chat'}
                </span>
                <span className="text-base font-bold text-emerald-400 group-hover:underline">
                  {isAr ? 'اضغط لبدء المحادثة الان' : 'Start WhatsApp Chat'}
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/40 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-indigo-400 border border-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 block uppercase">
                  {isAr ? 'الموقع والسكن' : 'Location'}
                </span>
                <span className="text-sm font-semibold text-slate-200">
                  {isAr ? personalInfo.locationAr : personalInfo.locationEn}
                </span>
              </div>
            </div>

          </div>

          {/* Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span>{isAr ? 'أرسل لي رسالة مباشرة' : 'Send Direct Message'}</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {isAr
                  ? 'يرجى كتابة تفاصيل الاستفسار أو عرض العمل وسيتم الرد فور استلام الرسالة.'
                  : 'Leave your contact details and message below.'}
              </p>

              {sentSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    {isAr
                      ? 'تم إرسال رسالتك بنجاح! شكراً لتواصلك، سأقوم بالرد عليك في أقرب وقت.'
                      : 'Your message has been sent successfully! Thank you for reaching out.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'الاسم بالكامل *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isAr ? 'أدخل اسمك الكريم' : 'Enter your name'}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      {isAr ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={isAr ? 'مثال: 01000000000' : 'e.g., 01000000000'}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {isAr ? 'نص الرسالة أو تفاصيل الفرصة *' : 'Message or Job Details *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={isAr ? 'اكتب تفاصيل الاستفسار أو عرض العمل هنا...' : 'Write message details here...'}
                    className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال الرسالة الان' : 'Send Message Now'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
