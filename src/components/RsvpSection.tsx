import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Check, Send, Users, Utensils, Music, HeartHandshake } from 'lucide-react';
import { Language, RsvpRecord } from '../types';

interface RsvpSectionProps {
  lang: Language;
  onAddRsvp: (newRsvp: RsvpRecord) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ lang, onAddRsvp }) => {
  const isAr = lang === 'ar';

  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [plusOnes, setPlusOnes] = useState<number>(1);
  const [mealPreference, setMealPreference] = useState<'beef' | 'chicken' | 'vegetarian' | 'seafood' | 'none'>('beef');
  const [songRequest, setSongRequest] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const record: RsvpRecord = {
      id: Date.now().toString(),
      guestName: guestName.trim(),
      phone: phone.trim(),
      attendance,
      plusOnes: attendance === 'attending' ? plusOnes : 0,
      mealPreference: attendance === 'attending' ? mealPreference : 'none',
      songRequest: songRequest.trim(),
      specialNote: specialNote.trim(),
      submittedAt: new Date().toISOString(),
    };

    onAddRsvp(record);
    setIsSubmitted(true);

    if (attendance === 'attending') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#A68B67', '#2D2D2D', '#F9F7F2'],
      });
    }
  };

  return (
    <section id="rsvp" className="py-24 bg-[#F9F7F2] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <Calendar className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'تأكيد الحضور والاعتذار' : 'KINDLY CONFIRM YOUR PRESENCE'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {isAr ? 'تأكيد الحضور (RSVP)' : 'RSVP Form'}
          </h2>
          <p className="text-base text-[#555] font-serif italic">
            {isAr ? 'يسعدنا تأكيد حضوركم قبل يوم 25 سبتمبر 2026 لتجهيز مقعدكم بحب' : 'Please respond before September 25, 2026'}
          </p>
        </div>

        {/* Success Confirmation Card */}
        {isSubmitted ? (
          <div className="bg-[#F3EFE7] p-8 sm:p-12 border border-[#A68B67] text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-[#A68B67] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2D2D2D]">
              {attendance === 'attending' 
                ? (isAr ? `شكراً لك يا ${guestName}! ننتظر رؤيتك بفارغ الصبر.` : `Thank you ${guestName}! We can’t wait to celebrate with you.`)
                : (isAr ? `تم استلام ردك يا ${guestName}. سنفتقد وجودك معنا!` : `Thank you ${guestName}. We will miss you!`)}
            </h3>
            <p className="text-sm font-sans text-[#555] max-w-md mx-auto">
              {isAr 
                ? 'تم تسجيل بيانات حضوركم بنجاح في القائمة الرسمية للضيوف.' 
                : 'Your response has been registered in the official guest list.'}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] text-xs font-sans uppercase tracking-widest transition-all"
            >
              {isAr ? 'تعديل أو إرسال تأكيد آخر' : 'Submit Another Response'}
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="bg-[#F3EFE7] p-8 sm:p-12 border border-[#A68B67]/30 shadow-sm space-y-8">
            
            {/* Attendance Choice */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] block">
                {isAr ? '1. موقف الحضور' : '1. Attendance Status'}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttendance('attending')}
                  className={`p-4 border text-center font-serif text-lg transition-all ${
                    attendance === 'attending' 
                      ? 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D] shadow-sm' 
                      : 'bg-white text-[#2D2D2D] border-[#A68B67]/30 hover:border-[#A68B67]'
                  }`}
                >
                  {isAr ? 'يشرفني الحضور بكل سرور 🎉' : 'Joyfully Accept'}
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('declined')}
                  className={`p-4 border text-center font-serif text-lg transition-all ${
                    attendance === 'declined' 
                      ? 'bg-[#2D2D2D] text-[#F9F7F2] border-[#2D2D2D] shadow-sm' 
                      : 'bg-white text-[#2D2D2D] border-[#A68B67]/30 hover:border-[#A68B67]'
                  }`}
                >
                  {isAr ? 'أعتذر عن الحضور للأسف 💔' : 'Regretfully Decline'}
                </button>
              </div>
            </div>

            {/* Guest Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] block">
                  {isAr ? '2. الاسم الثلاثي الكرم *' : '2. Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={isAr ? 'مثال: د. محمد أحمد الكردي' : 'e.g. Mr. John Doe'}
                  className="w-full p-3.5 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-sm font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] block">
                  {isAr ? 'رقم الموبايل / واتساب' : 'Mobile / WhatsApp Number'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full p-3.5 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-sm font-sans"
                />
              </div>
            </div>

            {/* Number of Guests & Meals (Only if attending) */}
            {attendance === 'attending' && (
              <div className="space-y-6 pt-4 border-t border-[#A68B67]/20">
                
                {/* Plus ones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] flex items-center gap-2">
                      <Users className="w-3.5 h-3.5" />
                      <span>{isAr ? '3. عدد المرافقين إجمالاً' : '3. Total Guests Attending'}</span>
                    </label>
                    <select
                      value={plusOnes}
                      onChange={(e) => setPlusOnes(Number(e.target.value))}
                      className="w-full p-3.5 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-sm font-sans"
                    >
                      <option value={1}>{isAr ? 'فرد واحد (أنا فقط)' : '1 Person (Just Me)'}</option>
                      <option value={2}>{isAr ? 'فردين (2)' : '2 Persons'}</option>
                      <option value={3}>{isAr ? '3 أفراد' : '3 Persons'}</option>
                      <option value={4}>{isAr ? '4 أفراد' : '4 Persons'}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] flex items-center gap-2">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تفضيلات العشاء' : 'Meal Preference'}</span>
                    </label>
                    <select
                      value={mealPreference}
                      onChange={(e) => setMealPreference(e.target.value as any)}
                      className="w-full p-3.5 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-sm font-sans"
                    >
                      <option value="beef">{isAr ? 'لحوم ملكية فاخرة (Beef)' : 'Gourmet Beef'}</option>
                      <option value="chicken">{isAr ? 'دجاج محشي فاخر (Chicken)' : 'Stuffed Chicken'}</option>
                      <option value="seafood">{isAr ? 'مأكولات بحرية (Seafood)' : 'Seafood Selection'}</option>
                      <option value="vegetarian">{isAr ? 'وجبة نباتية (Vegetarian)' : 'Vegetarian Special'}</option>
                    </select>
                  </div>
                </div>

                {/* Song Request */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] flex items-center gap-2">
                    <Music className="w-3.5 h-3.5" />
                    <span>{isAr ? 'اقترح أغنية تحب سماعها في الفرح 🎵' : 'Song Request for the DJ'}</span>
                  </label>
                  <input
                    type="text"
                    value={songRequest}
                    onChange={(e) => setSongRequest(e.target.value)}
                    placeholder={isAr ? 'اسم الأغنية والفنان...' : 'Song name & artist...'}
                    className="w-full p-3.5 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-sm font-sans"
                  />
                </div>

              </div>
            )}

            {/* Blessing Note */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#A68B67] flex items-center gap-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{isAr ? 'كلمة أو تهنئة خاصة للعروسين' : 'Personal Blessing / Note'}</span>
              </label>
              <textarea
                rows={3}
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder={isAr ? 'اكتب تمنياتك القلبية للعروسين هنا...' : 'Write your wishes for the couple...'}
                className="w-full p-3.5 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-sm font-sans"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال تأكيد الحضور الآن' : 'Submit RSVP Response'}</span>
            </button>

          </form>
        )}

      </div>
    </section>
  );
};
