import React, { useState } from 'react';
import { X, Save, RotateCcw, MapPin, Users, Calendar, Sparkles, Download, Check } from 'lucide-react';
import { Language, WeddingConfig, RsvpRecord } from '../types';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  config: WeddingConfig;
  onSaveConfig: (updatedConfig: WeddingConfig) => void;
  rsvps: RsvpRecord[];
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  lang,
  config,
  onSaveConfig,
  rsvps,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'names' | 'location' | 'date' | 'rsvps'>('names');
  const [formData, setFormData] = useState<WeddingConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof WeddingConfig, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const exportRsvpsCsv = () => {
    if (rsvps.length === 0) return;
    const headers = ['Name', 'Phone', 'Attendance', 'Guests Count', 'Meal', 'Song Request', 'Message', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.attendance}"`,
      r.plusOnes,
      `"${r.mealPreference}"`,
      `"${r.songRequest.replace(/"/g, '""')}"`,
      `"${r.specialNote.replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wedding_rsvps_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#F9F7F2] border border-[#A68B67] w-full max-w-4xl shadow-2xl overflow-hidden relative my-8">
        
        {/* Header */}
        <div className="bg-[#2D2D2D] text-[#F9F7F2] p-6 flex items-center justify-between border-b border-[#A68B67]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#A68B67]" />
            <div>
              <h3 className="font-serif text-xl">
                {isAr ? 'تعديل بيانات الدعوة والأسماء واللوكيشن' : 'Edit Invitation Info & Venue'}
              </h3>
              <p className="text-xs font-sans text-[#A68B67] mt-0.5">
                {isAr ? 'يمكنك تعديل أي بيانات هنا لتحديث الموقع والأسماء فوراً' : 'Update groom, bride, map location, and event details'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#A68B67] hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#A68B67]/20 bg-[#F3EFE7] overflow-x-auto text-xs uppercase tracking-wider font-sans font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('names')}
            className={`px-6 py-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'names' 
                ? 'border-[#A68B67] text-[#2D2D2D] bg-[#F9F7F2]' 
                : 'border-transparent text-[#777] hover:text-[#2D2D2D]'
            }`}
          >
            <Users className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? '1. الأسماء والرمز' : '1. Names & Monogram'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`px-6 py-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'location' 
                ? 'border-[#A68B67] text-[#2D2D2D] bg-[#F9F7F2]' 
                : 'border-transparent text-[#777] hover:text-[#2D2D2D]'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? '2. المكان واللوكيشن' : '2. Venue & Location'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('date')}
            className={`px-6 py-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'date' 
                ? 'border-[#A68B67] text-[#2D2D2D] bg-[#F9F7F2]' 
                : 'border-transparent text-[#777] hover:text-[#2D2D2D]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? '3. الموعد والعبارة' : '3. Date & Quote'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rsvps')}
            className={`px-6 py-4 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'rsvps' 
                ? 'border-[#A68B67] text-[#2D2D2D] bg-[#F9F7F2]' 
                : 'border-transparent text-[#777] hover:text-[#2D2D2D]'
            }`}
          >
            <Users className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? `4. الحضور المسجل (${rsvps.length})` : `4. RSVPs List (${rsvps.length})`}</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: Names */}
          {activeTab === 'names' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'اسم العريس بالعربية' : 'Groom Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groomNameAr}
                    onChange={(e) => handleChange('groomNameAr', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'اسم العريس بالإنجليزية' : 'Groom Name (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groomNameEn}
                    onChange={(e) => handleChange('groomNameEn', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'اسم العروس بالعربية' : 'Bride Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideNameAr}
                    onChange={(e) => handleChange('brideNameAr', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'اسم العروس بالإنجليزية' : 'Bride Name (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideNameEn}
                    onChange={(e) => handleChange('brideNameEn', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#A68B67]/20">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'الرمز المختصر (Monogram Logo)' : 'Monogram Logo Text'}
                  </label>
                  <input
                    type="text"
                    value={formData.monogram}
                    onChange={(e) => handleChange('monogram', e.target.value)}
                    placeholder="A & S"
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'رقم موبايل الاستفسارات' : 'Contact Phone Number'}
                  </label>
                  <input
                    type="text"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    placeholder="+20 100 123 4567"
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Location & Venue */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'اسم القاعة/الفندق (عربي)' : 'Venue Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venueNameAr}
                    onChange={(e) => handleChange('venueNameAr', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'اسم القاعة/الفندق (إنجليزية)' : 'Venue Name (English)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.venueNameEn}
                    onChange={(e) => handleChange('venueNameEn', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'العنوان التفصيلي (عربي)' : 'Address (Arabic)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.venueAddressAr}
                    onChange={(e) => handleChange('venueAddressAr', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                    {isAr ? 'العنوان التفصيلي (إنجليزية)' : 'Address (English)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.venueAddressEn}
                    onChange={(e) => handleChange('venueAddressEn', e.target.value)}
                    className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                  {isAr ? 'رابط خريطة خرائط جوجل (Google Maps Link)' : 'Google Maps URL'}
                </label>
                <input
                  type="url"
                  required
                  value={formData.googleMapsUrl}
                  onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans font-mono"
                />
                <p className="text-[11px] text-[#777]">
                  {isAr 
                    ? 'ضع رابط الموقع في خرائط جوجل مباشرة ليقوم الضيوف بفتحه بنقرة واحدة' 
                    : 'Paste the direct Google Maps share URL for one-click navigation.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Date & Quote */}
          {activeTab === 'date' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                  {isAr ? 'تاريخ وساعة الزفاف (Wedding Date & Time)' : 'Wedding Date & Time'}
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.weddingDate.slice(0, 16)}
                  onChange={(e) => handleChange('weddingDate', e.target.value)}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                  {isAr ? 'عبارة الترحيب / الدعوة (عربي)' : 'Hero Quote (Arabic)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.heroQuoteAr}
                  onChange={(e) => handleChange('heroQuoteAr', e.target.value)}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-sans font-semibold text-[#A68B67] block">
                  {isAr ? 'عبارة الترحيب / الدعوة (إنجليزية)' : 'Hero Quote (English)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.heroQuoteEn}
                  onChange={(e) => handleChange('heroQuoteEn', e.target.value)}
                  className="w-full p-3 bg-white border border-[#A68B67]/30 text-sm font-sans"
                />
              </div>
            </div>
          )}

          {/* TAB 4: RSVPs */}
          {activeTab === 'rsvps' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#F3EFE7] p-4 border border-[#A68B67]/30">
                <div>
                  <h4 className="font-serif text-lg text-[#2D2D2D]">
                    {isAr ? 'إحصائيات تأكيد الحضور' : 'RSVP Submissions'}
                  </h4>
                  <p className="text-xs text-[#666]">
                    {isAr 
                      ? `إجمالي الردود: ${rsvps.length} | الحاضرون: ${rsvps.filter(r => r.attendance === 'attending').length}` 
                      : `Total Responses: ${rsvps.length} | Attending: ${rsvps.filter(r => r.attendance === 'attending').length}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={exportRsvpsCsv}
                  disabled={rsvps.length === 0}
                  className="px-4 py-2 bg-[#2D2D2D] text-white hover:bg-[#A68B67] text-xs uppercase tracking-wider font-sans font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isAr ? 'تصدير كملف Excel / CSV' : 'Export CSV'}</span>
                </button>
              </div>

              {rsvps.length === 0 ? (
                <p className="text-center py-8 text-sm font-serif text-[#777]">
                  {isAr ? 'لم يتم تسجيل أي ردود حتى الآن' : 'No RSVP responses recorded yet'}
                </p>
              ) : (
                <div className="overflow-x-auto border border-[#A68B67]/20">
                  <table className="w-full text-xs text-right rtl:text-right font-sans">
                    <thead className="bg-[#2D2D2D] text-[#F9F7F2] uppercase font-mono">
                      <tr>
                        <th className="p-3">{isAr ? 'الاسم' : 'Name'}</th>
                        <th className="p-3">{isAr ? 'الموقف' : 'Status'}</th>
                        <th className="p-3">{isAr ? 'المرافقين' : 'Guests'}</th>
                        <th className="p-3">{isAr ? 'الموبايل' : 'Phone'}</th>
                        <th className="p-3">{isAr ? 'الأغنية المطلوبة' : 'Song Request'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#A68B67]/20 bg-white">
                      {rsvps.map((r) => (
                        <tr key={r.id} className="hover:bg-[#F3EFE7]/50">
                          <td className="p-3 font-semibold text-[#2D2D2D]">{r.guestName}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                              r.attendance === 'attending' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {r.attendance}
                            </span>
                          </td>
                          <td className="p-3">{r.plusOnes}</td>
                          <td className="p-3 font-mono">{r.phone || '-'}</td>
                          <td className="p-3 italic">{r.songRequest || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {activeTab !== 'rsvps' && (
            <div className="pt-6 border-t border-[#A68B67]/20 flex items-center justify-between">
              {savedSuccess ? (
                <div className="flex items-center gap-2 text-emerald-700 text-xs font-sans font-bold">
                  <Check className="w-4 h-4" />
                  <span>{isAr ? 'تم حفظ التعديلات بنجاح في الموقع!' : 'Saved successfully!'}</span>
                </div>
              ) : <div />}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-white border border-[#A68B67]/30 text-[#2D2D2D] text-xs font-sans uppercase tracking-wider hover:bg-[#F3EFE7]"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2D2D2D] text-[#F9F7F2] hover:bg-[#A68B67] text-xs font-sans uppercase tracking-widest font-semibold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{isAr ? 'حفظ التعديلات فوراً' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
};
