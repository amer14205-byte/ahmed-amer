import React, { useState, useEffect } from 'react';
import { WeddingConfig, RsvpRecord, GuestWish } from './types';
import { DEFAULT_WEDDING_CONFIG, INITIAL_RSVPS, INITIAL_WISHES } from './data/defaultData';
import {
  getStoredConfig,
  saveStoredConfig,
  getStoredRsvps,
  saveStoredRsvps,
  getStoredWishes,
  saveStoredWishes,
  toggleAmbientMusic,
} from './utils/calendar';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { QuranQuote } from './components/QuranQuote';
import { Schedule } from './components/Schedule';
import { VenueDetails } from './components/VenueDetails';
import { DressCode } from './components/DressCode';
import { RsvpForm } from './components/RsvpForm';
import { WishesWall } from './components/WishesWall';
import { GiftRegistry } from './components/GiftRegistry';
import { FaqSection } from './components/FaqSection';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [config, setConfig] = useState<WeddingConfig>(() => getStoredConfig(DEFAULT_WEDDING_CONFIG));
  const [rsvps, setRsvps] = useState<RsvpRecord[]>(() => getStoredRsvps(INITIAL_RSVPS));
  const [wishes, setWishes] = useState<GuestWish[]>(() => getStoredWishes(INITIAL_WISHES));

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync document language & direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Handlers
  const handleToggleMusic = () => {
    const newState = toggleAmbientMusic(isMusicPlaying, (playing) => setIsMusicPlaying(playing));
  };

  const handleUpdateConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    saveStoredConfig(newConfig);
  };

  const handleAddRsvp = (newRecord: RsvpRecord) => {
    const updated = [newRecord, ...rsvps];
    setRsvps(updated);
    saveStoredRsvps(updated);
  };

  const handleDeleteRsvp = (id: string) => {
    const updated = rsvps.filter((r) => r.id !== id);
    setRsvps(updated);
    saveStoredRsvps(updated);
  };

  const handleAddWish = (newWish: GuestWish) => {
    const updated = [newWish, ...wishes];
    setWishes(updated);
    saveStoredWishes(updated);
  };

  const handleLikeWish = (id: string) => {
    const updated = wishes.map((w) => (w.id === id ? { ...w, likesCount: w.likesCount + 1 } : w));
    setWishes(updated);
    saveStoredWishes(updated);
  };

  return (
    <div className={`min-h-screen bg-[#F9F7F2] text-[#2D2D2D] selection:bg-[#A68B67] selection:text-white ${lang === 'ar' ? 'font-sans-ar' : 'font-sans'}`}>
      {/* Top Header Navigation */}
      <Header
        config={config}
        lang={lang}
        setLang={setLang}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero config={config} lang={lang} />
        <Countdown config={config} lang={lang} />
        <QuranQuote config={config} lang={lang} />
        <Schedule config={config} lang={lang} />
        <VenueDetails config={config} lang={lang} />
        <DressCode config={config} lang={lang} />
        <RsvpForm config={config} lang={lang} onAddRsvp={handleAddRsvp} />
        <WishesWall lang={lang} wishes={wishes} onAddWish={handleAddWish} onLikeWish={handleLikeWish} />
        <GiftRegistry config={config} lang={lang} />
        <FaqSection config={config} lang={lang} />
      </main>

      {/* Footer */}
      <Footer config={config} lang={lang} />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
        rsvps={rsvps}
        onDeleteRsvp={handleDeleteRsvp}
        lang={lang}
      />
    </div>
  );
}
