import { WeddingConfig, RsvpRecord, GuestWish } from '../types';

// Calendar Generator
export function getGoogleCalendarUrl(config: WeddingConfig, isAr: boolean): string {
  const title = encodeURIComponent(
    isAr 
      ? `حفل زفاف ${config.groomNameAr} و ${config.brideNameAr}`
      : `Wedding of ${config.groomNameEn} & ${config.brideNameEn}`
  );
  
  const startTime = new Date(config.weddingDate);
  const endTime = new Date(startTime.getTime() + 6 * 60 * 60 * 1000); // 6 hours

  const formatIso = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const dates = `${formatIso(startTime)}/${formatIso(endTime)}`;
  const location = encodeURIComponent(
    isAr ? `${config.venueNameAr}, ${config.venueAddressAr}` : `${config.venueNameEn}, ${config.venueAddressEn}`
  );
  const details = encodeURIComponent(
    isAr ? config.heroQuoteAr : config.heroQuoteEn
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&location=${location}&details=${details}`;
}

export function downloadIcalFile(config: WeddingConfig, isAr: boolean): void {
  const title = isAr 
    ? `حفل زفاف ${config.groomNameAr} و ${config.brideNameAr}`
    : `Wedding of ${config.groomNameEn} & ${config.brideNameEn}`;
  const location = isAr ? `${config.venueNameAr}, ${config.venueAddressAr}` : `${config.venueNameEn}, ${config.venueAddressEn}`;
  
  const startTime = new Date(config.weddingDate);
  const endTime = new Date(startTime.getTime() + 6 * 60 * 60 * 1000);

  const formatIso = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation Website//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${isAr ? config.heroQuoteAr : config.heroQuoteEn}`,
    `DTSTART:${formatIso(startTime)}`,
    `DTEND:${formatIso(endTime)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `wedding_${config.groomNameEn.toLowerCase().replace(/\s+/g, '_')}_${config.brideNameEn.toLowerCase().replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Countdown Calculator
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export function calculateTimeRemaining(targetDateStr: string): TimeRemaining {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPassed: false };
}

// LocalStorage helpers
const CONFIG_KEY = 'wedding_invitation_config_v2';
const RSVPS_KEY = 'wedding_invitation_rsvps_v1';
const WISHES_KEY = 'wedding_invitation_wishes_v1';

export function getStoredConfig(defaultConfig: WeddingConfig): WeddingConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    return raw ? JSON.parse(raw) : defaultConfig;
  } catch {
    return defaultConfig;
  }
}

export function saveStoredConfig(config: WeddingConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save wedding config', err);
  }
}

export function getStoredRsvps(initialRsvps: RsvpRecord[]): RsvpRecord[] {
  try {
    const raw = localStorage.getItem(RSVPS_KEY);
    return raw ? JSON.parse(raw) : initialRsvps;
  } catch {
    return initialRsvps;
  }
}

export function saveStoredRsvps(rsvps: RsvpRecord[]): void {
  try {
    localStorage.setItem(RSVPS_KEY, JSON.stringify(rsvps));
  } catch (err) {
    console.error('Failed to save RSVPs', err);
  }
}

export function getStoredWishes(initialWishes: GuestWish[]): GuestWish[] {
  try {
    const raw = localStorage.getItem(WISHES_KEY);
    return raw ? JSON.parse(raw) : initialWishes;
  } catch {
    return initialWishes;
  }
}

export function saveStoredWishes(wishes: GuestWish[]): void {
  try {
    localStorage.setItem(WISHES_KEY, JSON.stringify(wishes));
  } catch (err) {
    console.error('Failed to save wishes', err);
  }
}

// Romantic Web Audio Synthesizer for ambient music if browser permits
let audioCtx: AudioContext | null = null;
let musicInterval: number | null = null;

export function toggleAmbientMusic(isPlaying: boolean, onStateChange?: (playing: boolean) => void): boolean {
  if (isPlaying) {
    // stop
    if (musicInterval) clearInterval(musicInterval);
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    // start ambient romantic arpeggio (Canon in D / Wedding motif)
    try {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00, 493.88]; // C, E, G, C5, A, F, G, B
      let index = 0;

      const playNote = () => {
        if (!audioCtx || audioCtx.state === 'closed') return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[index % notes.length], audioCtx.currentTime);

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.8);

        index++;
      };

      playNote();
      musicInterval = window.setInterval(playNote, 600);
      if (onStateChange) onStateChange(true);
      return true;
    } catch {
      if (onStateChange) onStateChange(false);
      return false;
    }
  }
}
