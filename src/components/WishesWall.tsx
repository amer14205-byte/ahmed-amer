import React, { useState } from 'react';
import { Heart, ThumbsUp, MessageCirclePlus, Sparkles, Send } from 'lucide-react';
import { GuestWish } from '../types';

interface WishesWallProps {
  lang: 'ar' | 'en';
  wishes: GuestWish[];
  onAddWish: (wish: GuestWish) => void;
  onLikeWish: (id: string) => void;
}

export const WishesWall: React.FC<WishesWallProps> = ({
  lang,
  wishes,
  onAddWish,
  onLikeWish,
}) => {
  const isAr = lang === 'ar';

  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      authorName: authorName.trim(),
      relationship: relationship.trim() || (isAr ? 'صديق العائلة' : 'Family Friend'),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
      likesCount: 1,
    };

    onAddWish(newWish);
    setAuthorName('');
    setRelationship('');
    setMessage('');
    setShowForm(false);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F9F7F2] border-t border-[#A68B67]/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.35em] uppercase font-sans text-[#A68B67] font-semibold block mb-2">
            {isAr ? 'سجل تهاني ومحبة الزوار' : 'GUESTBOOK & WISHES'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-light text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
            {isAr ? 'دفتر تهاني وكلمات المحبة للعروسين' : 'Messages & Blessings'}
          </h2>
          <div className="w-16 h-0.5 bg-[#A68B67] mx-auto mt-4" />

          {/* Toggle Add Wish Form Button */}
          <div className="mt-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-8 py-3.5 bg-[#2D2D2D] text-[#F9F7F2] text-xs uppercase tracking-[0.25em] font-sans hover:bg-[#A68B67] transition-all shadow-sm inline-flex items-center gap-2"
            >
              <MessageCirclePlus className="w-4 h-4 text-[#A68B67]" />
              <span>{showForm ? (isAr ? 'إغلاق النموذج' : 'Close Form') : (isAr ? 'إضافة تهنئة جديدة' : 'Leave a Blessing')}</span>
            </button>
          </div>
        </div>

        {/* New Wish Form Collapse */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-[#F3EFE7] p-8 border border-[#A68B67]/30 shadow-md mb-12 space-y-5 animate-fade-in"
          >
            <h3 className="text-sm font-semibold tracking-widest text-[#2D2D2D] uppercase border-b border-[#A68B67]/20 pb-2">
              {isAr ? 'اكتب تهنئتك للعروسين' : 'Write Your Blessing'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder={isAr ? 'اسمك الكريم' : 'Your Name'}
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#A68B67]/30 text-sm focus:outline-none focus:border-[#A68B67]"
              />

              <input
                type="text"
                placeholder={isAr ? 'صلة القرابة / معرفتك بالعروسين' : 'Relationship (e.g. Cousin, Friend)'}
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#A68B67]/30 text-sm focus:outline-none focus:border-[#A68B67]"
              />
            </div>

            <textarea
              rows={3}
              required
              placeholder={isAr ? 'رسالتك الجميلة للعروسين...' : 'Your message to the couple...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#A68B67]/30 text-sm focus:outline-none focus:border-[#A68B67]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#2D2D2D] text-[#F9F7F2] text-xs uppercase tracking-[0.2em] font-sans hover:bg-[#A68B67] transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#A68B67]" />
              <span>{isAr ? 'نشر التهنئة في السجل' : 'Publish Blessing'}</span>
            </button>
          </form>
        )}

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="bg-[#F3EFE7] p-6 border border-[#A68B67]/30 shadow-xs flex flex-col justify-between hover:border-[#A68B67] transition-all relative"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`text-lg font-medium text-[#2D2D2D] ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                      {w.authorName}
                    </h4>
                    <span className="text-[11px] text-[#A68B67] font-semibold tracking-wider uppercase block">
                      {w.relationship}
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#A68B67]" />
                </div>

                <p className={`text-sm text-[#444] leading-relaxed italic ${isAr ? 'font-serif-ar' : 'font-serif-en'}`}>
                  "{w.message}"
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#A68B67]/20 flex justify-between items-center text-xs text-[#777]">
                <span>
                  {new Date(w.submittedAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>

                <button
                  onClick={() => onLikeWish(w.id)}
                  className="flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded bg-white border border-[#A68B67]/30 text-[#2D2D2D] hover:bg-[#A68B67] hover:text-white transition-all text-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-current text-[#A68B67]" />
                  <span>{w.likesCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
