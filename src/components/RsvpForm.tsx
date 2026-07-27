import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle, Send, Music, User, Phone, Users, MessageSquare } from 'lucide-react';
import { WeddingConfig, RsvpRecord } from '../types';

interface RsvpFormProps {
  config: WeddingConfig;
  lang: 'ar' | 'en';
  onAddRsvp: (record: RsvpRecord) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ config, lang, onAddRsvp }) => {
  const isAr = lang === 'ar';

  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [plusOnes, setPlusOnes] = useState<number>(1);
  const [songRequest, setSongRequest] = useState('');
  const [specialNote, setSpecialNote] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newRecord: RsvpRecord = {
      id: Date.now().toString(),
      guestName: guestName.trim(),
      phone: phone.trim(),
      attendance,
      plusOnes: attendance === 'attending' ? plusOnes : 0,
      songRequest: songRequest.trim(),
      specialNote: specialNote.trim(),
      submittedAt: new Date().toISOString(),
    };

    onAddRsvp(newRecord);
    setIsSubmitted(true);

    // Trigger romantic confetti effect
    if (attendance === 'attending') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#A68B67', '#D4AF37', '#E8D2C9', '#344E41'],
      });
    }
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 bg-[#F3EFE7] border-t border-[#A68B67]/25 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'تأكيد الحضور والاعتذار' : 'KINDLY RESPOND'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? 'يسعدنا تأكيد حضوركم الشريف' : 'R.S.V.P.'}
          </h2>
          <p className="text-xs tracking-[0.2em] uppercase font-sans text-[#555] mt-2">
            {isAr ? 'يرجى الرد قبل ٢٥ سبتمبر ٢٠٢٦' : 'Please respond before September 25, 2026'}
          </p>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />
        </div>

        {/* Success Card */}
        {isSubmitted ? (
          <div className="bg-[#F9F7F2] border-2 border-[#A68B67] p-10 text-center shadow-md animate-fade-in space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#A68B67] text-white flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className={`text-2xl sm:text-3xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
              {attendance === 'attending'
                ? (isAr ? 'شكراً جزيلاً! تم تأكيد حضوركم بنجاح' : 'Thank You! Your Attendance is Confirmed')
                : (isAr ? 'شكراً لردك اللطيف! سنشتاق لرؤيتكم' : 'Thank you for responding!')}
            </h3>

            <p className={`text-base text-[#555] max-w-lg mx-auto ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
              {attendance === 'attending'
                ? (isAr 
                    ? `عزيزنا/عزيزتنا (${guestName})، يسعدنا جداً حضوركم ومشاركتكم فرحتنا الميمونة. سننتظركم بحب!` 
                    : `Dear ${guestName}, we are overjoyed to celebrate with you on our special day!`)
                : (isAr 
                    ? `قدر الله وما شاء فعل، نتمنى لكم كل الخير ونشكركم على دعواتكم المحبة.` 
                    : `We are sorry you cannot make it, but thank you for your warm wishes!`)}
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 border border-[#A68B67] text-xs uppercase tracking-widest text-[#2D2D2D] hover:bg-[#A68B67] hover:text-white transition-all"
            >
              {isAr ? 'تعديل أو إرسال رد جديد' : 'Submit Another Response'}
            </button>
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#F9F7F2] p-8 sm:p-12 border border-[#A68B67]/30 shadow-sm space-y-8 relative"
          >
            {/* Top Frame Accents */}
            <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#A68B67]/15 pointer-events-none" />

            {/* Attendance Toggle Buttons */}
            <div className="space-y-3">
              <label className="text-xs tracking-[0.25em] uppercase font-sans text-[#A68B67] font-semibold block">
                {isAr ? 'هل ستشاركونا الفرحة؟ *' : 'Will You Attend? *'}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={`p-4 border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    attendance === 'attending'
                      ? 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D] shadow-sm'
                      : 'bg-white border-[#A68B67]/30 text-[#2D2D2D] hover:bg-[#F3EFE7]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${attendance === 'attending' ? 'fill-current text-[#A68B67]' : ''}`} />
                  <span>{isAr ? 'أكيد، يشرفني الحضور بكل حب! 🎉' : 'Joyfully Accept'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('declined')}
                  className={`p-4 border text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    attendance === 'declined'
                      ? 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D] shadow-sm'
                      : 'bg-white border-[#A68B67]/30 text-[#2D2D2D] hover:bg-[#F3EFE7]'
                  }`}
                >
                  <span>{isAr ? 'أعتذر لظروف طارئة 💔' : 'Regretfully Decline'}</span>
                </button>
              </div>
            </div>

            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{isAr ? 'اسم الضيف الكريم / الكريمة *' : 'Full Name *'}</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAr ? 'مثال: محمد أحمد الكردي' : 'e.g. Sarah Smith'}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#A68B67]/30 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#A68B67] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.2em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'رقم الموبايل / الواتساب *' : 'Phone / WhatsApp *'}</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder={isAr ? '01001234567' : '+20 100 123 4567'}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#A68B67]/30 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#A68B67] transition-colors"
                />
              </div>
            </div>

            {/* Additional Attending Options */}
            {attendance === 'attending' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Plus Ones count */}
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{isAr ? 'عدد الأفراد مع حضرتكم' : 'Number of Guests (Plus Ones)'}</span>
                  </label>
                  <select
                    value={plusOnes}
                    onChange={(e) => setPlusOnes(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white border border-[#A68B67]/30 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#A68B67]"
                  >
                    <option value={1}>{isAr ? 'شخص واحد (أنا فقط)' : 'Just Me (1)'}</option>
                    <option value={2}>{isAr ? 'شخصان (أنا ومرافق)' : '2 Guests'}</option>
                    <option value={3}>{isAr ? '٣ أشخاص' : '3 Guests'}</option>
                    <option value={4}>{isAr ? '٤ أشخاص' : '4 Guests'}</option>
                  </select>
                </div>

                {/* Song Request */}
                <div className="space-y-2">
                  <label className="text-xs tracking-[0.2em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5" />
                    <span>{isAr ? 'أغنية تحب تسمعها وترقص عليها بالفرح؟' : 'Song Request for the DJ'}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'اسم الأغنية أو المطرب المفضَّل' : 'Song title or artist'}
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#A68B67]/30 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#A68B67]"
                  />
                </div>
              </div>
            )}

            {/* Special Wish / Blessing */}
            <div className="space-y-2">
              <label className="text-xs tracking-[0.2em] uppercase font-sans text-[#A68B67] font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isAr ? 'تهنئة أو كلمة للعروسين' : 'Warm Wishes for Groom & Bride'}</span>
              </label>
              <textarea
                rows={3}
                placeholder={isAr ? 'اكتب دعوة مباركة أو كلمة ن نابعة من القلب...' : 'Write your blessings or special note...'}
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#A68B67]/30 text-sm text-[#2D2D2D] focus:outline-none focus:border-[#A68B67]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#2D2D2D] text-[#F9F7F2] font-sans text-xs tracking-[0.3em] uppercase hover:bg-[#A68B67] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#A68B67]" />
              <span>{isAr ? 'تأكيد الحضور وإرسال الرد' : 'CONFIRM RSVP RESPONSE'}</span>
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
