import React, { useState } from 'react';
import { MessageSquareHeart, Heart, Send, Sparkles } from 'lucide-react';
import { Language, GuestWish } from '../types';

interface WishesSectionProps {
  lang: Language;
  wishes: GuestWish[];
  onAddWish: (wish: GuestWish) => void;
  onLikeWish: (wishId: string) => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({
  lang,
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const isAr = lang === 'ar';

  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      authorName: authorName.trim(),
      relationship: relationship.trim() || (isAr ? 'أحد الأحباب' : 'Friend'),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      likesCount: 1,
    };

    onAddWish(newWish);
    setAuthorName('');
    setRelationship('');
    setMessage('');
  };

  return (
    <section id="wishes" className="py-24 bg-[#F3EFE7] border-y border-[#A68B67]/20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold">
            <MessageSquareHeart className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'دفتر التهاني والتباريك' : 'GUESTBOOK & BLESSINGS'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2D2D2D]">
            {isAr ? 'كلمات محبة ودعوات صالحة' : 'Wishes for the Couple'}
          </h2>
          <p className="text-base text-[#555] font-serif italic">
            {isAr ? 'شاركونا تهانيكم وكلماتكم الطيبة لتبقى ذكرى جميلة في دفتر زفافنا' : 'Leave your warm blessings and wishes for Ahmed & Sarah'}
          </p>
        </div>

        {/* 2 Column Layout: Form + Messages Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form */}
          <div className="lg:col-span-5 bg-[#F9F7F2] p-8 border border-[#A68B67]/30 shadow-sm space-y-6 sticky top-24">
            <h3 className="text-xl font-serif text-[#2D2D2D] border-b border-[#A68B67]/20 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A68B67]" />
              <span>{isAr ? 'اكتب تهنئتك للعروسين' : 'Write a Wish'}</span>
            </h3>

            <form onSubmit={handleSubmitWish} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-[0.15em] font-sans text-[#A68B67] font-semibold block mb-1">
                  {isAr ? 'اسمك الكريم *' : 'Your Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={isAr ? 'مثال: أحمد والأسرة' : 'e.g. David & Mary'}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-xs font-sans"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] font-sans text-[#A68B67] font-semibold block mb-1">
                  {isAr ? 'صلة القرابة / الصداقة' : 'Relationship / Role'}
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder={isAr ? 'مثال: أصدقاء العريس / العائلة' : 'e.g. Groom’s College Friend'}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-xs font-sans"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.15em] font-sans text-[#A68B67] font-semibold block mb-1">
                  {isAr ? 'نص التهنئة والدعاء *' : 'Your Blessing Message *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isAr ? 'بارك الله لكما وبارك عليكما وجمع بينكما في خير...' : 'May your marriage be blessed with everlasting joy...'}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 focus:border-[#A68B67] focus:outline-none text-xs font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'نشر التهنئة بالدفتر' : 'Post Your Wish'}</span>
              </button>
            </form>
          </div>

          {/* Wishes Cards Grid */}
          <div className="lg:col-span-7 space-y-6">
            {wishes.length === 0 ? (
              <div className="p-8 text-center bg-[#F9F7F2] border border-[#A68B67]/20 text-[#555] font-serif">
                {isAr ? 'كن أول من يترك تهنئة مباركة للعروسين!' : 'Be the first to write a blessing!'}
              </div>
            ) : (
              wishes.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#F9F7F2] p-6 sm:p-8 border border-[#A68B67]/30 shadow-sm relative group space-y-4 hover:border-[#A68B67] transition-all"
                >
                  <div className="flex items-start justify-between border-b border-[#A68B67]/20 pb-3">
                    <div>
                      <h4 className="text-lg font-serif font-medium text-[#2D2D2D]">
                        {item.authorName}
                      </h4>
                      <span className="text-[11px] font-sans text-[#A68B67] font-semibold tracking-wider uppercase">
                        {item.relationship}
                      </span>
                    </div>

                    <button
                      onClick={() => onLikeWish(item.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F3EFE7] rounded-full text-xs font-sans text-[#A68B67] hover:bg-[#A68B67] hover:text-white transition-all"
                      title={isAr ? 'إعجاب' : 'Like'}
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold">{item.likesCount}</span>
                    </button>
                  </div>

                  <p className="text-sm font-serif italic text-[#333] leading-relaxed">
                    "{item.message}"
                  </p>

                  <div className="text-[10px] font-sans text-[#888] text-right rtl:text-left">
                    {new Date(item.submittedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
