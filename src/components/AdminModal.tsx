import React, { useState } from 'react';
import { X, Download, Trash2, Search, Users, CheckCircle, XCircle, Save, Settings, Heart } from 'lucide-react';
import { WeddingConfig, RsvpRecord } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onUpdateConfig: (newConfig: WeddingConfig) => void;
  rsvps: RsvpRecord[];
  onDeleteRsvp: (id: string) => void;
  lang: 'ar' | 'en';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  rsvps,
  onDeleteRsvp,
  lang,
}) => {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'rsvps' | 'config'>('rsvps');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'attending' | 'declined'>('all');

  // Form state for config edits
  const [formData, setFormData] = useState<WeddingConfig>(config);

  const totalAttendingGuests = rsvps
    .filter((r) => r.attendance === 'attending')
    .reduce((sum, r) => sum + Math.max(1, r.plusOnes), 0);

  const totalDeclined = rsvps.filter((r) => r.attendance === 'declined').length;

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch =
      r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm);
    if (filter === 'attending') return matchesSearch && r.attendance === 'attending';
    if (filter === 'declined') return matchesSearch && r.attendance === 'declined';
    return matchesSearch;
  });

  const exportCsv = () => {
    const headers = ['Guest Name', 'Phone', 'Attendance', 'Plus Ones', 'Song Request', 'Message', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.guestName}"`,
      `"${r.phone}"`,
      r.attendance,
      r.plusOnes,
      `"${r.songRequest || ''}"`,
      `"${r.specialNote || ''}"`,
      r.submittedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wedding_rsvps_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(formData);
    alert(isAr ? 'تم حفظ التعديلات وإعادة ضبط بيانات الفرح بنجاح!' : 'Wedding details updated successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#F9F7F2] border-2 border-[#A68B67] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#F3EFE7] border-b border-[#A68B67]/30 flex justify-between items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-[#2D2D2D] text-[#A68B67] rounded-full">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif-en font-bold text-[#2D2D2D]">
                {isAr ? 'لوحة تحكم إدارة الفرح والدعوات' : 'Wedding Admin Dashboard'}
              </h2>
              <span className="text-xs text-[#A68B67] font-semibold tracking-widest uppercase">
                {isAr ? 'عرض إحصائيات الضيوف وتعديل البيانات' : 'Manage RSVPs & Wedding Settings'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#2D2D2D] hover:bg-[#A68B67] hover:text-white transition-colors rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex border-b border-[#A68B67]/20 bg-white">
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${
              activeTab === 'rsvps'
                ? 'bg-[#2D2D2D] text-[#F9F7F2]'
                : 'text-[#2D2D2D] hover:bg-[#F3EFE7]'
            }`}
          >
            <Users className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? `قائمة التأكيدات (${rsvps.length})` : `RSVP Records (${rsvps.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`px-6 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all flex items-center gap-2 ${
              activeTab === 'config'
                ? 'bg-[#2D2D2D] text-[#F9F7F2]'
                : 'text-[#2D2D2D] hover:bg-[#F3EFE7]'
            }`}
          >
            <Settings className="w-4 h-4 text-[#A68B67]" />
            <span>{isAr ? 'تعديل تفاصيل الدعوة' : 'Edit Wedding Info'}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'rsvps' && (
            <div className="space-y-6">
              
              {/* Summary Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F3EFE7] p-5 border border-[#A68B67]/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-[#A68B67] font-semibold tracking-wider block">
                      {isAr ? 'إجمالي الحضور المقدر' : 'Total Attending Headcount'}
                    </span>
                    <span className="text-3xl font-bold font-serif-en text-[#2D2D2D]">{totalAttendingGuests}</span>
                  </div>
                  <Users className="w-8 h-8 text-[#A68B67]/50" />
                </div>

                <div className="bg-emerald-50 p-5 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-emerald-800 font-semibold tracking-wider block">
                      {isAr ? 'ردود التأكيد (Attending)' : 'Confirmed RSVPs'}
                    </span>
                    <span className="text-3xl font-bold font-serif-en text-emerald-900">
                      {rsvps.filter((r) => r.attendance === 'attending').length}
                    </span>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-600/50" />
                </div>

                <div className="bg-rose-50 p-5 border border-rose-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase text-rose-800 font-semibold tracking-wider block">
                      {isAr ? 'المعتذرون (Declined)' : 'Declined Responses'}
                    </span>
                    <span className="text-3xl font-bold font-serif-en text-rose-900">{totalDeclined}</span>
                  </div>
                  <XCircle className="w-8 h-8 text-rose-600/50" />
                </div>
              </div>

              {/* Search & Export Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 border border-[#A68B67]/20">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-[#A68B67] absolute left-3 rtl:left-auto rtl:right-3 top-3" />
                  <input
                    type="text"
                    placeholder={isAr ? 'بحث باسم الضيف أو الهاتف...' : 'Search name or phone...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 rtl:pl-4 rtl:pr-9 py-2 bg-[#F9F7F2] border border-[#A68B67]/30 text-xs focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={exportCsv}
                    className="px-4 py-2 bg-[#2D2D2D] text-[#F9F7F2] text-xs uppercase tracking-wider hover:bg-[#A68B67] transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A68B67]" />
                    <span>{isAr ? 'تصدير شيت CSV' : 'Export CSV'}</span>
                  </button>
                </div>
              </div>

              {/* RSVPs Table */}
              <div className="border border-[#A68B67]/30 overflow-x-auto bg-white">
                <table className="w-full text-xs text-left rtl:text-right">
                  <thead className="bg-[#F3EFE7] text-[#2D2D2D] uppercase tracking-wider text-[11px] border-b border-[#A68B67]/30">
                    <tr>
                      <th className="p-3">{isAr ? 'اسم الضيف' : 'Guest Name'}</th>
                      <th className="p-3">{isAr ? 'الهاتف' : 'Phone'}</th>
                      <th className="p-3">{isAr ? 'الحالة' : 'Status'}</th>
                      <th className="p-3">{isAr ? 'العدد' : 'Plus Ones'}</th>
                      <th className="p-3">{isAr ? 'الأغنية المطلوبة' : 'Song Request'}</th>
                      <th className="p-3">{isAr ? 'إجراء' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#A68B67]/15">
                    {filteredRsvps.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-sm text-[#777]">
                          {isAr ? 'لا توجد تسجيلات مطابقة حتى الآن.' : 'No RSVP entries found.'}
                        </td>
                      </tr>
                    ) : (
                      filteredRsvps.map((r) => (
                        <tr key={r.id} className="hover:bg-[#F9F7F2] transition-colors">
                          <td className="p-3 font-semibold text-[#2D2D2D]">{r.guestName}</td>
                          <td className="p-3 font-mono">{r.phone}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${
                                r.attendance === 'attending'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {r.attendance}
                            </span>
                          </td>
                          <td className="p-3">{r.plusOnes}</td>
                          <td className="p-3 italic max-w-[150px] truncate">{r.songRequest || '-'}</td>
                          <td className="p-3">
                            <button
                              onClick={() => onDeleteRsvp(r.id)}
                              className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                              title={isAr ? 'حذف الرد' : 'Delete'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeTab === 'config' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                    {isAr ? 'اسم العريس (بالعربي)' : 'Groom Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.groomNameAr}
                    onChange={(e) => setFormData({ ...formData, groomNameAr: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                    {isAr ? 'اسم العريس (بالإنجليزية)' : 'Groom Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.groomNameEn}
                    onChange={(e) => setFormData({ ...formData, groomNameEn: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                    {isAr ? 'اسم العروس (بالعربي)' : 'Bride Name (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={formData.brideNameAr}
                    onChange={(e) => setFormData({ ...formData, brideNameAr: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                    {isAr ? 'اسم العروس (بالإنجليزية)' : 'Bride Name (English)'}
                  </label>
                  <input
                    type="text"
                    value={formData.brideNameEn}
                    onChange={(e) => setFormData({ ...formData, brideNameEn: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                    {isAr ? 'مواعيد وتاريخ الفرح (ISO)' : 'Wedding Date (ISO String)'}
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.weddingDate.slice(0, 16)}
                    onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                    {isAr ? 'رابط خريطة المكان (Google Maps URL)' : 'Google Maps Link'}
                  </label>
                  <input
                    type="text"
                    value={formData.googleMapsUrl}
                    onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A68B67] uppercase block mb-1">
                  {isAr ? 'اسم القاعة (بالعربي)' : 'Venue Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.venueNameAr}
                  onChange={(e) => setFormData({ ...formData, venueNameAr: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#A68B67]/30 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2D2D2D] text-[#F9F7F2] font-sans text-xs tracking-[0.25em] uppercase hover:bg-[#A68B67] transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4 text-[#A68B67]" />
                <span>{isAr ? 'حفظ البيانات وتحديث الدعوة' : 'Save Wedding Config'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
